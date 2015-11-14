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

  $scope.dataPie = [];
  $scope.dataBar = [{values: []}];
  $scope.dataPie_advanced = [];
  $scope.dataMultiBar = []; 

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
        $scope.dataPie.push({
          "label": f.Name,
          "value": f.Count
        });
      }

      if(f.Sentiment > 0) {
        $scope.dataBar[0].values.push({
          "label": f.Name,
          "value": f.Sentiment
        });
      }
    });

    var positives = {};
    var negatives = {};

    //calculation of positive and negative per named entity
    $scope.apiData.relevance.forEach(function(f){
      if(f.NamedEntity.split("|").length > 1) return;

      if (!(f.NamedEntity in positives)) {
        positives[f.NamedEntity] = 0;
      }
      if (!(f.NamedEntity in negatives)) {
        negatives[f.NamedEntity] = 0;
      }

      if(f.Sentiment < 5.0) {
        negatives[f.NamedEntity] += 1;
      } else {
        positives[f.NamedEntity] += 1;
      }
    });  

    var pos = [];
    var neg = [];

    for(var key in positives) {
      pos.push({
        "label": key,
        "value": positives[key]
      });
    }
    for(var key in negatives) {
      neg.push({
        "label": key,
        "value": negatives[key]
      });
    }

    $scope.dataMultiBar.push({key: "positives", values: pos});
    $scope.dataMultiBar.push({key: "negatives", values: neg});
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

    $scope.dataPie_advanced = [];
    for(var key in activeCategory) {
      $scope.dataPie_advanced.push({
        "label": key,
        "value": activeCategory[key].length
      });
    }

    $scope.$apply();
  };

  $scope.chartOptions = {
    optionsMultiBar: angular.copy(chartConfig.multiBarChart),
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
