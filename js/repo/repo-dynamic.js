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

        var myDataPromise = getRepoInfo();
        myDataPromise.then( function(reposObj) {
            $scope.repos = Object.keys(reposObj.data);
            if (reposObj["data"].hasOwnProperty(hash)) {
                var data = reposObj["data"][hash];
                $scope.repo = data;
                console.log(data);
                draw_graphs($scope.repo.nameWithOwner);
            } else {
                repo404();
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
            draw_cloud_languages("languageCloud", nametag);
            draw_cloud_topics("topicCloud", nametag);
        };

    }]);
