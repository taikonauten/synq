var React = require('react'),
    SynqInstance = require('./synq-instance.jsx');

module.exports = React.createClass({

  render: function() {

    // Build list items of single instances
    var content = this.props.pages.map(function(page){

      return (
        <SynqInstance page={page} />
      )
    });

    return (
      <ul>
        {content}
      </ul>
    );
  }
});
