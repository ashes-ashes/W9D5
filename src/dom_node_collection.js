
export default class DOMNodeCollection {
  constructor(eles) {
    this.eles = eles;
  }

  html(string) {
    if (string === undefined) {
      return this.eles[0].innerHTML;
    } else {
      this.eles.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    if (arg instanceof HTMLElement) {
      this.eles.forEach( (el) => {
        el.innerHTML += arg.outerHTML;
      });
    } else if (typeof arg === "string") {
      this.eles.forEach( (el) => {
        el.innerHTML += arg;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.eles.forEach((el) => {
        arg.eles.forEach((argel => {
          el.innerHTML += argel.outerHTML;
        }));
      });
    }
  }

  attr(att, val) {
    if (val === undefined) {
      console.log("meep");
      return this.eles[0].getAttribute(att);
    } else {
      this.eles.forEach( (el) => {
        el.setAttribute(att, val);
      });
    }
  }

  addClass(val) {
    this.eles.forEach( (el) => {
      el.classList.add(val);
    });
  }

  removeClass(val) {
    this.eles.forEach( (el) => {
      el.classList.remove(val);
    });
  }

  // --- Traversal --- //

  children() {
    let childs = [];
    this.eles.forEach( (el) => {
      childs = childs.concat(el.children);
    });
    return new DOMNodeCollection(childs);
  }

  parent() {
    let parents = [];
    this.eles.forEach( (el) => {
      parents = parents.concat(el.parentElement);
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let matches = [];
    this.eles.forEach( (el) => {
      matches = matches.concat(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(matches);
  }

  remove(selector) {
    this.eles.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }

  each(cb) {
    this.eles.forEach((el) => {
      cb(el);
    });
  }

  //---Event Handling---//

  on(string, cb) {
    this.eles.forEach((el) => {
      el.addEventListener(string, cb);
    });
  }

  off(string, cb) {
    this.eles.forEach((el) => {
      el.removeEventListener(string, cb);
    });
  }

}