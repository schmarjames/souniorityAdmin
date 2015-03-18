(function() {

  angular.module('general.service', []).factory('general', ['$http', '$q', '$timeout', general]);

  function general($http, $q, $timeout) {
    var factory = {
          getScheduledShows : getScheduledShows
        },
        shows = [
          { name: "Babylon Lounge", playlist_size: 12, date: "3/27/15", time: "9pm - 12am", location: "Chicago, IL, USA"},
          { name: "Vista Bar and Grill", playlist_size: 26, date: "4/7/15", time: "11pm - 3am", location: "Charlote, NC, USA"},
          { name: "Amway Center", playlist_size: 18, date: "4/10/15", time: "7pm - 12am", location: "Orlando, FL, USA"}
        ],
        previous_shows = [];

    return factory;

    function getScheduledShows() {
      // queue show data
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve(shows);
      }, 500);

      return deferred.promise;
    }
    
    function getPreviousShows() {}
  }

})();
