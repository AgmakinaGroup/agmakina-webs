
(function(){
  /* === FICHA DE PRODUCTO ACTIVO (editar al cambiar de villa) === */
  var PRODUCTO = { tipo:"Villa de 2 habitaciones", precio_desde:"110.000 €", ubicacion:"Uluwatu, Bali" };
  var CALENDARIO = "/calendario";
  var GHL_WEBHOOK_URL = ""; /* <-- TECH: pega aqui la URL del Inbound Webhook de GHL. Vacio = solo redirige. */

  var STEPS = [
    { key:"contacto", q:"Reserva tu sesión gratuita de inversión en 30s", sub:"", fields:[
      {name:"nombre", ph:"Nombre y apellidos", type:"text"},
      {name:"telefono", ph:"WhatsApp / Teléfono", type:"tel"} ]},
    { key:"objetivo", q:"¿Cuál es tu objetivo principal?", sub:"Elige la opción que mejor te describe", opts:[
      {em:"💰", t:"Comprar para alquilar (rentabilidad)"},
      {em:"📈", t:"Comprar para revender"},
      {em:"🏠", t:"Para uso propio"},
      {em:"🔄", t:"Una combinación de objetivos"} ]},
    { key:"presupuesto", q:"¿Cuánto quieres invertir?", sub:"Nuestras villas en "+PRODUCTO.ubicacion+" arrancan desde "+PRODUCTO.precio_desde+".", opts:[
      {em:"", t:"Menos de 100.000 €"},
      {em:"", t:"100.000 - 150.000 €"},
      {em:"", t:"150.000 - 250.000 €"},
      {em:"", t:"Más de 250.000 €"} ]},
    { key:"timing", q:"¿Cuándo quieres invertir?", sub:"Elige la opción que más se ajuste a ti", opts:[
      {em:"⚡", t:"Lo antes posible"},
      {em:"🗓️", t:"En 2-3 meses"},
      {em:"📅", t:"En unos 6 meses"},
      {em:"👀", t:"Solo estoy ojeando"} ]},
    { key:"bali", q:"¿Has estado en Bali?", sub:"Sin problema si aún no: te guiamos igual", opts:[
      {em:"🌴", t:"Sí, lo conozco bien"},
      {em:"✈️", t:"Sí, de visita"},
      {em:"💡", t:"No, pero me interesa mucho"},
      {em:"🙂", t:"No"} ]}
  ];

  function esc(v){ return (v||"").replace(/"/g,"&quot;"); }

  function skeleton(isOverlay){
    return '<div class="qwrap">'
      + (isOverlay ? '<div class="qtop"><button class="qx" aria-label="Cerrar">&#10005;</button></div>' : '')
      + '<div class="qBody"></div><div class="qnav qNav"></div>'
      + '<div class="qfoot">Sin compromiso &middot; te escribimos por WhatsApp.</div>'
      + '<div class="qzurich">Propiedades aseguradas por <img class="zlog" src="https://cdn.jsdelivr.net/gh/AgmakinaGroup/agmakina-webs@9353b46b4d6058b808721a80d7215495cd968984/assets/group/zurich.svg" alt="Allianz"></div></div>';
  }

  function makeQuiz(root, isOverlay){
    root.innerHTML = skeleton(isOverlay);
    var body=root.querySelector(".qBody"), nav=root.querySelector(".qNav"),
        fill=root.querySelector(".qFill"), stepEl=root.querySelector(".qstep");
    var i=0, answers={};

    function render(){
      var st=STEPS[i];
      var h='<h2 class="qq">'+st.q+'</h2>';
      if(st.opts){
        h+='<div class="qopts">';
        for(var k=0;k<st.opts.length;k++){ var o=st.opts[k], sel=(answers[st.key]===o.t)?" sel":"";
          h+='<button type="button" class="qopt'+sel+'" data-v="'+esc(o.t)+'">'+(o.em?'<span class="em">'+o.em+'</span>':'<span class="em"></span>')+'<span>'+o.t+'</span><span class="ck"></span></button>'; }
        h+='</div>';
      } else if(st.fields){
        h+='<div class="qfield">';
        for(var f=0;f<st.fields.length;f++){ var fd=st.fields[f], v=answers[fd.name]||"";
          h+='<input data-n="'+fd.name+'" type="'+fd.type+'" placeholder="'+fd.ph+'" value="'+esc(v)+'">'; }
        h+='</div><p class="qerr"></p>';
      }
      body.innerHTML=h;
      nav.innerHTML=(i>0?'<button class="btn g qBack">Atrás</button>':'')+'<button class="btn qNext">'+(i===STEPS.length-1?"Reservar mi llamada":"Siguiente")+'</button>';
      var bk=nav.querySelector(".qBack"); if(bk) bk.onclick=function(){ i--; render(); };
      nav.querySelector(".qNext").onclick=next;
      var opts=body.querySelectorAll(".qopt");
      for(var m=0;m<opts.length;m++){ opts[m].onclick=function(){
        answers[STEPS[i].key]=this.getAttribute("data-v");
        var all=body.querySelectorAll(".qopt"); for(var n=0;n<all.length;n++){ all[n].classList.remove("sel"); }
        this.classList.add("sel"); setTimeout(next,180); }; }
    }
    function next(){
      var st=STEPS[i];
      if(st.opts){ if(!answers[st.key]) return; }
      else if(st.fields){
        var ins=body.querySelectorAll("input"), err=body.querySelector(".qerr");
        for(var f=0;f<st.fields.length;f++){ answers[st.fields[f].name]=ins[f].value.trim(); }
        if(!answers.nombre){ err.textContent="Dinos tu nombre."; return; }
        if((answers.telefono||"").replace(/\D/g,"").length<6){ err.textContent="Revisa tu WhatsApp."; return; }
        if(!answers._captured && GHL_WEBHOOK_URL){ answers._captured=true; try{ fetch(GHL_WEBHOOK_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nombre:answers.nombre,telefono:answers.telefono,producto:PRODUCTO.tipo,estado:"parcial"})}); }catch(e){} }
      }
      if(i<STEPS.length-1){ i++; render(); } else finish();
    }
    function finish(){
      var payload={}; for(var k in answers){ if(answers.hasOwnProperty(k) && k.charAt(0)!=="_") payload[k]=answers[k]; }
      payload.producto=PRODUCTO.tipo; payload.estado="completo";
      var go=function(){ var p=[]; for(var k2 in payload){ if(payload.hasOwnProperty(k2)) p.push(encodeURIComponent(k2)+"="+encodeURIComponent(payload[k2])); }
        window.location.href=CALENDARIO+(CALENDARIO.indexOf("?")>-1?"&":"?")+p.join("&"); };
      if(GHL_WEBHOOK_URL){ try{ fetch(GHL_WEBHOOK_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}).then(go,go); }catch(e){ go(); } }
      else { go(); }
    }
    render();
    return { reset:function(){ i=0; answers={}; render(); }, closeBtn:root.querySelector(".qx") };
  }

  /* Inline en el hero */
  var heroEl=document.getElementById("heroQuiz");
  if(heroEl){ makeQuiz(heroEl,false); }

  /* Overlay para los CTAs de mas abajo */
  var overlayRoot=document.getElementById("tlpQuiz");
  function openOverlay(e){ if(e){ e.preventDefault(); } var ov=makeQuiz(overlayRoot,true);
    if(ov.closeBtn) ov.closeBtn.onclick=closeOverlay;
    overlayRoot.classList.add("open"); document.body.style.overflow="hidden"; }
  function closeOverlay(){ overlayRoot.classList.remove("open"); document.body.style.overflow=""; }
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") closeOverlay(); });
  var ctas=document.querySelectorAll('a[href*="calendario"], .js-quiz');
  for(var c=0;c<ctas.length;c++){ ctas[c].addEventListener("click", openOverlay); }
})();
