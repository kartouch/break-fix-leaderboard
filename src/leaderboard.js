(function () {
    'use strict';

    /*global angular, _*/
    angular.module('leaderboard', ['ordinal'])
        .directive('plLeaderboard', leaderboard)
        .factory('leaderboardservice', leaderboardservice);

    leaderboardservice.$inject = ['$http'];
    LeaderboardController.$inject = ['$scope', '$interval', 'leaderboardservice'];

    var baseurl = 'http://85.190.180.154/leaderboard/cee-su-',
        challenges = [
          { endpoint: baseurl + "001", title: 'Red Hat JBoss EAP7' },
          { endpoint: baseurl + "002", title: 'Red Hat JBoss EAP7 2' },
          { endpoint: baseurl + "003", title: 'Red Hat Enterprise Linux 7' },
          { endpoint: baseurl + "004", title: 'Red Hat Insights' },
          { endpoint: baseurl + "005", title: 'Red Hat OpenShift' },
          { endpoint: baseurl + "006", title: 'Red Hat OpenStack Platform' },
          { endpoint: baseurl + "007", title: 'Red Hat OpenStack Platform 2' },
          { endpoint: baseurl + "008", title: 'Red Hat Satellite' },
          { endpoint: baseurl + "009", title: 'Red Hat Ceph Storage' }
        ],
        i = 0,
        maxLeaders = 10,
        updateInterval = 5000,
        serviceUrl = challenges[i].endpoint;

    function setSubtitle($index) {
      subtitle.innerHTML = challenges[$index].title;
    }

    function timerInterval() {
      var interval = setInterval(function () {
        i += 1;
        i %= challenges.length;
        serviceUrl = challenges[i].endpoint;
        setSubtitle(i);
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
