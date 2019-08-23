
window.$1 = function(thing) {
  let res;
  // console.log("hi");
  if (typeof thing === "string") {
    // console.log("hello");
    let res2 = this.document.querySelectorAll(thing);
    res = Array.from(res2);
  }
  return res;
};