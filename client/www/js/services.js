var base = 'http://localhost:1337';

angular.module('starter.services', ['http-auth-interceptor'])
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('AuthenticationService', function($rootScope, $http, authService, localStorageService, Loader) {
    var service = {
      login: function(user) {
        $http.post(base+'/login', user, { ignoreAuthModule: true })
          .success(function (data, status, headers, config) {

            data = data.MyInfo;
            data.authorizationToken = data.token;
            $rootScope.isAuthenticated = true;
            Loader.hideLoading();

            $http.defaults.headers.common.Authorization = data.authorizationToken;  // Step 1
            // A more secure approach would be to store the token in SharedPreferences for Android, and Keychain for iOS
            localStorageService.set('authorizationToken', data.authorizationToken);

            // Need to inform the http-auth-interceptor that
            // the user has logged in successfully.  To do this, we pass in a function that
            // will configure the request headers with the authorization token so
            // previously failed requests(aka with status == 401) will be resent with the
            // authorization token placed in the header
            authService.loginConfirmed(data, function(config) {  // Step 2 & 3
              config.headers.Authorization = data.authorizationToken;
              return config;
            });
          })
          .error(function (data, status, headers, config) {
            $rootScope.$broadcast('event:auth-login-failed', status);
          });
      },

      register: function(user) {
        $http.post(base+'/register', user, { ignoreAuthModule: true })
          .success(function (data, status, headers, config) {

            data = data.MyInfo;
            $rootScope.isAuthenticated = true;
            Loader.hideLoading();

            $http.defaults.headers.common.Authorization = data.authorizationToken;  // Step 1
            // A more secure approach would be to store the token in SharedPreferences for Android, and Keychain for iOS
            localStorageService.set('authorizationToken', data.authorizationToken);

            // Need to inform the http-auth-interceptor that
            // the user has logged in successfully.  To do this, we pass in a function that
            // will configure the request headers with the authorization token so
            // previously failed requests(aka with status == 401) will be resent with the
            // authorization token placed in the header
            authService.loginConfirmed(data, function(config) {  // Step 2 & 3
              config.headers.Authorization = data.authorizationToken;
              return config;
            });
          })
          .error(function (data, status, headers, config) {
            $rootScope.$broadcast('event:auth-register-failed', status);
          });
      },

      logout: function(user) {
        $http.post('https://logout', {}, { ignoreAuthModule: true })
          .finally(function(data) {
            localStorageService.remove('authorizationToken');
            delete $http.defaults.headers.common.Authorization;
            $rootScope.$broadcast('event:auth-logout-complete');
          });
      },
      loginCancelled: function() {
        authService.loginCancelled();
      }
    };
    return service;
  });
