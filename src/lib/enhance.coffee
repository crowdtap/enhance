helpers = require('./helpers')

Enhance = do ->
  (options) ->
    defaults =
      host:             null
      suffix:           '@2x'
      phoneBreakpoint:  480
      tabletBreakpoint: 1024
      tabletAsMobile:   false

    options = helpers.merge(defaults, options)

    isMobileDevice = ->
      mobileDevice = if options.tabletAsMobile then 'tablet' else 'phone'
      breakpoint   = options["#{mobileDevice}Breakpoint"]
      window.matchMedia?("only screen and (max-width: #{breakpoint}px)").matches

    render = (src, opts) ->
      if options.render?
        options.render?(helpers.merge({ src: src }, options, opts, {helpers: helpers}))
      else
        regexp = new RegExp(/(.jpe?g|.png|.gif|.ti?ff?)/i)
        src    = src.replace(regexp, "#{options.suffix}$1") if helpers.isHiDPI()
        helpers.joinURIComponents(options.host, src)

    exports =
      isHiDPI:        helpers.isHiDPI
      render:         render
      isMobileDevice: isMobileDevice

window?.Enhance = Enhance
module?.exports = Enhance
