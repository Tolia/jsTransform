(function( $ ){
  var css2, css3, cssTranslate, prefixTransform, typeOfNumber, vendor;

  vendor = /webkit/i.test(navigator.appVersion) ? 'webkit' : /firefox/i.test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : '';

  prefixTransform = vendor + "Transform";

  typeOfNumber = function(val) {
    return typeof val === "number";
  };

  css2 = function(x, y) {
    if (typeOfNumber(x)) {
      this.style["left"] = x + "px";
    }
    if (typeOfNumber(y)) {
      return this.style["top"] = y + "px";
    }
  };

  css3 = function(x, y) {
    var newPoz;
    newPoz = this.style[prefixTransform].match(/-?[0-9]+/gi) || [0, 0];
    if (typeOfNumber(x)) {
      newPoz[0] = x;
    }
    if (typeOfNumber(y)) {
      newPoz[1] = y;
    }
    return this.style[prefixTransform] = "translate(" + newPoz[0] + "px," + newPoz[1] + "px)";
  };

  cssTranslate = prefixTransform in document.documentElement.style ? css3 : css2;

  $.fn.animatedTranslate = function(params) {
    return this.each(function() {
      return cssTranslate.call(this, params.x, params.y);
    });
  };
})( jQuery );