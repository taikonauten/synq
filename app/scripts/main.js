
var React = require('react');
var controller = require('./controller/app');

var SynqCreator = require('./react/synq-creator.jsx');
var SynqList = require('./react/synq-list.jsx');

// Snag the initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

controller.setState(initialState);

React.render(
  <SynqCreator />,
  document.getElementById('sq')
);

React.render(
  <SynqList pages={initialState} />,
  document.getElementById('synqList')
);


controller.on('change', function(state){

  React.render(
    <SynqList pages={state} />,
    document.getElementById('synqList')
  );
});
