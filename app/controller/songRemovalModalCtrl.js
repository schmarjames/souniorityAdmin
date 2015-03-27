(function() {

  angular.module('songRemovalModal.controller', []).controller('songRemovalModalCtrl', ['$scope', '$modalInstance', 'general', 'item', songRemovalModalCtrl]);

  function songRemovalModalCtrl($scope, $modalInstance, general, item) {
    $scope.song = item;
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
    $scope.deleteSong = function(songId) {
        general.deleteSong(songId).then(function(data) {
          $scope.music = data;
            $modalInstance.close($scope.music);
        });
    };
  }

})();
