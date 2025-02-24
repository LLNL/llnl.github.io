angular.module("app", ['ngAnimate']).controller("ReleaseController", function($scope) {  
    $scope.sortBy = '-publishedAt.value';
  
    $scope.years = [];
    $scope.releases = [];
    $scope.activeYear = null;

    $scope.lowerBoundYear = 2023;
    
    $scope.filterByPublishedAt = function(value, index, array) {
      return !$scope.activeYear || ($scope.activeYear && value.publishedAt.value.getFullYear() == $scope.activeYear);
    };

    $scope.filterPostsByLowerBoundYear = function(value) {
        var year = value.publishedAt.value.getFullYear();
        return year >= $scope.lowerBoundYear;
    };


    $scope.filterYearsByLowerBoundYear = function(value) {
        return value >= $scope.lowerBoundYear;
    };

    $scope.clearYear = function() {
        $scope.activeYear = null;
    }
  
    $scope.setYear = function(year) {
        var actionName = year;
        if (year === $scope.activeYear) {
            $scope.clearYear();
            actionName = 'All';
        } else {
            $scope.activeYear = year;
        }
        if (typeof _paq !== 'undefined') {
            _paq.push(['trackEvent', 'Release', 'Year Filter', actionName]);
        }
    }

    $scope.sortByPublishedAt = function(a, b) {
        return b.publishedAt - a.publishedAt;
    }
  
    $scope.$evalAsync(function() {
      const dataSubdomain = '/visualize/github-data/',
          releaseInfoURL = dataSubdomain + 'intRepos_ReleaseHistory.json',
          releaseInfoPromise = window.fetch(releaseInfoURL);
        releaseInfoPromise.then(function (response) {
            if (!response.ok) {
                throw Error(response.url + ' failed to resolve: ' + response.statusText);
            }
            response.json().then(function(data) {
                var releases = [],
                    projects = [];
                for(var projectKey in data.data) {
                    var project = data.data[projectKey],
                    projectReleases = project.releases.nodes;
                    for (var i = 0; i < projectReleases.length; i++) {
                        projectReleases[i].project = projectKey;
                    }
                    releases = releases.concat(projectReleases);

                    if (projects.indexOf(projectKey) === -1) {
                        projects.push(projectKey);
                    }
                }

                var years = [];
                for (var i = 0; i < releases.length; i++) {
                    var release = releases[i],
                        rawPublishedAt = release.publishedAt,
                        publishedAt = new Date(rawPublishedAt),
                        year = publishedAt.getFullYear();
                    if (years.indexOf(year) === -1) {
                        years.push(year);
                    }
                    releases[i].publishedAt = {
                        raw: rawPublishedAt,
                        value: publishedAt
                    };
                }

                years.sort().reverse();
                projects.sort().reverse();

                $scope.projects = projects;
                $scope.years = years;
                $scope.releases = releases;
                $scope.$apply();
            });
        });
    });
  });