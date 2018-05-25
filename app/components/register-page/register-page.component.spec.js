'use strict';

describe('registerPage', function () {
    beforeEach(module('registerPage') );
    
    //测试控制器
    describe('RegisterPageController', function () {
        var $httpBackend, ctrl;
        var data = {
            'username': '123',
            'password': '123',
            'phone':    '123'
        };
        beforeEach(inject(($componentController, _$httpBackend_)=> {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('/register/submit',data)
                .respond({status:'ok'});

            ctrl = $componentController('registerPage');

            it("should get a ok", function () {
                jasmine.addCustomEqualityTester(angular.equals); 
                expect(ctrl.status).toBe('');
                $httpBackend.flush();
                expect(ctrl.status).toBe('ok');
            });

        }));
    });
    
});