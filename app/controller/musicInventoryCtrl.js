(function() {

  angular.module('musicInventory.controller', []).controller('musicInventoryCtrl', ['$scope', '$filter', '$modal', 'general', musicInventoryCtrl]);

  function musicInventoryCtrl($scope, $filter, $modal, general) {
    var init,
        removeSongModalOptions = {
          templateUrl: 'app/views/partials/removesongmodal.html',
          controller: 'songRemovalModalCtrl',
          size: 'lg',
          backdrop: 'static',
          resolve: {}
        };
    $scope.currentPageMusic = [];
    $scope.filteredMusic = [];
    $scope.searchKeywords = "";
    $scope.row = "";
    $scope.numPerPageOpt = [3, 5, 10, 20];
    $scope.numPerPage = $scope.numPerPageOpt[2];
    $scope.currentPage = 1;
    $scope.currentPageMusic = [];

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
      $scope.search();
    });

    (init = function() {
        console.log("INIT");
        return $scope.search(), $scope.select($scope.currentPage);
    });

    $scope.removeSong = function(song) {
      removeSongModalOptions.resolve = { item: function() { return song; }};
      modalInstance = $modal.open(removeSongModalOptions);
      modalInstance.result.then(function(music) {
        $scope.music = music;
        $scope.search();
      }, function() {});
    };

    $scope.addNewSong = function() {
      if ($scope.playlistSongs.length < 0) { return false; }
      // store new show
      general.addSongToInventory($scope.newSong).then(function(data) {
        if(data) {
          $state.go('admin.scheduledshows');
        }
      });
    };
  }

})();
