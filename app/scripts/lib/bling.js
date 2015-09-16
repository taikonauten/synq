/**
 * bling.js a micro DOM library
 *
 * This library makes working with dom nodes a piece of cake
 * Extends Node and Nodelist prototype directly
 *
 * Many THANKS to Paul Irish for this Gist https://gist.github.com/paulirish/12fb951a8b893a454b32
 *
 * @author Haithem Bel Haj (hb@dietaikonauten.com)
 */

window.$ = document.querySelectorAll.bind(document);

// shorthand for addEventListener
Node.prototype.on = window.on = function (name, fn) {

    this.addEventListener(name, fn)
};

// extend node list
NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {

    Array.prototype.slice.call(this).forEach(function (elem) {

        elem.on(name, fn)
    })
};

// extend the node prototype with some usefull functions
defineProperties(Node.prototype, {

    // insert node before
    before: function(node){

        this.parentNode && this.parentNode.insertBefore(node, this);

        return this;
    },

    // insert node after this node
    after: function(node){

        this.parentNode && this.parentNode.insertBefore(node, this.nextSibling);

        return this;
    },

    // shorthand for appendChild
    append: function(node){

        this.appendChild(node);

        return this;
    },

    // prepend node
    prepend: function(node){

        this.insertBefore(node, this.firstChild);

        return this;
    },

    // replace this with node
    replace: function(node){

        this.parentNode && this.parentNode.replaceChild(node, this);

        return this;
    },

    // remove a node
    remove: function(){

        this.parentNode && this.parentNode.removeChild(this);

        return this;
    },

    // empty node
    empty: function(){

        while (this.firstChild) {

            this.removeChild(this.firstChild);
        }

        return this;
    },

    // append nodelist
    appendNodes: function(nodes){

        let frag = document.createDocumentFragment();

        Array.prototype.slice.call(nodes).forEach(frag.appendChild.bind(frag))

        this.appendChild(frag);

        return this;
    },

    // get parent matching selector
    parent: function(selector){

        var parent = this.parentNode;

        if(!selector) return parent;

        while(parent){

            if(parent.matches(selector))
                return parent;

            parent = parent.parentNode;
        }

        return undefined;
    },

    // getter and setter for the inner nodelist
    innerNodes: {

        get: function(){return this.childNodes},

        // sets childNodes
        set: function(nodes){

            this.empty();

            if(nodes)
                this.appendNodes(nodes);
        }
    }

});


/*
  Helpers
 */

function defineProperties(proto, props){

    Object.keys(props).forEach((prop)=> defineProperty(proto, prop, props[prop]));
}


function defineProperty(proto, prop, def){

    if(isFunction(def))
        def = {value: def};

    Object.defineProperty(proto, prop, def)
}

function isFunction(obj) {

    return !!(obj && obj.constructor && obj.call && obj.apply);
}