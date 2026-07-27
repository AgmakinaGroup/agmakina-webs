(function(){var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});els.forEach(function(e){io.observe(e)});setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},3000);}
else els.forEach(function(e){e.classList.add('in')});})();
