import DomNodeCollection from "./dom_node_collection.js";

window.$1 = function(thing) {
  let res;
  // console.log("hi");
  if (typeof thing === "string") {
    // console.log("hello");
    let res2 = window.document.querySelectorAll(thing);
    res = Array.from(res2);
  } else if (thing instanceof HTMLElement) {
    res = Array.from(thing);
  }
  return new DomNodeCollection(res);
};