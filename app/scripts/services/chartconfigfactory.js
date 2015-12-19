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
        height: 180,
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: false,
        valueFormat: function(d){
          return d3.format('03d')(d);
        },
        margin : {
          top: 10,
          right: 20,
          bottom: 10,
          left: 20
        },
        showLegend: false,
        donut: true,
        donutRatio: 0.35,
        showLabels: false,
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
    },
    scatter: {
      chart: {
        type: 'scatterChart',
        height: 250,
        color: d3.scale.category10().range(),
        scatter: {
          onlyCircles: true
        },
        margin : {
          top: 50,
          right: 50,
          bottom: 50,
          left: 80
        },
        pointRange: ([100, 5000]),
        showControls: false,
        showLegend: false,
        showDistX: false,
        showDistY: false,
        showXAxis: false,
        tooltipContent: function(key) {

          return `<h3><span style=&quot;font-size: 15.6px; line-height: 24.96px;&quot;>${key.series[0].key}</span></h3>

          <div style=&quot;background:#eee;border:1px solid #ccc;padding:5px 10px;&quot;><small><span style=&quot;font-size: 15.6px; line-height: 24.96px;&quot;>Average Sentiment: ${key.series[0].value}</span><br />
          <span style=&quot;font-size: 15.6px; line-height: 24.96px;&quot;>Numer of Reviews: ${key.point.size} </span></small></div>`;
        },
        duration: 350,
        
        yAxis: {
          axisLabel: 'Average Sentiment',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
        },
        zoom: {
        //NOTE: All attributes below are optional
          enabled: false,
          scaleExtent: [5, 100],
          unzoomEventType: 'dblclick.zoom'
        }
      }
    }
  };

  // Public API here
  return {
    chartConfig: charts
  };
});
