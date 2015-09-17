var JSX = require('node-jsx').install(),
    React = require('react');

module.exports = synqCreator = React.createClass({

  getInitialState: function() {

    return {
      value: this.props.value
    }
  },

  addUrl: function() {

    //nothing yet. hb killed it. thanx buddy. i hate you.
  },

  handleChange: function() {

    this.setState({value: event.target.value});

  },

  render: function() {

    return (
      <form onSubmit={this.submit}>
        <div className="creator-container">
          <input type="text" value={this.value} onChange={this.handleChange} placeholder="+" autofocus />
          <div className="button" tabindex="0" onClick={this.addUrl}><span>+</span></div>
        </div>
      </form>
    );
  }
});

shot23caller#
