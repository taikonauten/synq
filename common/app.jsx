var JSX = require('node-jsx').install();
var React = require('react');

var instance = require('./components/react-instance.jsx');

module.exports = synqApp = React.createClass({

  //return the initial state - which is the number of pages
  getInitialState: function() {

    return {
      pages: this.props.pages
    }
  },

  // need?
  // componentDidMount: function() {
  //
  //   this.setState({disabled: false})
  // },

  //render the app
  render: function() {
    return (
      <h1>YAY MOTHERFUCKER!</h1>
    );
  }

});
