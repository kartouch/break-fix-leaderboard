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
        challengeTitles = [
          'Red Hat Insights',
          'Red Hat JBoss EAP7',
          'Red Hat OpenShift',
          'Red Hat Satellite',
          'Red Hat OpenStack Platform',
          'Red Hat Ceph Storage',
          'Red Hat Jboss EAP7',
          'Red Hat OpenStack Platform',
          'Red Hat Enterprise Linux 7'
        ],
        serviceUrlIndex = 0,
        maxLeaders = 10,
        updateInterval = 5000,
        serviceUrl = serviceUrls[serviceUrlIndex];

    function setSubtitle($index) {
      subtitle.innerHTML = challengeTitles[$index];
    }

    function timerInterval() {
      var interval = setInterval(function () {
        serviceUrlIndex += 1;
        serviceUrlIndex %= serviceUrls.length;
        serviceUrl = serviceUrls[serviceUrlIndex];
        setSubtitle(serviceUrlIndex);
      }, updateInterval);
    }

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

      setSubtitle(0);
      timerInterval();
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
