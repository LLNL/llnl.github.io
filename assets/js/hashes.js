window.addEventListener('load', function() {
    setupHashTrigger();
    setupHashUpdates();

    function setupHashTrigger() {
        if (!window.location.hash) {
            return;
        }
        const element = document.querySelector(window.location.hash);
        if (!element) {
            return;
        }
        if (element.className.indexOf('accordion-collapse') > -1) {
            new bootstrap.Collapse(element, { show: true });
            recordAccordionOpen(element);
        }
    }

    function setupHashUpdates() {
        const accordionElements = document.querySelectorAll('.accordion');
        accordionElements.forEach(function(element) {
            element.addEventListener('show.bs.collapse', function(event) {
                const hash = '#' + event.target.id;
                window.history.replaceState('', '', hash);
                recordAccordionOpen(element);
            });

            element.addEventListener('hide.bs.collapse', function(event) {
                const hash = '#' + event.target.id;
                if (window.location.hash == hash) {
                    window.history.replaceState('', '', window.location.pathname + window.location.search);
                }
            });

        });
    }

    function recordAccordionOpen(element) {
        if (typeof _paq !== 'undefined') {
          _paq.push(['trackEvent', 'Accordion', 'Opened', element.id]);
        }
    }
});