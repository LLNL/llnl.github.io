app.controller('gitHubDataController', function($scope, $http, $window, Category) {
    var getCategoryInfo = $http.get('../radiuss/category_info_radiuss.json', {
        cache: true
    });

    var getReposTopics = $http.get('../explore/github-data/intRepos_Topics.json', {
        cache: true
    });

    var getReposInfo = $http.get('../explore/github-data/intReposInfo.json', {
        cache: true
    });

    var getReposLogos = $http.get('../assets/images/logos/repo_logos.json', {
        cache: true
    });

    getCategoryInfo.then(function(response) {
        var catsObj = response.data.data;
        $scope.cats = Object.keys(catsObj);
        $scope.catData = [];
        angular.forEach($scope.cats, function(value, key) {
            var data = catsObj[value];
            $scope.catData.push(data);
        });

        //call service function
        $scope.catData = Category.sortAlphabetically($scope.catData, 'title');

        getReposTopics.then(function(response) {
            var reposObj = response.data.data;
            var allRepos = Object.keys(reposObj);
            $scope.topicRepos = [];
            var inCategory = true;
            for (var c in $scope.catData) {
                var cat = $scope.catData[c];
                var catRepos = [];

                for (var r in reposObj) {
                    var repo = reposObj[r];
                    var topics = [];
                    for (var t in repo.repositoryTopics.nodes) {
                        var repoTopic = repo.repositoryTopics.nodes[t].topic.name;
                        topics.push(repoTopic);
                    }
                    //call service function
                    var included = Category.containsRadiussTopics(cat.topics, topics);
                    if (included) {
                        catRepos.push({ nameWithOwner: r });
                    }
                }
                $scope.topicRepos.push(catRepos);
            }

            getReposLogos.then(function(response) {
                var logos = response.data.data;
                getReposInfo.then(function(response) {
                    var reposInfoObj = response.data.data;
                    for (var repo in reposInfoObj) {
                        //reposInfoObj[repo] is the actual repo object
                        for (var j in $scope.topicRepos) {
                            //var category is array of objects
                            var category = $scope.topicRepos[j];
                            for (var count in category) {
                                // category[count] is a specific repo within a category
                                //if we find a repo that is included in the category repos, we save more info on it
                                if (category[count].nameWithOwner == reposInfoObj[repo].nameWithOwner) {
                                    //save only necessary data fields
                                    category[count]['name'] = reposInfoObj[repo].name;
                                    category[count]['description'] = reposInfoObj[repo].description;
                                    //call service function to get repo logo uniqueLogo(logos, filename, ownerAvatar)
                                    category[count]['ownerAvatar'] = Category.uniqueLogo(logos, category[count].nameWithOwner.toLowerCase() + '.png', reposInfoObj[repo].owner.avatarUrl);
                                    category[count]['ownerLogin'] = reposInfoObj[repo].owner.login;
                                    category[count]['stars'] = reposInfoObj[repo].stargazers.totalCount;
                                    category[count]['gitUrl'] = reposInfoObj[repo].url;
                                    category[count]['homepageUrl'] = reposInfoObj[repo].homepageUrl;
                                }
                            }
                        }
                    }
                    //sort categories by stars descending
                    for (var i in $scope.topicRepos) {
                        //call service function
                        $scope.topicRepos[i] = Category.sortStars($scope.topicRepos[i], 'stars');
                    }
                });

                //create function for generating hash url for each repo
                $scope.repoHref = function(nametag) {
                    $window.location.href = '../repo#' + nametag;
                };
            });
        });
    });
});
