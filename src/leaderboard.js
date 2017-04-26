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
          { endpoint: baseurl + "001", title: 'Red Hat JBoss EAP7', issue: 'Classloading Issue'},
          { endpoint: baseurl + "002", title: 'Red Hat JBoss EAP7', issue: 'Logging Issue'},
          { endpoint: baseurl + "003", title: 'Red Hat Enterprise Linux 7', issue: ''},
          { endpoint: baseurl + "004", title: 'Red Hat Insights', issue: ''},
          { endpoint: baseurl + "005", title: 'Red Hat OpenShift', issue: ''},
          { endpoint: baseurl + "006", title: 'Red Hat OpenStack Platform', issue: 'Launching New Instance'},
          { endpoint: baseurl + "007", title: 'Red Hat OpenStack Platform', issue: 'Deleting Security Group'},
          { endpoint: baseurl + "008", title: 'Red Hat Satellite', issue: ''},
          { endpoint: baseurl + "009", title: 'Red Hat Ceph Storage', issue: ''}
        ],
        i = 0,
        maxLeaders = 10,
        updateInterval = 5000,
        serviceUrl = challenges[i].endpoint;

    function setSubtitle($index) {
      setTimeout( function () {
        if (challenges[$index].issue === "") {
          subtitle.innerHTML = challenges[$index].title;
        }
        else {
          subtitle.innerHTML = challenges[$index].title + " - " + "<span>" + challenges[$index].issue + "</span>";
        }
      }, 500);
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
