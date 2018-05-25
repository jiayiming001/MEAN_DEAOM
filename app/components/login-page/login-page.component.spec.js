'use strict';

describe('loginPage', function () {
    // 加载需要测试的模块 
    beforeEach(module('loginPage'));

    //测试控制器
    describe('LoginPageController', function () {
        var $httpBackend, ctrl;

        beforeEach(inject(function($componentController, _$httpBackend_){
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/login/submit')
                .respond({'status': 'ok'});

            // $httpBackend.expectPOST('session')
            //     .respond({status: 'ok', username: "123"});
            ctrl = $componentController('loginPage');
        }));

        it('should submit and return \'ok\' with `$http`', function() {
            expect(ctrl.name).toEqual("");
            ctrl.submitForm();
            $httpBackend.flush();
            expect(ctrl.name).toEqual("ok");
            // expect(ctrl.status).toBe('123');
        });
    });
});