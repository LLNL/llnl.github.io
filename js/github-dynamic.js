angular.module('app', [])
    .controller('gitHubDataController', ['$scope', '$http', function($scope, $http) {
        $scope.reposLoaded = false;
        $scope.userLoaded = false;
        $scope.username = "llnl";

        $scope.orgs = [
            'chaos',
            'esgf',
            'flux-framework',
            'glvis',
            'llnl',
            'mfem',
            'pruners',
            'rose-compiler',
            'zfsonlinux',
        ];

        $scope.repos = [
            'dun/conman',
            'dun/munge',
            'hpc/dcp',
            'hpc/mpifileutils',
            'hpc/mvapich-cce',
            'hpc/mvapich2-cce',
            'hpc/openlorenz',
            'hpc/Spindle',
        ];

        angular.forEach($scope.orgs, function(value, key) {
            console.log(value);
            $http.get("https://api.github.com/users/" + value, {
                    cache: true
                })
                .success(function(data) {
                    $scope.userData = data;
                    console.log(data);

                    var max_per_page = 100;
                    var per_page = Math.min(data.public_repos, max_per_page)
                    var num_pages = Math.ceil(data.public_repos / per_page);

                    loadOrganizationRepos(num_pages, per_page);
                });
        });

        $scope.repoData = [];
        var loadOrganizationRepoPage = function(page = 1, num_per_page = 100) {
            var query = "?per_page=" + num_per_page + "&page=" + page;

            $http.get($scope.userData.repos_url + query, {
                    cache: true
                })
                .success(function(data) {
                    $scope.repoData = $scope.repoData.concat(data);
                    console.log(data);
                });
        };
        var loadOrganizationRepos = function(num_pages, num_per_page) {
            // Function for aggregating across all pages in an organization
            for (var i = 1; i <= num_pages; i++) {
                loadOrganizationRepoPage(i, num_per_page);
            }
        };

        angular.forEach($scope.repos, function(value, key) {
            $http.get("https://api.github.com/repos/" + value, {
                    cache: true
                })
                .success(function(data) {
                    $scope.repoData = $scope.repoData.concat(data);
                    console.log(data);
                    console.log($scope.userData.repos_url);
                });
        });

        $scope.predicate = '-stargazers_count';
    }]);
