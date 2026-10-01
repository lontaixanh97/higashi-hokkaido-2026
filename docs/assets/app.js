(function(){
'use strict';

/* ---------- derived data ---------- */
ORDER.forEach((k,i)=>S[k].no=i+1);
const DAY=Object.fromEntries(DAYS.map(d=>[d.id,d]));
DAYS.forEach(d=>{
  const set=new Set();
  d.segs.forEach(s=>s.pts.forEach(p=>{if(typeof p==='string'&&S[p])set.add(p)}));
  d.items.forEach(i=>{if(i.st)set.add(i.st)});
  d.stops=set;
  const seq=[];d.segs.forEach(s=>s.pts.forEach(p=>{if(typeof p==='string'&&S[p]&&seq[seq.length-1]!==p)seq.push(p)}));
  d.seq=seq;
});

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const P=k=>typeof k==='string'?(S[k]?[S[k].x,S[k].y]:V[k]):k;
const f=n=>Math.round(n*10)/10;
const store={
  get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
function smooth(keys){
  const p=keys.map(P);let d=`M${p[0][0]},${p[0][1]}`;
  for(let i=0;i<p.length-1;i++){
    const p0=p[i-1]||p[i],p1=p[i],p2=p[i+1],p3=p[i+2]||p2;
    d+=` C${f(p1[0]+(p2[0]-p0[0])/6)},${f(p1[1]+(p2[1]-p0[1])/6)} ${f(p2[0]-(p3[0]-p1[0])/6)},${f(p2[1]-(p3[1]-p1[1])/6)} ${p2[0]},${p2[1]}`;
  }
  return d;
}
const gmPlace=k=>`https://www.google.com/maps/search/?api=1&query=${S[k].q?encodeURIComponent(S[k].q):S[k].lat+','+S[k].lng}`;
const gmDir=keys=>'https://www.google.com/maps/dir/'+keys.map(k=>S[k].lat+','+S[k].lng).join('/');
const ext='target="_blank" rel="noopener"';
const icoPin='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-7.6 7-12a7 7 0 1 0-14 0c0 4.4 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const icoOut='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
const icoBack='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
const icoNext='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
const icoChev='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
const icoTip='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3Z"/></svg>';
const icoMoon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/></svg>';
const icoMap='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14"/></svg>';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const imgs=k=>(typeof IMG!=='undefined'&&IMG[k])||[];
const figure=(im,cls)=>`<figure class="${cls}"><img src="${esc(im.src)}" alt="${esc(im.cap)}" loading="lazy" decoding="async" onerror="this.closest('figure').classList.add('noimg')"><figcaption><span>${esc(im.cap)}</span><a href="${esc(im.page)}" ${ext}>Ảnh: ${esc(im.by)} · ${esc(im.lic)}</a></figcaption></figure>`;
const nightLabel=d=>d.night?'Nghỉ đêm ở '+S[d.night].short+(d.nightNote?' ('+d.nightNote+')':''):'Bay về';

/* ---------- today (giờ Nhật) ---------- */
const ymd=s=>{const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)};
const todayJP=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const dayIndex=Math.round((ymd(todayJP)-ymd(TRIP.start))/864e5);
const todayId=dayIndex>=0&&dayIndex<DAYS.length?DAYS[dayIndex].id:null;
(function countdown(){
  const el=$('#countdown');
  if(dayIndex<0){el.innerHTML=`<b>${-dayIndex}</b><span>ngày nữa là đi</span>`}
  else if(todayId){el.innerHTML=`<b>Ngày ${dayIndex+1}/${DAYS.length}</b><span>Hôm nay ${DAYS[dayIndex].date}</span>`}
  else{el.innerHTML=`<b>Xong</b><span>chuyến đi đã kết thúc</span>`}
  $('#drive-total').textContent='~'+Math.round(DAYS.reduce((a,d)=>a+(d.drive||0),0));
})();

/* ---------- map ---------- */
const svg=$('#map'), mapcard=$('#mapcard'), panel=$('#panel');
function buildMap(){
  const coastN=[[0,144],[120,199],[256,252],[360,299],[520,366],[600,362],[680,318],[738,272],[790,236],[840,188],[936,78],[1000,0]];
  const coastE=[[1080,0],[1016,188],[996,255],[960,443],[948,654],[952,705],[920,886],[1000,1000]];
  const toD=a=>smooth(a).slice(1);
  const land=`M${toD(coastN)} L${toD(coastE)} L0,1000 Z`;
  let h='';
  h+=`<rect x="-2000" y="-2000" width="5200" height="5000" fill="var(--sea)"/>`;
  h+=`<path class="land" d="${land}"/>`;
  h+=`<path d="M948,700 C1000,698 1050,712 1085,730 C1112,744 1130,732 1132,712" fill="none" stroke="var(--land)" stroke-width="12" stroke-linecap="round"/>`;
  h+=`<ellipse class="lake" cx="275" cy="712" rx="70" ry="45"/><ellipse class="lake" cx="480" cy="760" rx="21" ry="17"/><ellipse class="lake" cx="120" cy="878" rx="30" ry="24"/><ellipse class="lake" cx="186" cy="312" rx="16" ry="34"/>`;
  h+=`<text class="lake-lbl" x="275" y="722" text-anchor="middle">hồ Kussharo</text>`;
  h+=`<text class="sea-lbl" x="360" y="120">Biển Okhotsk</text>`;
  h+=`<text class="sea-lbl" x="1112" y="520" transform="rotate(-78 1112 520)">Eo biển Nemuro</text>`;
  h+=`<text class="sea-lbl" x="1030" y="930" style="font-size:22px">Vịnh Nemuro</text>`;
  h+=`<g style="color:var(--muted)" font-family="Be Vietnam Pro,sans-serif" font-size="14" fill="currentColor"><path d="M1060,975h100M1060,968v14M1160,968v14" stroke="currentColor" stroke-width="2" fill="none"/><text x="1110" y="962" text-anchor="middle">10 km</text><path d="M1160,860l10,26h-20Z" fill="currentColor"/><text x="1160" y="850" text-anchor="middle" font-weight="600">B</text></g>`;
  h+='<g id="routes">';
  DAYS.forEach(d=>d.segs.forEach(s=>{
    const dd=smooth(s.pts);
    h+=`<path class="casing" data-day="${d.id}" d="${dd}" stroke-width="10" vector-effect="non-scaling-stroke"/>`;
    h+=`<path class="rt" data-day="${d.id}" d="${dd}" stroke="${d.color}" stroke-width="5" vector-effect="non-scaling-stroke"${s.bus?' stroke-dasharray="0.5 9"':''}/>`;
  }));
  h+='</g><g id="markers">';
  const keys=Object.keys(S).sort((a,b)=>(S[a].wp?0:1)-(S[b].wp?0:1));
  keys.forEach(k=>{
    const s=S[k];
    h+=`<g class="mk${s.wp?' wp':''}" data-stop="${k}" tabindex="0" role="button" aria-label="${esc(s.n)}" transform="translate(${s.x} ${s.y})">`;
    if(s.wp){h+=`<circle class="halo" r="12"/><circle class="wpc" r="6"/>`;}
    else{h+=`<circle class="halo" r="19"/><circle class="dotc" r="13"/><text class="num" y="4.3">${s.no}</text>`;}
    h+=`<text class="lbl" x="${s.lx}" y="${s.ly}" text-anchor="${s.la}">${esc(s.short==='Akanko Onsen'?'Hồ Akan':s.short)}</text></g>`;
  });
  h+='</g>';
  svg.innerHTML=h;
}

/* viewBox + zoom */
const FULL={x:0,y:0,w:1200,h:1000};
let vb={...FULL}, anim=null;
function clampVB(v){
  const w=Math.min(1200,Math.max(300,v.w)), h=w/1.2;
  return {w,h,x:Math.min(1200-w,Math.max(0,v.x)),y:Math.min(1000-h,Math.max(0,v.y))};
}
function applyVB(){
  svg.setAttribute('viewBox',`${f(vb.x)} ${f(vb.y)} ${f(vb.w)} ${f(vb.h)}`);
  const s=(svg.getBoundingClientRect().width||600)/vb.w, k=1/s;
  svg.querySelectorAll('.mk').forEach(g=>{const st=S[g.dataset.stop];g.setAttribute('transform',`translate(${st.x} ${st.y}) scale(${f(k*100)/100})`)});
  svg.classList.toggle('tiny',s<0.42);
  mapcard.classList.toggle('zoomed',vb.w<1199);
}
function setVB(t,animate=true){
  t=clampVB(t);
  if(anim)cancelAnimationFrame(anim);
  if(!animate||reduce){vb=t;applyVB();return}
  const a={...vb},t0=performance.now(),D=520;
  const step=now=>{
    const p=Math.min(1,(now-t0)/D),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
    vb={x:a.x+(t.x-a.x)*e,y:a.y+(t.y-a.y)*e,w:a.w+(t.w-a.w)*e,h:a.h+(t.h-a.h)*e};
    applyVB(); if(p<1)anim=requestAnimationFrame(step);
  };
  anim=requestAnimationFrame(step);
}
function fitPoints(pts,pad=95){
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
  let x0=Math.min(...xs)-pad,x1=Math.max(...xs)+pad,y0=Math.min(...ys)-pad,y1=Math.max(...ys)+pad;
  let w=Math.max(x1-x0,420),h=Math.max(y1-y0,350);
  if(w/h>1.2)h=w/1.2;else w=h*1.2;
  const cx=(x0+x1)/2,cy=(y0+y1)/2;
  setVB({x:cx-w/2,y:cy-h/2,w,h});
}
function fitDay(id){
  if(!id){setVB(FULL);return}
  const pts=[];DAY[id].segs.forEach(s=>s.pts.forEach(p=>pts.push(P(p))));
  fitPoints(pts);
}
function zoomBy(fac){
  const w=vb.w*fac,h=w/1.2,cx=vb.x+vb.w/2,cy=vb.y+vb.h/2;
  setVB({x:cx-w/2,y:cy-h/2,w,h});
}
function ensureVisible(k){
  const s=S[k],m=vb.w*0.12;
  if(s.x<vb.x+m||s.x>vb.x+vb.w-m||s.y<vb.y+m||s.y>vb.y+vb.h-m){
    setVB({x:s.x-vb.w/2,y:s.y-vb.h/2,w:vb.w,h:vb.h});
  }
}

/* drag to pan when zoomed */
let drag=null;
svg.addEventListener('pointerdown',e=>{
  if(vb.w>=1199||e.target.closest('.mk'))return;
  drag={x:e.clientX,y:e.clientY,vx:vb.x,vy:vb.y};
  svg.setPointerCapture(e.pointerId);mapcard.classList.add('dragging');
});
svg.addEventListener('pointermove',e=>{
  if(!drag)return;
  const s=svg.getBoundingClientRect().width/vb.w;
  vb=clampVB({x:drag.vx-(e.clientX-drag.x)/s,y:drag.vy-(e.clientY-drag.y)/s,w:vb.w});
  applyVB();
});
const endDrag=()=>{drag=null;mapcard.classList.remove('dragging')};
svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);

/* ---------- planner state ---------- */
const state={day:null,stop:null};

function render(){
  $('#tabs').querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.day||null)===state.day)));
  svg.querySelectorAll('#routes path').forEach(p=>{
    const on=!state.day||p.dataset.day===state.day;
    p.classList.toggle('faded',!on);
    if(p.classList.contains('rt'))p.setAttribute('stroke-width',state.day&&on?7:5);
    if(p.classList.contains('casing'))p.setAttribute('stroke-width',state.day&&on?12:10);
  });
  if(state.day){const g=svg.querySelector('#routes');g.querySelectorAll(`[data-day="${state.day}"]`).forEach(p=>g.appendChild(p));}
  svg.querySelectorAll('.mk').forEach(g=>{
    const k=g.dataset.stop;
    g.classList.toggle('dim',!!state.day&&!DAY[state.day].stops.has(k)&&state.stop!==k);
    g.classList.toggle('sel',state.stop===k);
    g.setAttribute('aria-pressed',String(state.stop===k));
  });
  panel.innerHTML=state.stop?panelStop(state.stop):state.day?panelDay(DAY[state.day]):panelAll();
}

function itemHTML(i,cur){
  const inner=`<span class="t">${i.t}</span><span><span class="x">${esc(i.x)}</span>${i.s?`<span class="s">${esc(i.s)}</span>`:''}${i.st&&!cur?`<span class="pin">${icoPin}${esc(S[i.st].n)}</span>`:''}</span>`;
  return `<li>${i.st&&!cur?`<button type="button" class="item" data-stop="${i.st}">${inner}</button>`:`<div class="item${cur?' cur':''}">${inner}</div>`}</li>`;
}
function panelAll(){
  return `<div class="p-kicker">Toàn tuyến</div>
  <h3 class="p-title">${DAYS.length} ngày, ${DAYS.filter(d=>d.night).length} đêm</h3>
  <p class="p-lead">Chọn một ngày để xem lộ trình, hoặc bấm vào một điểm trên bản đồ.</p>
  <div class="daylist">${DAYS.map(d=>`<button type="button" class="dayrow" data-day="${d.id}"><span class="sw" style="background:${d.color}"></span><span class="d">${d.date}</span><span class="m"><b>${esc(d.title)}</b><span>${d.night?'Nghỉ đêm ở '+esc(S[d.night].short):'Bay về'}</span></span>${icoChev}</button>`).join('')}</div>`;
}
function panelDay(d){
  const i=DAYS.indexOf(d),prev=DAYS[i-1],next=DAYS[i+1];
  return `<button type="button" class="back" data-day="">${icoBack}Toàn tuyến</button>
  <div class="p-kicker"><span class="sw" style="background:${d.color}"></span>${d.wd}, ${d.date}${d.id===todayId?' · Hôm nay':''}</div>
  <h3 class="p-title">${esc(d.title)}</h3>
  <div class="chips"><span class="chip">${esc(d.who)}</span><span class="chip">${esc(d.mode)}</span><span class="chip">${esc(nightLabel(d))}</span></div>
  <ol class="sched">${d.items.map(it=>itemHTML(it,false)).join('')}</ol>
  <div class="btnrow"><a class="gm" href="${gmDir(d.seq)}" ${ext}>${icoOut}Mở chặng này trên Google Maps</a></div>
  <div class="btnrow" style="margin-top:8px">${prev?`<button type="button" class="ghost" data-day="${prev.id}">${icoBack}${prev.date}</button>`:''}${next?`<button type="button" class="ghost" data-day="${next.id}">${next.date}${icoNext}</button>`:''}</div>`;
}
function panelStop(k){
  const s=S[k];
  const visits=DAYS.map(d=>({d,its:d.items.filter(i=>i.st===k)})).filter(v=>v.its.length);
  const nights=DAYS.filter(d=>d.night===k);
  const stay=STAYS.find(x=>x.at===k);
  const backLbl=state.day?'Lịch trình '+DAY[state.day].date:'Toàn tuyến';
  let h=`<button type="button" class="back" data-back="1">${icoBack}${backLbl}</button>
  <div class="p-kicker">${s.wp?'Điểm đi qua':'Điểm dừng số '+s.no}</div>
  <h3 class="p-title">${esc(s.n)}</h3><p class="p-jp" lang="ja">${s.jp}</p>
  ${imgs(k).length?`<div class="p-gallery${imgs(k).length>1?' multi':''}">${imgs(k).map(im=>figure(im,'pfig')).join('')}</div>`:''}
  <p class="p-lead">${esc(s.d)}</p>`;
  if(nights.length)h+=`<div class="tip">${icoMoon}<div>Nghỉ đêm tại đây: ${nights.map(d=>d.wd+' '+d.date+(d.nightNote?' ('+d.nightNote+')':'')).join('; ')}${stay&&stay.name?'. '+esc(stay.name):''}.</div></div>`;
  if(visits.length){
    h+=visits.map(v=>`<div class="vday"><span class="sw" style="background:${v.d.color}"></span>${v.d.wd}, ${v.d.date}</div><ol class="sched" style="margin-bottom:4px">${v.its.map(it=>itemHTML(it,true)).join('')}</ol>`).join('');
  }
  if(s.tip)h+=`<div class="tip" style="margin-top:12px">${icoTip}<div>${esc(s.tip)}</div></div>`;
  h+=`<div class="btnrow" style="margin-top:12px"><a class="gm" href="${gmPlace(k)}" ${ext}>${icoOut}Xem trên Google Maps</a></div>`;
  return h;
}

function setDay(id){state.day=id||null;state.stop=null;render();fitDay(state.day)}
function selectStop(k,scroll){
  state.stop=k;render();ensureVisible(k);
  if(scroll&&innerWidth<=920){const r=panel.getBoundingClientRect();if(r.top>innerHeight*.6)panel.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'})}
}
function goPlanner(){ $('#planner').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}) }

/* ---------- day-by-day ---------- */
function renderDays(){
  $('#days').innerHTML=DAYS.map(d=>`
  <article class="day${d.id===todayId?' today':''}" id="day-${d.id}" style="--c:${d.color}">
    ${d.cover&&imgs(d.cover[0])[d.cover[1]]?figure(imgs(d.cover[0])[d.cover[1]],'day-cover'):''}
    <div class="day-h">
      <div class="day-date"><span class="dd">${d.date.split('/')[0]}</span><span class="wd">${d.wd}</span></div>
      <div>
        ${d.id===todayId?'<span class="today-badge">Hôm nay</span>':''}
        <h3>${esc(d.title)}</h3>
        <div class="chips"><span class="chip">${esc(d.who)}</span><span class="chip">${esc(d.mode)}</span><span class="chip">${esc(nightLabel(d))}</span></div>
      </div>
    </div>
    <ol class="tl">${d.items.map(i=>`<li><span class="t">${i.t}</span><div class="b"><span class="x">${esc(i.x)}</span>${i.s?`<span class="s">${esc(i.s)}</span>`:''}${i.st?`<button type="button" class="pinlink" data-goto="${i.st}">${icoPin}${esc(S[i.st].n)}</button>`:''}</div></li>`).join('')}</ol>
    <div class="btnrow">
      <a class="gm" href="${gmDir(d.seq)}" ${ext}>${icoOut}Chỉ đường Google Maps</a>
      <button type="button" class="ghost" data-mapday="${d.id}">${icoMap}Xem trên bản đồ</button>
    </div>
  </article>`).join('');
}

/* ---------- places gallery ---------- */
const blurb=t=>{const ps=t.split(/(?<=\.)\s+/);let out=ps[0];if(out.length<70&&ps[1]&&(out+' '+ps[1]).length<=150)out+=' '+ps[1];return out};
function renderGallery(){
  const keys=[...ORDER.slice(0,3),'shari',...ORDER.slice(3)].filter(k=>imgs(k).length);
  $('#gallery').innerHTML=keys.map(k=>{
    const s=S[k], when=DAYS.filter(d=>d.stops.has(k)&&k!=='mmb').map(d=>d.date);
    return `<article class="place">
      ${figure(imgs(k)[0],'place-fig')}
      <div class="place-b">
        <div class="place-k">${when.join(', ')}</div>
        <h3>${esc(s.n)}</h3>
        <p>${esc(blurb(s.d))}</p>
        <button type="button" class="ghost" data-goto="${k}">${icoMap}Xem trên bản đồ${imgs(k).length>1?` · ${imgs(k).length} ảnh`:''}</button>
      </div>
    </article>`;
  }).join('');
}

/* ---------- hotels ---------- */
function renderHotels(){
  $('#hotels').innerHTML=STAYS.map(h=>{
    const first=DAY[h.nights[0]], last=DAY[h.nights[h.nights.length-1]];
    const when=h.nights.length>1?`${h.nights.length} đêm, ${first.date.split('/')[0]}–${last.date}`:`1 đêm, ${first.date}`;
    return `<div class="hcard">
      <div class="n">${when}</div>
      <div class="p">${esc(S[h.at].short)}</div>
      <div class="w">${esc(h.who)}</div>
      <div class="f${h.name?'':' empty'}">${h.name?esc(h.name):'Chưa chốt nơi nghỉ'}</div>
      <div class="acts">
        <button type="button" class="ghost" data-goto="${h.at}">${icoMap}Bản đồ</button>
        ${h.url?`<a class="ghost" href="${esc(h.url)}" ${ext}>${icoOut}Đặt phòng</a>`:''}
      </div>
    </div>`;
  }).join('');
}

/* ---------- bookings ---------- */
function renderBookings(){
  const done=BOOKINGS.filter(b=>b.done).length;
  $('#book-count').textContent=`Đã đặt ${done}/${BOOKINGS.length}`;
  $('#book-bar').style.width=(done/BOOKINGS.length*100)+'%';
  $('#bookings').innerHTML=BOOKINGS.map(b=>`<div class="row"><div><div class="x">${esc(b.x)}</div><div class="s">${esc(b.s)}</div></div><span class="badge ${b.done?'done':'todo'}">${b.done?'Đã đặt':'Chưa đặt'}</span></div>`).join('');
}

/* ---------- packing (per viewer) ---------- */
const PK='hokkaido-2026-packing';
let packed=store.get(PK)||{};
const packTotal=PACKING.reduce((a,g)=>a+g.items.length,0);
function packProgress(){
  const n=Object.values(packed).filter(Boolean).length;
  $('#pack-count').textContent=`Đã chuẩn bị ${n}/${packTotal}`;
  $('#pack-bar').style.width=(n/packTotal*100)+'%';
}
function renderPacking(){
  $('#pack').innerHTML=PACKING.map((g,gi)=>`<div class="pgroup"><h3>${esc(g.g)}</h3>${g.items.map((it,ii)=>{const id=`p${gi}-${ii}`;return `<label class="ck"><input type="checkbox" data-pk="${id}"${packed[id]?' checked':''}><span>${esc(it)}</span></label>`}).join('')}</div>`).join('');
  packProgress();
}
$('#pack').addEventListener('change',e=>{
  const c=e.target.closest('[data-pk]');if(!c)return;
  packed[c.dataset.pk]=c.checked;store.set(PK,packed);packProgress();
});
$('#pack-reset').addEventListener('click',()=>{packed={};store.set(PK,packed);renderPacking()});

/* ---------- nav highlight ---------- */
(function nav(){
  const links=[...document.querySelectorAll('#nav a')];
  const bar=$('#nav');
  const byId=Object.fromEntries(links.map(a=>[a.getAttribute('href').slice(1),a]));
  if(!('IntersectionObserver' in window))return;
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting)return;
      links.forEach(a=>a.classList.remove('on'));
      const a=byId[e.target.id];if(!a)return;
      a.classList.add('on');
      const l=a.offsetLeft-bar.clientWidth/2+a.clientWidth/2;
      bar.scrollTo({left:l,behavior:reduce?'auto':'smooth'});
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  Object.keys(byId).forEach(id=>{const s=document.getElementById(id);if(s)io.observe(s)});
})();

/* ---------- share ---------- */
const toast=msg=>{const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('show'),2200)};
$('#share').addEventListener('click',async()=>{
  const data={title:document.title,text:'Lịch trình Đông Hokkaido 19–23/2/2027',url:location.href.split('#')[0]};
  try{
    if(navigator.share){await navigator.share(data);return}
    await navigator.clipboard.writeText(data.url);toast('Đã chép đường dẫn');
  }catch(e){if(e&&e.name!=='AbortError')toast('Không chép được, hãy chép địa chỉ trên thanh trình duyệt')}
});

/* ---------- build + events ---------- */
$('#tabs').innerHTML=`<button type="button" class="tab" data-day="">Toàn tuyến</button>`+DAYS.map(d=>`<button type="button" class="tab" data-day="${d.id}"><span class="dot" style="background:${d.color}"></span>${d.date}${d.id===todayId?' · Hôm nay':''}</button>`).join('');
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('.tab');if(b)setDay(b.dataset.day)});
svg.addEventListener('click',e=>{const g=e.target.closest('.mk');if(g)selectStop(g.dataset.stop,true)});
svg.addEventListener('keydown',e=>{const g=e.target.closest('.mk');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();selectStop(g.dataset.stop,true)}});
panel.addEventListener('click',e=>{
  const b=e.target.closest('[data-back],[data-day],[data-stop]');if(!b)return;
  if(b.dataset.back){state.stop=null;render();return}
  if('day' in b.dataset){setDay(b.dataset.day);return}
  if(b.dataset.stop)selectStop(b.dataset.stop,false);
});
document.addEventListener('click',e=>{
  const g=e.target.closest('[data-goto]');
  if(g){goPlanner();selectStop(g.dataset.goto,false);return}
  const m=e.target.closest('[data-mapday]');
  if(m){goPlanner();setDay(m.dataset.mapday)}
});
$('#zin').onclick=()=>zoomBy(.7);$('#zout').onclick=()=>zoomBy(1/.7);$('#zfit').onclick=()=>setVB(FULL);
if('ResizeObserver' in window)new ResizeObserver(()=>applyVB()).observe(svg);else addEventListener('resize',applyVB);

if(!reduce){const sn=$('#snow');let s='';for(let i=0;i<34;i++){const z=2+Math.random()*4;s+=`<i style="left:${(Math.random()*100).toFixed(1)}%;width:${z.toFixed(1)}px;height:${z.toFixed(1)}px;animation-duration:${(9+Math.random()*9).toFixed(1)}s;animation-delay:-${(Math.random()*18).toFixed(1)}s"></i>`}sn.innerHTML=s}

buildMap();applyVB();
renderDays();renderGallery();renderHotels();renderBookings();renderPacking();
if(todayId){state.day=todayId;render();fitDay(todayId)}else render();

/* ---------- offline ---------- */
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1')){
  addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
})();
