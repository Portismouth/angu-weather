'use strict';

describe('currentWeather', function() {
  beforeEach(module('currentWeather'));

  describe('CurrentWeatherController', function() {
    var $httpBackend, ctrl, $rootScope;
    
    beforeEach(inject(function($componentController, $injector, _$rootScope_) {
      $httpBackend = $injector.get('$httpBackend');
      ctrl = $componentController('currentWeather');
      $rootScope = _$rootScope_;
    }));

    it('should create a variable for weather API key', function() {
      expect(ctrl.weatherApiKey).toBe('6b34e22a9232515d101279d760ce8799');
    });

    it('should set a default locationProp', function() {
      expect(ctrl.defaultLocation).toBe(60661);
    });


  });
});
