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
      chart: {
        type: 'pieChart',
        height: 350,
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
          return d3.format('03d')(d);
        },
        transitionDuration: 500,
        labelSunbeamLayout: true,
        deepWatchData: true
      }
    },
    barChart : {
      chart: {
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
    },
    multiBarChart: {
      chart: {
        type: 'multiBarChart',
        height: 250,
        margin : {
          top: 20,
          right: 20,
          bottom: 60,
          left: 60
        },
        yAxis: {
          axisLabel: 'Number of reviews'
        },
        xAxis: {
          rotateLabels: -45
        },
        //staggerLabels: true,
        reduceXTicks: false,
        showControls: false,
        stacked: true,
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
      }
    }
  };

  // Public API here
  return {
    chartConfig: charts
  };
});
