(function () {
    'use strict';

    /*global angular, _*/
    angular.module('leaderboard', ['ordinal'])
        .directive('plLeaderboard', leaderboard)
        .factory('leaderboardservice', leaderboardservice);

    leaderboardservice.$inject = ['$http'];
    LeaderboardController.$inject = ['$scope', '$interval', 'leaderboardservice'];

    var serviceUrls = [
          'http://85.190.180.154/leaderboard/cee-su-001',
          'http://85.190.180.154/leaderboard/cee-su-002',
          'http://85.190.180.154/leaderboard/cee-su-003',
          'http://85.190.180.154/leaderboard/cee-su-004',
          'http://85.190.180.154/leaderboard/cee-su-005',
          'http://85.190.180.154/leaderboard/cee-su-006',
          'http://85.190.180.154/leaderboard/cee-su-007',
          'http://85.190.180.154/leaderboard/cee-su-008',
          'http://85.190.180.154/leaderboard/cee-su-009'
        ],
        serviceUrlIndex = 0,
        maxLeaders = 10,
        updateInterval = 5000,
        serviceUrl = serviceUrls[serviceUrlIndex];

    setInterval(function () {
      serviceUrl = serviceUrls[serviceUrlIndex];
      serviceUrlIndex += 1;
      serviceUrlIndex %= serviceUrls.length;
    }, 5000);

    function leaderboard() {
        var directive = {
            restrict: 'AE',
            templateUrl: 'leaderboard.html',
            controller: LeaderboardController,
            controllerAs: 'vm'
        };

        return directive;
    }

    function leaderboardservice($http) {
        return {
            getLeaders: getLeaders
        };

        function getLeaders() {
            return $http.get(serviceUrl)
                .then(getLeadersComplete)
                .catch(getLeadersFailed);

                function getLeadersComplete(response) {
                  const leaders = _(response.data)
                      .sortBy('score')
                      .uniqBy('visitor')
                      .take(10)
                      .value();

                  return leaders;
                }

            function getLeadersFailed(error) {
              /*
               * there was an error
               */
              console.error(error);
            }
        }
    }

    function LeaderboardController($scope, $interval, leaderboardservice) {
        var vm = this;
        vm.leaders = [];

        $interval(getLeaders, updateInterval);
        getLeaders();

        function getLeaders() {
            return leaderboardservice.getLeaders()
                .then(function (data) {
                    vm.leaders = data;
                    return vm.leaders;
                });
        }
    }
}());
