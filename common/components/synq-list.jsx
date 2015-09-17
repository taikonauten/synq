var JSX = require('node-jsx').install(),
    React = require('react'),
    synqInstance = require('./synq-instance.jsx');

module.exports = synqList = React.createClass({

  getInitialState: function() {

    return {
      length: this.props.pages
    }
  },

  render: function() {

    // Build list items of single instances
    var content = this.props.pages.map(function(page){

      return (
        <synqInstance active={page.active} external={page.external} url={page.url} />
      )
    });

    return (
      <ul data-instances>
        {content}
      </ul>
    );
  }
});
