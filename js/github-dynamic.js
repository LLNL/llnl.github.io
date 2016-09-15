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

        angular.forEach($scope.orgs, function(value, key){
            console.log(value);
            $http.get("https://api.github.com/users/" + value, {cache: true})
                .success(function (data) {
                    $scope.userData = data;
                    console.log(data);
                    loadRepos();
                });
        });

        $scope.repoData = [];
        var loadRepos = function () {
            $http.get($scope.userData.repos_url + "?per_page=100", {cache: true})
                .success(function (data) {
                    $scope.repoData = $scope.repoData.concat(data);
                    console.log(data);
                });
        };

        $scope.predicate = '-stargazers_count';
}]);
