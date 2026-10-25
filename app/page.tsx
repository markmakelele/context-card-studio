"use client";
import { useEffect, useState } from "react";
type Card={id:number;title:string;context:string;titleSw:string;contextSw:string};
type Style={background:string;ink:string;radius:number;padding:number};
const seed:Card[]=[{id:1,title:"Small is beautiful",context:"Paying attention to the details can change how the whole picture feels.",titleSw:"Kidogo kina uzuri",contextSw:"Kuzingatia maelezo madogo kunaweza kubadilisha jinsi picha nzima inavyohisiwa."},{id:2,title:"The slow season",context:"Rest is part of the work. Quiet seasons often prepare us for the next thing.",titleSw:"Majira ya polepole",contextSw:"Pumziko ni sehemu ya kazi. Nyakati tulivu mara nyingi hutuandaa kwa hatua inayofuata."},{id:3,title:"Begin again",context:"A fresh start can begin with the next small choice.",titleSw:"Anza tena",contextSw:"Mwanzo mpya unaweza kuanza na uamuzi mdogo unaofuata."}];
const defaultStyle:Style={background:"#e8efe4",ink:"#283326",radius:20,padding:22};
export default function Home(){
 const [cards,setCards]=useState<Card[]>(seed),[style,setStyle]=useState<Style>(defaultStyle),[lang,setLang]=useState<"en"|"sw">("en"),[activeId,setActiveId]=useState(1),[saved,setSaved]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem("context-card-studio");if(raw){const d=JSON.parse(raw);setCards(d.cards??seed);setStyle(d.style??defaultStyle)}}catch{/* Keep starter cards if saved data is unavailable. */}},[]);
 const active=cards.find(c=>c.id===activeId)??cards[0];
 function chooseLanguage(value:"en"|"sw"){setLang(value);document.documentElement.lang=value}
 function update(key:"title"|"context"|"titleSw"|"contextSw",value:string){setCards(old=>old.map(c=>c.id===activeId?{...c,[key]:value}:c));setSaved(false)}
 function save(){localStorage.setItem("context-card-studio",JSON.stringify({cards,style}));setSaved(true)}
 function add(){const id=Date.now();setCards(old=>[...old,{id,title:"A new idea",context:"Add a little more context here.",titleSw:"Wazo jipya",contextSw:"Ongeza muktadha zaidi hapa."}]);setActiveId(id);setSaved(false)}
 function remove(){if(cards.length<2)return;const next=cards.filter(c=>c.id!==activeId);setCards(next);setActiveId(next[0].id);setSaved(false)}
 if(!active)return null;
 const title=lang==="en"?active.title:active.titleSw,context=lang==="en"?active.context:active.contextSw;
 const vars={"--card-bg":style.background,"--card-ink":style.ink,"--card-radius":`${style.radius}px`,"--card-padding":`${style.padding}px`} as React.CSSProperties;
 return <main className="studio">
  <header className="topbar"><a className="brand" href="#"><span className="brand-mark">c</span> context<span className="brand-light">studio</span></a><span className="top-note"><i/> A small tool for thoughtful details</span><button className="save-button" onClick={save}>{saved?"Saved ✓":"Save changes"}</button></header>
  <section className="hero"><div><p className="eyebrow">A tiny studio for clearer stories</p><h1>Give your ideas<br/><em>a little context.</em></h1><p className="hero-copy">Build a card, choose its language, and style the box. Readers can reveal extra detail on hover or with a keyboard.</p></div><div className="stamp"><span>01</span><i>✳</i><small>MAKE IT<br/>MAKE SENSE</small></div></section>
  <div className="workspace"><section className="editor"><div className="panel-head"><div><p className="eyebrow">The editor</p><h2>Shape your card</h2></div><span className="step">01 <i>/</i> 02</span></div>
   <label className="label">Choose a card</label><div className="picker">{cards.map((c,i)=><button key={c.id} className={`pick ${c.id===activeId?"selected":""}`} onClick={()=>{setActiveId(c.id);setSaved(false)}}><span>{String(i+1).padStart(2,"0")}</span><b>{c.title||"Untitled card"}</b><i>↗</i></button>)}<button className="add" onClick={add}>＋ &nbsp;Add a card</button></div>
   <hr/><div className="field-head"><label className="label" htmlFor="title">Card content</label><label className="language">Language <select value={lang} onChange={e=>chooseLanguage(e.target.value as "en"|"sw")}><option value="en">English</option><option value="sw">Kiswahili</option></select></label></div>
   <label className="input-label" htmlFor="title">Title <span>Short and memorable</span></label><input id="title" maxLength={64} placeholder="Give this idea a name" value={lang==="en"?active.title:active.titleSw} onChange={e=>update(lang==="en"?"title":"titleSw",e.target.value)}/>
   <label className="input-label context-label" htmlFor="context">Context <span>A sentence or two</span></label><textarea id="context" rows={3} maxLength={220} placeholder="What should someone know?" value={context} onChange={e=>update(lang==="en"?"context":"contextSw",e.target.value)}/><div className="count">Keep it clear and human.<span>{context.length}/220</span></div>
   <hr className="style-rule"/><div className="panel-head style-head"><div><p className="eyebrow">Make it yours</p><h2>Box styling</h2></div><span className="glyph">◩</span></div>
   <div className="colors"><label>Background color<span className="swatch"><input aria-label="Card background color" type="color" value={style.background} onChange={e=>{setStyle({...style,background:e.target.value});setSaved(false)}}/><code>{style.background.toUpperCase()}</code></span></label><label>Text color<span className="swatch"><input aria-label="Card text color" type="color" value={style.ink} onChange={e=>{setStyle({...style,ink:e.target.value});setSaved(false)}}/><code>{style.ink.toUpperCase()}</code></span></label></div>
   <label className="range">Corner roundness <span>{style.radius}px</span><input type="range" min="0" max="40" value={style.radius} onChange={e=>{setStyle({...style,radius:+e.target.value});setSaved(false)}}/></label><label className="range">Inside spacing <span>{style.padding}px</span><input type="range" min="14" max="36" value={style.padding} onChange={e=>{setStyle({...style,padding:+e.target.value});setSaved(false)}}/></label>
   <div className="actions"><button className="remove" disabled={cards.length<2} onClick={remove}>Remove card</button><button className="primary" onClick={save}>{saved?"Saved to this browser ✓":"Save card changes ↗"}</button></div>
  </section>
  <section className="preview"><div className="preview-head"><div><p className="eyebrow">The result</p><h2>A live preview</h2></div><span className="live">● LIVE</span></div><div className="stage"><div className="stage-label"><span>YOUR CARD</span><span>HOVER OR FOCUS ↗</span></div><article className="card" style={vars} tabIndex={0} aria-describedby="card-context"><div className="card-top"><span>CONTEXT CARD <b>✳</b></span><span>↗</span></div><h3>{title||"Your card title"}</h3><div className="reveal" id="card-context" role="note"><span>{lang==="en"?"A LITTLE MORE":"MAELEZO ZAIDI"}</span><p>{context||(lang==="en"?"Your extra context will appear here.":"Muktadha wako utaonekana hapa.")}</p></div><div className="card-bottom"><span>{lang==="en"?"Reveal the context":"Fungua muktadha"}</span><b>↗</b></div></article><p className="tip">↳ &nbsp; Try tabbing to the card, too.</p></div><div className="preview-foot"><span>Accessible by design</span><span>⌘ &nbsp;Built for the web</span></div></section></div>
  <footer className="footer"><span>CONTEXT STUDIO <b>·</b> MAKE ROOM FOR THE DETAILS</span><span>Made for curious minds ✳</span></footer>
 </main>
}


