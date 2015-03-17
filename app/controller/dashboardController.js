(function() {

  angular.module('dashboard.controller', []).controller('dashbardCtrl', ["$scope", 'dashboard', dashbardCtrl]);

  function dashbardCtrl($scope, dashboard) {

    var pieColors = ["#383d43", "#db5031", "#c1bfc0"];

    $scope.chartjsPie = [];

      dashboard.getMusicData().then(function(data) {
        chartData = [];
        i = 0;
        angular.forEach(data, function(value, key) {
          obj = {
            value: value.request_amount,
            color: pieColors[i],
            highlight: pieColors[i],
            label: value.name
          };
          chartData.push(obj);
          i++;
        });

        $scope.chartjsPie = chartData;
        console.log($scope.chartjsPie);

        //return $scope.chartjsPie;
      });

    function displayEventHistory() {
      // get data from dashboard service

    }

    function displayTipStats() {
      // get data from dashboard service
    }



  }

})();
