var React = require('react');
var controller = require('../controller/app');

module.exports = React.createClass({

  getInitialState: function() {

    return {
      value: this.props.value
    }
  },

  addUrl: function(e) {

    var that = this;

    e.preventDefault();

    controller.add(this.state.value, function(resp){

      console.log('add', resp);

      that.setState({
        value : ''
      })
    });
  },

  handleChange: function() {

    this.setState({value: event.target.value});
  },

  render: function() {

    return (
      <form onSubmit={this.addUrl}>
        <div className="creator-container">
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="+" autofocus />
          <div className="button" tabIndex="0"><span onClick={this.addUrl}>+</span></div>
        </div>
      </form>
    );
  }
});
