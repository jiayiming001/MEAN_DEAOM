'use strict';
angular.
    module('myTest').
    config(['$locationProvider','$routeProvider',
        function ($locationProvider,$routeProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $routeProvider.
            when('/login', {
                template: '<login-page></login-page>'
            }).
            when('/register', {
                template: '<register-page></register-page>'
            }).
            otherwise('/login');
    }]);