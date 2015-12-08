var base = 'http://localhost:1337';

angular.module('starter.services', ['http-auth-interceptor'])
.factory('msgCenter', function($http, $rootScope,  localStorageService) {
  var msgC;
  return {
    get: function() {
        if(msgC == undefined) msgC = localStorageService.get('msgCenter');
        if(msgC==null){
          msgC ={};
          msgC.emails = 0;
          msgC.sayhi = 0;
          msgC.gifts = 0;
          msgC.meet = 0;
          msgC.seen = 0;
        }
      msgC.me = msgC.seen + msgC.gifts+msgC.meet;
      return msgC;
    },
    set: function(data) {
      for (prop in data) {
        if (!data.hasOwnProperty(prop)) {
          //The current property is not a direct property of p
          continue;
        }
        //Do your logic with the property here
        if(msgC.hasOwnProperty(prop)){
          msgC[prop] = data[prop]
        }
      }
      msgC.me = msgC.seen + msgC.gifts+msgC.meet;//updated
      localStorageService.set('msgCenter', msgC);
      $rootScope.$broadcast('event:user info changed');
    },
  };
})
.factory('myInfo', function($http, $rootScope,  localStorageService, msgCenter, UserFactory, Loader) {
  var user;
  var seen;

  return {
    get: function() {
      user = localStorageService.get('MyInfo');
      return user;
    },
    set: function(data) {
      user = data;
      localStorageService.set('MyInfo', user);
      $http.post(base+'/info/'+user.userid, user);
      $rootScope.$broadcast('msg:user info changed');
    },

    updateFromServer: function(message) {

      var action;

      if(typeof(message) === 'object'){
        action = message.data.action;
      }else{
        action = message;
      }

      switch (action){

        case 1:
          UserFactory.getSeen().success(function (data, status, headers, config) {
            seen = data;
            var n = 0;
            for(var i = 0; i<data.length; i++){
              if(data[i].sign == 0) n++;
            }
            msgCenter.set({seen: n});
            $rootScope.$broadcast('event:someone see you');

          }).error(function (data, status, headers, config) {
            Loader.toggleLoadingWithMessage("加载失败，请检查网络问题");
          });
          break;

        case 2:
          UserFactory.getHellos().success(function (data, status, headers, config) {
            hellos = data;
            var n = 0;
            for(var i = 0; i<data.length; i++){
              if(data[i].reback == 0) n++;
            }
            msgCenter.set({sayhi: n});
            $rootScope.$broadcast('event:someone say hi');

          }).error(function (data, status, headers, config) {
            Loader.toggleLoadingWithMessage("加载失败，请检查网络问题");
          });
          break;
        default :
              break;
      }
    },

    getSeen: function(){
      return seen;
    },

    getHellos: function(){
      return hellos;
    }

  };
})
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
.factory('AuthenticationService', function($rootScope, $http, authService, localStorageService, Loader, myInfo) {

// This function routes the message based upon the model which issued it
    var loginCallBack =  function (resdata, jwres, event) {

      if(jwres.statusCode != 200){
        $rootScope.$broadcast(event, jwres.statusCode);
      }else{

        data = resdata.MyInfo;
        data.authorizationToken = data.token;
        $rootScope.isAuthenticated = true;
        Loader.hideLoading();

        // Subscribe to the user model classroom and instance room
        io.socket.get('/info/'+data.user.userid, {token: data.authorizationToken}, function(response) {
          console.log('got response', response);
        });

        // Listen for the socket 'message'
        io.socket.on('userinfo', function(message){
          console.log(message);
          myInfo.updateFromServer(message);
        });

        $http.defaults.headers.common.Authorization = data.authorizationToken;  // Step 1
        // A more secure approach would be to store the token in SharedPreferences for Android, and Keychain for iOS
        localStorageService.set('authorizationToken', data.authorizationToken);
        localStorageService.set('MyInfo', data.user);
        // Need to inform the http-auth-interceptor that
        // the user has logged in successfully.  To do this, we pass in a function that
        // will configure the request headers with the authorization token so
        // previously failed requests(aka with status == 401) will be resent with the
        // authorization token placed in the header
        authService.loginConfirmed(data, function(config) {  // Step 2 & 3
          config.headers.Authorization = data.authorizationToken;
          return config;
        });
      }
    };

    var service = {
      login: function(user) {
        io.socket.post(base+'/login', user, function(resdata, jwres){
          loginCallBack(resdata, jwres, 'event:auth-login-failed');
        });
      },

      register: function(user) {
        io.socket.post(base+'/register', user, function(resdata, jwres){
          loginCallBack(resdata, jwres, 'event:auth-register-failed');
        });
      },

      logout: function(user) {
        var authToken = localStorageService.get('authorizationToken');
        if(authToken) {
            io.socket.post(base + '/logout', {token: authToken}, function (resdata, jwres) {
              io.socket.removeAllListeners();
            });
        }
        //try always
        localStorageService.remove('authorizationToken');
        localStorageService.remove('MyInfo');
        localStorageService.remove('msgCenter');
        delete $http.defaults.headers.common.Authorization;
        $rootScope.isAuthenticated = false;
        $rootScope.$broadcast('event:auth-logout-complete');

      },

      loginCancelled: function() {
        authService.loginCancelled();
      }
    };
    return service;
  });
