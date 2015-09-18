var React = require('react');
var controller = require('../controller/app');

module.exports = React.createClass({

  getInitialState: function() {

    return {

      active: this.props.active,
      external: this.props.external,
      url: this.props.url,
      deleted: false
    }
  },

  start: function() {

    var that = this;

    controller.start(this.state.url, function(){

      that.state.active = true;
    });
  },

  stop: function() {

    var that = this;

    controller.stop(this.state.url, function(){

      that.state.active = false;
    });
  },

  remove: function() {

    controller.remove(this.state.url);
  },

  render: function() {


    return (
      <li className={this.state.active? 'true': 'false'}>
        <a href={this.state.external} target="_blank">{this.state.url}</a>
        <div id="start" onClick={this.start}  className="button button-instance">start</div>
        <div id="stop" onClick={this.stop}   className="button button-instance">stop</div>
        <div id="remove" onClick={this.remove} className="button button-instance">delete</div>
      </li>
    );
  }
});
