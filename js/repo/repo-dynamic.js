angular.module('app', [])
    .controller('repoDataController', ['$scope', '$http', '$location', function($scope, $http, $location) {
        var hash = $location.url().substring(1);

        var promiseRepoInfo = $http.get("../explore/github-data/labReposInfo.json", {
            cache: true
        });

        var promiseRepoLic = $http.get("../explore/github-data/labRepos_Licenses.json", {
            cache: true
        });

        var promiseRepoPI = $http.get("../explore/github-data/labRepos_PullsIssues.json", {
            cache: true
        });

        promiseRepoInfo.then( function(response) {
            var reposObj = response.data.data;
            if (reposObj.hasOwnProperty(hash)) {
                var data = reposObj[hash];
                $scope.repo = data;
                draw_graphs(hash);
            } else {
                repo404();
            }
        });

        promiseRepoLic.then( function(response) {
            var repoLicObj = response.data.data
            if (repoLicObj.hasOwnProperty(hash)) {
                var data = repoLicObj[hash]["licenseInfo"];
                $scope.licenseInfo = data;
            }
        });

        promiseRepoPI.then( function(response) {
            var repoPIObj = response.data.data
            if (repoPIObj.hasOwnProperty(hash)) {
                var sumP = 0;
                var sumI = 0;
                var pullCounters = ["pullRequests_Merged", "pullRequests_Open"];
                var issueCounters = ["issues_Closed", "issues_Open"];
                pullCounters.forEach(function(c) {
                    sumP += repoPIObj[hash][c]["totalCount"];
                });
                issueCounters.forEach(function(c) {
                    sumI += repoPIObj[hash][c]["totalCount"];
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
