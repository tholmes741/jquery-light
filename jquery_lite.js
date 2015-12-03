(function () {
  function DOMNodeCollection(elArray) {
    this.els = elArray;
  }

  var $l = window.$l = function (selector) {
    var selection;
    if (selector instanceof HTMLElement) {
      selection = [selector];
    } else {
      selection = [].slice.call(document.querySelectorAll(selector));
    }
    return new DOMNodeCollection(selection);
  };

  DOMNodeCollection.prototype = {
    html: function (string) {
      if (typeof string === 'undefined') {
        return this.els[0].innerHTML;
      } else {
        this.els.forEach(function (el) {
          el.innerHTML = string;
        });
      }
      return this;
    },

    empty: function () {
      this.html("");
      return this;
    },

    append: function (content) {
      if (content instanceof DOMNodeCollection) {
        var that = this;
        content.els.forEach(function (el) {
          that.append(el);
        });
      } else if (typeof content === "string") {
        this.els.forEach(function (el) {
          el.innerHTML += content;
        });
      } else {
        console.log(typeof content);
        this.els.forEach( function (el) {
          el.appendChild(content);
        });
      }
      return this;
    },

    attr: function(name, attribute) {
      if (typeof attribute === 'undefined'){
        var result;
        this.els.forEach( function(el) {
          if (typeof el.getAttribute(name) === 'string' ) {
            result = el.getAttribute(name);
            return;
          }
        });
        return result;
      } else {
        this.els.forEach( function(el) {
          el.setAttribute(name, attribute);
        });
        return this;
      }
    },

    addClass: function (name) {
      this.els.forEach(function (el) {
        el.className += " " + name;
        el.className = el.className.trim();
      });
      return this;
    },

    removeClass: function (name) {
      if (typeof name === "undefined") {
        this.els.forEach(function (el) {
          el.className = ""; // leaves <el class></el>
        });
      } else if (name === ".") {
        return console.log("INVALID REMOVECLASS INPUT")
      } else {
        var re = "(^|\\s)" + name + "($|\\s)";
        re = new RegExp(re, "g");
        this.els.forEach(function (el) {
          el.className = el.className.replace(re, " ");
          el.className = el.className.trim();
        });
      }
      return this;
    },

    children: function() {
      var answer = [];
      this.els.forEach( function(el) {
        answer.push(el.children);
      });
      return new DOMNodeCollection(answer);
    },

    parent: function(){
      var answer = []
      this.els.forEach( function(el) {
        answer.push(el.parentElement);
      });
      return new DOMNodeCollection(answer);
    },

    find: function(selector) {
      var answer = [];
      this.els.forEach( function(el) {
        var results = [].slice.call(el.querySelectorAll(selector));
        answer = answer.concat(results)
      });
      return new DOMNodeCollection(answer);
    },

    remove: function () {
      this.els.forEach(function (el) {
        el.parentNode.removeChild(el);
      })
      return this;
    },

    on: function (type, callback) {
      this.els.forEach(function (el) {
        el.addEventListener(type, callback);
      });
    },

    off: function (type, callback) {
      this.els.forEach(function (el) {
        el.removeEventListener(type, callback);
      });
    }
  }
})();
