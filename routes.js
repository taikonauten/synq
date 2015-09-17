var JSX = require('node-jsx').install(),
    React = require('react'),
    ReactInstance = React.createFactory(require('./common/components/react-instance'));

module.exports = {

  index: function(req, res) {

    // Render React to a string, passing in our fetched tweets
    // var markup = React.renderComponentToString(
    //   <ReactInstance active="true" external="http://dietaikonauten.com" url="TEST" />
    // );

    //var markup = React.createElement(ReactInstance, { active: true, external: "http://dietaikonauten.com", url: "YAYAYAY" });

    var markup = React.renderToString(ReactInstance({ active: true, external: "http://dietaikonauten.com", url: "YAYAYAY" }));

    res.render('index', {

      markup: markup
    });
  }

}
