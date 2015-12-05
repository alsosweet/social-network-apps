angular.module('starter.controllers', ['compareTo'])
.controller('TabCtrl', function($ionicModal, $location, $scope,msgCenter) {

    $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
        $scope.loginModal = modal;
      },
      {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }
    );
    //Be sure to cleanup the modal by removing it from the DOM
    $scope.$on('$destroy', function() {
      $scope.loginModal.remove();
    });

    $scope.msgC = msgCenter.get();
    $scope.$on('event:user info changed', function(){
      $scope.msgC = msgCenter.get();
      if(!$scope.$$phase) {
        //$digest or $apply
        $scope.$digest();
      }
    });

    $scope.go = function (path) {
      $location.path(path);
    };

  }
)
.controller('LoginCtrl', function($scope, $http, $state, $rootScope, AuthenticationService, Loader) {

    $scope.user = {
      email: '',
      password: '',
      password2: '',
    };
    $scope.viewLogin = true;

    $scope.switchTab = function(tab) {
      if (tab === 'login') {
        $scope.viewLogin = true;
      } else {
        $scope.viewLogin = false;
      }
    }

    $scope.hide = function() {
      AuthenticationService.loginCancelled();
    }

    $scope.login = function() {
      Loader.showLoading('验证中...');
      AuthenticationService.login($scope.user);
    };

    $scope.register = function() {
      Loader.showLoading('等待...');
      AuthenticationService.register($scope.user);
    }


    $scope.$on('event:auth-loginRequired', function(e, rejection) {
      console.log('handling login required');
      $scope.loginModal.show();
    });

    $scope.$on('event:auth-loginConfirmed', function() {
      $scope.loginModal.hide();
      $rootScope.$broadcast('login.success',null);
    });

    $scope.$on('event:auth-login-failed', function(e, status) {
      var error = "Login failed.";
      if (status == 401) {
        error = "Invalid Username or Password.";
      }
      Loader.hideLoading();
      Loader.toggleLoadingWithMessage(error);
    });
    $scope.$on('event:auth-register-failed', function(e, status) {
      var error = "register failed.";
      if (status == 401) {
        error = "Invalid Username or Password.";
      }
      Loader.hideLoading();
      Loader.toggleLoadingWithMessage(error);
    });

    $scope.$on('event:auth-loginCancelled', function() {
      console.log("login cancelled");
      $scope.loginModal.hide();
      $state.go($state.current, {}, {reload: true, inherit: false});
    });

  })
.controller('LogoutCtrl', function($scope, AuthenticationService) {
/*  $scope.$on('$ionicView.enter', function() {
    AuthenticationService.logout();
  });*/
})
.controller('DashCtrl', function($scope, $rootScope, $ionicNavBarDelegate,$state, TwittSrv, localStorageService, myInfo) {

    var authToken = localStorageService.get('authorizationToken');
    if(!authToken){
      $state.go('firstShow', {}, {reload: true, inherit: false});
      return;
    }

    $scope.cycle = [];//TypeError: Cannot read property 'concat' of undefined

    $scope.user = myInfo.get();

    $scope.city = angular.isUndefined($scope.user.city) ? '': $scope.user.city.region_name;

// //   $scope.$watch(function () { return myInfo.get(); }, function (newValue, oldValue) {
 //     if (newValue !== oldValue) $scope.user = newValue;
 //   });

    //$ionicNavBarDelegate.align('center');
    TwittSrv.getTwitts().then(function(twitts){
      $scope.twitts = twitts.data.UserInfo;
    });

    $scope.doRefresh = function(){
      TwittSrv.getNewTwitts().then(function(newTwitts){
        $scope.twitts = newTwitts.data.UserInfo;
      }).finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.loadMore = function(){
      TwittSrv.getMoreTwitts().then(function(olderTwitts){
        $scope.twitts = $scope.twitts.concat(olderTwitts.data.UserInfo);
      }).finally(function() {
        // Stop the ion-infinite-scroll from spinning
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };
  })
  .controller('FirstShowCtrl', function($scope, $ionicNavBarDelegate,$rootScope, $state, $ionicHistory, TwittSrv) {
    //$ionicNavBarDelegate.align('center');
    TwittSrv.getTwitts().then(function(twitts){
      $scope.twitts = twitts.data.UserInfo;
    });
    $scope.loadMore = function(){
      TwittSrv.getMoreTwitts().then(function(olderTwitts){
        $scope.twitts = $scope.twitts.concat(olderTwitts.data.UserInfo);
      }).finally(function() {
        // Stop the ion-infinite-scroll from spinning
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };
    $scope.login = function(){
      $rootScope.$broadcast('event:auth-loginRequired',null);//rejection用来干嘛
    }

    $rootScope.$on('login.success',function(){
      $ionicHistory.clearCache().then(function(){
        $state.go('tab.dash', {}, {reload: true, inherit: false});
      });
    });
  })
.controller('EmailsCtrl', function($scope, AuthFactory, $rootScope, $location, $timeout, UserFactory, Loader, Chats) {

    $scope.active_content = 'orders';


    UserFactory.getPurchases().success(function (data, status, headers, config) {
      $scope.customers = data;
    })
      .error(function (data, status, headers, config) {
        console.log("Error occurred.  Status:" + status);
      });
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
          src: "http://localhost:1337/favicon.ico",
          age:i,
          lastText:i+'messages example'
        });
      }
    }

  })
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('ProfileCtrl', function($scope,$rootScope, $state, $ionicHistory, $stateParams, myInfo, UserFactory, Loader, msgCenter) {

    $scope.info = myInfo.get();

    $scope.$on('$ionicView.enter', function() {
      var tmp = msgCenter.get();
      if(tmp.seen != 0){
        UserFactory.postSeen().success(function (data, status, headers, config) {
          msgCenter.set({seen: 0});
        });
      }
    });

    $rootScope.$on('event:someone see you', function(){
      //$state.forceReload();
      //$state.go($state.current.name, {}, {reload: true});
      UserFactory.getSeen().success(function (data, status, headers, config) {
        $scope.seen = data;
        var n = 0;
        for(var i = 0; i<data.length; i++){
          if(data[i].sign == 0) n++;
        }
        msgCenter.set({seen: n});
      }).error(function (data, status, headers, config) {
        Loader.toggleLoadingWithMessage("加载失败，请检查网络问题");
      });
    });

    $rootScope.$broadcast('event:someone see you');

    $scope.settings = {
      enableFriends: true
    };
  })
.controller('AccountCtrl', function($scope, $ionicHistory, $state, AuthenticationService, Loader) {
    $scope.logout = function() {
      AuthenticationService.logout();
    }

    $scope.$on('event:auth-logout-complete', function() {

      Loader.toggleLoadingWithMessage('注销成功!', 2000);
      $ionicHistory.clearCache().then(function(){
        $state.go('tab.dash', {}, {reload: true, inherit: false});
      });
    });

  $scope.settings = {
    enableFriends: true
  };
})
.controller('FriendProfileCtrl',function ($scope, $ionicModal, Loader, $ionicPopup, $state, $stateParams, $ionicHistory, UserFactory) {

    Loader.showLoading("加载中...");
    UserFactory.getUserInfo($stateParams.eventId).success(function (data, status, headers, config) {
      Loader.hideLoading();
      $scope.userinfo = data.UserInfo[0];
      //$scope.$broadcast('getUserInfo');
    }).error(function (data, status, headers, config) {
        console.log("Error occurred.  Status:" + status);
        Loader.hideLoading();
        Loader.toggleLoadingWithMessage("加载失败，请检查网络问题");
        $ionicHistory.goBack();
      });

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
        Loader.toggleLoadingWithMessage('已发送申请见面请求，请不要重复申请!');
      }

      $scope.relationship = false;
      $scope.openModal = function(tempobj, animation) {
          $ionicModal.fromTemplateUrl(tempobj.url, {
            scope: $scope,
            animation: animation
          }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
          });

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

      };

      $scope.closeModal = function() {
        console.log('Modal is closeModal!');
        $scope.modal.hide();
      };

      var tempobj={};
      tempobj.url = 'templates/image-modal.html';

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
            $scope.imageSrc  = $scope.userinfo.avatar;
            break;
        }
        $scope.openModal(tempobj, 'slide-in-up');
      }


      //gift
      $scope.gifts=[];
      for(var i = 1; i<=15; i++){
        $scope.gifts.push({
          src:'img/gift/'+i+'.gif'
        });
      }

      var tempobj1={};
      tempobj1.url = 'templates/say-hi.html';

      $scope.sayhi = function(){
          $scope.openModal(tempobj1, 'slide-in-up');
      }

    }
  )
.controller('EmailSendingCtrl',function ($scope, $ionicModal, Loader, $ionicPopup, $state, $stateParams) {

      var sendId = $stateParams.sendId;

      $scope.applyMeet = function(){
        Loader.toggleLoadingWithMessage('已发送申请见面请求，请不要重复申请');
      }


      $scope.sendEmail = function() {
        console.log(sendId);
      }

    }
)
.controller('PersonalInfoCtrl',function ($scope, $ionicModal, Loader, $ionicPopup, $state, $stateParams, $timeout) {

      console.log('个人资料');
// Triggered on a button click, or some other target
      $scope.showPopup = function() {
        $scope.data = {}
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="number" name="QQ" ng-model="data.wifi" ng-maxlength="4"><p ng-show="QQ.$error.maxlength">长度超过20.</p>',
        title: '请输入QQ号或微信号',
        scope: $scope,
        buttons: [
          { text: '取消' },
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.wifi;
              }
            }
          }
        ]
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 30000);
    };


// Triggered on a button click, or some other target
      $scope.showPopup2 = function() {
        $scope.data = {}
        // An elaborate, custom popup
        $scope.myPopup = $ionicPopup.show({
          templateUrl: 'templates/age-list.html',
          title: '年龄',
          scope: $scope,
        });
        $scope.myPopup.then(function(res) {
          console.log('Tapped!', res);
        });
        $timeout(function() {
          $scope.myPopup.close(); //close the popup after 3 seconds for some reason
        }, 300000);
      };
    }
).config(function($provide) {
    $provide.decorator('$state', function($delegate, $stateParams) {
      $delegate.forceReload = function() {
        return $delegate.go($delegate.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      };
      return $delegate;
    });
  });
