// imports
import {extend, toArray, isFunction} from 'lodash';

// Collection of Components
let components = {};

/**
 * Component Class
 *
 * Components are a js extension to an HTML Node
 */
export default class Component {

  // Binds a component to a selector and saves a reference
  static register(Class, selector){

    if(!Class || !isFunction(Class)) return;

    let elements = toArray(document.querySelectorAll(selector));

    elements.forEach(el => Component.bind(Class, el));

    // save a reference
    components[selector] = Class;
  }

  static reload(){

    Object.keys(components).forEach(selector => Component.register(components[selector], selector))
  }

  static bind(Class, el, ...args){

    let hiddenProp = getHiddenProp(Class);

    if(typeof el[hiddenProp] === "undefined")
      el[hiddenProp] = new Class(el, ...args);
  }

  // retrieve the instance of Class from an element
  static getInstance(Class, el){

    return el[getHiddenProp(Class)];
  }

  // retrieve the instance of Class from an element
  static deleteInstance(Class, el){

    delete el[getHiddenProp(Class)];
  }

  // parse the attributes of an element given a schema
  //
  // example:
  //
  // Given this schema {id: Number, isClosed: Boolean}
  // And this el <div data-id="123456" data-is-closed="true"></div>
  // Will produce {id: 123456, isClosed: true}
  //
  // For special cases where you need more transformation
  // Given this schema {'title->content': String}
  // and this el <div data-title="some content"></div>
  // will produce {content: "some content"}
  static parseSchema(schema, el, options) {

    let {prefix} = extend({ prefix: 'data-'}, options);

    let out = {};

    Object.keys(schema).forEach((key)=> {

      let [attrKey, objKey] = key.split('->');

      let attr = el.getAttribute(prefix + snake_case(attrKey));

      if (attr !== null)
        return out[objKey || attrKey] = parse(schema[key], attr);
    });

    return out;
  }
}


/**
 * helper functions
 */

// get hidden Prop name
function getHiddenProp(Class){

  return `__${Class.name || getFunctionName(Class)}__`;
}

function getFunctionName(fun) {

  let  ret = fun.toString();

  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));

  return ret;
}

// parse attr
function parse(type, value) {

  if (type === Number)
    return Number(value);

  if (type === String)
    return value;

  if (type === Object)
    return JSON.parse(value);

  if (type === Boolean)
    return (value === "true");

  if (isFunction(type)){

    return type(value);
  }
}

// to snake_case
function snake_case(name, separator = '-') {

  return name.replace(/[A-Z]/g, (letter, pos)=>(pos ? separator : '') + letter.toLowerCase());
}
