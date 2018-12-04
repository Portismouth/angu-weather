'use strict';

angular.
  module('core.direction').
  factory('directionService', function() {
    return {
      degToCompass: function(num) {
        var directions = [
          'N',
          'NNE',
          'NE',
          'ENE',
          'E',
          'ESE',
          'SE',
          'SSE',
          'S',
          'SSW',
          'SW',
          'WSW',
          'W',
          'WNW',
          'NW',
          'NNW'
        ];
        var val = parseInt(num / 22.5 + 0.5);
        return directions[val % 16];
      }
    }
  });