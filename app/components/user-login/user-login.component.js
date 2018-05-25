'use strict';

angular.
    module('userLogin', []).
    component('userLogin', {
        templateUrl: 'app/components/user-login/user-login.template.html',
        controller: function (Check, $location) {
            var self = this;
            this.$onInit = function () {
                var res = Check.save(); //使用服务和服务端进行验证
                res.$promise.then(function () {
                    if(res.status === 'ok'){
                        self.name = res.username;
                    } else {
                        $locstion.path('/login');
                    }
                });
            } 
        }
    });