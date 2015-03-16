(function() {

  angular.module('dashboard.controller', []).controller('dashbardCtrl', ["$scope", 'dashboard', dashbardCtrl]);

  function dashbardCtrl($scope, dashboard) {
    console.log(dashboard);

    function displayMusicStats() {
      // get music data from dashboard service

      // Display pie chart of music stats
      return $scope.chartjsPie = [{
        value: 300,
        color:"#383d43",
        highlight: "#383d43",
        label: "Blue"
      },
      {
          value: 50,
          color: "#db5031",
          highlight: "#db5031",
          label: "Orange"
      },
      {
          value: 100,
          color: "#c1bfc0",
          highlight: "#c1bfc0",
          label: "Gray"
      }];
    }

    function displayEventHistory() {
      // get data from dashboard service

    }

    function displayTipStats() {
      // get data from dashboard service
    }



  }

})();
