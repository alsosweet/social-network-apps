//var base = 'http://localhost:1337';
var base = 'http://192.168.199.235:1337';

angular.module('starter.factory', [])

  .factory('TwittSrv', function($q, $timeout, $http){
    'use strict';
    var page = parseInt(Math.random()*50, 10);
    var twitts=[];

    for(var i = 0; i<100; i++){
       twitts.push({
        avatar : "http://lorempixel.com/60/60",
        age : i,
        dist:i+100,
         id:i
      });

    }

    var service = {
      getTwitts: getTwitts,
      getNewTwitts: getNewTwitts,
      getMoreTwitts: getMoreTwitts
    };

    function getTwitts(){
      return $http.get(base + '/UserPage/' + page);
      //return $q.when(angular.copy(twitts));
    }

    function getNewTwitts(){
      if(page <= 5){
        page = parseInt(Math.random()*500, 10);
      }else{
        page--;
      }

      return $http.get(base + '/UserPage/' + page);
      /*
      var defer = $q.defer();
      $timeout(function(){
        var newTwitt = angular.copy(twitts[Math.floor(Math.random()*twitts.length)]);
        defer.resolve([newTwitt]);
      }, 500);
      return defer.promise;*/
    }

    function getMoreTwitts(){
      page++;
      return $http.get(base + '/UserPage/' + page);
     /*
      var defer = $q.defer();

      $timeout(function(){
        var newTwitts = [];
        for(var i=0; i<10; i++){
          newTwitts.push(angular.copy(twitts[Math.floor(Math.random()*twitts.length)]));
        }
        defer.resolve(newTwitts);
      }, 500);
      return defer.promise;*/
    }

    return service;
  })
  .factory('Loader', ['$ionicLoading', '$timeout', function($ionicLoading, $timeout) {

    var LOADERAPI = {

      showLoading: function(text) {
        text = text || 'Loading...';
        $ionicLoading.show({
          template: text
        });
      },

      hideLoading: function() {
        $ionicLoading.hide();
      },

      toggleLoadingWithMessage: function(text, timeout) {
        var self = this;

        self.showLoading(text);

        $timeout(function() {
          self.hideLoading();
        }, timeout || 1300);
      }

    };
    return LOADERAPI;
  }])

  .factory('LSFactory', [function() {

    if( window.localStorage && window.localStorage.getItem){
      console.log('suport localStorage');
    }

    var LSAPI = {

      clear: function() {
        try{
          return localStorage.clear();
        }catch(e) {
          console.info('Oops');
        }
      },

      get: function(key) {
        return JSON.parse(localStorage.getItem(key));
      },

      set: function(key, data) {
        return localStorage.setItem(key, JSON.stringify(data));
      },

      delete: function(key) {
        return localStorage.removeItem(key);
      },

      getAll: function() {
        var books = [];
        var items = Object.keys(localStorage);

        for (var i = 0; i < items.length; i++) {
          if (items[i] !== 'user' || items[i] != 'token') {
            books.push(JSON.parse(localStorage[items[i]]));
          }
        }

        return books;
      }

    };

    return LSAPI;

  }])

  .factory('AuthFactory', ['LSFactory', function(LSFactory) {

    var userKey = 'user';
    var tokenKey = 'token';

    var AuthAPI = {

      isLoggedIn: function() {
        return this.getUser() === null ? false : true;
      },

      getUser: function() {
        return LSFactory.get(userKey);
      },

      setUser: function(user) {
        return LSFactory.set(userKey, user);
      },

      getToken: function() {
        return LSFactory.get(tokenKey);
      },

      setToken: function(token) {
        return LSFactory.set(tokenKey, token);
      },

      deleteAuth: function() {
        LSFactory.delete(userKey);
        LSFactory.delete(tokenKey);
      }

    };

    return AuthAPI;

  }])

  .factory('TokenInterceptor', ['$q', 'AuthFactory', function($q, AuthFactory) {

    return {
      request: function(config) {
        config.headers = config.headers || {};
        var token = AuthFactory.getToken();
        var user = AuthFactory.getUser();

        if (token && user) {
          config.headers['X-Access-Token'] = token.token;
          config.headers['X-Key'] = user.email;
          config.headers['Content-Type'] = "application/json";
        }
        return config || $q.when(config);
      },

      response: function(response) {
        return response || $q.when(response);
      }
    };

  }])


  .factory('BooksFactory', ['$http', function($http) {

    var perPage = 30;

    var API = {
      get: function(page) {
        return $http.get(base + '/api/v1/books/' + page + '/' + perPage);
      }
    };

    return API;
  }])

  .factory('UserFactory', ['$http',
    function($http) {

      var UserAPI = {

        getUserInfo: function(userid) {
          return $http.get(base + '/info/' + userid);
        },

        getSeen: function() {
          return $http.get(base + '/seen/seen');
        },
        postSeen: function() {
          return $http.post(base + '/seen/');
        },
        getHellos: function(){
          return $http.get(base + '/hello/hello');
        },
        helloRespond: function(hello) {
          return $http.post(base + '/hello/respond', hello);
        },
        helloDelete: function(hello) {
          return $http.post(base + '/hello/del', hello);
        },

        getZhaohu: function(){
          return $http.get(base + '/qing_zhaohu/viewzhaohu');
        },

        messageDelete:function(message){
          return $http.post(base + '/message/del', message);
        },

        getMessages: function(){
          return $http.get(base + '/message/message');
        },
        messageRespond: function(message) {
          return $http.post(base + '/message/respond', message);
        },

        getSendMessage: function(){
          return $http.get(base + '/message/sendmessage');
        },
        checkin: function(){
          return $http.post(base + '/checkin');
        },
        addToCart: function(book) {
          var userId = AuthFactory.getUser()._id;
          return $http.post(base + '/api/v1/users/' + userId + '/cart', book);
        },

        getPurchases: function() {
          //return $http.get(base + '/testurl');
        },

        addPurchase: function(cart) {
          var userId = AuthFactory.getUser()._id;
          return $http.post(base + '/api/v1/users/' + userId + '/purchases', cart);
        }

      };

      return UserAPI;
    }
  ])
