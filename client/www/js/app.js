// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'LocalStorageModule',
  'ionic-modal-select',
  'elastichat',
  'angularMoment',
  'starter.controllers',
  'starter.services',
  'starter.factory'])
.run(function($ionicPlatform, $http, $rootScope, localStorageService, authService, myInfo) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    var authToken = localStorageService.get('authorizationToken');
    if(authToken){
      var user = myInfo.get();
      // Subscribe to the user model classroom and instance room
      io.socket.get('/info/'+user.userid, {token: authToken}, function(response) {
        console.log('got response', response);
      });
      // Listen for the socket 'message'
      io.socket.on('userinfo', function(message){
        console.log(message);
        myInfo.updateFromServer(message);
      });

      $rootScope.isAuthenticated = true;
      $http.defaults.headers.common.Authorization = authToken;  // Step 1
      // Need to inform the http-auth-interceptor that
      // the user has logged in successfully.  To do this, we pass in a function that
      // will configure the request headers with the authorization token so
      // previously failed requests(aka with status == 401) will be resent with the
      // authorization token placed in the header
      authService.loginConfirmed(authToken, function(config) {  // Step 2 & 3
        config.headers.Authorization = authToken;
        return config;
      });
    }else{
      $rootScope.isAuthenticated = false;
    }
  });
})
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    // configure moment relative time
    moment.locale('en', {
      relativeTime: {
        future: "in %s",
        past: "%s以前",
        s: "%d秒",
        m: "1分钟",
        mm: "%d分钟",
        h: "1小时",
        hh: "%d小时",
        d: "1天",
        dd: "%d天",
        M: "1个月",
        MM: "%d个月",
        y: "1年",
        yy: "%d年"
      }
    });
  })
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:'TabCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
    .state('tab.emails', {
      url: '/emails',
      //cache: false, //另一种方法就是在html文件加入cache-view="false"
      views: {
        'tab-emails': {
          templateUrl: 'templates/tab-emails.html',
          controller: 'EmailsCtrl'
        }
      }
    })
  .state('messages', {
      url: '/messages',
      templateUrl: 'templates/chatbox.html',
      controller: 'UserMessagesCtrl'
    })
    .state('tab.email-detail', {
      url: '/emails/:chatId',
      views: {
        'tab-emails': {
          templateUrl: 'templates/email-detail.html',
          controller: 'EmailDetailCtrl'
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.profile', {
      url: '/profile',
      //cache: false,
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
    .state('personalInfo', {
      url: '/personalinfo',
      templateUrl: 'templates/personal-info.html',
      controller: 'PersonalInfoCtrl'
    })
    .state('event', {
      url: '/event/:eventId',
      templateUrl: 'templates/friend-profile.html',
      controller: 'FriendProfileCtrl'
    })
    .state('firstShow', {
      url: '/firstShow',
      templateUrl: 'templates/first-show.html',
      controller: 'FirstShowCtrl'
    })
    .state('emailSending', {
      url: '/emailSending/:sendId/:messageid',
      templateUrl: 'templates/email-sending.html',
      controller: 'EmailSendingCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
