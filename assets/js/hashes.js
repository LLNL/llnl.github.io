window.addEventListener("load", function() {
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
        console.log(element);
        if (element.className.indexOf('accordion-collapse') > -1) {
            new bootstrap.Collapse(element, { show: true} );
        }
    }

    function setupHashUpdates() {
      const accordionElements = document.querySelectorAll('.accordion');
      accordionElements.forEach(function(element){
        element.addEventListener('show.bs.collapse', function(event) {
          const hash = '#' + event.target.id;
          window.history.replaceState('', '', hash);
        });

        element.addEventListener('hide.bs.collapse', function(event) {
          const hash = '#' + event.target.id;
          if (window.location.hash == hash) {
            window.history.replaceState('', '', window.location.pathname + window.location.search);
          }
        });

      });
    }
});