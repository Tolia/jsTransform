vendor =  if (/webkit/i).test(navigator.appVersion) then 'webkit' else 
            if (/firefox/i).test(navigator.userAgent) then 'Moz' else 
              if 'opera' of window then 'O' else ''

prefixTransform = vendor + "Transform"

class Css3PositionController
  constructor: (@el) ->
  moveTo: (x,y) ->
    position = @getPosition()
    position.x = x if typeof(x) == "number"
    position.y = y if typeof(y) == "number"
    @setPosition position.x, position.y
  moveOn: (x,y) ->
    position = @getPosition()
    position.x = position.x + x if typeof(x) == "number"
    position.y = position.y + y if typeof(y) == "number"
    @setPosition position.x, position.y
  getPosition: ->
    transform = @el.style[prefixTransform]
    position = if !!transform then transform.match(/-?[0-9.0-9]+/gi) else [0,0]
    return {
      x: parseInt position[0]
      y: parseInt position[1]
    } 
  setPosition: (x,y) ->
    @el.style[prefixTransform] = "translate(#{position.x}px,#{position.y}px)"

class OldCssPosition extends Css3Position
  getPosition = ->
    x: parseInt @el.style["left"]
    y: parseInt @el.style["top"]
  setPosition = (x,y) ->
    @el.style["left"] = x + "px" if typeOfNumber(x)
    @el.style["top"] = y + "px" if typeOfNumber(y)

jQuery.fn.animatedTranslate = (params) ->
  controllPosition = @data "controllPosition"
  
  if !controllPosition
    controllPosition = if transformWork then new Css3Position @[0] else new OldCssPosition @[0]
    @data "controllPosition", controllPosition
  
  if params["add"]
    controllPosition.moveOn params.x, params.y
  else
    controllPosition.moveTo params.x, params.y
