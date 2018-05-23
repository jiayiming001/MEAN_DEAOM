'use strict';

angular.
    module('loginPage').
    component('loginPage', {
        templateUrl: 'app/components/login-page/login-page.template.html',
        controller:  function LoginPageController($scope) {
            this.name = "jiayiming";
            this.pande = 'normal';
        }
    });