'use strict';

describe('directionService', function() {
  var directionService;

  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  beforeEach(module('core.direction'));

  beforeEach(inject(function(_directionService_){
    directionService = _directionService_;
  }));

  it('should set the wind direction to N if fed 0', function() {
    var direction = 0;
    var degToCompass = directionService.degToCompass(direction);

    expect(degToCompass).toEqual('N');
  })
});
