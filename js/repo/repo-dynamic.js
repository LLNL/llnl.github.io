angular.module('app', [])
    .controller('repoDataController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        var hash = $location.url().substring(1);

        var getRepoInfo = function() {
            return $http.get("../explore/github-data/labReposInfo.json", {
                    cache: true
                })
                .then(function (res) {
                    return res.data;
                });
        }

        var myDataPromise = getRepoInfo();
        myDataPromise.then( function(reposObj) {
            $scope.repos = Object.keys(reposObj.data);
            var data = reposObj["data"][hash];
            if (data.primaryLanguage == null) {
                data.primaryLanguage = {"name":"-"}; // Substitute text in case of no language
            }
            $scope.repo = data;
            console.log(data);
        });

    }]);
