var React = require('react');

var Layout = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <html>
      <head>
        <meta charset="utf-8">
        <title>synq</title>

        <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="/styles/main.css">
      </head>
      <body>

        <header>
          <img src="/assets/synq-logo.svg" alt="synq - browsersync to the fullest" />
        </header>


        <section class="creator" data-create>

          <div class="creator-container">
            <input type="text" placeholder="+" autofocus>
            <div class="button" tabindex="0"><span>+</span></div>
          </div>
        </section>


        <section class="instance-list">
          <div class="instance-container">
            <h2>active synqs</h2>
            <ul data-instances>

            </ul>
          </div>
        </section>

        <section id="react">
        </section>


        <script src="/scripts/main.js"></script>
      </body>
      </html>
    );
  }
});

module.exports = Layout;
