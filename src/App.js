import React, { useState, useEffect, useRef } from 'react';
import { SEED_IMAGES } from './seedImages';

const SEED_ITEMS = [
  { id: 1, name: "Dethalia Nappa Leather Sandal", brand: "Schutz", category: "Shoes", color: "Tan", colorHex: "#A0704A", occasions: ["Dinner", "Work", "Casual"], status: "owned", image: "IMG_1", notes: "Cognac kitten heel mule" },
  { id: 2, name: "The Maia", brand: "M.Gemi", category: "Shoes", color: "Gold", colorHex: "#C9A84C", occasions: ["Evening", "Dinner", "Special"], status: "owned", image: "IMG_2", notes: "Champagne block heel mule" },
  { id: 3, name: "Embellished Halter Top", brand: "Unknown", category: "Tops", color: "Olive", colorHex: "#556B2F", occasions: ["Evening", "Dinner", "Special"], status: "owned", image: "IMG_3", notes: "Army green halter with gemstone detail" },
  { id: 4, name: "Lace-Up Blazer", brand: "Nocturne", category: "Outerwear", color: "Forest", colorHex: "#2D4A2D", occasions: ["Work", "Dinner", "Evening"], status: "owned", image: "IMG_4", notes: "Forest green corset-lace detail blazer" },
  { id: 5, name: "Square-Neck Mini Dress", brand: "Unknown", category: "Dresses", color: "Cream", colorHex: "#F5F0E8", occasions: ["Dinner", "Casual", "Brunch"], status: "owned", image: "IMG_5", notes: "Ivory A-line with puff sleeves" },
  { id: 6, name: "Corset Midi Dress", brand: "Unknown", category: "Dresses", color: "Chocolate", colorHex: "#5C3D2E", occasions: ["Evening", "Dinner", "Special"], status: "owned", image: "IMG_6", notes: "Brown corset-bodice midi, full skirt" },
  { id: 7, name: "Military Blazer", brand: "Vintage", category: "Outerwear", color: "Black", colorHex: "#1A1A1A", occasions: ["Work", "Casual", "Evening"], status: "owned", image: "IMG_7", notes: "Black with gold military buttons" },
  { id: 8, name: "Belted Shirtdress", brand: "Unknown", category: "Dresses", color: "White", colorHex: "#F8F8F8", occasions: ["Work", "Casual", "Brunch"], status: "wishlist", image: "IMG_8", notes: "White midi with black leather belt" },
];

const ALL_CATEGORIES = ["Dresses", "Tops", "Outerwear", "Shoes", "Bags", "Accessories"];
const ALL_OCCASIONS  = ["Work", "Casual", "Dinner", "Evening", "Special", "Brunch"];
const NAV_TABS       = ["All", "Dresses", "Tops", "Outerwear", "Shoes"];

const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};

function FilterSheet({ occasions, setOccasions, statusFilter, setStatusFilter, onClose, onClear }) {
  const toggleOcc = o => setOccasions(p => p.includes(o) ? p.filter(x=>x!==o) : [...p,o]);
  const chip = a => ({ padding:'8px 16px', fontSize:13, fontFamily:"'Jost',sans-serif", cursor:'pointer', borderRadius:20, background:a?'#1A1714':'#F0EDE8', border:'none', color:a?'#FAFAF8':'#6B5E4E' });
  return (
    <div style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.3)',display:'flex',flexDirection:'column',justifyContent:'flex-end'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#FAFAF8',borderRadius:'20px 20px 0 0',paddingBottom:'calc(28px + env(safe-area-inset-bottom))'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'12px 0 0'}}><div style={{width:36,height:4,borderRadius:2,background:'#D8D4CE'}}/></div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 20px 20px'}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:'#1A1714'}}>Filter</span>
          <button onClick={onClear} style={{background:'none',border:'none',fontFamily:"'Jost',sans-serif",fontSize:12,color:'#9A928A',cursor:'pointer',textDecoration:'underline'}}>Clear all</button>
        </div>
        <div style={{padding:'0 20px 20px'}}>
          <div style={{fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'#9A928A',marginBottom:12}}>Occasion</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{ALL_OCCASIONS.map(o=><button key={o} onClick={()=>toggleOcc(o)} style={chip(occasions.includes(o))}>{o}</button>)}</div>
        </div>
        <div style={{padding:'0 20px 20px'}}>
          <div style={{fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'#9A928A',marginBottom:12}}>Status</div>
          <div style={{display:'flex',gap:8}}>
            {['All','owned','wishlist'].map(s=>(
              <button key={s} onClick={()=>setStatusFilter(s)} style={chip(statusFilter===s)}>
                {s==='All'?'All Pieces':s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{padding:'0 20px'}}>
          <button onClick={onClose} style={{width:'100%',padding:16,background:'#1A1714',border:'none',color:'#FAFAF8',fontFamily:"'Jost',sans-serif",fontSize:13,letterSpacing:'0.15em',textTransform:'uppercase',cursor:'pointer',borderRadius:12}}>Done</button>
        </div>
      </div>
    </div>
  );
}

function OutfitSheet({ items, imageMap, onClose }) {
  const [sel, setSel] = useState([]);
  const toggle = id => setSel(s => s.includes(id) ? s.filter(x=>x!==id) : s.length<4 ? [...s,id] : s);
  const outfit = items.filter(i => sel.includes(i.id));
  return (
    <div style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.3)',display:'flex',flexDirection:'column',justifyContent:'flex-end'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#FAFAF8',borderRadius:'20px 20px 0 0',height:'82%',display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'12px 0 0',flexShrink:0}}><div style={{width:36,height:4,borderRadius:2,background:'#D8D4CE'}}/></div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 20px 0',flexShrink:0}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:'#1A1714'}}>Build an Outfit</span>
          <button onClick={onClose} style={{background:'none',border:'none',fontSize:20,color:'#9A928A',cursor:'pointer'}}>✕</button>
        </div>
        {outfit.length > 0 && (
          <div style={{padding:'12px 20px 0',flexShrink:0}}>
            <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4}}>
              {outfit.map(item=>(
                <div key={item.id} style={{flexShrink:0,textAlign:'center'}}>
                  <div style={{width:56,height:74,backgroundImage:`url(${imageMap[item.image]||item.image})`,backgroundSize:'cover',backgroundPosition:'top center',borderRadius:8,border:'1px solid #D8D4CE'}}/>
                  <div style={{fontFamily:"'Jost',sans-serif",fontSize:8,color:'#9A928A',marginTop:4,maxWidth:56,lineHeight:1.2}}>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{fontFamily:"'Jost',sans-serif",fontSize:9,color:'#B0A89E',letterSpacing:'0.12em',textTransform:'uppercase',padding:'12px 20px 8px',flexShrink:0}}>Select up to 4 pieces</div>
        <div style={{overflowY:'auto',flex:1,padding:'0 20px 20px',WebkitOverflowScrolling:'touch'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {items.map(item=>{
              const isSel=sel.includes(item.id);
              return(
                <div key={item.id} onClick={()=>toggle(item.id)} style={{cursor:'pointer',border:isSel?'2px solid #1A1714':'2px solid transparent',borderRadius:10,overflow:'hidden',background:'#F0EDE8',position:'relative'}}>
                  <div style={{height:140,backgroundImage:`url(${imageMap[item.image]||item.image})`,backgroundSize:'cover',backgroundPosition:'top center'}}/>
                  {isSel&&<div style={{position:'absolute',top:8,right:8,width:20,height:20,background:'#1A1714',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#FAFAF8'}}>✓</div>}
                  <div style={{padding:'8px 10px'}}>
                    <div style={{fontFamily:"'Jost',sans-serif",fontSize:9,color:'#6B5E4E',letterSpacing:'0.1em',textTransform:'uppercase'}}>{item.brand}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:'#1A1714',lineHeight:1.2}}>{item.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadSheet({ onClose, onSave }) {
  const [step, setStep] = useState('upload');
  const [imgData, setImgData] = useState(null);
  const [form, setForm] = useState({ name:'', brand:'', category:'Dresses', color:'', colorHex:'#888888', occasions:[], status:'owned', notes:'' });
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleFile = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setImgData(e.target.result);
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!imgData) return;
    setStep('analyzing'); setError(null);
    try {
      const base64 = imgData.split(',')[1];
      const mime = imgData.split(';')[0].split(':')[1];
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          messages: [{ role: 'user', content: [
            { type: 'image', source: { type: 'base64', media_type: mime, data: base64 }},
            { type: 'text', text: 'Analyze this clothing item. Return ONLY a JSON object, no markdown, no backticks:\n{"name":"product name","brand":"brand or Unknown","category":"Dresses|Tops|Outerwear|Shoes|Bags|Accessories","color":"color name","colorHex":"#hexcode","occasions":["2-3 of Work/Casual/Dinner/Evening/Special/Brunch"],"notes":"one sentence style description"}' }
          ]}]
        })
      });
      const data = await res.json();
      let responseText = '';
      if (data.content) {
        responseText = data.content.map(c=>c.text||'').join('');
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        responseText = JSON.stringify(data);
      }
      const clean = responseText.replace(/```json|```/g,'').trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON in response');
      const parsed = JSON.parse(jsonMatch[0]);
      setForm(f=>({...f,...parsed,status:f.status}));
      setStep('review');
    } catch(e) {
      setError('Could not auto-analyze. Please fill in details manually.');
      setStep('review');
    }
  };

  const toggleOcc = o => setForm(f=>({...f,occasions:f.occasions.includes(o)?f.occasions.filter(x=>x!==o):[...f.occasions,o]}));
  const handleSave = () => { if(!form.name||!imgData) return; onSave({...form,image:imgData,id:Date.now()}); onClose(); };

  const inp = {width:'100%',padding:'12px 14px',border:'1px solid #E8E4DF',borderRadius:10,fontFamily:"'Jost',sans-serif",fontSize:14,color:'#1A1714',background:'#F7F5F2',outline:'none',boxSizing:'border-box'};
  const lbl = {fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'#9A928A',marginBottom:6,display:'block'};
  const chip = a => ({padding:'8px 15px',fontSize:12,fontFamily:"'Jost',sans-serif",cursor:'pointer',borderRadius:16,background:a?'#1A1714':'#F0EDE8',border:'none',color:a?'#FAFAF8':'#6B5E4E'});

  return (
    <div style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.3)',display:'flex',flexDirection:'column',justifyContent:'flex-end'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#FAFAF8',borderRadius:'20px 20px 0 0',height:'92%',display:'flex',flexDirection:'column',paddingBottom:'env(safe-area-inset-bottom)'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'12px 0 0',flexShrink:0}}><div style={{width:36,height:4,borderRadius:2,background:'#D8D4CE'}}/></div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 20px 0',flexShrink:0}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:'#1A1714'}}>
            {step==='upload'?'Add New Piece':step==='analyzing'?'Analyzing...':'Review Details'}
          </span>
          <button onClick={onClose} style={{background:'none',border:'none',fontSize:20,color:'#9A928A',cursor:'pointer'}}>✕</button>
        </div>
        <div style={{overflowY:'auto',flex:1,padding:'16px 20px',WebkitOverflowScrolling:'touch'}}>
          {step==='upload'&&(
            <div>
              <div onClick={()=>fileRef.current.click()} style={{border:'2px dashed #D8D4CE',borderRadius:16,textAlign:'center',cursor:'pointer',background:'#F2F0EC',minHeight:220,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                {imgData?<img src={imgData} alt="preview" style={{width:'100%',height:240,objectFit:'cover',objectPosition:'top'}}/>
                  :<div style={{padding:40}}>
                    <div style={{fontSize:36,marginBottom:12}}>📷</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:'#9A928A',marginBottom:6}}>Tap to upload photo</div>
                    <div style={{fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'#C8C4BE'}}>from camera roll or files</div>
                  </div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleFile(e.target.files[0])}/>
              <button onClick={analyzeImage} disabled={!imgData} style={{width:'100%',marginTop:16,padding:16,background:imgData?'#1A1714':'#E8E4DF',border:'none',color:imgData?'#FAFAF8':'#B0A89E',fontFamily:"'Jost',sans-serif",fontSize:13,letterSpacing:'0.15em',textTransform:'uppercase',cursor:imgData?'pointer':'default',borderRadius:12}}>
                Analyze with AI
              </button>
            </div>
          )}
          {step==='analyzing'&&(
            <div style={{textAlign:'center',padding:'40px 0'}}>
              {imgData&&<img src={imgData} alt="analyzing" style={{width:120,height:160,objectFit:'cover',objectPosition:'top',borderRadius:12,marginBottom:20,opacity:0.6}}/>}
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:'#9A928A'}}>Reading your piece...</div>
              <div style={{fontFamily:"'Jost',sans-serif",fontSize:9,color:'#C8C4BE',letterSpacing:'0.18em',textTransform:'uppercase',marginTop:8}}>Identifying details</div>
            </div>
          )}
          {step==='review'&&(
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {error&&<div style={{fontFamily:"'Jost',sans-serif",fontSize:12,color:'#9A928A',padding:'10px 14px',background:'#F2F0EC',borderRadius:8}}>{error}</div>}
              {imgData&&<div style={{borderRadius:12,overflow:'hidden',height:200}}><img src={imgData} alt="item" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/></div>}
              <div><label style={lbl}>Item Name</label><input style={inp} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Silk Wrap Dress"/></div>
              <div><label style={lbl}>Brand</label><input style={inp} value={form.brand} onChange={e=>setForm(f=>({...f,brand:e.target.value}))} placeholder="e.g. Zimmermann"/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                <div><label style={lbl}>Category</label>
                  <select style={inp} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                    {ALL_CATEGORIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Status</label>
                  <select style={inp} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
                    <option value="owned">Owned</option><option value="wishlist">Wishlist</option>
                  </select>
                </div>
              </div>
              <div><label style={lbl}>Color</label>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <input style={{...inp,flex:1}} value={form.color} onChange={e=>setForm(f=>({...f,color:e.target.value}))} placeholder="e.g. Ivory"/>
                  <input type="color" value={form.colorHex} onChange={e=>setForm(f=>({...f,colorHex:e.target.value}))} style={{width:44,height:44,border:'1px solid #E8E4DF',borderRadius:8,cursor:'pointer',padding:2,flexShrink:0}}/>
                </div>
              </div>
              <div><label style={lbl}>Occasions</label>
                <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>{ALL_OCCASIONS.map(o=><button key={o} onClick={()=>toggleOcc(o)} style={chip(form.occasions.includes(o))}>{o}</button>)}</div>
              </div>
              <div><label style={lbl}>Notes</label><input style={inp} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Brief style description"/></div>
              <button onClick={handleSave} disabled={!form.name} style={{width:'100%',padding:16,background:form.name?'#1A1714':'#E8E4DF',border:'none',color:form.name?'#FAFAF8':'#B0A89E',fontFamily:"'Jost',sans-serif",fontSize:13,letterSpacing:'0.15em',textTransform:'uppercase',cursor:form.name?'pointer':'default',borderRadius:12,marginTop:4}}>
                Save to Closet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [imageMap, setImageMap]         = useState(SEED_IMAGES);
  const [items, setItems]               = useState([]);
  const [loaded, setLoaded]             = useState(false);
  const [activeTab, setActiveTab]       = useState('All');
  const [occasions, setOccasions]       = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilter, setShowFilter]     = useState(false);
  const [showOutfit, setShowOutfit]     = useState(false);
  const [showUpload, setShowUpload]     = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const stored = store.get('closet-items');
    const storedImg = store.get('closet-images');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
        if (storedImg) setImageMap(prev=>({...prev,...JSON.parse(storedImg)}));
      } catch { setItems(SEED_ITEMS); store.set('closet-items', JSON.stringify(SEED_ITEMS)); }
    } else {
      setItems(SEED_ITEMS);
      store.set('closet-items', JSON.stringify(SEED_ITEMS));
    }
    setLoaded(true);
  }, []);

  const persistItems = next => { setItems(next); store.set('closet-items', JSON.stringify(next)); };
  const persistImage = (key, data) => {
    const next = {...imageMap,[key]:data}; setImageMap(next);
    const u = Object.fromEntries(Object.entries(next).filter(([k])=>!k.startsWith('IMG_')));
    store.set('closet-images', JSON.stringify(u));
  };
  const toggleStatus = id => persistItems(items.map(i=>i.id===id?{...i,status:i.status==='owned'?'wishlist':'owned'}:i));
  const handleAddItem = newItem => {
    const {image:imgData,...rest} = newItem;
    const key = `user-${rest.id}`;
    persistImage(key, imgData);
    persistItems([...items,{...rest,image:key}]);
  };
  const clearFilters = () => { setOccasions([]); setStatusFilter('All'); };
  const activeFilters = occasions.length + (statusFilter!=='All'?1:0);

  const filtered = items.filter(item => {
    if (activeTab!=='All' && item.category!==activeTab) return false;
    if (occasions.length && !occasions.some(o=>item.occasions.includes(o))) return false;
    if (statusFilter==='owned' && item.status!=='owned') return false;
    if (statusFilter==='wishlist' && item.status!=='wishlist') return false;
    return true;
  });

  const owned = items.filter(i=>i.status==='owned').length;
  const wishlist = items.filter(i=>i.status==='wishlist').length;

  if (!loaded) return <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#FAFAF8'}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:'#9A928A',letterSpacing:'0.1em'}}>Loading...</span></div>;

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',background:'#F7F5F2',overflow:'hidden',maxWidth:430,margin:'0 auto'}}>
      <div style={{flexShrink:0,background:'#FAFAF8',borderBottom:'1px solid #EDE9E3',paddingTop:'env(safe-area-inset-top)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 20px 8px'}}>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:300,letterSpacing:'0.14em',color:'#1A1714',lineHeight:1}}>ARCHIVE</div>
            <div style={{fontFamily:"'Jost',sans-serif",fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'#B0A89E',marginTop:3}}>{owned} owned · {wishlist} wishlist</div>
          </div>
          <button onClick={()=>setShowFilter(true)} style={{width:40,height:40,borderRadius:'50%',background:activeFilters>0?'#1A1714':'#F0EDE8',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',flexShrink:0}}>
            <svg width="17" height="13" viewBox="0 0 17 13" fill="none"><path d="M1 1.5h15M4 6.5h9M7 11.5h3" stroke={activeFilters>0?'#FAFAF8':'#6B5E4E'} strokeWidth="1.6" strokeLinecap="round"/></svg>
            {activeFilters>0&&<div style={{position:'absolute',top:-2,right:-2,width:16,height:16,background:'#8B7355',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Jost',sans-serif",fontSize:9,color:'#FAFAF8'}}>{activeFilters}</div>}
          </button>
        </div>
        <div style={{display:'flex',overflowX:'auto',padding:'0 16px',scrollbarWidth:'none'}}>
          {NAV_TABS.map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{flexShrink:0,padding:'10px 14px',background:'none',border:'none',borderBottom:activeTab===tab?'2px solid #1A1714':'2px solid transparent',fontFamily:"'Jost',sans-serif",fontSize:11,letterSpacing:'0.1em',textTransform:'uppercase',color:activeTab===tab?'#1A1714':'#9A928A',cursor:'pointer'}}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{flexShrink:0,padding:'8px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'#FAFAF8',borderBottom:'1px solid #EDE9E3'}}>
        <span style={{fontFamily:"'Jost',sans-serif",fontSize:10,color:'#B0A89E'}}>{filtered.length} {filtered.length===1?'piece':'pieces'}</span>
        {activeFilters>0&&<button onClick={clearFilters} style={{background:'none',border:'none',fontFamily:"'Jost',sans-serif",fontSize:10,color:'#9A928A',cursor:'pointer',textDecoration:'underline'}}>Clear filters</button>}
      </div>

      <div style={{flex:1,overflowY:'auto',padding:'6px 6px 100px',WebkitOverflowScrolling:'touch'}}>
        {filtered.length===0
          ?<div style={{padding:'60px 20px',textAlign:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:'#C8C4BE'}}>No pieces match your filters</div>
          :<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
            {filtered.map(item=>(
              <div key={item.id} style={{position:'relative',aspectRatio:'2/3',overflow:'hidden',borderRadius:10,background:'#EDE9E3',cursor:'pointer'}}>
                <img src={imageMap[item.image]||item.image} alt={item.name} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}
                  onError={e=>{e.target.style.display='none';e.target.parentElement.style.background=item.colorHex+'33';}}/>
                {item.status==='wishlist'&&<div style={{position:'absolute',top:8,left:8,fontSize:7,letterSpacing:'0.1em',textTransform:'uppercase',padding:'3px 7px',background:'rgba(250,250,248,0.9)',borderRadius:4,color:'#9A928A',fontFamily:"'Jost',sans-serif"}}>Wishlist</div>}
                <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(247,245,242,0.97))',padding:'20px 10px 10px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:5}}>
                    <div style={{width:7,height:7,borderRadius:'50%',background:item.colorHex,border:'1px solid rgba(0,0,0,0.08)',flexShrink:0}}/>
                    <div style={{fontFamily:"'Jost',sans-serif",fontSize:8,letterSpacing:'0.12em',textTransform:'uppercase',color:'#6B5E4E'}}>{item.brand}</div>
                  </div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:'#1A1714',lineHeight:1.2,marginTop:2}}>{item.name}</div>
                </div>
                <button onClick={e=>{e.stopPropagation();toggleStatus(item.id);}} style={{position:'absolute',top:8,right:8,width:28,height:28,background:'rgba(250,250,248,0.88)',border:'none',borderRadius:'50%',cursor:'pointer',color:item.status==='owned'?'#6B5E4E':'#C8C4BE',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {item.status==='owned'?'♥':'♡'}
                </button>
              </div>
            ))}
          </div>
        }
      </div>

      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:430,background:'rgba(250,250,248,0.95)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',borderTop:'1px solid #E8E4DF',paddingBottom:'env(safe-area-inset-bottom)',display:'flex',justifyContent:'space-around',alignItems:'center',padding:'10px 0',zIndex:100}}>
        <button style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'0 20px'}}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M1 2h20M1 8h20M1 14h20" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:9,letterSpacing:'0.1em',textTransform:'uppercase',color:'#1A1714'}}>Closet</span>
        </button>
        <button onClick={()=>setShowUpload(true)} style={{width:52,height:52,borderRadius:'50%',background:'#1A1714',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 16px rgba(26,23,20,0.22)',marginBottom:10}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#FAFAF8" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="3" x2="10" y2="17"/><line x1="3" y1="10" x2="17" y2="10"/></svg>
        </button>
        <button onClick={()=>setShowOutfit(true)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'0 20px'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="9" rx="1.5" stroke="#9A928A" strokeWidth="1.5"/><rect x="14" y="3" width="7" height="9" rx="1.5" stroke="#9A928A" strokeWidth="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5" stroke="#9A928A" strokeWidth="1.5"/><rect x="14" y="15" width="7" height="6" rx="1.5" stroke="#9A928A" strokeWidth="1.5"/></svg>
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:9,letterSpacing:'0.1em',textTransform:'uppercase',color:'#9A928A'}}>Outfits</span>
        </button>
      </div>

      {showFilter&&<FilterSheet occasions={occasions} setOccasions={setOccasions} statusFilter={statusFilter} setStatusFilter={setStatusFilter} onClose={()=>setShowFilter(false)} onClear={()=>{clearFilters();setShowFilter(false);}}/>}
      {showOutfit&&<OutfitSheet items={items.filter(i=>i.status==='owned')} imageMap={imageMap} onClose={()=>setShowOutfit(false)}/>}
      {showUpload&&<UploadSheet onClose={()=>setShowUpload(false)} onSave={handleAddItem}/>}
    </div>
  );
}
