const DATA={'14 nov':[['L101','Alma Lind','alma.lind@example.com'],['L102','Robin Berg','robin.berg@example.com'],['L103','Sam Ek','sam.ek@example.com']],
'21 nov':[['L104','Kim Dahl','kim.dahl@example.com'],['L105','Alex Holm','alex.holm@example.com']],
'28 nov':[['L106','Noor Lund','noor.lund@example.com']]};
const $=s=>document.querySelector(s);
let tid='14 nov',valdId=null,fraga='';
const app=$('#app');
// tillfällen
$('#tillfallen').insertAdjacentHTML('beforeend',Object.keys(DATA).map(k=>`<label class="tid"><input type="radio" name="t" value="${k}" ${k===tid?'checked':''}><span class="mark" aria-hidden="true"></span><span class="t"><b>Lör ${k}</b><small><span class="vald">Vald · </span>${DATA[k].length} av 10 bokade</small></span></label>`).join(''));
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function lista(){const q=fraga.trim().toLowerCase();return DATA[tid].filter(r=>!q||r[1].toLowerCase().includes(q)||r[2].toLowerCase().includes(q));}
function render(){
 const all=DATA[tid],rs=lista();
 $('#sum').textContent=`${all.length} av 10 platser bokade`;$('#matare').innerHTML=Array.from({length:10},(_,i)=>`<span class="${i<all.length?'fylld':''}"></span>`).join('');$('#matare').setAttribute('aria-label',`${all.length} av 10 platser bokade`);$('#sum2').textContent=`${10-all.length} lediga · lördag ${tid.replace('nov','november')}`;
 $('#tomt').hidden=rs.length>0;
 $('#kort').innerHTML=rs.map(r=>`<li><button type="button" data-id="${r[0]}" aria-label="Öppna ${esc(r[0])} ${esc(r[1])}"><span class="etikett">${r[0]}</span><span class="etikett">Öppna →</span><span class="n">${esc(r[1])}</span><span class="e">${esc(r[2])}</span></button></li>`).join('');
 $('#tabell tbody').innerHTML=rs.map(r=>`<tr class="${r[0]===valdId?'sel':''}" data-id="${r[0]}"><td><button type="button" data-id="${r[0]}" aria-label="Öppna ${esc(r[0])} ${esc(r[1])}"><span class="etikett">${r[0]}</span></button></td><td><button type="button" data-id="${r[0]}" tabindex="-1" aria-hidden="true">${esc(r[1])}</button></td><td><button type="button" data-id="${r[0]}" tabindex="-1" aria-hidden="true"><span class="ep">${esc(r[2])}</span></button></td><td><button type="button" data-id="${r[0]}" tabindex="-1" aria-hidden="true"><span class="etikett">${r[0]===valdId?'Öppen':'Öppna →'}</span></button></td></tr>`).join('');
 const r=valdId&&DATA[tid].find(x=>x[0]===valdId);
 app.classList.toggle('har-detalj',!!r);
 $('#panel').toggleAttribute('data-tom',!r);$('#tom').hidden=!!r;$('#detalj').hidden=!r;
 if(r){$('#d-id').textContent='Bokning '+r[0];$('#d-namn').textContent=r[1];$('#d-namn2').textContent=r[1];$('#d-epost').textContent=r[2];$('#d-tid').textContent='Lördag '+tid.replace('nov','november')+', 10–15';$('#tillbaka').textContent='← Tillbaka till '+tid;}
}
function oppna(id){valdId=id;render();$('#d-namn').focus({preventScroll:false});window.scrollTo(0,0);}
function stang(){const id=valdId;valdId=null;render();const b=document.querySelector(`[data-id="${id}"]`);if(b)b.focus();}
app.addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(b)oppna(b.dataset.id);});
$('#tillbaka').addEventListener('click',stang);$('#stang').addEventListener('click',stang);
$('#tillfallen').addEventListener('change',e=>{tid=e.target.value;valdId=null;render();});  // byte av tillfälle: välj nytt, tidigare öppen bokning stängs
$('#sok').addEventListener('input',e=>{fraga=e.target.value;render();});
render();
