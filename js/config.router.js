'use strict';

/**
 * Config for the router
 */
 angular.module('app')
 .run(
  [          '$rootScope', '$state', '$stateParams',
  function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;        
  }
  ]
  )
 .config(
  [          '$stateProvider', '$urlRouterProvider',
  function ($stateProvider,   $urlRouterProvider) {

    $urlRouterProvider
    .otherwise('/app/dashboard');
    $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'tpl/app.html'
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
          return $ocLazyLoad.load([
            'js/controllers/material/CategoryListController.js'
            ]);
        }]
      }
    })
    .state('app.category_detail', {
      url: '/category_detail',
      templateUrl: 'tpl/material/category_detail.html'
    })
    .state('app.material_list', {
      url: '/material_list',
      templateUrl: 'tpl/material/material_list.html'
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
          return uiLoad.load( ['js/controllers/signin.js'] );
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
  }
  ]
  );