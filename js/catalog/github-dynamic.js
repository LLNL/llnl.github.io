angular.module('app', [])
    .controller('gitHubDataController', ['$scope', '$http', '$window', function($scope, $http, $window) {

        var promiseRepoInfo = $http.get("/explore/github-data/labReposInfo.json", {
            cache: true
        });

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key].toLowerCase(); var y = b[key].toLowerCase();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        promiseRepoInfo.then( function(response) {
            var reposObj = response.data.data;
            $scope.repos = Object.keys(reposObj);
            $scope.repoData = [];
            angular.forEach($scope.repos, function(value, key) {
                var singleData = reposObj[value];
                if (singleData.primaryLanguage == null) {
                    singleData.primaryLanguage = {"name":"-"}; // Substitute text in case of no language
                }
                $scope.repoData.push(singleData);
                // console.log(singleData);
            });
            $scope.repoData = sortByKey($scope.repoData,"name");
        });

        $scope.predicate = '-stargazers.totalCount';

        $scope.repoHref = function(nametag) {
            $window.location.href = '../repo#'+nametag;
        };

}]);
