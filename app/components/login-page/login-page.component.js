'use strict';

angular.
    module('loginPage').
    component('loginPage', {
        templateUrl: 'app/components/login-page/login-page.template.html',
        controller:  function LoginPageController($http, $scope, $location, Check) {
            var self = this;
            this.$onInit = function () {
                var res = Check.save(); //使用服务和服务端进行验证
                res.$promise.then(function () {
                    console.log(res.status);
                    if(res.status === 'ok'){
                        self.status = res.username;
                    } else {
                        self.status = '请登录';
                    }
                });
            }
            this.name = "jiayiming";
            this.pande = 'normal';
            this.submitForm = function() {
                $http({
                    method: 'POST',
                    url:    '/login/submit',
                    data: {
                        user: this.username,
                        password: this.password
                    }
                }).then((response) => {
                    let res = response.data;
                    if(res.status === 'ok') {
                        $location.path('/user');
                    } else {
                        alert('失败');
                    }
                }, (error) => {
                    alert("请求失败");
                })
            };
        }
    });