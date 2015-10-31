'use strict';

/**
 * @ngdoc function
 * @name ssApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ssApp
 */
angular.module('ssApp')
.controller('MainCtrl', function ($scope, $location, $timeout, chartConfig, init, authService, capitalizeFilter) {

  $scope.apiData = init.apiData;

  // temp for JSON file
  // $scope.apiData = init.apiData.data['jones family project'];
  $scope.currentAuth = init.currentAuth;

  $scope.btn = {
    mode: 'Basic'
  };

  $scope.$watch('btn.mode', function(){
    console.log($scope.btn.mode);
  });

  $scope.data_pie = [];
  $scope.data_bar = [{values: []}];
  $scope.data_pie_advanced = [];
  $scope.data_bar_advanced = [{values: []}];

  $scope.reviewSources = [];
  for (var key in $scope.apiData.reviewCount) {
    $scope.reviewSources.push({source: key, count: $scope.apiData.reviewCount[key]});
  }

  $scope.logout = function() {
    authService.firebaseAuth.$unauth();
    $location.path('/login');
  };

  var updateCharts = function() {
    $scope.apiData.average.forEach(function(f){
      if(f.Count > 0) {
        $scope.data_pie.push({
          // "label": capitalizeFilter(f.Name),
          "label": f.Name,
          "value": f.Count
        });
      }

      if(f.Sentiment > 0) {
        $scope.data_bar[0].values.push({
          // "label": capitalizeFilter(f.Name),
          "label": f.Name,
          "value": f.Sentiment
        });
      }
    });
  };

  //table
  var updateTable = function(category) {
    $scope.activeCategory = String(category);
    $scope.rowCollection = [];
    var activeCategory = $scope.apiData.entity[category];

    for (var key in activeCategory) {
      var d = activeCategory[key];

      for (var k2 in d) {
        $scope.rowCollection.push({
          Date: d[k2].Date,
          Text: d[k2].Text,
          Sentiment: d[k2].Sentiment,
          Url: d[k2].Url,
          Source: d[k2].Source
        });
      }
    }

    $scope.data_pie_advanced = [];
    for(var key in activeCategory) {
      $scope.data_pie_advanced.push({
        "label": key,
        "value": activeCategory[key].length
      });
    }

    $scope.$apply();
  };

  $scope.chartOptions = {
    optionsBar: angular.copy(chartConfig.barChart),
    optionsBarAdvanced: angular.copy(chartConfig.barChart),
    optionsPie: angular.copy(chartConfig.pieChart),
    optionsPieAdvanced: angular.copy(chartConfig.pieChart)
  };

  // add event handler
  $scope.chartOptions.optionsPie.chart.pie =  {   
    dispatch: {   
      elementClick: function(t){
        if($scope.btn.mode === 'Basic')
          updateTable(t.data.label);
      }
    }
  };

  updateCharts();

  $timeout(function() {
    updateTable("general");
  });
  
});
