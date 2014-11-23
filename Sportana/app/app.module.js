var module = angular.module('kendo.directives', []);
var parse, timeout, compile, log;

// The following disables AngularJS built-in directives for <input> fields
// when a Kendo widget is defined.  The reason we have to do this is:
//
// 1. user updates field.
//
// 2. widget triggers "change" event on the Widget object => angular-kendo
//    gets notified, updates the model with the correct value!
//
// 3. widget triggers "change" event on the <input> field => AngularJS's
//    built-in directive validates the *content* of the input field and
//    updates the model again WITH THE WRONG VALUE.
//
// https://github.com/kendo-labs/angular-kendo/issues/135
// https://github.com/kendo-labs/angular-kendo/issues/152
module.config([ "$provide", function($provide){
  $provide.decorator("inputDirective", [ "$delegate", function($delegate){
    var orig_compile = $delegate[0].compile;
    $delegate[0].compile = function(element, attrs) {
      for (var i in attrs) {
        if (attrs.hasOwnProperty(i)) {
          if (/^kendo/.test(i) && typeof $.fn[i] == "function") {
            return;           // HA!
          }
        }
      }
      return orig_compile.apply(this, arguments);
    };
    return $delegate;
  }]);
}]);


var app = angular.module('app',['ui.bootstrap','ngRoute','ui.router', 'ngCookies', 'kendo.directives']);
