(function() {
    "use strict"

    const body = document.querySelector('body');

    // Transition effect
    let transition = function(e) {
        let href = this.getAttribute('href');
        let target = this.getAttribute('target');
        if (!href || href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
            return;
        e.preventDefault();
        e.stopPropagation();
        body.classList.add('transition');
        window.setTimeout(function() {
            window.location.href = href;
        }, 50);
    }
    
    body.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('a')) {
                transition.call(target, e);
                break;
            }
        }
    }, false);

    // Remove transition if page loaded from bfcache
    window.addEventListener('pageshow', function(event) {
        if (event.persisted === true) {
            body.classList.remove('transition');
        }
    }, false);

    // Loading animation
    window.addEventListener('load', function() {
        body.classList.remove('is-loading');
        body.classList.remove('transition');
    
        // Fade-in animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });

        const hiddenDrawings = document.querySelectorAll('.hidden');
        hiddenDrawings.forEach((el) => observer.observe(el));
    });

    // Scroll to top
    const arrowToTop = document.querySelector('a.top');
    if (arrowToTop) {
        arrowToTop.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.scrollTo(0, 0);
        });
    };


})();