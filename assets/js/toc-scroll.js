window.addEventListener('load', function() {
    const headings = Array.from(
      document.querySelectorAll('h2[id], h3[id]')
    ).filter(element => !element.closest('.accordion'));
    const jumpLinks = document.querySelectorAll('.jump-links a'),
      jumpLinkLookup = {},
      jumpLinkTargetLookup = {};
        
    // create jumplink/heading lookups
    for (var i = 0; i < jumpLinks.length; i++) {
      const element = jumpLinks[i];
      const targetId = element.getAttribute('href');
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          jumpLinkLookup[targetId] = element;
          jumpLinkTargetLookup[element] = targetElement;
        }
      }
    }

    // if jump link is not active after jump-scroll, make it active (to account for headings that cannot be at the top of the page)
    for (var i = 0; i < jumpLinks.length; i++) {
      jumpLinks[i].addEventListener('click', function(event) {
        window.addEventListener('scrollend', function(e) {
          if (!event.target.classList.contains('active')) {
            jumpLinks.forEach(function(e) {
              e.classList.remove('active');
            });
            event.target.classList.add('active');
          }
        }, {once: true, passive: true});
      });
    }

    // activate jump link and change URL hash based on scroll position
    document.addEventListener('scroll', function(e) {
      for (var i = 0; i < headings.length; i++) {
        const element = headings[i],
          isHidden = element.offsetParent === null,
          rect = element.getBoundingClientRect();
        if(!isHidden && rect.top >= 0 && rect.top < 150) {
          changeHash(element, jumpLinks, jumpLinkLookup);
        }
      }
    });

    // set active jumpLink on page load
    const urlParts = window.location.toString().split('#'),
    location = urlParts[0],
    rawHash = urlParts[1] || '';
    if (rawHash) {
      var hash = '#' + rawHash;
      setHash(hash, jumpLinks, jumpLinkLookup);
    }
});

function changeHash(element, jumpLinks, jumpLinkLookup) {
  const urlParts = window.location.toString().split('#'),
    location = urlParts[0],
    oldHash = urlParts[1] || '',
    newHash = '#' + element.id;
  if (newHash !== oldHash) {
    setHash(newHash, jumpLinks, jumpLinkLookup);
  }
}

function setHash(hash, jumpLinks, jumpLinkLookup) {
  const urlParts = window.location.toString().split('#'),
    location = urlParts[0];
  history.replaceState(null, null, location + hash);
    const jumpLinkElement = jumpLinkLookup[hash];
    if (jumpLinkElement) {
      jumpLinks.forEach(function(e) {
        e.classList.remove('active');
      });
      jumpLinkElement.classList.add('active');
    }
}