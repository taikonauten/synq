var React = require('react');

module.exports = synqInstance = React.createClass({

  getInitialState: function() {

    return {
      active: this.props.active
    }
  },

  render: function() {
    return (
      <li>
        <a href={this.props.external}>{this.props.url}</a>
        <div id="start"  class="button button-instance">start</div>
        <div id="stop"   class="button button-instance">stop</div>
        <div id="remove" class="button button-instance">delete</div>
      </li>
    );
  }
});
