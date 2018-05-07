'use strict';
  // signin controller
  app.controller('SigninFormController', ['$scope', '$http', '$state','$localStorage','$rootScope',function($scope, $http, $state,$localStorage,$rootScope) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
        $scope.authError = null;
        var param = {
            username: $scope.user.name,
            password: $scope.user.password
        };
        var url = 'api/admin/login.php';
        $http.post(url,param).success(function(response){
            if(response.code==1) {
                $localStorage.User= {
                    "id":response.data.id,
                    "name":response.data.username
                }
                var valueIndex=encodeURI(response.data.token);            
                $localStorage.token=valueIndex;
                $state.go('app.dashboard');
            }else if(response.code==0){
                $scope.authError = '用户名或者密码不对！';
            }else{
                $scope.authError = 'Server Error';
            }
        });
    };
}]);  