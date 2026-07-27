
  (function(){
    var c=document.getElementById('copy');
    c.addEventListener('click',function(){
      var t=document.getElementById('cmsg').textContent;
      if(navigator.clipboard)navigator.clipboard.writeText(t);
      c.textContent='Copiado ✓'; setTimeout(function(){c.textContent='Copiar';},1600);
    });
  })();
