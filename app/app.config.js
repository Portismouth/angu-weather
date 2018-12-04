'use strict';

angular.module('weatherApp').config([
  '$routeProvider',
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<current-weather></current-weather>'
      })
      .when('/forecast', {
        template: '<forecast></forecast>'
      })
      .otherwise('/');
  }
]);
