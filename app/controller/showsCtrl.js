(function() {

  angular.module('shows.controller', []).controller('showsCtrl', ['$scope', '$filter', 'general', showsCtrl]);

  function showsCtrl($scope, $filter, general) {
    var init;
    $scope.currentPageShows = [];
    $scope.filteredShows = [];
    $scope.searchKeywords = "";
    $scope.row = "";
    $scope.numPerPageOpt = [3, 5, 10, 20];
    $scope.numPerPage = $scope.numPerPageOpt[2];
    $scope.currentPage = 1;
    $scope.currentPageShows = [];

    $scope.select = function(page) {
        var end, start;
        return start = (page - 1) * $scope.numPerPage, end = start + $scope.numPerPage, $scope.currentPageShows = $scope.filteredShows.slice(start, end);
    };

    $scope.search = function() {
        return $scope.filteredShows = $filter("filter")($scope.shows, $scope.searchKeywords), $scope.onFilterChange();
    };

    $scope.onFilterChange = function() {
        return $scope.select(1), $scope.currentPage = 1, $scope.row = "";
    };

    $scope.onNumPerPageChange = function() {
        return $scope.select(1), $scope.currentPage = 1;
    };

    $scope.onOrderChange = function() {
        return $scope.select(1), $scope.currentPage = 1;
    };

    $scope.order = function(rowName) {
        return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredShows = $filter("orderBy")($scope.shows, rowName), $scope.onOrderChange()) : void 0;
    };

    general.getScheduledShows().then(function(data) {
      $scope.shows = data;
      $scope.search();
    });

    (init = function() {
        console.log("INIT");
        return $scope.search(), $scope.select($scope.currentPage);
    });

  }

})();