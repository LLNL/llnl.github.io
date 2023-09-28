(function() {
    function externalLinks() {
        var anchorElements = document.querySelectorAll('a[href^="http"]:not([href*="llnl.gov"], .no-target-blank)');
        for(i = 0;i < anchorElements.length; i++) {
            var element = anchorElements[i];
            element.target = "_blank";
        }
    };
    externalLinks();
})();