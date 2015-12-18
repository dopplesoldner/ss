'use strict';

/**
 * @ngdoc function
 * @name ssApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ssApp
 */
angular.module('ssApp')
.controller('MainCtrl', function ($scope, $location, $timeout, chartConfig, init, authService) {

  $scope.apiData = init.apiData;

  // temp for JSON file
  // $scope.apiData = init.apiData.data['jones family project'];
  $scope.currentAuth = init.currentAuth;

  $scope.logout = function() {
    authService.firebaseAuth.$unauth();
    $location.path('/login');
  };

  $scope.dataPie = [];
  $scope.dataBar = [{values: []}];
  $scope.reviewSources = [];

  for (var key in $scope.apiData.reviewCount) {
    $scope.reviewSources.push({source: key, count: $scope.apiData.reviewCount[key]});
  }

  var updateCharts = function() {
    $scope.apiData.average.forEach(function(f){
      
      if(f.Sentiment > 0) {
        $scope.dataBar[0].values.push({
          "label": f.Name,
          "value": f.Sentiment
        });
      }

    });

    var distribution = {
      vp: 0, p: 0, n: 0, vn: 0
    };

    $scope.apiData.relevance.forEach(function(f){
      if(f.Sentiment > 7) {
        distribution.vp += 1; 
      } else if(f.Sentiment < 7 && f.Sentiment >= 5) {
        distribution.p += 1;
      } else if(f.Sentiment < 5 && f.Sentiment >= 3) {
        distribution.n += 1;
      } else {
         distribution.vn += 1; 
      }
    });

    for (key in distribution) {
      $scope.dataPie.push({
        "label": key,
        "value": distribution[key]
      });
    }
  };

  //table
  var updateTable = function(category) {
    $scope.activeCategory = String(category);
    $scope.activeSubCategory = '';
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
  };

  $scope.chartOptions = {
    optionsBar: angular.copy(chartConfig.multiBarChart),
    optionsPie: angular.copy(chartConfig.pieChart)
  };

  // update charts at script load
  updateCharts();

  $timeout(function() {
    updateTable("general");
  });
  
});
