angular.
module('tid-custom', ['ngAnimate'])
    .filter('categoryIcon', function() {
        return function(val) {
            var icons = {
                'event': 'fa-calendar',
                'multimedia': 'fa-photo-film',
                'new-repo': 'fa-github',
                'story': 'fa-file-pen'
            }
            return icons[val] || 'fa-newspaper';
        };
    })
    .filter('titleCase', function() {
        return function(str) {
            return str.replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        };
    }).filter('deslugify', function() {
        return function(str) {
            return str.split('-').join(' ');
        };
    }).filter('safeHtml', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }).filter('localeDate', function() {
        return function(val) {
            options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return val.toLocaleDateString(undefined, options);
        };
    });

angular.module("app", ['tid-custom']).controller("PostController", function($scope, $sce) {
    $scope.sortByValue = '-date';
    $scope.lowerBoundYear = 2023;

    for (var i = 0; i < posts.items.length; i++) {
        var post = posts.items[i],
            parsedDate = new Date(post.date.year, post.date.month, post.date.day);
        posts.items[i].date = parsedDate;
    }

    $scope.years = years.items;
    $scope.categories = categories.items;
    $scope.posts = posts.items;

    $scope.activeCategory = null;
    $scope.activeYear = null;

    $scope.filterPostsByCategory = function(value) {
        if (!$scope.activeCategory) {
            return true;
        }
        return value.categories.indexOf($scope.activeCategory) > -1;
    };

    $scope.filterYearsByLowerBoundYear = function(value) {
        return value >= $scope.lowerBoundYear;
    };

    $scope.filterPostsByLowerBoundYear = function(value) {
        var year = value.date.getFullYear();
        return year >= $scope.lowerBoundYear;
    };

    $scope.filterPostsByActiveYear = function(value) {
        if (!$scope.activeYear) {
            return true;
        }
        var year = value.date.getFullYear();
        return $scope.activeYear == year;
    };

    $scope.setCategory = function(category) {
        $scope.activeCategory = category;
        if (typeof _paq !== 'undefined') {
            _paq.push(['trackEvent', 'News', 'Category Filter', category]);
        }
    }

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
            _paq.push(['trackEvent', 'News', 'Year Filter', actionName]);
        }
    }
});