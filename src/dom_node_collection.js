
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
  

}