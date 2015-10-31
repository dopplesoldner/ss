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

  // $scope.apiData = init.apiData;

  // temp for JSON file
  $scope.apiData = init.apiData.data['jones family project'];
  $scope.currentAuth = init.currentAuth;

  $scope.radioModel = 'Basic';
  $scope.displayed = [];
  $scope.data_pie = [];
  $scope.data_bar = [{values: []}];
  $scope.entity = '';
  $scope.radio = {model :  'Bar'};

  $scope.reviewSources = [];
  for (var key in $scope.apiData.reviewCount) {
    $scope.reviewSources.push({source: key, count: $scope.apiData.reviewCount[key]});
  }
      
  $scope.updateMode = function() {
    console.log('Clicked');
  };

  $scope.updateEntity = function() {
    console.log($scope.radio.model);
  };

  $scope.entities = [];
  for(var key in $scope.apiData.entity) {
    $scope.entities.push(key);
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

    for (var key in $scope.apiData.entity[category]) {
      var d = $scope.apiData.entity[category][key];

      for (var k2 in d) {
        $scope.rowCollection.push({
          Date: d[k2].Date,
          Text: d[k2].Text,
          Sentiment: d[k2].Sentiment,
          Url: d[k2].Url
        });
      }
    }
    $scope.$apply();
  };


  $scope.options_bar = { chart: chartConfig.barChart };
  $scope.options_pie = { chart: chartConfig.pieChart };
  // add event handler

  $scope.options_pie.chart.pie =  {   
    dispatch: {   
      elementClick: function(t){
        if($scope.radioModel === 'Basic')
          updateTable(t.data.label);
      }
    }
  };

  updateCharts();

  $timeout(function() {
    updateTable("general");
  });
  
});
