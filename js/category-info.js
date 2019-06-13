angular.module('app', [])
    .controller('gitHubDataController', ['$scope', '$http', function($scope, $http) {

        var getCategoryInfo = function() {
            return $http.get("../categories/category_info.json", {
                    cache: true
                })
                .then(function (res) {
                    return res.data;
                });
        }

        var myDataPromise = getCategoryInfo();
        myDataPromise.then( function(catsObj) {
            $scope.cats = Object.keys(catsObj.data);
            $scope.catData = [];
           // console.log("inside first promise");
            angular.forEach($scope.cats, function(value, key) {
                var data = catsObj["data"][value];
                $scope.catData.push(data);
                              
            });
        });

        var getReposInfo = function() {
            return $http.get("./explore/github-data/labReposInfo.json", {
                cache: true
            })
                .then(function(res){
                    return res.data;
                });
        }

        var myRepoDataPromise = getReposInfo();
        myRepoDataPromise.then(function(reposObj){
            $scope.allRepos = Object.keys(reposObj.data);
            $scope.topicRepos = [];
            angular.forEach($scope.allRepos, function(value, key){
                var repoData = reposObj["data"][value];
                $scope.topicRepos.push(repoData);
                //console.log(repoData.repositoryTopics);
                //console.log("-------------");
            })
        });
    }]);
