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

        var getRepoLic = function() {
            return $http.get("../explore/github-data/labRepos_Licenses.json", {
                    cache: true
                })
                .then(function (res) {
                    return res.data;
                });
        }

        var getRepoPI = function() {
            return $http.get("../explore/github-data/labRepos_PullsIssues.json", {
                    cache: true
                })
                .then(function (res) {
                    return res.data;
                });
        }

        var myDataPromise = getRepoInfo();
        myDataPromise.then( function(reposObj) {
            if (reposObj["data"].hasOwnProperty(hash)) {
                var data = reposObj["data"][hash];
                $scope.repo = data;
                draw_graphs(hash);
            } else {
                repo404();
            }
        });

        var myLicPromise = getRepoLic();
        myLicPromise.then( function(repoLicObj) {
            if (repoLicObj["data"].hasOwnProperty(hash)) {
                var data = repoLicObj["data"][hash]["licenseInfo"];
                $scope.licenseInfo = data;
            }
        });

        var myPIPromise = getRepoPI();
        myPIPromise.then( function(repoPIObj) {
            if (repoPIObj["data"].hasOwnProperty(hash)) {
                var sumP = 0;
                var sumI = 0;
                var pullCounters = ["pullRequests_Merged", "pullRequests_Open"];
                var issueCounters = ["issues_Closed", "issues_Open"];
                pullCounters.forEach(function(c) {
                    sumP += repoPIObj["data"][hash][c]["totalCount"];
                });
                issueCounters.forEach(function(c) {
                    sumI += repoPIObj["data"][hash][c]["totalCount"];
                });
                $scope.count = { "pulls":sumP, "issues":sumI };
                if ($scope.count.pulls) {
                    draw_pie_repoPulls("piePulls", hash);
                }
                if ($scope.count.issues) {
                    draw_pie_repoIssues("pieIssues", hash);
                }
            }
        });

        var repo404 = function() {
            var errorString = '<h1><span class="fa fa-exclamation-circle"></span> Whoops...</h1>';
            if (hash == '') {
                errorString += 'No repository specified.';
            } else {
                errorString += 'The repository "'+hash+'" is not in our catalog.'
            }
            document.getElementById("mainContent").innerHTML = errorString;
        }

        var draw_graphs = function(nametag) {
            draw_line_repoActivity("repoActivityChart", nametag);
            draw_pie_repoUsers("pieUsers", nametag);
            draw_line_repoCreationHistory("repoCreationHistory", nametag);
            draw_cloud_languages("languageCloud", nametag);
            draw_cloud_topics("topicCloud", nametag);
        };

    }]);
