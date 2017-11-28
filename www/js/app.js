// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova', 'ui.router']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'home.html'
  })
  .state('generate', {
    url: '/generate',
    templateUrl: 'generate.html'
  })
  .state('scan', {
    url: '/scan',
    templateUrl: 'scan.html'
  });

  $urlRouterProvider.otherwise('home');

});



app.controller('MainCtrl', function($scope) {
  $scope.message = 'Hello';
});

app.controller('BarcodeCtrl', function($scope, $cordovaBarcodeScanner, $ionicPopup, $state, $window) {
  $scope.newScan = function() {
    $cordovaBarcodeScanner.scan().then(function(barcodeData) {
      if (barcodeData.format == "QR_CODE") {
        var responseUrl = barcodeData.text;
        responseUrl = responseUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
        responseUrl = "http://" + responseUrl;
        $window.open(responseUrl, '_system');
        console.log(responseUrl);
      }
      else {
        var alertPopup = $ionicPopup.alert({
            title: 'Notification',
            template: 'Not a QR code. Try again.'
        });

        alertPopup.then(function(res) {
          $state.go('home');
        });
      }
    }, function(error) {
      alert('Invalid')
    });
  }
});