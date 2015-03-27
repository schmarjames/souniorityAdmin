(function() {

  angular.module('general.service', []).factory('general', ['$http', '$q', '$timeout', general]);

  function general($http, $q, $timeout) {
    var factory = {
          getScheduledShows : getScheduledShows,
          getPreviousShow : getPreviousShow,
          getMusicInventory : getMusicInventory,
          saveShow : saveShow,
          deleteShow : deleteShow,
          deleteSong : deleteSong
        },
        shows = [
          { id: 0, name: "Babylon Lounge", playlist_size: 12, date: "3/27/15", time: "9pm - 12am", location: "Chicago, IL, USA"},
          { id: 1, name: "Vista Bar and Grill", playlist_size: 26, date: "4/7/15", time: "11pm - 3am", location: "Charlote, NC, USA"},
          { is: 2, name: "Amway Center", playlist_size: 18, date: "4/10/15", time: "7pm - 12am", location: "Orlando, FL, USA"}
        ],
        previous_shows = [
          { id: 0, name: "Babylon Lounge", playlist_size: 12, date: "2/27/15", time: "9pm - 12am", location: "Chicago, IL, USA"},
          { id: 1, name: "Vista Bar and Grill", playlist_size: 26, date: "2/7/15", time: "11pm - 3am", location: "Charlote, NC, USA"},
          { id: 2, name: "Amway Center", playlist_size: 18, date: "1/10/15", time: "7pm - 12am", location: "Orlando, FL, USA"}
        ],
        music_inventory = [
          { id: 0, name: "Easier To Hide", artist: "Maya Jane Cole" },
          { id: 1, name: "Follow You", artist: "Yogi" },
          { id: 2, name: "What They Say", artist: "Maya Jane Cole" },
          { id: 3, name: "2014 Mix", artist: "Owen Royal" },
          { id: 4, name: "Triton", artist: "Seven Lions" },
          { id: 5, name: "Easier To Hide", artist: "Maya Jane Cole" },
          { id: 6, name: "Follow You", artist: "Yogi" },
          { id: 7, name: "What They Say", artist: "Maya Jane Cole" },
          { id: 8, name: "2014 Mix", artist: "Owen Royal" },
          { id: 9, name: "Triton", artist: "Seven Lions" },
          { id: 10, name: "Easier To Hide", artist: "Maya Jane Cole" },
          { id: 11, name: "Follow You", artist: "Yogi" },
          { id: 12, name: "What They Say", artist: "Maya Jane Cole" },
          { id: 13, name: "2014 Mix", artist: "Owen Royal" },
          { id: 14, name: "Triton", artist: "Seven Lions" }
        ],
        music_media_library = [
          { name: "Easier To Hide", artist: "Maya Jane Cole" },
          { name: "Follow You", artist: "Yogi" },
          { name: "What They Say", artist: "Maya Jane Cole" },
          { name: "2014 Mix", artist: "Owen Royal" },
          { name: "Triton", artist: "Seven Lions" }
        ];

    return factory;

    /*
     * Table query methods
     */
    function getScheduledShows(type) {
      // queue show data
      var deferred = $q.defer(),
          q_type = type || null;

      $timeout(function() {
        if(type == 'previous') {
          deferred.resolve(previous_shows);
        } else {
          deferred.resolve(shows);
        }

      }, 500);

      return deferred.promise;
    }

    function getPreviousShow(id) {
      var deferred = $q.defer(),
          song;

      angular.forEach(previous_shows, function(key, value) {
        if(key.id == id) { song = key; return; }
      });

      $timeout(function() {
        deferred.resolve(song);
      });
      return deferred.promise;
    }

    function getMusicInventory() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve(music_inventory);
      }, 500);

      return deferred.promise;
    }

    function getMusicMediaLibrary() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve(music_media_library);
      }, 500);

      return deferred.promise;
    }

    /*
     * Form post / get methods
     */

     function addSongToInventory(songObj) {
       var deferred = $q.defer();
       $timeout(function() {
         deferred.resolve(true);
       }, 500);

       return deferred.promise;
     }

     function saveShow(showObj, playlistObj) {
       var deferred = $q.defer();
       $timeout(function() {
         deferred.resolve(true);
       }, 500);

       return deferred.promise;
     }

     function deleteShow(showId) {
       var deferred = $q.defer();

       angular.forEach(shows, function(key, value) {
         if (key.id == showId) {
           shows.splice(value, 1);
         }
       });

       $timeout(function() {
         deferred.resolve(shows);
       });

       return deferred.promise;
     }

     function deleteSong(songId) {
       var deferred = $q.defer();

       angular.forEach(music_inventory, function(key, value) {
         if (key.id == songId) {
           music_inventory.splice(value, 1);
         }
       });

       $timeout(function() {
         deferred.resolve(music_inventory);
       });

       return deferred.promise;
     }
  }

})();
