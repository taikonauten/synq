var React = require('react');
var Layout = require('./layout');

var Index = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <Layout title={this.props.title}>
        <section id="react">
        </section>
      </Layout>
    );
  }
});

module.exports = Index;
