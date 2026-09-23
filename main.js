/* ECHO-G static project page v3. No external libraries, tracking, or online inference. */
(() => {
  'use strict';
  const c = window.ECHO_G_CONFIG || {};
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const players = [];
  const text = v => typeof v === 'string' ? v.trim() : '';
  const safeURL = v => { const s=text(v); if(!s || /[\u0000-\u001f\u007f]/.test(s)) return ''; try { const u=new URL(s,document.baseURI); return ['http:','https:',...(location.protocol==='file:'?['file:']:[])].includes(u.protocol)?s:''; }catch{return '';} };
  const el = (tag,cls,content) => { const n=document.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;return n; };
  const icon = name => { const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','icon');s.setAttribute('aria-hidden','true');const u=document.createElementNS(s.namespaceURI,'use');u.setAttribute('href',`#i-${name}`);s.append(u);return s; };
  const clock = t => {const n=Math.max(0,Math.floor(Number(t)||0));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;};
  const link = (url,label,cls) => {const a=el('a',cls,label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
  const setButton = (btn,iconName,label) => {btn.replaceChildren(icon(iconName));if(label)btn.append(el('span','',label));};
  function registerVideo(v){
    players.push(v);
    v.addEventListener('play',()=>{players.forEach(other=>{if(other!==v&&!other.paused)other.pause();});});
  }
  function createVideo(media,options={}){
    const shell=el('div','video-shell');const v=el('video');v.playsInline=true;v.preload='none';v.controls=false;
    const src=safeURL(media.src),poster=safeURL(media.poster);if(src)v.src=src;
    if(poster){if(options.lazyPoster)v.dataset.poster=poster;else v.poster=poster;}
    v.setAttribute('aria-label',media.title||'Real-robot demonstration');
    shell.append(v);registerVideo(v);
    if(!options.main){const btn=el('button','video-play');btn.type='button';btn.setAttribute('aria-label',`Play ${media.title||'video'}`);btn.append(icon('play'));btn.addEventListener('click',()=>{v.play().catch(()=>{});});shell.append(btn);}
    v.addEventListener('play',()=>{shell.classList.add('has-played');v.controls=true;});
    v.addEventListener('error',()=>{if(shell.parentElement?.querySelector('.video-error'))return;const p=el('p','video-error','Video unavailable. ');if(src)p.append(link(src,'Open the video file.',''));shell.after(p);});
    return {shell,video:v};
  }
  let links=0;
  for(const k of ['paper','code','dataset']){
    const url=safeURL(c.links?.[k]);if(!url)continue;links++;
    $$(`[data-resource="${k}"]`).forEach(b=>{const a=link(url,'',b.className);a.dataset.resource=k;while(b.firstChild)a.append(b.firstChild);a.querySelector('.pending-tag')?.remove();b.replaceWith(a);});
  }
  if(links===3)$('#resource-note').hidden=true;
  else if(links)$('#resource-note').textContent='Additional resources will be linked when available.';

  const main=createVideo({...c.mainVideo,title:'ECHO-G main video'},{main:true});$('#main-video-slot').append(main.shell);
  main.video.addEventListener('click',()=>{if(!main.shell.classList.contains('has-played'))main.video.play().catch(()=>{});});
  const mainButton=$('#main-play');mainButton.querySelector('.main-duration').textContent=clock(c.mainVideo?.durationSeconds);
  mainButton.addEventListener('click',()=>{if(main.video.paused)main.video.play().catch(()=>{});else main.video.pause();});
  const mainState=()=>{mainButton.querySelector('use').setAttribute('href',main.video.paused?'#i-play':'#i-pause');mainButton.querySelector('span:not(.main-duration)').textContent=main.video.paused?(main.video.currentTime>0?'Continue watching':'Watch the full video'):'Pause video';};
  ['play','pause','ended'].forEach(e=>main.video.addEventListener(e,mainState));

  // Gallery list is prepared by gallery-restoration-v6.js in original file order.
  // Do not keep the former source-14 removal filter.
  const videos=Array.isArray(c.gallery?.videos)?c.gallery.videos:[];
  const initial=Math.max(1,Number(c.gallery?.initialVisible)||6);
  $('#trial-count').textContent=`${videos.length} videos`;
  videos.forEach((m,i)=>{const article=el('article','trial-card');article.dataset.trial=String(m.id);article.hidden=i>=initial;const p=createVideo(m,{lazyPoster:article.hidden});article.append(p.shell);const meta=el('div','trial-meta');meta.append(el('h3','',m.title),el('span','',clock(m.durationSeconds)));article.append(meta);$('#trial-grid').append(article);});
  const toggle=$('#gallery-toggle');toggle.hidden=videos.length<=initial;toggle.querySelector('span').textContent=`Show all ${videos.length} videos`;
  toggle.addEventListener('click',()=>{const expand=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(expand));$$('.trial-card').forEach((card,i)=>{card.hidden=!expand&&i>=initial;const v=card.querySelector('video');if(!card.hidden&&v.dataset.poster){v.poster=v.dataset.poster;delete v.dataset.poster;}if(card.hidden)v.pause();});toggle.querySelector('span').textContent=expand?'Show fewer videos':`Show all ${videos.length} videos`;if(!expand)$('#real-robot').scrollIntoView({behavior:'smooth'});});

  // One hstack video guarantees frame alignment; only the original AT audio is present.
  const cmp=c.comparison||{};
  (cmp.order||[]).forEach(v=>{const label=el('div','comparison-label');label.dataset.condition=v.id;label.append(el('strong','',v.label),el('small','',v.detail));$('#comparison-labels').append(label);const u=safeURL(v.src);const a=link(u||'#','View separately','');a.setAttribute('aria-label',`Open ${v.label} video separately`);a.append(icon('expand'));$('#comparison-links').append(a);});
  const cv=el('video');cv.id='comparison-video';cv.playsInline=true;cv.preload='none';cv.controls=false;cv.setAttribute('aria-label','Synchronized comparison: audio-only left, audio and text center, text-only right.');
  if(safeURL(cmp.src))cv.src=safeURL(cmp.src);if(safeURL(cmp.poster))cv.poster=safeURL(cmp.poster);$('#comparison-player').append(cv);registerVideo(cv);
  const cp=$('#comparison-play'),seek=$('#comparison-seek'),time=$('#comparison-time');
  const update=()=>{if(Number.isFinite(cv.duration)){seek.max=String(cv.duration);seek.disabled=false;}if(!seek.matches(':active'))seek.value=String(cv.currentTime);time.textContent=`${clock(cv.currentTime)} / ${clock(Number.isFinite(cv.duration)?cv.duration:cmp.durationSeconds)}`;setButton(cp,cv.paused?'play':'pause',cv.paused?'Play comparison':'Pause comparison');cp.setAttribute('aria-label',cv.paused?'Play all three conditions together':'Pause comparison');};
  cp.addEventListener('click',()=>{if(cv.paused){if(cv.ended)cv.currentTime=0;cv.play().catch(()=>{});}else cv.pause();});
  $('#comparison-replay').addEventListener('click',()=>{cv.currentTime=0;cv.play().catch(()=>{});});
  seek.addEventListener('input',()=>{if(Number.isFinite(cv.duration)){cv.currentTime=Math.min(Number(seek.value),cv.duration);time.textContent=`${clock(cv.currentTime)} / ${clock(cv.duration)}`;}});
  ['loadedmetadata','timeupdate','play','pause','ended','seeked'].forEach(e=>cv.addEventListener(e,update));
  $('#comparison-sound').addEventListener('click',()=>{cv.muted=!cv.muted;const b=$('#comparison-sound');setButton(b,cv.muted?'muted':'sound');b.setAttribute('aria-label',cv.muted?'Unmute comparison audio':'Mute comparison audio');b.setAttribute('aria-pressed',String(cv.muted));});
  $('#comparison-fullscreen').addEventListener('click',()=>{cv.controls=true;if($('.comparison-card').requestFullscreen){cv.controls=false;$('.comparison-card').requestFullscreen().catch(()=>{cv.controls=false;});}else if(cv.webkitEnterFullscreen)cv.webkitEnterFullscreen();else window.open(safeURL(cmp.src),'_blank','noopener');});
  document.addEventListener('fullscreenchange',()=>{cv.controls=document.fullscreenElement===cv;});cv.addEventListener('webkitendfullscreen',()=>{cv.controls=false;});
  cv.addEventListener('error',()=>{cp.disabled=true;const p=el('p','video-error','The comparison could not be loaded. ');p.append(link(safeURL(cmp.src),'Open the video file.',''));$('#comparison-player').append(p);});
  // Center AT in the horizontal mobile view without changing AO | AT | TO order.
  const strip=$('#comparison-scroll');let autoCenter=true;
  const centerComparison=()=>{if(autoCenter)strip.scrollLeft=Math.max(0,(strip.scrollWidth-strip.clientWidth)/2);};
  requestAnimationFrame(centerComparison);window.addEventListener('resize',centerComparison,{passive:true});strip.addEventListener('pointerdown',()=>{autoCenter=false;},{passive:true});

  for(const d of c.tables||[]){
    const article=el('article','benchmark-card');article.id=`table-${d.id}`;const head=el('div','benchmark-head');const ht=el('div');ht.append(el('span','benchmark-number',d.number));const h=el('h3','',d.title);h.id=`table-${d.id}-title`;ht.append(h,el('p','',d.description));head.append(ht);const u=safeURL(d.source);if(u){const a=link(u,'Original table','text-link');a.append(icon('expand'));head.append(a);}article.append(head,el('p','scroll-hint','Scroll horizontally to see all metrics →'));
    const wrap=el('div','table-scroll');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-labelledby',h.id);const table=el('table',`${d.id}-table`);table.setAttribute('aria-labelledby',h.id);const thead=el('thead');
    if(d.groups?.length){const tr=el('tr','group-row');const m=el('th','method-heading','Method');m.rowSpan=2;m.scope='col';tr.append(m);for(const g of d.groups){const th=el('th','',g.name);th.scope='colgroup';th.colSpan=g.span;tr.append(th);}thead.append(tr);}
    const hr=el('tr');if(!d.groups?.length){const t=el('th','method-heading','Method');t.scope='col';hr.append(t);}
    for(const col of d.columns){const t=el('th');t.scope='col';const abbr=el('abbr','metric-name',col.label);abbr.title=col.description||col.label;t.append(abbr,el('span','metric-arrow',col.direction==='up'?' ↑':' ↓'));if(col.unit)t.append(el('span','metric-unit',`(${col.unit})`));hr.append(t);}thead.append(hr);table.append(thead);
    const ranked=d.columns.map((col,i)=>[...new Set(d.rows.map(r=>Number(r.values[i])))].sort((a,b)=>col.direction==='up'?b-a:a-b));const tbody=el('tbody');
    for(const r of d.rows){if(r.values.length!==d.columns.length)throw Error(`Invalid table row: ${r.method}`);const tr=el('tr',r.ours?'ours-row':'');const th=el('th','',r.method);th.scope='row';tr.append(th);r.values.forEach((v,i)=>{const rank=ranked[i].indexOf(Number(v));const td=el('td',rank===0?'metric-best':rank===1?'metric-second':'',String(v));td.dataset.value=String(v);if(rank<2)td.setAttribute('aria-label',`${v}, ${rank===0?'best':'second-best'}`);tr.append(td);});tbody.append(tr);}table.append(tbody);wrap.append(table);article.append(wrap,el('p','table-note',d.note));$('#benchmark-tables').append(article);
  }
  const a=c.architecture||{};if(safeURL(a.src))$('#architecture-image').src=safeURL(a.src);if(text(a.alt))$('#architecture-image').alt=a.alt;$('#architecture-caption').textContent=text(a.caption);
  if(text(c.abstract))$('#abstract-text').textContent=c.abstract;
  if(c.showReleaseStatement&&links===3&&text(c.releaseStatement)){$('#abstract-release').textContent=c.releaseStatement;$('#abstract-release').hidden=false;}
  const dlg=$('#figure-dialog');const openFigure=(src,title,alt)=>{const u=safeURL(src);if(!u)return;$('#dialog-title').textContent=title;$('#dialog-image').src=u;$('#dialog-image').alt=alt||title;$('#dialog-original').href=u;if(dlg.showModal)dlg.showModal();else window.open(u,'_blank','noopener');};
  $('#open-cover').addEventListener('click',()=>openFigure(c.cover?.src,c.cover?.title||'Project overview',c.cover?.alt));
  const openArchitecture=()=>openFigure(a.src,'SGDiT architecture',a.alt);$('#open-architecture').addEventListener('click',openArchitecture);$('#architecture-image-button').addEventListener('click',openArchitecture);$('#close-dialog').addEventListener('click',()=>dlg.close());
  dlg.addEventListener('click',e=>{if(e.target===dlg){const r=dlg.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close();}});
  if(c.mode==='public'){
    for(const author of c.authors||[]){if(!text(author.name))continue;const u=safeURL(author.url);$('#authors').append(u?link(u,author.name,''):el('span','',author.name));}$('#authors').hidden=!$('#authors').childElementCount;
    for(const aff of c.affiliations||[])$('#affiliations').append(el('p','',String(aff)));$('#affiliations').hidden=!$('#affiliations').childElementCount;
    if(text(c.citation)){$('#citation-code').textContent=c.citation;$('#citation').hidden=false;}
  }
})();
