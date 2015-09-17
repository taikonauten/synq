var React = require('react');

module.exports = ReactInstance = React.createClass({displayName: "ReactInstance",

  getInitialState: function() {

    return {
      active: this.props.active
    }
  },

  render: function() {
    return (
      React.createElement("li", null,
        React.createElement("a", {href: this.props.external}, this.props.url),
        React.createElement("div", {id: "start", class: "button button-instance"}, "start"),
        React.createElement("div", {id: "stop", class: "button button-instance"}, "stop"),
        React.createElement("div", {id: "remove", class: "button button-instance"}, "delete")
      )
    );
  }
});
