import DomNodeCollection from "./dom_node_collection.js";

window.queue = [];

window.$1 = function(thing) {
  let res;
  // console.log("hi");
  if (typeof thing === "string") {
    // console.log("hello");
    let res2 = window.document.querySelectorAll(thing);
    res = Array.from(res2);
  } else if (thing instanceof HTMLElement) {
    res = Array.from(thing);
  } else if (typeof thing === "function") {
    if (document.readyState === "complete" || document.readyState === "loaded") {
      thing();
    } else {
      window.queue.push(thing);
    }
  }
  return new DomNodeCollection(res);
};

$1.extend = function(initial, ...args) {
  args.forEach( (pojo) => {
    Object.keys(pojo).forEach( (key) => {
      initial[key] = pojo[key];
    });
  });
  return initial;
};

$1.ajax = function(options) {
  let defaults = {
    success: ((data) => {return data;}),
    error: ((...data) => {console.error(data);}),
    url: window.location.href,
    method: "GET",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  options = options || {};
  let query = $1.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(query.method, query.url);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let res = JSON.parse(this.response);
        query.success(res);
      } else {
        query.error(this.status, this.responseType, this.response);
      }
    }
  };
  xhr.send(query.data);
};

document.addEventListener('DOMContentLoaded', () => {
  window.queue.forEach((func) => {
    func();
  });
});