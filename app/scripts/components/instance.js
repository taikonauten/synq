
import * as synq from '../lib/synq';

export default class Instance{

  constructor(el){

    let start = el.querySelector('#start');
    let stop = el.querySelector('#stop');
    let remove = el.querySelector('#remove');

    this.url = el.querySelector('a').innerText;

    start.on('click', this.start.bind(this));
    stop.on('click', this.stop.bind(this));
    remove.on('click', this.remove.bind(this));
  }

  start(){

    synq.start(this.url, function(...args){

      console.log(args);
    })
  }

  stop(){

    synq.stop(this.url, function(...args){

      console.log(args);
    })
  }

  remove(){

    synq.remove(this.url, function(...args){

      console.log(args);
    })
  }
}