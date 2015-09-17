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
      <div className="creator-container">
        <input type="text" placeholder="+" autofocus />
        <div className="button" tabindex="0"><span>+</span></div>
      </div>
    );
  }
});
