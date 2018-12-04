'use strict';

describe('Weather App', function() {
  it('should redirect `index.html` to `index.html#!/', function () {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toContain('index.html#!/');
  });
  it('should create a five day forecast', function() {
    expect(element.all(by.repeater('thing in $ctrl.forecast')).count()).toEqual(5);
  });
  it('should search for chicago', function() {
    element(by.css('#showSearch')).click();
    element(by.model('result')).sendKeys('Chicago');
  })
});