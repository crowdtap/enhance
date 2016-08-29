helpers =
  joinURIComponents: (rawComponents...) =>
    leadingSlashes = rawComponents[0]?.match(/^[\/]{1,2}/) || ''
    components = []
    rawComponents.forEach (rawComponent) ->
      if rawComponent?
        components = components.concat(helpers.trim(rawComponent, '/').split(/\/(?!\/)/))

    leadingSlashes + components.join('/')

  trim: (string, characters) ->
    characters ?= '\\s'
    regexp = new RegExp("^[#{characters}]+|[#{characters}]+$", 'g')
    string.replace(regexp, '')

  merge: (objs...) ->
    target = {}

    for obj in objs
      for k, v of obj
        target[k] = v

    target

  isHiDPI: (ratio) ->
    ratio ?= 1.3
    query = "only screen and (-moz-min-device-pixel-ratio: #{ratio}), \
      only screen and (-o-min-device-pixel-ratio: #{ratio*2}/2), \
      only screen and (-webkit-min-device-pixel-ratio: #{ratio}), \
      only screen and (min-device-pixel-ratio: #{ratio}), \
      only screen and (min-resolution: #{ratio}dppx)"

    !!(window.devicePixelRatio > ratio || window.matchMedia?(query).matches)

module.exports = helpers
