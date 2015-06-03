(function() {

  angular.module('musicInventoryModal.controller', []).controller('musicInventoryModalCtrl', ['$scope', '$filter', '$modalInstance', 'general', musicInventoryModalCtrl]);

  function musicInventoryModalCtrl($scope, $filter, $modalInstance, general) {
    var init;
    $scope.currentPageMusic = [];
    $scope.filteredMusic = [];
    $scope.searchKeywords = "";
    $scope.row = "";
    $scope.numPerPageOpt = [3, 5, 10, 20];
    $scope.numPerPage = $scope.numPerPageOpt[2];
    $scope.currentPage = 1;
    $scope.currentPageMusic = [];

    // Music Inventory Modal
    $scope.selectedSongs = { song: [] };

    $scope.select = function(page) {
        var end, start;
        return start = (page - 1) * $scope.numPerPage, end = start + $scope.numPerPage, $scope.currentPageMusic = $scope.filteredMusic.slice(start, end);
    };

    $scope.search = function() {
        return $scope.filteredMusic = $filter("filter")($scope.music, $scope.searchKeywords), $scope.onFilterChange();
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
        return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredMusic = $filter("orderBy")($scope.music, rowName), $scope.onOrderChange()) : void 0;
    };

    general.getMusicInventory().then(function(data) {
      $scope.music = data;
      console.log(data);
      $scope.search();
    });

    (init = function() {
        console.log("INIT");
        return $scope.search(), $scope.select($scope.currentPage);
    });

    // Music Inventory Modal Functions
    $scope.addToPlaylist = function() {
      if($scope.selectedSongs.song.length < 0) { return false; }
      $modalInstance.close($scope.selectedSongs);
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }

})();
