
require('./lib/bling');

import Component from './lib/component';
import Create from './components/create';
import Instance from './components/instances';
import Instances from './components/instances';


Component.register(Create, '[data-create]');
Component.register(Instances, '[data-instances]');
Component.register(Instance, '[data-instance]');
