var JSX = require('node-jsx').install(),
    React = require('react'),
    ReactInstance = require('./components/synq-list.jsx');

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
      <synqList pages={this.props.pages} />
    );
  }

});
