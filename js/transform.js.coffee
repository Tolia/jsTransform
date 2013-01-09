vendor =  if (/webkit/i).test(navigator.appVersion) then 'webkit' else 
            if (/firefox/i).test(navigator.userAgent) then 'Moz' else 
              if 'opera' of window then 'O' else ''

prefixTransform = vendor + "Transform"
typeOfNumber = (val) -> typeof(val) == "number"
css2 = (x,y) ->
  @style["left"] = x + "px" if typeOfNumber(x)
  @style["top"] = y + "px" if typeOfNumber(y)
css3 = (x,y) ->
  newPoz = @style[prefixTransform].match(/-?[0-9]+/gi) || [0,0]
  newPoz[0] = x if typeOfNumber(x)
  newPoz[1] = y if typeOfNumber(y)
  @style[prefixTransform] = "translate(#{newPoz[0]}px,#{newPoz[1]}px)"
cssTranslate = if prefixTransform of document.documentElement.style then css3 else css2

$.fn.animatedTranslate = (params) ->
  @.each ->
    cssTranslate.call @, params.x, params.y

