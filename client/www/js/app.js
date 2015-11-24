// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'LocalStorageModule',
  'starter.controllers',
  'starter.services',
  'starter.factory'])
.run(function($ionicPlatform) {
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
  });
})
  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
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
      cache: false, //另一种方法就是在html文件加入cache-view="false"
      views: {
        'tab-emails': {
          templateUrl: 'templates/tab-emails.html',
          controller: 'EmailsCtrl'
        }
      }
    })
    .state('tab.email-detail', {
      url: '/emails/:chatId',
      cache: false,
      views: {
        'tab-emails': {
          templateUrl: 'templates/email-detail.html',
          controller: 'EmailDetailCtrl'
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      cache: false,
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      cache: false,
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.profile', {
      url: '/profile',
      cache: false,
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    cache: false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
    .state('personalInfo', {
      url: '/personalinfo',
      cache: false,
      templateUrl: 'templates/personal-info.html',
      controller: 'PersonalInfoCtrl'
    })
    .state('event', {
      url: '/event/:eventId',
      cache: false,
      templateUrl: 'templates/friend-profile.html',
      controller: 'FriendProfileCtrl'
    })
    .state('tab.logout', {
      url: "/logout",
      views: {
        'tab-logout' :{
          controller: "LogoutCtrl",
          templateUrl: 'templates/tab-dash.html'
        }
      }
    })
    .state('emailSending', {
      url: '/emailSending/:sendId',
      cache: false,
      templateUrl: 'templates/email-sending.html',
      controller: 'EmailSendingCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
