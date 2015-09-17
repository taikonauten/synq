
import * as synq from '../lib/synq';

export default class Create{

  constructor(el){

    let input = el.querySelector('input');
    let form = el.querySelector('form');
    let button = el.querySelector('.button');

    form.on('submit', create);

    function create(e){

      e.preventDefault();

      synq.start(input.value, (...args)=>{

        console.log(args);

        input.value = '';
      });
    }
  }
}
