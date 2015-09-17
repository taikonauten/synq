
var React = require('react');
require('./lib/bling');

var SynqCreator = require('./react/synq-creator.jsx');
var SynqList = require('./react/synq-list.jsx');

import Component from './lib/component';
import Create from './components/create';
import Instance from './components/instance';
import Instances from './components/instances';


Component.register(Create, '[data-create]');
Component.register(Instances, '[data-instances]');
Component.register(Instance, '[data-instance]');

React.render(
  <SynqCreator />,
  document.getElementById('sq')
);

// Snag the initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

React.render(
  <SynqList pages={initialState} />,
  document.getElementById('synqList')
);
