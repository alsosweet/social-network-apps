angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicNavBarDelegate,TwittSrv) {
    $scope.city = '深圳';
    //$ionicNavBarDelegate.align('center');
    TwittSrv.getTwitts().then(function(twitts){
      $scope.twitts = twitts;
    });

    $scope.doRefresh = function(){
      TwittSrv.getNewTwitts().then(function(newTwitts){
        $scope.twitts = newTwitts.concat($scope.twitts);
      }).finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.loadMore = function(){
      TwittSrv.getMoreTwitts().then(function(olderTwitts){
        $scope.twitts = $scope.twitts.concat(olderTwitts);
      }).finally(function() {
        // Stop the ion-infinite-scroll from spinning
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

  })

.controller('EmailsCtrl', function($scope, Chats) {
    $scope.active_content = 'orders';
    $scope.setActiveContent = function(active_content){
      $scope.active_content = active_content;
    }
    $scope.sendback = function(index){
      alert(index);
    }
    $scope.emails = [];
//从services里面取数据  Preload images in Ionic using $ImageCacheFactory
    $scope.loadEmails = function() {
      for(var i = 0; i < 30; i++) {
        $scope.emails.push({
          name: 'name:'+i,
          src: "http://lorempixel.com/60/60",
          age:i,
          id:i,
          lastText:i+'messages example'
        });
      }
    }

    $scope.sendemails = [];
//从services里面取数据  Preload images in Ionic using $ImageCacheFactory
    $scope.loadSendEmails = function() {
      for(var i = 0; i < 30; i++) {
        $scope.sendemails.push({
          name: 'name:'+i,
          src: "http://lorempixel.com/60/60",
          age:i,
          id:i,
          lastText:i+'messages example'
        });
      }
    }
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
})
  .controller('FriendProfileCtrl', ['$scope', '$ionicModal','Loader','$ionicPopup', '$state', '$stateParams',
    function ($scope, $ionicModal, Loader, $ionicPopup, $state, $stateParams) {

      // A confirm dialog
      $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: '查看QQ(微信)号',
          template: '钻石会员才能查看QQ或微信号，你还不是钻石会员'
        }).then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };

      $scope.applyMeet = function(){
        Loader.toggleLoadingWithMessage('已发送申请见面请求，请不要重复申请');
      }

      $scope.relationship = false;

      $ionicModal.fromTemplateUrl('templates/gift-modal.html', {
        scope: $scope,
        animation: 'fade-in-scale'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.openModal = function() {
        $scope.modal.show();
      };

      $scope.closeModal = function() {
        console.log('Modal is closeModal!');
        $scope.modal.hide();
      };

      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        console.log('Modal is $destroy!');
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hide', function() {
        // Execute action
        console.log('Modal is hide!');
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
        console.log('Modal is removed!');
      });
      $scope.$on('modal.shown', function() {
        console.log('Modal is shown!');
      });

      //需要用promise或其他方法，否则加载完成前显示默认图片
      $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';

      $scope.showImage = function(index) {
        switch(index) {
          case 1:
            $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
            break;
          case 2:
            $scope.imageSrc  = 'http://ionicframework.com/img/ionic_logo.svg';
            break;
          case 3:
            $scope.imageSrc  = 'http://lorempixel.com/280/360';
            break;
        }
        $scope.openModal();
      }


      //gift
      $scope.gifts=[];
      for(var i = 1; i<=15; i++){
        $scope.gifts.push({
          src:'img/gift/'+i+'.gif'
        });
      }
    }
  ]).controller('EmailSendingCtrl', ['$scope', '$ionicModal','Loader','$ionicPopup', '$state', '$stateParams',
    function ($scope, $ionicModal, Loader, $ionicPopup, $state, $stateParams) {

      var sendId = $stateParams.sendId;

      $scope.applyMeet = function(){
        Loader.toggleLoadingWithMessage('已发送申请见面请求，请不要重复申请');
      }


      $scope.sendEmail = function() {
        console.log(sendId);
      }

    }
  ]);
