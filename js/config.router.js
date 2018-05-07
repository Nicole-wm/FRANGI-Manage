'use strict';
angular.module('app').run(['$rootScope', '$state', '$stateParams','$localStorage',function ($rootScope,$state,$stateParams,$localStorage) {
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        if(toState.name=='access.signin'||toState.name=='') 
            return;
        if(!$localStorage.token){
            event.preventDefault();
            $state.go("access.signin");
        }
    });
}]).config(['$stateProvider','$urlRouterProvider','$httpProvider',function ($stateProvider,$urlRouterProvider,$httpProvider){
    $urlRouterProvider
    .otherwise('/access/signin');
    $stateProvider
    .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'tpl/app.html'
    })
    .state('access', {
        url: '/access',
        template: '<div ui-view class="fade-in-right-big smooth"></div>'
    })
    .state('access.signin', {
        url: '/signin',
        templateUrl: 'tpl/page_signin.html',
        resolve: {
            deps: ['uiLoad',
            function( uiLoad ){
                return uiLoad.load( ['js/controllers/signin.js']);
            }]
        }
    })
    .state('access.signup', {
        url: '/signup',
        templateUrl: 'tpl/page_signup.html',
        resolve: {
            deps: ['uiLoad',
            function( uiLoad ){
                return uiLoad.load( ['js/controllers/signup.js'] );
            }]
        }
    })
    .state('access.forgotpwd', {
        url: '/forgotpwd',
        templateUrl: 'tpl/page_forgotpwd.html'
    })
    .state('access.404', {
        url: '/404',
        templateUrl: 'tpl/page_404.html'
    })
    .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'tpl/dashboard.html',
        resolve: {
            deps: ['$ocLazyLoad',
            function( $ocLazyLoad ){
                return $ocLazyLoad.load(['js/controllers/chart.js']);
            }]
        }
    })
    .state('app.category_list', {
        url: '/category_list',
        templateUrl: 'tpl/material/category_list.html',
        resolve: {
            deps: ['$ocLazyLoad',
            function( $ocLazyLoad ){
                return $ocLazyLoad.load('toaster').then(
                    function(){
                        return $ocLazyLoad.load([
                            'js/controllers/material/CategoryListController.js'
                        ]);
                    }
                );
            }]
        }
    })
    .state('app.type_list', {
        url: '/type_list',
        params:{"cateID":null,"cateName":null},
        templateUrl: 'tpl/material/type_list.html',
        resolve: {
            deps: ['$ocLazyLoad',
            function( $ocLazyLoad ){
                return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                    function(){
                        return $ocLazyLoad.load([
                            'js/controllers/material/TypeListController.js'
                        ]);
                    }
                );
            }]
        }
    })
    .state('app.material_list', {
        url: '/material_list',
        params:{"typeID":null,"typeName":null},
        templateUrl: 'tpl/material/material_list.html',
        resolve: {
            deps: ['$ocLazyLoad',
            function( $ocLazyLoad ){
                return $ocLazyLoad.load(['toaster','angularFileUpload','textAngular']).then(
                    function(){
                        return $ocLazyLoad.load([
                            'js/controllers/material/MateListController.js'
                        ]);
                    }
                );
            }]
        }
    })

    $httpProvider.interceptors.push(['$q','$injector','$localStorage',function ($q,$injector,$localStorage) {
        var httpInterceptor = {
            'responseError': function(err){  
                    if(-1 === err.status) {// 远程服务器无响应  
                    } else if(401 === err.status) { // 401 错误一般是用于身份验证失败，具体要看后端对身份验证失败时抛出的错误  
                    } else if(404 === err.status) {// 服务器返回了 404  }  
                    return $q.reject(err); 
                }
            },
            'response' : function(response) {
                if (response.status == 21000) {
                }
                return response || $q.when(response);
            },
            'request' : function(config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.token = $localStorage.token;
                        //config.headers['X-Access-Token'] = $localStorage.token;
                    };
                    return config || $q.when(config);
                },
                'requestError' : function(config){
                    return $q.reject(config);
                }
            };
            return httpInterceptor;
        }]);
}])
