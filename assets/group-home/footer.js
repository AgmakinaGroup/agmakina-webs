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
/* Floating WhatsApp button — appears on every page (global). */
(function(){
  var WA="6282342834766";
  if(document.querySelector(".agmk-wa")) return;
  var a=document.createElement("a");
  a.className="agmk-wa";
  a.href="https://wa.me/"+WA;
  a.target="_blank"; a.rel="noopener"; a.setAttribute("aria-label","Chat on WhatsApp");
  a.innerHTML='<svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.599 5.317l-.999 3.648 3.9-1.664zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
  var s=document.createElement("style");
  s.textContent=".agmk-wa{position:fixed;right:20px;bottom:20px;z-index:90;width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 28px -6px rgba(0,0,0,.5);transition:transform .16s}.agmk-wa:hover{transform:scale(1.06)}@media(max-width:760px){.agmk-wa{bottom:82px;width:52px;height:52px}}";
  document.head.appendChild(s);
  document.body.appendChild(a);
})();
