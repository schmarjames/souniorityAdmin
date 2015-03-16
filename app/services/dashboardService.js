(function(){

  angular.module('dashboard.service', ['$http', '$q']).factory('dashboard', dashboard);

  function dashboard($http, $q) {

    //var url; dashboard service url
    var admin = {},
        songs = [
          { name: "Money", artist: "Michael Jackson", request_amount: 4 },
          { name: "What They Say", artist: "Maya Jane Cole", request_amount: 12 },
          { name: "Look Around You" artist: "Chopsticks", request_amount: 8 }
        ],
        event_data = {},
        guest_data = {};

    admin.getMusicData = function(){}

    admin.getEventHistoryData = function(){}

    admin.getHighestTipsData = function(){}

    return admin;
  }

})();
