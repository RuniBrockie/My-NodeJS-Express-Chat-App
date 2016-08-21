var mainModule = angular.module('MyApp', ['ngRoute', 'ui.bootstrap']);

mainModule.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'app/build/templates/home.tpl.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
  }]);

mainModule.config(function () {

});
