var JSX = require('node-jsx').install(),
    React = require('react'),
    App = React.createFactory(require('./common/app.jsx')),
    synq = require('./lib/synq');

module.exports = {

  index: function(req, res) {

    // Render React to a string, passing in our fetched tweets
    // var markup = React.renderComponentToString(
    //   <ReactInstance active="true" external="http://dietaikonauten.com" url="TEST" />
    // );

    //var markup = React.createElement(ReactInstance, { active: true, external: "http://dietaikonauten.com", url: "YAYAYAY" });

    var markup = React.renderToString(App({data: synq.get()}));

    res.render('index', {

      synqList: synqList
    });
  }

}
