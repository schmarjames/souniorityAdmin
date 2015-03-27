(function() {

  angular.module('showRemovalModal.controller', []).controller('showRemovalModalCtrl', ['$scope', '$modalInstance', 'general', 'item', showRemovalModalCtrl]);

  function showRemovalModalCtrl($scope, $modalInstance, general, item) {
    $scope.show = item;
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
    $scope.deleteShow = function(showId) {
        general.deleteShow(showId).then(function(data) {
          $scope.shows = data;
            $modalInstance.close($scope.shows);
        });
    };
  }

})();
