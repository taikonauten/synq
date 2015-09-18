var React = require('react');
var synq = require('../lib/synq');

module.exports = React.createClass({

  getInitialState: function() {

    return {
      value: this.props.value
    }
  },

  addUrl: function() {

    var that = this;

    synq.add(this.state.value,function(r){

      that.setState({value:"",success:true});

    });
  },

  handleChange: function() {

    this.setState({value: event.target.value});

  },

  render: function() {

    return (
      <form onSubmit={this.submit}>
        <div className="creator-container">
          <input type="text" value={this.value} onChange={this.handleChange} placeholder="+" autofocus />
          <div className="button" tabIndex="0"><span onClick={this.addUrl}>+</span></div>
        </div>
      </form>
    );
  }
});
