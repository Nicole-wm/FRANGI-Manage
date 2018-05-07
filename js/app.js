'use strict';

angular.module('app', ['ngAnimate','ngCookies','ngResource','ngSanitize','ngTouch','ngStorage','ui.router','ui.bootstrap','ui.load','ui.jq','ui.validate','oc.lazyLoad','pascalprecht.translate']).
  filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);