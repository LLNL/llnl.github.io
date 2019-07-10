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

        var getReposLogos =  $http.get("./assets/images/logos/repo_logos.json", {
            cache: true
        });

        //function to sort repos in descending order of stars
        function sortByStars(array, key) {
            return array.sort(function(a, b) {
                var x = a[key] ; var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }

        //sort by alphabetical key
        function sortAlphabetically(array, key){
            return array.sort(function(a,b){
                var x = a[key].toLowerCase() ; var y = b[key].toLowerCase();
                return ((x < y) ? -1 : ((x >y) ? 1:0));
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

        function uniqueLogo(logos, fileName, ownerAvatar){
            var match = false; var file;
            for (var f in logos){
                if (logos[f] == fileName){
                    match = true; file=logos[f];
                }
            }
            //if repo has unique logo use it
            if (match) {
                return  "/assets/images/logos/"+ file;
            }
            //if repo does not have unique logo use org logo
            else if(!match){
                return ownerAvatar;
            }
        }

        getCategoryInfo.then( function(response) {
            var catsObj = response.data.data;
            $scope.cats = Object.keys(catsObj);
            $scope.catData = [];
            angular.forEach($scope.cats, function(value, key) {
                var data = catsObj[value];
                $scope.catData.push(data);
            });
            $scope.catdata = sortAlphabetically($scope.catData, "title");

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

                getReposLogos.then(function(response){
                    var logos = response.data.data;

                    getReposInfo.then(function(response){
                        var reposInfoObj = response.data.data;

                        for (var repo in reposInfoObj){
                            //reposInfoObj[repo] is the actual repo object
                            for (var j in $scope.topicRepos){
                                //var category is array of objects
                                var category = $scope.topicRepos[j];
                                for (var count in category){
                                    // category[count] is a specific repo within a category
                                    //if we find a repo that is included in the category repos, we save more info on it
                                    if(category[count].nameWithOwner == reposInfoObj[repo].nameWithOwner){
                                        category[count]["name"]= reposInfoObj[repo].name;
                                        //call unique logo function to get repo logo uniqueLogo(logos, filename, ownerAvatar)
                                        category[count]['ownerAvatar'] =  uniqueLogo(logos, category[count].nameWithOwner.toLowerCase()+".png", reposInfoObj[repo].owner.avatarUrl);
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

                    //function to generate hash url for each category
                    $scope.categoryHref = function(nametag) {
                        var result = nametag.replace(/ /g, "");
                        $window.location.href = '../category#'+result;
                    };
                });
            });
        });
    }]);
