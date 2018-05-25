'use strcit';

angular.
    module('core.checklogin').
    factory('Check', function($resource){
        return $resource('session', {}, {
            save:  {
                method: 'post',
            }
        });
    });
