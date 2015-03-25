(function() {

  angular.module('shows.controller', []).controller('showsCtrl', ['$scope', '$filter', '$location', '$state', '$modal', 'general', showsCtrl]);

  function showsCtrl($scope, $filter, $location, $state, $modal, general) {
    var init, query_type;
    $scope.currentPageShows = [];
    $scope.filteredShows = [];
    $scope.searchKeywords = "";
    $scope.row = "";
    $scope.numPerPageOpt = [3, 5, 10, 20];
    $scope.numPerPage = $scope.numPerPageOpt[2];
    $scope.currentPage = 1;
    $scope.currentPageShows = [];
    $scope.newShow = {};
    $scope.next = false;

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

    // check url to see what type of data we need to query
    query_type = ($location.$$url.indexOf('showhistory') < 0) ? null : 'previous';

    general.getScheduledShows(query_type).then(function(data) {
      $scope.shows = data;
      $scope.search();
    });

    (init = function() {
        console.log("INIT");
        return $scope.search(), $scope.select($scope.currentPage);
    });

    $scope.addNewShow = function(obj) {
      console.log(obj);
      if ($scope.new_show.$valid) { return this.nextStep(true); }

      return false;
    };

    $scope.addNewPlaylist = function(obj) {
      console.log(obj);
    };

    $scope.nextStep = function(valid) {
      $scope.next = (valid) ? true : false;
    };

    $scope.open = function() {
      var modalInstance = $modal.open({
          templateUrl: 'musicInventoryModal.html',
          controller: 'showsCtrl',
          size: 'lg',
          resolve: {

          }
      });
    };

  }

})();
