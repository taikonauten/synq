var React = require('react');
var controller = require('../controller/app');

module.exports = React.createClass({

  getInitialState: function() {

    return {showQr: false};
  },

  start: function() {

    var that = this;

    controller.start(this.props.page.url);
  },

  stop: function() {

    var that = this;

    controller.stop(this.props.page.url);
  },

  remove: function() {

    controller.remove(this.props.page.url);
  },

  toggleQr: function(){

    this.state.showQr? this.hideQr() : this.showQr();
  },

  showQr: function(){

    this.setState({showQr: true})
  },

  hideQr: function(){

    this.setState({showQr: false})
  },

  render: function() {

    var page = this.props.page;

    return (
      <li key={page.url} className={page.active ? 'online': 'offline'}>
        <a href={page.external} target="_blank">{page.url}</a>
        <div className="button-wrapper">
          <div id="start" onClick={this.start}  className="button button-instance"><img className="icon" src="assets/play.svg" /></div>
          <div id="stop" onClick={this.stop}   className="button button-instance"><img className="icon" src="assets/stop.svg" /></div>
          <div id="qr" onClick={this.toggleQr}  className="button button-instance">QR</div>
          <div id="remove" onClick={this.remove} className="button button-instance"><img className="icon" src="assets/delete.svg" width="30px" height="30px" /></div>
        </div>
        <div className={this.state.showQr ? 'qrImage active': 'qrImage'} onClick={this.hideQr}>
          <img src={page.qr} />
        </div>
      </li>
    );
  }
});
