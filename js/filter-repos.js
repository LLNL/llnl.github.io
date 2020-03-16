// Script for filtering the repository results based on search strings

$(function() {
    function tokenize(str) {
        return str
            .replace(/\s+/g, ' ')
            .split(' ')
            .filter(function(s) {
                return s !== '';
            });
    }

    function simple_text(str) {
        return str.toLowerCase().replace(/\s+/g, ' ');
    }

    $('#filterRepos').on('input', function() {
        var $allRepos = $('.flex-item');

        var text = $(this)
            .val()
            .toLowerCase();

        if (text === '') {
            $allRepos.show();
            return;
        }

        var $matches = $(tokenize(text));

        // Hide everything first
        $allRepos.hide();

        $allRepos.each(function() {
            var $repo = $(this);

            var text = simple_text($repo.text());

            var num_matched = 0;

            $matches.each(function() {
                if (text.search(this) > -1) {
                    num_matched += 1;
                }
            });

            if (num_matched === $matches.length) {
                $repo.show();
            }
        });
    });
});
