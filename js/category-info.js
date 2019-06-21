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

        //function to sort repos in descending order of stars
        function sortByStars(array, key) {
            return array.sort(function(a, b) {
                var x = a[key] ; var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }

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
                                //save only necessary data fields
                                $scope.topicRepos[j]["name"]= reposInfoObj[i].name;
                                $scope.topicRepos[j]['ownerAvatar'] = reposInfoObj[i].owner.avatarUrl;
                                $scope.topicRepos[j]['ownerLogin'] = reposInfoObj[i].owner.login;
                                $scope.topicRepos[j]['stars'] = reposInfoObj[i].stargazers.totalCount;
                                $scope.topicRepos[j]["gitUrl"]= reposInfoObj[i].url;
                                $scope.topicRepos[j]["homepageUrl"]= reposInfoObj[i].homepageUrl;
                            }
                        }
                    }
                    //sort repos by stars descending
                    $scope.topicRepos = sortByStars($scope.topicRepos, "stars");
                });

                //create function for generating hash url for each repo
                $scope.repoHref = function(nametag) {
                    $window.location.href = '../repo#'+nametag;
                };
            });
        });
    }]);
