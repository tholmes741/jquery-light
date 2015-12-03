(function () {

  var $l = window.$l = function (selector) {
    if (selector instanceof HTMLElement) {
      var selection = [selector];
    } else {
      var selection = [].slice.call(document.querySelectorAll(selector));
    }
    return new DOMNodeCollection(selection);
  };

  function DOMNodeCollection(elArray) {
    this.els = elArray;
  }

  DOMNodeCollection.prototype = {
    html: function (string) {
      if (string === undefined) {
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
      this.els.forEach( function(el) {
        el.setAttribute(name, attribute);
      });
    },

    addClass: function (name) {
      this.els.forEach(function (el) {
        el.className += " " + name;
        if (el.className[0] === " ") {
          el.className = el.className.substring(1);
        }
      });
    }
  }

})();
