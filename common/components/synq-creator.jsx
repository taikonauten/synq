var JSX = require('node-jsx').install(),
    React = require('react');

module.exports = synqCreator = React.createClass({

  getInitialState: function() {

    return {
      value: this.props.value
    }
  },

  render: function() {

    return (
      <ul data-instances>
        {content}
      </ul>
    );
  }
});
