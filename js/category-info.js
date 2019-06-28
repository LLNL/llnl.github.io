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

        //check if repo is tagged as one of the categories
        function containsTopics(catTopics, repoTopics){
            for (var i = 0; i < catTopics.length; i++){
                if($.inArray(catTopics[i], repoTopics) != -1){
                    return true;
                } 
            }
            return false;
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
                var inCategory = true;
                for( var c in $scope.catData){
                    var cat = $scope.catData[c];
                    var catRepos = [];

                    for (var r in reposObj){

                        var repo = reposObj[r];
                        var topics = [];
                        for (var t in repo.repositoryTopics.nodes){
                            var repoTopic = repo.repositoryTopics.nodes[t].topic.name;
                            topics.push(repoTopic);
                        }
                        var included = containsTopics(cat.topics, topics);
                        if(included){
                            catRepos.push({"nameWithOwner": r});
                        }
                    }
                    $scope.topicRepos.push(catRepos);
                }

                getReposInfo.then(function(response){
                    var reposInfoObj = response.data.data;
                    for (var repo in reposInfoObj){
                        //reposInfoObj[repo] is the actual repo object
                        for (var j in $scope.topicRepos){
                            //var category is arrary of objects
                            var category = $scope.topicRepos[j];
                            for (var count in category){
                                // category[count] is a specific repo within a category
                                //if we find a repo that is included in the category repos, we save more info on it
                                if(category[count].nameWithOwner == reposInfoObj[repo].nameWithOwner){
                                    //save only necessary data fields
                                    category[count]["name"]= reposInfoObj[repo].name;
                                    category[count]['ownerAvatar'] = reposInfoObj[repo].owner.avatarUrl;
                                    category[count]['ownerLogin'] = reposInfoObj[repo].owner.login;
                                    category[count]['stars'] = reposInfoObj[repo].stargazers.totalCount;
                                    category[count]["gitUrl"]= reposInfoObj[repo].url;
                                    category[count]["homepageUrl"]= reposInfoObj[repo].homepageUrl;
                                }
                            }
                        }
                    }
                    //sort categories by stars descending
                    for(var i in $scope.topicRepos){
                        $scope.topicRepos[i] = sortByStars($scope.topicRepos[i], "stars");
                    }
                });

                //create function for generating hash url for each repo
                $scope.repoHref = function(nametag) {
                    $window.location.href = '../repo#'+nametag;
                };
            });
        });
    }]);
