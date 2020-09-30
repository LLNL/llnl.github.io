app.service('Category', function() {
    //sort by alphabetical key
    this.sortAlphabetically = function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key].toLowerCase();
            var y = b[key].toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
    };

    //sort repos in descending order of stars
    this.sortStars = function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return x > y ? -1 : x < y ? 1 : 0;
        });
    };

    //check if repo is tagged as one of the categories
    this.containsTopics = function(catTopics, repoTopics) {
        for (var i = 0; i < catTopics.length; i++) {
            if ($.inArray(catTopics[i], repoTopics) != -1) {
                return true;
            }
        }
        return false;
    };

    //check if repo is tagged as "radiuss" as well as one of the categories
    this.containsRadiussTopics = function(catTopics, repoTopics) {
        for (var i = 0; i < catTopics.length; i++) {
            if ($.inArray(catTopics[i], repoTopics) != -1 && $.inArray('radiuss', repoTopics) != -1) {
                return true;
            }
        }
        return false;
    };

    this.uniqueLogo = function(logos, fileName, ownerAvatar) {
        var match = false;
        var file;
        for (var f in logos) {
            if (logos[f] == fileName) {
                match = true;
                file = logos[f];
            }
        }
        //if repo has unique logo use it
        if (match) {
            return '/assets/images/logos/' + file;
        }
        //if repo does not have unique logo use org logo
        else if (!match) {
            return ownerAvatar;
        }
    };
});
