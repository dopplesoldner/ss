'use strict';

/**
 * @ngdoc service
 * @name ssApp.chartConfigFactory
 * @description
 * # chartConfigFactory
 * Factory in the ssApp.
 */
angular.module('ssApp')
.factory('chartConfigFactory', function () {

  var charts = {
    pieChart : {
      type: 'pieChart',
      height: 350,
      x: function(d){ return d.label; },
      y: function(d){ return d.value; },
      showValues: true,
      valueFormat: function(d){
        return d3.format('03d')(d);
      },
      transitionDuration: 500,
      labelSunbeamLayout: true
    },
    barChart : {
      type: 'multiBarHorizontalChart',
      height: 250,
      x: function(d){ return d.label; },
      y: function(d){ return d.value; },
      showValues: true,
      showControls: false,
      showLegend: false,
      valueFormat: function(d){
        return d3.format(',.2f')(d);
      },
      transitionDuration: 500,
    }
  };

  // Public API here
  return {
    chartConfig: charts
  };
});
