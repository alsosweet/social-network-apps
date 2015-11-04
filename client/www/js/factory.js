angular.module('starter.factory', [])
  .factory('TwittSrv', function($q, $timeout){
    'use strict';

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
      return $q.when(angular.copy(twitts));
    }

    function getNewTwitts(){
      var defer = $q.defer();
      $timeout(function(){
        var newTwitt = angular.copy(twitts[Math.floor(Math.random()*twitts.length)]);
        defer.resolve([newTwitt]);
      }, 500);
      return defer.promise;
    }

    function getMoreTwitts(){
      var defer = $q.defer();
      $timeout(function(){
        var newTwitts = [];
        for(var i=0; i<10; i++){
          newTwitts.push(angular.copy(twitts[Math.floor(Math.random()*twitts.length)]));
        }
        defer.resolve(newTwitts);
      }, 500);
      return defer.promise;
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
        }, timeout || 2000);
      }

    };
    return LOADERAPI;
  }])
