(function( $ ){

  var Css3PositionController, OldCssPosition, prefixTransform, vendor, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  vendor = /webkit/i.test(navigator.appVersion) ? 'webkit' : /firefox/i.test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : '';

  prefixTransform = vendor + "Transform";

  Css3PositionController = (function() {
    function Css3PositionController(el) {
      this.el = el;
    }

    Css3PositionController.prototype.moveTo = function(x, y) {
      var position;
      position = this.getPosition();
      if (typeof x === "number") {
        position.x = x;
      }
      if (typeof y === "number") {
        position.y = y;
      }
      return this.setPosition(position.x, position.y);
    };

    Css3PositionController.prototype.moveOn = function(x, y) {
      var position;
      position = this.getPosition();
      if (typeof x === "number") {
        position.x = position.x + x;
      }
      if (typeof y === "number") {
        position.y = position.y + y;
      }
      return this.setPosition(position.x, position.y);
    };

    Css3PositionController.prototype.getPosition = function() {
      var position, transform;
      transform = this.el.style[prefixTransform];
      position = !!transform ? transform.match(/-?[0-9.0-9]+/gi) : [0, 0];
      return {
        x: parseInt(position[0]),
        y: parseInt(position[1])
      };
    };

    Css3PositionController.prototype.setPosition = function(x, y) {
      return this.el.style[prefixTransform] = "translate(" + position.x + "px," + position.y + "px)";
    };

    return Css3PositionController;

  })();

  OldCssPosition = (function(_super) {
    var getPosition, setPosition;

    __extends(OldCssPosition, _super);

    function OldCssPosition() {
      _ref = OldCssPosition.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    getPosition = function() {
      return {
        x: parseInt(this.el.style["left"]),
        y: parseInt(this.el.style["top"])
      };
    };

    setPosition = function(x, y) {
      if (typeOfNumber(x)) {
        this.el.style["left"] = x + "px";
      }
      if (typeOfNumber(y)) {
        return this.el.style["top"] = y + "px";
      }
    };

    return OldCssPosition;

  })(Css3Position);

  jQuery.fn.animatedTranslate = function(params) {
    var controllPosition;
    controllPosition = this.data("controllPosition");
    if (!controllPosition) {
      controllPosition = transformWork ? new Css3Position(this[0]) : new OldCssPosition(this[0]);
      this.data("controllPosition", controllPosition);
    }
    if (params["add"]) {
      return controllPosition.moveOn(params.x, params.y);
    } else {
      return controllPosition.moveTo(params.x, params.y);
    }
  };

})( jQuery );