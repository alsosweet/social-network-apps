angular.module('starter.controllers', ['compareTo'])
.controller('TabCtrl', function($ionicModal, $location, $scope, msgCenter, myInfo) {

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

    myInfo.updateFromServer(1);
    myInfo.updateFromServer(2);
    myInfo.updateFromServer(3);
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
.controller('EmailsCtrl', function($scope, AuthFactory, $rootScope, $location, $timeout, UserFactory, Loader, msgCenter, myInfo) {

    $scope.active_content = 'orders';
    $scope.setActiveContent = function(str){
      $scope.active_content = str;
    }
    $scope.delete = function(message){
      UserFactory.messageDelete(message).success(function (data, status, headers, config) {

        console.log('message delete ok:'+status);
        $scope.messages.splice($scope.messages.indexOf(message), 1);
        msgCenter.set({emails:msgCenter.get().emails -1});
      });
    }

    $scope.deleteSendMessage = function(message){
      UserFactory.messageDelete(message).success(function (data, status, headers, config) {

        console.log('sendboxmessages delete ok:'+status);
        $scope.sendboxmessages.splice($scope.sendboxmessages.indexOf(message), 1);
      });
    }

    $rootScope.$on('event:refresh sendbox', function(){
      UserFactory.getSendMessage().success(function (data, status, headers, config) {
        $scope.sendboxmessages = data;
        $scope.$broadcast('scroll.refreshComplete');
      });
    });

    $rootScope.$broadcast('event:refresh sendbox');

    $scope.respond = function(message){
      //$location.path('/messages');
    }

    var wait = 0;

    $scope.messagesRefresh = function(){
      myInfo.updateFromServer(3); //get messages
      wait = 1;
    }
    $scope.sendboxRefresh = function(){
      $rootScope.$broadcast('event:refresh sendbox');
    }
    $rootScope.$on('event:someone sent you message', function(){
      $scope.messages = myInfo.getMessages();
      if(wait == 1){
        $scope.$broadcast('scroll.refreshComplete');
        wait = 0;
      }
    });

    myInfo.updateFromServer(3); //get messages
})
  .controller('EmailDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })
  .controller('ChatsCtrl', function($ionicModal, $rootScope, $scope, myInfo, UserFactory, msgCenter) {

    $ionicModal.fromTemplateUrl('templates/say-hi.html', function(modal) {
        $scope.sayhiModal = modal;
      },
      {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }
    );
    //Be sure to cleanup the modal by removing it from the DOM
    $scope.$on('$destroy', function() {
      $scope.sayhiModal.remove();
    });

    $scope.delete = function(hello){
      UserFactory.helloDelete(hello).success(function (data, status, headers, config) {

        console.log('delete ok:'+status);
        $scope.hellos.splice($scope.hellos.indexOf(hello), 1);
        msgCenter.set({sayhi:msgCenter.get().sayhi -1});
      });
    }

    $scope.hide = function(){
      $scope.sayhiModal.hide();
    }

    $scope.name = {idx:1};//Two-way binding works best with a nested object in ng-model

    $scope.respond = function(hello){

      UserFactory.getZhaohu().success(function(data, status, headers, config){
        if(status == 200){
          $scope.hi = data.zhaohu;
          $scope.sayhiModal.show();

          $scope.submit = function(idx){

             UserFactory.helloRespond({message: idx, userid: hello.fromuserid.userid, fromuserid: hello.userid}).success(function (data, status, headers, config) {
             if(status == 200){
                UserFactory.helloDelete(hello).success(function (data, status, headers, config) {

                    console.log('delete ok:'+status);
                    $scope.hellos.splice($scope.hellos.indexOf(hello), 1);
                    msgCenter.set({sayhi:msgCenter.get().sayhi -1});
                });
             }
             });
          }
        }
      });
    }

    var wait = 0;

    $scope.helloRefresh = function(){
      myInfo.updateFromServer(2); //get hellos
      wait = 1;
    }

    $rootScope.$on('event:someone say hi', function(){
      $scope.hellos = myInfo.getHellos();
      if(wait == 1){
        $scope.$broadcast('scroll.refreshComplete');
        wait = 0;
      }
    });

    myInfo.updateFromServer(2); //get hellos

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

    $scope.$on('event:someone see you', function(){
      $scope.seen = myInfo.getSeen();
    });

    myInfo.updateFromServer(1); //get seen

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
    $scope.showConfirm = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: '查看QQ(微信)号',
        template: '钻石会员才能查看QQ或微信号，你还不是钻石会员'
      }).then(function (res) {
        if (res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };

    $scope.applyMeet = function () {
      Loader.toggleLoadingWithMessage('已发送申请见面请求，请不要重复申请!');
    }

    $scope.relationship = false;

    $ionicModal.fromTemplateUrl('templates/say-hi.html', function (modal) {
        $scope.sayhiModal = modal;
      },
      {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }
    );
    //Be sure to cleanup the modal by removing it from the DOM
    $scope.$on('$destroy', function () {
      $scope.sayhiModal.remove();
    });
    $scope.hide = function () {
      $scope.sayhiModal.hide();
    }

    $scope.name = {idx: 1};//Two-way binding works best with a nested object in ng-model

    $scope.showSayhi = function () {
      UserFactory.getZhaohu().success(function (data, status, headers, config) {
        if (status == 200) {
          $scope.hi = data.zhaohu;
          $scope.sayhiModal.show();

          $scope.submit = function (idx) {

            UserFactory.helloRespond({
              message: idx,
              userid: $stateParams.eventId,
            }).success(function (data, status, headers, config) {
              if (status == 200) {
              }
            });
          }
        }
      });
    }
  }
 )
.controller('EmailSendingCtrl',function ($scope, $rootScope, $ionicModal, Loader, $ionicPopup, $state, $stateParams, UserFactory, msgCenter, myInfo) {

      var sendId = $stateParams.sendId;
      $scope.notice = {message: ""};

      $scope.sendEmail = function() {
        console.log(sendId);
        UserFactory.messageRespond({message: $scope.notice.message, userid: sendId, messageid:$stateParams.messageid}).success(function (data, status, headers, config) {
          if(status == 200){
            console.log('messageRespond ok:'+status);
            $scope.notice.message = "";
            msgCenter.set({emails:msgCenter.get().emails -1});
            myInfo.updateFromServer(3);
            $rootScope.$broadcast('event:refresh sendbox');
            Loader.toggleLoadingWithMessage("发送成功");
          }
        });
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
