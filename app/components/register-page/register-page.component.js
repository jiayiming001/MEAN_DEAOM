'use strict';

angular.
    module('registerPage').
    component('registerPage',{
        templateUrl: 'app/components/register-page/register-page.template.html',
        controller: function($http, $location) {
            var self = this;
            this.status = '';
            this.RegisterSubmit = function() {
                $http({
                    method: 'post',
                    url:    '/register/submit',
                    data:   {
                        'username': self.user.username,
                        'password': self.user.password,
                        'phone':    self.user.phone
                    }
                }).then((response) => {
                    let res = response.data;
                    if(res.status === 'ok') {
                        self.status = 'ok';
                        $location.path('/user');
                    } else {
                        self.status = 'fail';
                        alert("失败");
                    }
                }, (error) => {
                    alert("请求失败");
                });
            };
        }
    });