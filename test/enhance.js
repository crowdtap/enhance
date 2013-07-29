// Generated by CoffeeScript 1.6.3
(function() {
  var Enhance, expect, fs, jsdom;

  expect = require('expect.js');

  fs = require('fs');

  jsdom = require('jsdom');

  Enhance = require('../lib/enhance');

  describe('Enhance', function() {
    var setNonRetina, setRetina;
    setRetina = function() {
      return window.devicePixelRatio = 2.0;
    };
    setNonRetina = function() {
      return window.devicePixelRatio = 1.0;
    };
    beforeEach(function() {
      window = jsdom.createWindow();
      return window.matchMedia = function() { return { matches: false } };
    });
    describe('init', function() {
      describe('suffix option', function() {
        return it('appends the given suffix for retina devices', function(done) {
          setRetina();
          expect(Enhance({
            suffix: '_2x'
          }).render('image.png')).to.be('image_2x.png');
          return done();
        });
      });
      describe('host option', function() {
        it('prepends the given host for non-retina devices', function(done) {
          var enhance;
          setNonRetina();
          enhance = Enhance({
            host: 'http://example.com'
          }).render('image.png');
          expect(enhance).to.be('http://example.com/image.png');
          return done();
        });
        return it('prepends the given host for retina devices', function(done) {
          var enhance;
          setRetina();
          enhance = Enhance({
            host: 'http://example.com'
          }).render('image.png');
          expect(enhance).to.be('http://example.com/image@2x.png');
          return done();
        });
      });
      return describe('render callback', function() {
        it('calls the passed render callback instead of the default', function(done) {
          var enhance;
          enhance = Enhance({
            render: function(properties) {
              return "awesome";
            }
          }).render('image.png');
          expect(enhance).to.be('awesome');
          return done();
        });
        return describe('the callback enhance object', function(done) {
          it('has the src filename being rendered', function(done) {
            var initOpts;
            initOpts = {
              render: function(enhance) {
                expect(enhance.src).to.be('image.png');
                return done();
              }
            };
            return Enhance(initOpts).render('image.png');
          });
          it('has any enhance passed in at initialization', function(done) {
            var initOpts;
            initOpts = {
              render: function(enhance) {
                expect(enhance.host).to.be('http://example.com');
                expect(enhance.suffix).to.be('_2x');
                return done();
              },
              host: 'http://example.com',
              suffix: '_2x'
            };
            return Enhance(initOpts).render('image.png');
          });
          it('has any properties passed in on call to render', function(done) {
            var initOpts;
            initOpts = {
              render: function(enhance) {
                expect(enhance.width).to.be(50);
                expect(enhance.height).to.be(100);
                return done();
              }
            };
            return Enhance(initOpts).render('image.png', {
              width: 50,
              height: 100
            });
          });
          return it('has helper methods available', function(done) {
            var initOpts;
            initOpts = {
              render: function(enhance) {
                expect(enhance._).to.be.a('function');
                expect(enhance.isHiDPI).to.be.a('function');
                expect(enhance.prependHost).to.be.a('function');
                return done();
              }
            };
            return Enhance(initOpts).render('image.png');
          });
        });
      });
    });
    describe('#isHiDPI', function() {
      it('returns true if devicePixelRatio greater than 1.3 by default', function(done) {
        setRetina();
        expect(Enhance().isHiDPI()).to.be(true);
        return done();
      });
      it('return true if matchMedia has matches on the media query', function(done) {
        setNonRetina();
        window.matchMedia = function() { return { matches: true } };
        expect(Enhance().isHiDPI()).to.be(true);
        return done();
      });
      it('returns false if neither devicePixelRatio nor matchMedia test passes', function(done) {
        window.devicePixelRatio = 1.0;
        window.matchMedia = undefined;
        expect(Enhance().isHiDPI()).to.be(false);
        return done();
      });
      return it('accepts an optional ratio parameter', function(done) {
        window.devicePixelRatio = 1.5;
        expect(Enhance().isHiDPI(1.0)).to.be(true);
        expect(Enhance().isHiDPI(2.0)).to.be(false);
        return done();
      });
    });
    return describe('#render', function() {
      return describe('default Apple Retina naming convention', function() {
        it('returns the original filename for non-retina devices', function(done) {
          expect(Enhance().render('image.png')).to.be('image.png');
          return done();
        });
        return it('returns a suffixed filename for retina devices', function(done) {
          setRetina();
          expect(Enhance().render('image.png')).to.be('image@2x.png');
          return done();
        });
      });
    });
  });

}).call(this);
