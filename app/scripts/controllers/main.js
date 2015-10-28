'use strict';

/**
 * @ngdoc function
 * @name ssApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ssApp
 */
angular.module('ssApp')
.controller('MainCtrl', function ($scope, $location, chartConfig, init, authService) {

  $scope.apiData = init.apiData;
  $scope.currentAuth = init.currentAuth;

  $scope.showTable = false;
  $scope.displayed = [];
  $scope.data_pie = [];
  $scope.data_bar = [{values: []}];

  $scope.apiData.average.forEach(function(f){
    if(f.Count > 0) {
      $scope.data_pie.push({
        "label": f.Name,
        "value": f.Count
      });
    }

    if(f.Sentiment > 0) {
      $scope.data_bar[0].values.push({
        "label": f.Name,
        "value": f.Sentiment
      });
    }

  });

  $scope.options_bar = { chart: chartConfig.barChart };
  $scope.options_pie = { chart: chartConfig.pieChart };
  // add event handler

  $scope.options_pie.chart.pie =  {   
    dispatch: {   
      elementClick: function(t){
        updateTable(t.data.label);
      }
    }
  };

  $scope.options_bar.chart.multiBar =  {   
    dispatch: {   
      elementClick: function(t){
        updateTable(t.data.label);
      }
    }
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
    $scope.showTable = true;
    $scope.$apply();
  };

  $scope.logout = function() {
    authService.firebaseAuth.$unauth();
    $location.path('/login');
  };
});
