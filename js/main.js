'use strict';

angular.module('app').controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window',function($scope,$translate,$localStorage,$window) {
   var isIE = !!navigator.userAgent.match(/MSIE/i);
   isIE && angular.element($window.document.body).addClass('ie');
   isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

   $scope.app = {
        name: 'Frangi',
        version: '1.1.1',

        color: {
            primary: '#7266ba',
            info:    '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger:  '#f05050',
            light:   '#e8eff0',
            dark:    '#3a3f51',
            black:   '#1c2b36'
        },
        settings: {
            themeID: 1,
            navbarHeaderColor: 'bg-black',
            navbarCollapseColor: 'bg-white-only',
            asideColor: 'bg-black',
            headerFixed: true,
            asideFixed: false,
            asideFolded: false,
            asideDock: false,
            container: false
        }
    }

    if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
    } else {
        $localStorage.settings = $scope.app.settings;
    }
    $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
            $scope.app.settings.headerFixed = true;
        }
        $localStorage.settings = $scope.app.settings;
    }, true);

    $scope.User = $localStorage.User;
    
    $scope.lang = { isopen: false };
    $scope.langs = {zh:'中文简体',en:'English'};
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "中文简体";
    $translate.use("zh");
    $scope.setLang = function(langKey, $event) {
        $scope.selectLang = $scope.langs[langKey];
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
    };

    function isSmartDevice( $window )
    {
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

}]);