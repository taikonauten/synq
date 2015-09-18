var React = require('react');

var synq = require('../lib/synq');

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

    synq.start(this.state.url, function(url) {

      console.log(url);

      that.setState({active:true,external:url});
    });
  },

  stop: function() {

    var that = this;

    synq.stop(this.state.url, function(res){

      that.setState({active:false,external:'#'});
    });
  },

  remove: function() {

    var that = this;

    synq.remove(this.state.url,function(){

      that.setState({deleted: true});
      this.props.onUpdate(that.state);
    });
  },

  render: function() {

    //howy?????
    //if(this.state.deleted);

    return (
      <li className={this.state.active}>
        <a href={this.state.external}>{this.state.url}</a>
        <div id="start" onClick={this.start}  className="button button-instance">start</div>
        <div id="stop" onClick={this.stop}   className="button button-instance">stop</div>
        <div id="remove" onClick={this.remove} className="button button-instance">delete</div>
      </li>
    );
  }
});
