angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicNavBarDelegate) {
    $scope.city = '深圳';
    //$ionicNavBarDelegate.align('center');
    $scope.images = [];

    $scope.loadImages = function() {
      for(var i = 0; i < 100; i++) {
        $scope.images.push({
          id: i,
          src: "http://lorempixel.com/60/60",
          age:i,
          dist:i+10
        });
      }
    }

  })

.controller('EmailsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    $scope.active_content = 'orders';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
    }

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
  .controller('EmailDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })
  .controller('ChatsCtrl', function($scope, Chats) {

    $scope.messages = [];
//从services里面取数据  Preload images in Ionic using $ImageCacheFactory
    $scope.loadMessages = function() {
      for(var i = 0; i < 20; i++) {
        $scope.messages.push({
          name: 'name:'+i,
          src: "http://lorempixel.com/60/60",
          age:i,
          lastText:i+'messages example'
        });
      }
    }

  })
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
  .controller('ProfileCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
