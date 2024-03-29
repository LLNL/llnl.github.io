angular.module("app", []).controller("ProjectController", function($scope) {
  $scope.query = '';
  $scope.sortBy = '-stargazers.totalCount';
  $scope.sortByReverse = false;
  $scope.showProprietaryRepositories = true;
  $scope.pageNumber = 1;
  $scope.perPage = 12;

  $scope.categories = [];
  $scope.repositories = [];
  $scope.activeCategory = null;
  $scope.Math = Math;

  $scope.filterByCategory = function(value) {
      var isInCategory = false;
      if ($scope.activeCategory.topics) {
          if (value.topics && value.topics.length) {
              for (var i = 0; i < value.topics.length; i++) {
                  var valueTopic = value.topics[i];
                  if ($scope.activeCategory.topics.indexOf(valueTopic.topic.name) > -1) {
                      isInCategory = true;
                      break;
                  }
              }
          }
      } else {
          isInCategory = true;
      }
      return isInCategory;
  };

  $scope.filterByPrivacy = function(value) {
      if ($scope.showProprietaryRepositories) {
          return true;
      }
      return !value.isProprietary;
  };

  $scope.filterByQuery = function(value) {
      var queryMatch = true;
      if (!$scope.query || !$scope.query.trim()) {
          return true;
      }
      var query = $scope.query.toLowerCase(),
          name = value.name.toLowerCase(),
          description = value.description ? value.description.toLowerCase() : '',
          queryMatch = name.indexOf(query) > -1 || description.indexOf(query) > -1;
      return queryMatch;
  };

  $scope.range = range;
  $scope.console = console;

  $scope.setPage = function(pageNumber) {
      $scope.pageNumber = 1;
      $scope.pageNumber = pageNumber;
  }

  $scope.setCategory = function(category) {
      $scope.pageNumber = 1;
      $scope.activeCategory = category;
  }

  $scope.onCategoryChange = function() {
      if ($scope.activeCategory.url) {
          window.location.href = $scope.activeCategory.url;
      }
  }

  $scope.$evalAsync(function() {
      const dataSubdomain = '/visualize/github-data/',
          categoryInfoURL = dataSubdomain + 'category_info.json',
          repositoryTopicsURL = dataSubdomain + 'intRepos_Topics.json',
          repositoryInfoURL = dataSubdomain + 'intReposInfo.json',
          repositoryInfoProprietaryURL = dataSubdomain + 'intReposInfo_Private.json',
          repositoryLogoURL = dataSubdomain + 'repo_logos.json',
          categoryPromise = window.fetch(categoryInfoURL),
          repositoryTopicsPromise = window.fetch(repositoryTopicsURL),
          repositoryInfoPromise = window.fetch(repositoryInfoURL),
          repositoryInfoProprietaryPromise = window.fetch(repositoryInfoProprietaryURL),
          repositoryLogoPromise = window.fetch(repositoryLogoURL);

      Promise.all([categoryPromise, repositoryTopicsPromise, repositoryInfoPromise, repositoryInfoProprietaryPromise, repositoryLogoPromise]).then(function(responses) {
          const promises = [];
          for (var i = 0; i < responses.length; i++) {
              var response = responses[i];
              if (!response.ok) {
                  throw Error(response.url + ' failed to resolve: ' + response.statusText);
              }
              promises.push(response.json());
          }
          Promise.all(promises).then(function(data) {
              const categoryInfo = data[0],
                  repositoryTopics = data[1],
                  repositoryInfo = data[2],
                  repositoryInfoProprietary = data[3],
                  repositoryLogos = data[4];
              $scope.categories = Object.values(categoryInfo.data);
              $scope.activeCategory = categoryInfo.data['All Software'];

              for (var key in repositoryInfo.data) {
                  repositoryInfo.data[key].displayName = repositoryInfo.data[key].nameWithOwner;
                  repositoryInfo.data[key] = repositoryInfo.data[key];
              }

              for (var key in repositoryInfoProprietary.data) {
                  repositoryInfoProprietary.data[key].isProprietary = true;
                  repositoryInfoProprietary.data[key].displayName = repositoryInfoProprietary.data[key].name;
                  repositoryInfo.data[key] = repositoryInfoProprietary.data[key];
              }

              for (var key in repositoryTopics.data) {
                  repositoryInfo.data[key].topics = repositoryTopics.data[key].repositoryTopics.nodes;
              }
              for (var key in repositoryInfo.data) {
                  var newKey = key.toLowerCase();
                  for (var i = 0; i < repositoryLogos.data.length; i++) {
                      var logo = repositoryLogos.data[i];
                      if (logo.includes(newKey)) {
                          repositoryInfo.data[key].logo = logo;
                      }
                  }
              }
              var repositories = Object.values(repositoryInfo.data);
              $scope.repositories = Object.values(repositories);
              $scope.$apply();
          });
      });
  });
});

function range(min, max, step) {
  step = step || 1;
  var input = [];
  for (var i = min; i <= max; i += step) {
      input.push(i);
  }
  return input;
};