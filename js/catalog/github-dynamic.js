angular.module('app', [])
    .controller('gitHubDataController', ['$scope', '$http', '$window', function($scope, $http, $window) {

        var getRepoInfo = function() {
            return $http.get("/explore/github-data/labReposInfo.json", {
                    cache: true
                })
                .then(function (res) {
                    return res.data;
                });
        }

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key].toLowerCase(); var y = b[key].toLowerCase();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

       
        var myDataPromise = getRepoInfo();
       // console.log("catalog github-dynamic")
        myDataPromise.then( function(reposObj) {
            $scope.repos = Object.keys(reposObj.data);
           //console.log("repos: "+ $scope.repos);
            $scope.repoData = [];
         //   console.log("marK");
            angular.forEach($scope.repos, function(value, key) {
                var data = reposObj["data"][value];
                if (data.primaryLanguage == null) {
                    data.primaryLanguage = {"name":"-"}; // Substitute text in case of no language
                }
                $scope.repoData.push(data);
               // console.log("repoData: " + data);
               
            });
            $scope.repoData = sortByKey($scope.repoData,"name")
        });

        $scope.predicate = '-stargazers.totalCount';

        $scope.repoHref = function(nametag) {
            $window.location.href = '../repo#'+nametag;
        };

    }]);
