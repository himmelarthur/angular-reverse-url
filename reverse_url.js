(function () {
    'use strict';

    angular.module('angular-reverse-url', ['ngRoute'])
        .filter('reverseUrl', ['$route', function ($route) {
            var regexp = /:([A-Za-z0-9]*)\\*?\\??/g;

            return function (controller, params) {
                var targetRoute;
                angular.forEach($route.routes, function (route) {
                    if (route.controller === controller) {

                        // we need to check we are passing the parameters in
                        var success = true;
                        var matches = regexp.exec(route.originalPath);

                        // we can't allow empty params if this route is expecting params
                        if ((matches !== null) && (matches.length > 0) && (angular.isDefined(params) === false)) {
                            success = false;
                        }

                        // TODO: check params exist for each match

                        if (success === true) {
                            targetRoute = route.originalPath;
                            return false;
                        }
                    }
                });
                targetRoute = targetRoute.replace(regexp, function (match, pattern) {
                    return params[pattern];
                });
                return '#' + targetRoute;
            };
        }]);
}());
