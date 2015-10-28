'use strict';

describe('Service: chartConfigFactory', function () {

  // load the service's module
  beforeEach(module('ssApp'));

  // instantiate service
  var chartConfigFactory;
  beforeEach(inject(function (_chartConfigFactory_) {
    chartConfigFactory = _chartConfigFactory_;
  }));

  it('should do something', function () {
    expect(!!chartConfigFactory).toBe(true);
  });

});
