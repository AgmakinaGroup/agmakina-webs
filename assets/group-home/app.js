
(function(){
  var D={"r1": [["Kembali Villas", "Balangan · Uluwatu", "78c38c4933.mp4", "d61cfc9edc.jpg"], ["Santanyi Villas", "Ungasan · Uluwatu", "2a03fe27c8.mp4", "f81f575589.jpg"], ["Bingin Hills Villas", "Uluwatu", "552dcb2bfb.mp4", "2eea55e3d2.jpg"], ["Jepun Sari Hotel", "Uluwatu", "f070867270.mp4", "2d45bc8f41.jpg"], ["Moraira Villas", "Bingin · Uluwatu", "aed6ec5fe1.mp4", "f34a322758.jpg"], ["SDB Villas", "Ungasan · Uluwatu", "68aa2f053c.mp4", "e8390cbc0e.jpg"], ["Malvarrosa Villas", "Bingin · Uluwatu", "ab081eb5c7.mp4", "e55c1f185f.jpg"], ["Arrecife Villas", "Ungasan · Uluwatu", "d50e5f39c6.mp4", "f1cfc05390.jpg"], ["Ribamar Villas", "Bingin · Uluwatu", "3e4e56d8a3.mp4", "59bd5cdb93.jpg"]], "r2": [["Kembali Villas", "Balangan · Uluwatu", "f7621c249b.mp4", "168153014a.jpg"], ["Santanyi Villas", "Ungasan · Uluwatu", "356c667a08.mp4", "1f810f5f2a.jpg"], ["Bingin Hills Villas", "Uluwatu", "ff7543b48d.mp4", "9df850642b.jpg"], ["Jepun Sari Hotel", "Uluwatu", "70dc8f66c4.mp4", "26b3c380ca.jpg"], ["Moraira Villas", "Bingin · Uluwatu", "2d9445116d.mp4", "1bb8e92cf7.jpg"], ["SDB Villas", "Ungasan · Uluwatu", "baca988639.mp4", "430671a472.jpg"], ["Malvarrosa Villas", "Bingin · Uluwatu", "58772b9c21.mp4", "c1c3c65eb2.jpg"], ["Masuka Hotel", "Uluwatu", "d850d4feac.mp4", "100463e3b6.jpg"], ["Elmon Hotel", "Uluwatu", "feb2248b5b.mp4", "b994823c56.jpg"]], "cdn": "https://cdn.jsdelivr.net/gh/AgmakinaGroup/agmakina-webs@main/assets/group-home"};
  function tile(t){return '<div class="tile"><span class="tg op">Now renting</span><video autoplay muted loop playsinline preload="none" poster="'+D.cdn+'/'+t[3]+'"><source src="'+D.cdn+'/'+t[2]+'" type="video/mp4"></video><div class="cap">'+t[0]+'<small>'+t[1]+'</small></div></div>';}
  function fill(sel,arr){var el=document.querySelector(sel);if(!el)return;var h='';for(var i=0;i<arr.length;i++)h+=tile(arr[i]);el.innerHTML=h+h;}
  fill('.marq .r1',D.r1);fill('.marq .r2',D.r2);
})();



(function(){
  var f=document.getElementById('leadForm'); if(!f) return;
  f.addEventListener('submit',function(e){e.preventDefault();
    var g=function(n){var el=f.querySelector('[name="'+n+'"]');return el?el.value.trim():'';};
    var t='Hola Agmakina, quiero una sesion de inversion en Bali.%0ANombre: '+encodeURIComponent(g('nombre'))+'%0AEmail: '+encodeURIComponent(g('email'))+'%0ATelefono: '+encodeURIComponent(g('telefono'))+'%0A'+encodeURIComponent(g('msg'));
    window.open('https://wa.me/6282342834766?text='+t,'_blank');
  });
})();



  (function(){
    var f=new Intl.NumberFormat('en-US');
    var cap=document.getElementById('cap');
    var el=function(i){return document.getElementById(i)};
    var BALI=.10;
    function r(){
      var v=+cap.value, pct=(v-cap.min)/(cap.max-cap.min)*100;
      cap.style.setProperty('--pct',pct+'%');
      var an=v*BALI, mo=an/12;
      el('capOut').innerHTML=f.format(v)+'&euro;';
      el('moOut').textContent=f.format(Math.round(mo));
      el('anOut').innerHTML=f.format(Math.round(an))+'&euro;';
      el('decOut').innerHTML=f.format(Math.round(an*10))+'&euro;';
    }
    cap.addEventListener('input',r);
    document.getElementById('pick').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;[].forEach.call(this.children,function(c){c.classList.remove('on')});b.classList.add('on');cap.value=b.dataset.p;r()});
    r();
    var els=document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches){
      var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});
      els.forEach(function(e){io.observe(e)});
      setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},3500);
    } else els.forEach(function(e){e.classList.add('in')});
  })();
