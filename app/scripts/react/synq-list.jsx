var React = require('react'),
    SynqInstance = require('./synq-instance.jsx');

module.exports = React.createClass({

  getInitialState: function() {

    return {pages: this.props.pages};
  },

  onUpdate: function(pages) {

    this.setState({
        pages: pages
    });
  },

  render: function() {

    var that = this;

    // Build list items of single instances
    var content = this.props.pages.map(function(page){

      if(page.deleted) return;

      return (
        <SynqInstance active={page.active} external={page.external} url={page.url} />
      )
    });

    return (
      <ul>
        {content}
      </ul>
    );
  }
});
