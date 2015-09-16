
import * as synq from '../lib/synq';

export default class Create{

  constructor(el){

    let input = el.querySelector('input');
    let button = el.querySelector('.button');

    button.on('click', ()=>{

      synq.start(input.value, (...args)=>{

        console.log(args);

        input.value = '';
      });
    })

  }
}
