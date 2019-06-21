angular.module('app', [])
    .controller('gitHubDataController', ['$scope', '$http', '$window', function($scope, $http, $window) {

        var getCategoryInfo =  $http.get("../categories/category_info.json", {
                    cache: true
                });

        var getReposTopics = $http.get("./explore/github-data/labRepos_Topics.json", {
                cache: true
                });

        var getReposInfo =  $http.get("./explore/github-data/labReposInfo.json", {
                cache: true
                });

        getCategoryInfo.then( function(response) {
            var catsObj = response.data.data;
            $scope.cats = Object.keys(catsObj);
            $scope.catData = [];
            angular.forEach($scope.cats, function(value, key) {
                var data = catsObj[value];
                $scope.catData.push(data);
            });

            getReposTopics.then(function(response){
                var reposObj = response.data.data;
                var allRepos = Object.keys(reposObj);
                $scope.topicRepos = [];
                angular.forEach(allRepos, function(value, key){
                    var repoData = reposObj[value];
                    var topics = [];
                    var containsTopic = false;
                    for(var y in repoData.repositoryTopics.nodes){
                        topics.push(repoData.repositoryTopics.nodes[y].topic.name);
                        for (var z in $scope.catData){
                            if (repoData.repositoryTopics.nodes[y].topic.name== $scope.catData[z].topic){
                                containsTopic = true;
                            }
                        }
                    }
                    if(containsTopic){
                        $scope.topicRepos.push({"nameWithOwner" : value, "topics": topics});
                    }
                });

                getReposInfo.then(function(response){
                    var reposInfoObj = response.data.data;
                    for (var i in reposInfoObj){
                        // console.log("repo name: "+ reposInfoObj.data[i].name);
                        for (var j in $scope.topicRepos){
                            if(reposInfoObj[i].nameWithOwner == $scope.topicRepos[j].nameWithOwner){
                                $scope.topicRepos[j]["name"]= reposInfoObj[i].name;
                                $scope.topicRepos[j]['ownerAvatar'] = reposInfoObj[i].owner.avatarUrl;
                                $scope.topicRepos[j]['ownerLogin'] = reposInfoObj[i].owner.login;
                                $scope.topicRepos[j]["gitUrl"]= reposInfoObj[i].url;
                                $scope.topicRepos[j]["homepageUrl"]= reposInfoObj[i].homepageUrl;
                            }
                        }
                    }
                });

                $scope.repoHref = function(nametag) {
                    $window.location.href = '../repo#'+nametag;
                };
            });
        });
    }]);
