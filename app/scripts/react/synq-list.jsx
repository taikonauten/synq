var React = require('react'),
    SynqInstance = require('./synq-instance.jsx');

module.exports = React.createClass({

  // getInitialState: function() {
  //
  //   return {pages: initialState};
  // },

  render: function() {

    // Build list items of single instances
    var content = this.props.pages.map(function(page){
      
      return (
        <SynqInstance active={page.active} external={page.external} url={page.url} />
      )
    });

    return (
      <ul data-instances>
        {content}
      </ul>
    );
  }
});
