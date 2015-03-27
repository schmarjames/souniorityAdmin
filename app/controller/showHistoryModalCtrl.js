(function() {

  angular.module('showHistoryModal.controller', []).controller('showHistoryModalCtrl', ['$scope', '$modalInstance', 'general', 'item', showHistoryModalCtrl]);

  function showHistoryModalCtrl($scope, $modalInstance, general, item) {
    console.log(item);
  }

})();
