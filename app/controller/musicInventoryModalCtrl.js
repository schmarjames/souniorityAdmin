(function() {

  angular.module('musicInventoryModalCtrl.controller', []).controller('musicInventoryCtrl', ['$scope', '$modalInstance', 'checklist-model', 'songs', musicInventoryCtrl]);

  function musicInventoryCtrl($scope, $modalInstance, songs) {
    console.log($scope.musicItems);
    console.log(checklist-model);
  }

})();
