const $=s=>document.querySelector(s);
const steg=['#steg1','#steg2','#steg3'];
function visa(n,fokus){steg.forEach((s,i)=>$(s).hidden=i!==n);window.scrollTo(0,0);if(fokus)$(fokus).focus();}
let valt='14 nov';
$('#valj').addEventListener('submit',e=>{e.preventDefault();valt=document.querySelector('input[name=tid]:checked').value;$('#g-tid').textContent='Lördag '+valt+', 10–15';visa(1,'#r2');});
$('#andra').addEventListener('click',()=>visa(0));  // valt tillfälle ligger kvar i radioknappen
$('#uppg').addEventListener('submit',e=>{e.preventDefault();
 const n=$('#namn'),m=$('#epost');const nOk=n.value.trim()!=='',mOk=/^\S+@\S+\.\S+$/.test(m.value);
 $('#e-namn').hidden=nOk;$('#e-epost').hidden=mOk;n.setAttribute('aria-invalid',!nOk);m.setAttribute('aria-invalid',!mOk);
 if(!nOk){n.focus();return;}if(!mOk){m.focus();return;}
 $('#b-tid').textContent='Lördag '+valt+', 10–15';$('#b-namn').textContent=n.value.trim();$('#b-epost').textContent=m.value.trim();visa(2,'#r3');});
$('#tillbaka').addEventListener('click',()=>{$('#uppg').reset();visa(0);});
