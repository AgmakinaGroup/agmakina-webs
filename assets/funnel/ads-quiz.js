/* === QUIZ /ads TLP — calcado del formulario de articagents.com/ads (mismo diseño y elementos),
   con las preguntas del survey de TLP. Envia a /api/lead (API directa de GHL) y redirige a /calendario.
   Acento adaptado al naranja TLP. El token de GHL vive en el servidor, nunca aqui. === */
(function(){
  var ENDPOINT = "/api/lead";
  var REDIRECT = "/calendario";

  var CSS = ""
   +".aaq{background:#16110c;border:1px solid rgba(255,255,255,.11);border-radius:20px;box-shadow:0 30px 80px -34px rgba(0,0,0,.85);overflow:hidden;text-align:left;width:100%}"
   +".aaq *{box-sizing:border-box}"
   +".aaq .qwrap{padding:22px 24px 24px;display:flex;flex-direction:column;min-height:520px}"
   +".aaq .qhead{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:12px}"
   +".aaq .qstep{font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:#f0863a;font-weight:700}"
   +".aaq .qsecure{font-size:11.5px;color:#8d7f70;letter-spacing:.02em}"
   +".aaq .qbar{height:5px;border-radius:100px;background:rgba(255,255,255,.09);margin:0 0 24px;overflow:hidden}"
   +".aaq .qbar>i{display:block;height:100%;width:12%;background:linear-gradient(120deg,#f0863a,#e8722a);border-radius:100px;transition:width .35s cubic-bezier(.2,.7,.2,1)}"
   +".aaq h3.qq{font-size:clamp(19px,2vw,24px);letter-spacing:-.03em;line-height:1.15;margin:0;font-weight:700;color:#f7f3ee}"
   +".aaq .qsub{color:#b3a698;margin:9px 0 0;font-size:13.5px;line-height:1.45}"
   +".aaq .qopts{display:flex;flex-direction:column;gap:9px;margin:20px 0 6px}"
   +".aaq .qopt{display:flex;align-items:center;gap:12px;background:#1d1712;border:1px solid rgba(255,255,255,.11);border-radius:12px;padding:14px 16px;cursor:pointer;font-size:14.5px;font-weight:600;text-align:left;color:#f7f3ee;width:100%;line-height:1.35;font-family:inherit;transition:border-color .16s,background .16s,transform .12s}"
   +".aaq .qopt:hover{border-color:rgba(240,134,58,.6);transform:translateY(-1px)}"
   +".aaq .qopt .ck{margin-left:auto;width:20px;height:20px;border-radius:50%;border:2px solid rgba(255,255,255,.18);flex:0 0 auto}"
   +".aaq .qopt.sel{border-color:#f0863a;background:rgba(240,134,58,.13)}"
   +".aaq .qopt.sel .ck{background:linear-gradient(120deg,#f0863a,#e8722a);border-color:transparent;position:relative}"
   +".aaq .qopt.sel .ck:after{content:\"\\2713\";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#1a0e04;font-size:12px;font-weight:800}"
   +".aaq .qfield{display:flex;flex-direction:column;gap:10px;margin:20px 0 4px}"
   +".aaq .qfield label{font-size:12.5px;color:#b3a698;margin-bottom:-4px;font-weight:600}"
   +".aaq .qfield input,.aaq .qfield textarea{background:#1d1712;border:1px solid rgba(255,255,255,.11);border-radius:12px;padding:14px 16px;color:#f7f3ee;font-size:15px;font-family:inherit;width:100%;line-height:1.4;resize:vertical}"
   +".aaq .qfield input::placeholder,.aaq .qfield textarea::placeholder{color:#8d7f70}"
   +".aaq .qfield input:focus,.aaq .qfield textarea:focus{outline:none;border-color:#f0863a}"
   +".aaq .qerr{color:#ff5c47;font-size:12.5px;margin:8px 0 0;min-height:15px;font-weight:600}"
   +".aaq .qnav{display:flex;gap:10px;margin-top:auto;padding-top:18px;align-items:center}"
   +".aaq .qback{background:none;border:none;color:#8d7f70;font-size:13px;cursor:pointer;font-family:inherit;font-weight:600;padding:8px 2px}"
   +".aaq .qback:hover{color:#b3a698}"
   +".aaq .qnext{flex:1;background:linear-gradient(120deg,#f0863a,#e8722a);color:#1a0e04;border:none;border-radius:12px;padding:15px 20px;font-size:15.5px;font-weight:800;cursor:pointer;font-family:inherit;letter-spacing:-.01em;transition:transform .12s,filter .16s}"
   +".aaq .qnext:hover{transform:translateY(-1px);filter:brightness(1.06)}"
   +".aaq .qnext[disabled]{opacity:.55;cursor:not-allowed;transform:none}"
   +".aaq .qfoot{margin-top:13px;font-size:11px;color:#8d7f70;letter-spacing:.02em;text-align:center;line-height:1.5}"
   +".aaq .qfoot a{color:#8d7f70;text-decoration:underline}"
   +".aaq .qdone{text-align:center;padding:36px 6px}"
   +".aaq .qdone .tick{width:54px;height:54px;border-radius:50%;margin:0 auto 18px;background:linear-gradient(120deg,#f0863a,#e8722a);display:flex;align-items:center;justify-content:center;font-size:26px;color:#1a0e04;font-weight:800}"
   +"#aaqOverlay{display:none;position:fixed;inset:0;background:rgba(8,5,2,.78);z-index:999;padding:22px;align-items:center;justify-content:center;overflow:auto}"
   +"#aaqOverlay.open{display:flex}"
   +"#aaqOverlay .aaq{max-width:560px;width:100%;position:relative}"
   +"#aaqOverlay .aaqx{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);color:#fff;width:36px;height:36px;border-radius:9px;cursor:pointer;font-size:14px;font-weight:700;z-index:2}"
   +"@media(max-width:520px){.aaq .qwrap{padding:20px 18px 20px;min-height:480px}.aaq .qopt{padding:13px 14px;font-size:14px}}";

  var MARKUP = '<div class="aaq"><div class="qwrap">'
    + '<div class="qhead"><span class="qstep"></span><span class="qsecure">&#128274; Datos protegidos</span></div>'
    + '<div class="qbar"><i></i></div>'
    + '<input type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">'
    + '<div class="qbody"></div>'
    + '<div class="qerr"></div><div class="qnav"></div>'
    + '<div class="qfoot">Sin compromiso &middot; 100% confidencial &middot; Al enviar aceptas la <a href="/es/privacidad">pol\u00edtica de privacidad</a>.</div>'
    + '</div></div>';

  var STEPS = [
    { key:"contacto", q:"Reserva tu sesi\u00f3n estrat\u00e9gica de inversi\u00f3n",
      sub:"30 minutos, gratis. Rellena tus datos y elige hora al final.",
      fields:[
        {name:"full_name", label:"Nombre y apellidos", ph:"Nombre y apellidos", type:"text"},
        {name:"phone",     label:"Tel\u00e9fono / WhatsApp", ph:"+34 600 000 000", type:"tel"},
        {name:"email",     label:"Email",               ph:"tu@email.com",    type:"email"}
      ]},
    { key:"presupuesto", q:"\u00bfCu\u00e1nto quieres invertir?",
      sub:"Nuestras villas en Uluwatu arrancan desde <b>110.000\u20ac</b>, tambi\u00e9n a plazos durante la obra.",
      opts:["Menos de 100.000\u20ac",
            "100.000\u20ac - 150.000\u20ac",
            "150.000\u20ac - 250.000\u20ac",
            "M\u00e1s de 250.000\u20ac"] },
    { key:"cuando", q:"\u00bfCu\u00e1ndo quieres invertir?",
      sub:"Elige la opci\u00f3n que m\u00e1s se ajuste a ti.",
      opts:["\u26a1 Lo antes posible",
            "\ud83d\uddd3\ufe0f En 2-3 meses",
            "\ud83d\udcc5 En unos 6 meses",
            "\ud83d\udc40 Solo estoy ojeando"] },
    { key:"bali", q:"\u00bfHas estado en Bali?",
      sub:"Sin problema si a\u00fan no: te lo ense\u00f1amos todo en la llamada.",
      opts:["\ud83c\udf34 S\u00ed, lo conozco bien",
            "\u2708\ufe0f S\u00ed, de visita",
            "\ud83d\udca1 No, pero me interesa mucho",
            "\ud83d\ude42 No"] }
  ];

  function utms(){
    var p = new URLSearchParams(location.search), o = {};
    ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid","gclid","ad_id","adset_id","campaign_id"]
      .forEach(function(k){ if(p.get(k)) o[k]=p.get(k); });
    return o;
  }
  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function okEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function okPhone(v){ return (v.replace(/[^0-9]/g,"").length >= 9); }
  /* 9 digitos sin prefijo = España -> +34; 00xx -> +xx */
  function normPhone(t){
    t = (t||"").trim().replace(/[\s().-]/g,"");
    if (/^00\d+/.test(t)) return "+" + t.slice(2);
    if (/^\+/.test(t)) return t;
    if (/^\d{9}$/.test(t)) return "+34" + t;
    return t;
  }

  function injectCSS(){
    if (document.getElementById("aaqCSS")) return;
    var st = document.createElement("style"); st.id = "aaqCSS"; st.textContent = CSS;
    document.head.appendChild(st);
  }

  function payloadFrom(data, estado, hpVal){
    var parts = (data.full_name || "").trim().split(/\s+/);
    var body = {
      nombre: data.full_name || "", telefono: normPhone(data.phone), email: data.email || "",
      presupuesto: data.presupuesto || "", cuando: data.cuando || "", bali: data.bali || "",
      first_name: parts.shift() || "", last_name: parts.join(" "),
      formulario: "Cualificacion web TLP", source: "Web agmakinagroup.com",
      page: location.pathname, page_url: location.href.split("#")[0],
      referrer: document.referrer || "", estado: estado, website: hpVal || ""
    };
    var u = utms(); for (var k in u) body[k] = u[k];
    return body;
  }

  function send(body){
    try { return fetch(ENDPOINT, { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify(body), keepalive:true }); }
    catch(e){ return Promise.resolve(); }
  }

  function mount(root){
    injectCSS();
    root.innerHTML = MARKUP;
    var i = 0, data = {}, busy = false, parcialEnviado = false;
    /* recuerda las respuestas si recarga o vuelve (se borra al enviar) */
    var SKEY = "tlpq_v1";
    try { var sv = JSON.parse(localStorage.getItem(SKEY) || "null");
      if (sv && sv.data){ data = sv.data; i = Math.min(sv.i || 0, STEPS.length - 1); parcialEnviado = !!sv.pe; } } catch(e){}
    function saveState(){ try { localStorage.setItem(SKEY, JSON.stringify({ i:i, data:data, pe:parcialEnviado })); } catch(e){} }
    function clearState(){ try { localStorage.removeItem(SKEY); } catch(e){} }
    var card  = root.querySelector(".aaq"),
        body  = card.querySelector(".qbody"),
        nav   = card.querySelector(".qnav"),
        bar   = card.querySelector(".qbar > i"),
        lbl   = card.querySelector(".qstep"),
        errEl = card.querySelector(".qerr"),
        hp    = card.querySelector('[name="company_website"]');

    function err(m){ errEl.textContent = m || ""; }

    function render(){
      var s = STEPS[i];
      err("");
      lbl.textContent = "";
      bar.style.width = Math.round((i / STEPS.length) * 100 + (100/STEPS.length)) + "%";

      var h = '<h3 class="qq">' + s.q + '</h3>';
      if (s.sub) h += '<p class="qsub">' + s.sub + '</p>';

      if (s.opts){
        h += '<div class="qopts">';
        s.opts.forEach(function(t){
          var sel = (data[s.key] === t) ? " sel" : "";
          h += '<button type="button" class="qopt'+sel+'" data-v="'+esc(t)+'">' +
               '<span>'+t+'</span><span class="ck"></span></button>';
        });
        h += '</div>';
      } else {
        h += '<div class="qfield">';
        s.fields.forEach(function(f){
          var v = esc(data[f.name] || "");
          h += '<label for="tlp_'+f.name+'">'+f.label+'</label>';
          h += '<input id="tlp_'+f.name+'" name="'+f.name+'" type="'+f.type+'" placeholder="'+f.ph+'" value="'+v+'">';
        });
        h += '</div>';
      }
      body.innerHTML = h;

      var last = (i === STEPS.length - 1);
      nav.innerHTML = (i > 0 ? '<button type="button" class="qback">&#8592; Atr\u00e1s</button>' : '')
        + (s.opts ? '' : '<button type="button" class="qnext">' + (last ? "Reservar mi llamada" : "Continuar") + '</button>');

      var b = nav.querySelector(".qback"); if (b) b.onclick = function(){ i--; render(); };
      var n = nav.querySelector(".qnext"); if (n) n.onclick = function(){ advance(); };

      Array.prototype.forEach.call(body.querySelectorAll(".qopt"), function(o){
        o.onclick = function(){
          data[STEPS[i].key] = o.getAttribute("data-v");
          Array.prototype.forEach.call(body.querySelectorAll(".qopt"), function(x){ x.classList.remove("sel"); });
          o.classList.add("sel");
          saveState();
          setTimeout(advance, 180);
        };
      });
    }

    function collect(){
      var s = STEPS[i];
      if (!s.fields) return true;
      for (var k = 0; k < s.fields.length; k++){
        var f = s.fields[k], el = body.querySelector('[name="'+f.name+'"]');
        var v = (el.value || "").trim();
        if (!v){ err("Rellena " + f.label.toLowerCase() + "."); el.focus(); return false; }
        if (f.type === "email" && !okEmail(v)){ err("Ese email no parece v\u00e1lido."); el.focus(); return false; }
        if (f.type === "tel"   && !okPhone(v)){ err("Ese tel\u00e9fono no parece v\u00e1lido."); el.focus(); return false; }
        data[f.name] = v;
      }
      return true;
    }

    function advance(){
      if (busy) return;
      if (!collect()) return;
      var s = STEPS[i];
      if (s.opts && !data[s.key]){ err("Elige una opci\u00f3n."); return; }
      /* con nombre+tel+email ya capturados, guardamos el lead aunque abandone (parcial) */
      if (s.key === "contacto" && !parcialEnviado && !(hp && hp.value)){
        parcialEnviado = true; send(payloadFrom(data, "parcial", ""));
      }
      if (i < STEPS.length - 1){ i++; saveState(); render(); return; }
      submit();
    }

    function submit(){
      busy = true;
      clearState();
      bar.style.width = "100%";
      var esSpam = !!(hp && hp.value);
      var payload = payloadFrom(data, "completo", hp ? hp.value : "");

      body.innerHTML = '<div class="qdone"><div class="tick">&#10003;</div>' +
        '<h3 class="qq">Perfecto, ' + esc(payload.first_name) + '</h3>' +
        '<p class="qsub">Te llevamos al calendario para que elijas tu hora\u2026</p></div>';
      nav.innerHTML = ""; err("");

      var go = function(){
        var q = new URLSearchParams({
          first_name: payload.first_name, last_name: payload.last_name,
          email: data.email || "", phone: normPhone(data.phone || "")
        });
        location.href = REDIRECT + "?" + q.toString();
      };
      if (esSpam){ setTimeout(go, 900); return; }
      var req = send(payload);
      if (req && req.finally) req.finally(function(){ setTimeout(go, 500); });
      else setTimeout(go, 800);
      setTimeout(go, 4000); /* red de seguridad: nunca dejar al lead colgado */
    }

    render();
  }

  /* Inline en el hero */
  function boot(){
    var heroEl = document.getElementById("heroQuiz");
    if (heroEl) mount(heroEl);

    /* Overlay propio para los CTAs (a[href*=calendario] o .js-quiz) */
    var ov = document.getElementById("aaqOverlay");
    if (!ov){ ov = document.createElement("div"); ov.id = "aaqOverlay"; document.body.appendChild(ov); }
    function openOverlay(e){ if(e) e.preventDefault();
      injectCSS();
      ov.innerHTML = ""; var box = document.createElement("div"); ov.appendChild(box);
      mount(box);
      var x = document.createElement("button"); x.className = "aaqx"; x.innerHTML = "&#10005;";
      x.onclick = closeOverlay; box.querySelector(".aaq").appendChild(x);
      ov.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeOverlay(){ ov.classList.remove("open"); document.body.style.overflow = ""; }
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeOverlay(); });
    ov.addEventListener("click", function(e){ if (e.target === ov) closeOverlay(); });
    var ctas = document.querySelectorAll('a[href*="calendario"], .js-quiz');
    Array.prototype.forEach.call(ctas, function(c){ c.addEventListener("click", openOverlay); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* ===== Marquee builder (villas reales, jsDelivr) ===== */
(function(){var row=document.getElementById("mqrow"); if(!row) return;
var GH="https://cdn.jsdelivr.net/gh/AgmakinaGroup/agmakina-webs@a90818431acb016c08c396d60a6d30bfa868d4da/assets/group-home/";
var V=[["Kembali Villas","Balangan · Uluwatu","d61cfc9edc.jpg","78c38c4933.mp4"],
["Santanyi Villas","Ungasan · Uluwatu","f81f575589.jpg","2a03fe27c8.mp4"],
["Bingin Hills Villas","Uluwatu","2eea55e3d2.jpg","552dcb2bfb.mp4"],
["Ribamar Villas","Bingin · Uluwatu","59bd5cdb93.jpg","3e4e56d8a3.mp4"],
["Jepun Sari Hotel","Uluwatu","2d45bc8f41.jpg","f070867270.mp4"],
["Moraira Villas","Bingin · Uluwatu","f34a322758.jpg","aed6ec5fe1.mp4"],
["SDB Villas","Ungasan · Uluwatu","e8390cbc0e.jpg","68aa2f053c.mp4"],
["Malvarrosa Villas","Bingin · Uluwatu","e55c1f185f.jpg","ab081eb5c7.mp4"],
["Arrecife Villas","Ungasan · Uluwatu","f1cfc05390.jpg","d50e5f39c6.mp4"]];
/* Los videos NO se descargan con la pagina (el autoplay anula el preload="none"):
   se pintan los posters y cada video carga solo cuando su tile entra en pantalla. */
var lbl=(document.documentElement.lang==="en")?"For rent":"En alquiler";
var h=""; for(var r=0;r<2;r++){for(var i=0;i<V.length;i++){var v=V[i];
h+='<div class="tile"><span class="tg op">'+lbl+'</span><video muted loop playsinline preload="none" poster="'+GH+v[2]+'" data-src="'+GH+v[3]+'"></video><div class="cap">'+v[0]+'<small>'+v[1]+'</small></div></div>';}}
row.innerHTML=h;
function arm(vd){ if(vd.src) return; vd.src=vd.getAttribute("data-src"); vd.autoplay=true;
  var p=vd.play(); if(p&&p.catch) p.catch(function(){}); }
var vids=row.querySelectorAll("video[data-src]");
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(x){
    if(x.isIntersecting){ arm(x.target); io.unobserve(x.target); }});},{rootMargin:"200px"});
  Array.prototype.forEach.call(vids,function(vd){ io.observe(vd); });
} else Array.prototype.forEach.call(vids,arm);})();
