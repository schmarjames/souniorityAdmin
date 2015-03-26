(function() {

  angular.module('shows.controller', []).controller('showsCtrl', ['$scope', '$filter', '$location', '$state', '$modal', 'general', showsCtrl]);

  function showsCtrl($scope, $filter, $location, $state, $modal, general) {
    var init,
        query_type,
        musicItems,
        modalOptions = {
          templateUrl: 'app/views/partials/musicinventorymodal.html',
          controller: 'musicInventoryCtrl',
          size: 'lg',
          backdrop: 'static',
          resolve: {}
        },
        historyModalOptions = {
          templateUrl: 'app/views/partials/showhistorydetails.html',
          controller: 'showsCtrl',
          size: 'lg',
          resolve: {}
        };

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
    $scope.playlistSongs = [];
    $scope.newSong = {};
    $scope.songDetails = "";

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
      if ($scope.new_show.$valid) { return this.nextStep(true); }

      return false;
    };

    $scope.addNewPlaylist = function() {
      if ($scope.playlistSongs.length < 0) { return false; }
      // store new show
      general.saveShow($scope.newShow, $scope.playlistSongs).then(function(data) {
        if(data) {
          $state.go('admin.scheduledshows');
        }
      });
    };

    $scope.nextStep = function(valid) {
      $scope.next = (valid) ? true : false;
    };

    $scope.displayShowDetails = function(showId) {
      var modalHistoryInstance;
      general.getPreviousShow(showId).then(function(data) {
        songDetails = data;
        //console.log(songDetails);
        historyModalOptions.resolve = { item: function() { return songDetails; }};
        modalHistoryInstance = $modal.open(historyModalOptions);
      });
      console.log($scope.songDetails);
      return;
    };

    $scope.openMusicInventory = function() {
      var modalInstance,
          success = function(selectedMusic) {
            //store songs into playlist table
            angular.forEach(selectedMusic.song, function(key, value) {
              if($scope.playlistSongs.indexOf(key) > -1) { return; }
              $scope.playlistSongs.push(key);
            });
          },
          error = function() { console.log("Modal dismissed at: " + new Date()); };
      // see if service gather music items
      // we only want to do this query once
      if(!musicItems) {
        general.getMusicInventory().then(function(data) {
          musicItems = data;
          modalOptions.resolve = { item: function() { return musicItems; }};
          modalInstance = $modal.open(modalOptions);
          modalInstance.result.then(success, error);
        });
        return;
      }
      modalOptions.resolve = { item: function() { return musicItems; }};
      modalInstance = $modal.open(modalOptions);
      modalInstance.result.then(success, error);
      return;
    };

    $scope.removeFromList = function(songId){
      angular.forEach($scope.playlistSongs, function(key, value) {
        if (key.id == songId) {
          $scope.playlistSongs.splice(value, 1);
        }
      });
    };

    $scope.addNewSong = function(song) {
      console.log(song);
      $scope.newSong = null;
      $scope.playlistSongs.push(song);
    };
  }

})();
