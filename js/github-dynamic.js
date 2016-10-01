angular.module('app', [])
    .controller('gitHubDataController', ['$scope','$http', function($scope,$http) {
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
            'rose-compiler',
            'zfsonlinux',
        ];

        $scope.repos = [
            'dun/conman',
            'dun/munge',
        ];

        angular.forEach($scope.orgs, function(value, key){
            console.log(value);
            $http.get("https://api.github.com/users/" + value, {cache: true})
                .success(function (data) {
                    $scope.userData = data;
                    console.log(data);
                    loadOrganizationRepos();
                });
        });

        $scope.repoData = [];
        var loadOrganizationRepos = function () {
            $http.get($scope.userData.repos_url + "?per_page=100", {cache: true})
                .success(function (data) {
                    $scope.repoData = $scope.repoData.concat(data);
                    console.log(data);
                });
        };

        angular.forEach($scope.repos, function(value, key){
            $http.get("https://api.github.com/repos/" + value, {cache: true})
                .success(function (data) {
                    $scope.repoData = $scope.repoData.concat(data);
                    console.log(data);
                    console.log($scope.userData.repos_url);
                });
        });

        $scope.predicate = '-stargazers_count';
}]);
