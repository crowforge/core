/*
  jquery.turbolinks.js ~ v1.0.0-rc1 ~ https://github.com/kossnocorp/jquery.turbolinks

  jQuery plugin for drop-in fix binded events problem caused by Turbolinks

  The MIT License

  Copyright (c) 2012 Sasha Koss
*/

var $, callbacks, fetch, ready, turbolinksReady;

$ = (typeof require === "function" ? require('jquery') : void 0) || window.jQuery;

callbacks = [];

ready = function() {
  var callback, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
    callback = callbacks[_i];
    _results.push(callback($));
  }
  return _results;
};

turbolinksReady = function() {
  $.isReady = true;
  return ready();
};

fetch = function() {
  $(document).off(void 0, '**');
  return $.isReady = false;
};

$(ready);

$.fn.ready = function(callback) {
  callbacks.push(callback);
  if ($.isReady) {
    return callback($);
  }
};

$.setReadyEvent = function(event) {
  return $(document).off('.turbolinks-ready').on(event + '.turbolinks-ready', turbolinksReady);
};

$.setFetchEvent = function(event) {
  return $(document).off('.turbolinks-fetch').on(event + '.turbolinks-fetch', fetch);
};

$.setReadyEvent('page:load');

$.setFetchEvent('page:fetch');