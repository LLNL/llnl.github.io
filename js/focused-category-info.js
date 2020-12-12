angular.module('app', []).controller('gitHubDataController', [
    '$scope',
    '$http',
    '$window',
    '$location',
    function($scope, $http, $window, $location) {
        var getCategoryInfo = $http.get('/category/category_info.json', {
            cache: true
        });

        var getReposTopics = $http.get('/explore/github-data/intRepos_Topics.json', {
            cache: true
        });

        var getReposInfo = $http.get('/explore/github-data/intReposInfo.json', {
            cache: true
        });

        //function to sort repos in descending order of stars
        function sortByStars(array, key) {
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];
                return x > y ? -1 : x < y ? 1 : 0;
            });
        }

        //sort by alphabetical key
        function sortAlphabetically(array, key) {
            return array.sort(function(a, b) {
                var x = a[key].toLowerCase();
                var y = b[key].toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
        }

        //check if repo is tagged as one of the categories
        function containsTopics(catTopics, repoTopics) {
            if (catTopics.length == 0) {
                return true;
            }
            for (var i = 0; i < catTopics.length; i++) {
                if ($.inArray(catTopics[i], repoTopics) != -1) {
                    return true;
                }
            }
            return false;
        }

        function titleCase(str) {
            return str
                .toLowerCase()
                .split(' ')
                .map(function(word) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(' ');
        }

        $scope.orderProp = '-stars';

        $scope.showHamburger = false;

        getCategoryInfo.then(function(response) {
            var catsObj = response.data.data;
            $scope.cats = Object.keys(catsObj);
            $scope.catData = [];
            angular.forEach($scope.cats, function(value, key) {
                var data = catsObj[value];
                data['displayTitle'] = titleCase(data.title);
                $scope.catData.push(data);
            });
            $scope.catData = sortAlphabetically($scope.catData, 'title');
            var complete = {
                title: 'ALL SOFTWARE',
                icon: {
                    path: '/assets/images/catalog.svg',
                    alt: 'All Software'
                },
                description: 'Browse all LLNL open source projects',
                displayTitle: 'All Software',
                topics: []
            };
            $scope.catData.unshift(complete);

            var catTitle = $location.path().slice(1);

            //set selected index to whatever category is currently being displayed
            for (var c in $scope.catData) {
                var modified = $scope.catData[c].title.replace(/ /g, '');
                console.log('modified: ' + modified + ' catTitle: ' + catTitle);
                if (modified == catTitle) {
                    $scope.currentLocation = $scope.catData[c].title;
                    $scope.selectedIndex = $scope.catData.indexOf($scope.catData[c]);
                    console.log('selectedIndex: ' + $scope.selectedIndex);
                }
                if (catTitle == '') {
                    var index = $scope.catData.length - 1;
                    $scope.selectedIndex = index;
                    var result = $scope.catData[index].title.replace(/ /g, '');
                    $window.location.href = '../category#' + result;
                }
            }

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
                        var included = containsTopics(cat.topics, topics);
                        if (included) {
                            catRepos.push({ nameWithOwner: r });
                        }
                    }
                    $scope.topicRepos.push(catRepos);
                }

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
                                    category[count]['ownerAvatar'] = reposInfoObj[repo].owner.avatarUrl;
                                    category[count]['owner'] = reposInfoObj[repo].owner.login;
                                    category[count]['stars'] = reposInfoObj[repo].stargazers.totalCount;
                                    category[count]['gitUrl'] = reposInfoObj[repo].url;
                                    category[count]['homepageUrl'] = reposInfoObj[repo].homepageUrl;
                                    if (reposInfoObj[repo].primaryLanguage) {
                                        category[count]['language'] = reposInfoObj[repo].primaryLanguage.name;
                                    } else {
                                        category[count]['language'] = '';
                                    }
                                    category[count]['forks'] = reposInfoObj[repo].forks.totalCount;
                                }
                            }
                        }
                    }
                    //sort categories by stars descending
                    for (var i in $scope.topicRepos) {
                        $scope.topicRepos[i] = sortByStars($scope.topicRepos[i], 'stars');
                    }
                });

                //create function for generating hash url for each repo
                $scope.repoHref = function(nametag) {
                    $window.location.href = '../repo#' + nametag;
                };

                //function to generate hash url for each category
                $scope.categoryHref = function(nametag) {
                    var result = nametag.replace(/ /g, '');
                    $window.location.href = '../category#' + result;
                };
            });
        });
    }
]);
