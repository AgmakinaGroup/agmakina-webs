/* Agmakina Group — SHARED closing section (final CTA: copy left, form right).
   Single source of truth. Edit here + purge jsDelivr @main → updates on every landing.
   Mount point on each page: <section class="final2" id="reservar"><div class="wrap f2" id="agmk-final"></div></section> */
(function(){
  var WA="6282342834766";
  var m=document.getElementById("agmk-final");
  if(!m) return;
  m.innerHTML=''
    +'<div class="f2-copy reveal in">'
    +'<span class="ey">Free investment session</span>'
    +'<h2>Start your Bali investment with confidence.</h2>'
    +'<p>We match you with the right investment, built for long-term value and performance. Leave your details and an advisor will be in touch personally.</p>'
    +'<div class="f2-lines"><a href="https://wa.me/'+WA+'" target="_blank" rel="noopener">+62 823-4283-4766</a><a href="mailto:info@agmakinagroup.com">info@agmakinagroup.com</a></div>'
    +'</div>'
    +'<form class="lform2 reveal in" id="leadForm">'
    +'<label>Name<input name="nombre" required placeholder="Full name"></label>'
    +'<label>WhatsApp<input name="telefono" type="tel" required placeholder="+34 600 000 000"></label>'
    +'<button class="btn" type="submit">Book a call on WhatsApp &rarr;</button>'
    +'<p class="f2-note">Reply within 24h &middot; No commitment</p>'
    +'</form>';
  var f=document.getElementById("leadForm");
  if(f) f.addEventListener("submit",function(e){
    e.preventDefault();
    var g=function(n){var el=f.querySelector('[name="'+n+'"]');return el?el.value.trim():'';};
    var t='Hi Agmakina, I would like a call about investing in Bali.%0AName: '+encodeURIComponent(g('nombre'))+'%0AWhatsApp: '+encodeURIComponent(g('telefono'));
    window.open('https://wa.me/'+WA+'?text='+t,'_blank');
  });
})();
