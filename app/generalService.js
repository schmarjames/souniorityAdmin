(function() {

  angular.module('general.service', []).factory('general', ['$http', '$q', '$timeout', general]);

  function general($http, $q, $timeout) {
    var factory = {
          getScheduledShows : getScheduledShows,
          getMusicInventory : getMusicInventory
        },
        shows = [
          { name: "Babylon Lounge", playlist_size: 12, date: "3/27/15", time: "9pm - 12am", location: "Chicago, IL, USA"},
          { name: "Vista Bar and Grill", playlist_size: 26, date: "4/7/15", time: "11pm - 3am", location: "Charlote, NC, USA"},
          { name: "Amway Center", playlist_size: 18, date: "4/10/15", time: "7pm - 12am", location: "Orlando, FL, USA"}
        ],
        previous_shows = [
          { name: "Babylon Lounge", playlist_size: 12, date: "2/27/15", time: "9pm - 12am", location: "Chicago, IL, USA"},
          { name: "Vista Bar and Grill", playlist_size: 26, date: "2/7/15", time: "11pm - 3am", location: "Charlote, NC, USA"},
          { name: "Amway Center", playlist_size: 18, date: "1/10/15", time: "7pm - 12am", location: "Orlando, FL, USA"}
        ],
        music_inventory = [
          { name: "Easier To Hide", artist: "Maya Jane Cole" },
          { name: "Follow You", artist: "Yogi" },
          { name: "What They Say", artist: "Maya Jane Cole" },
          { name: "2014 Mix", artist: "Owen Royal" },
          { name: "Triton", artist: "Seven Lions" }
        ],
        music_media_library = [
          { name: "Easier To Hide", artist: "Maya Jane Cole" },
          { name: "Follow You", artist: "Yogi" },
          { name: "What They Say", artist: "Maya Jane Cole" },
          { name: "2014 Mix", artist: "Owen Royal" },
          { name: "Triton", artist: "Seven Lions" }
        ];

    return factory;

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
  }

})();
