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
        $scope.repoData = [];

        angular.forEach($scope.orgs, function(value, key){
            console.log(value);
            $http.get("https://api.github.com/users/" + value)
                .success(function (data) {
                    $scope.userData = data;
                    console.log(data);
                    loadRepos();
                });
        });

        var loadRepos = function () {
            $http.get($scope.userData.repos_url + "?per_page=100")
                .success(function (data) {
                    $scope.repoData = $scope.repoData.concat(data);
                    console.log(data);
                });
        };

        $scope.predicate = '-stargazers_count';
}]);
