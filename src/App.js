import React, { useState, useEffect } from 'react';
import { SEED_IMAGES } from './seedImages';
import { FilterSheet, OutfitSheet, UploadSheet } from './Sheets';

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

const NAV_TABS = ["All", "Dresses", "Tops", "Outerwear", "Shoes"];

const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};

export default function App() {
  const [imageMap, setImageMap] = useState(SEED_IMAGES);
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [occasions, setOccasions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showOutfit, setShowOutfit] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const stored = store.get("closet-items");
    const storedImg = store.get("closet-images");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
        if (storedImg) setImageMap(prev => ({ ...prev, ...JSON.parse(storedImg) }));
      } catch { setItems(SEED_ITEMS); store.set("closet-items", JSON.stringify(SEED_ITEMS)); }
    } else {
      setItems(SEED_ITEMS);
      store.set("closet-items", JSON.stringify(SEED_ITEMS));
    }
    setLoaded(true);
  }, []);

  const persistItems = (next) => { setItems(next); store.set("closet-items", JSON.stringify(next)); };
  const persistImage = (key, data) => {
    const next = { ...imageMap, [key]: data };
    setImageMap(next);
    const u = Object.fromEntries(Object.entries(next).filter(([k]) => !k.startsWith("IMG_")));
    store.set("closet-images", JSON.stringify(u));
  };
  const toggleStatus = (id) => persistItems(items.map(i => i.id === id ? { ...i, status: i.status === "owned" ? "wishlist" : "owned" } : i));
  const handleAddItem = (newItem) => {
    const { image: imgData, ...rest } = newItem;
    const key = "user-" + rest.id;
    persistImage(key, imgData);
    persistItems([...items, { ...rest, image: key }]);
  };
  const clearFilters = () => { setOccasions([]); setStatusFilter("All"); };
  const activeFilters = occasions.length + (statusFilter !== "All" ? 1 : 0);

  const filtered = items.filter(item => {
    if (activeTab !== "All" && item.category !== activeTab) return false;
    if (occasions.length && !occasions.some(o => item.occasions.includes(o))) return false;
    if (statusFilter === "owned" && item.status !== "owned") return false;
    if (statusFilter === "wishlist" && item.status !== "wishlist") return false;
    return true;
  });

  const owned = items.filter(i => i.status === "owned").length;
  const wishlist = items.filter(i => i.status === "wishlist").length;

  if (!loaded) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAF8" }}>
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#9A928A" }}>Loading...</span>
    </div>
  );

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F7F5F2", overflow: "hidden", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ flexShrink: 0, background: "#FAFAF8", borderBottom: "1px solid #EDE9E3", paddingTop: "env(safe-area-inset-top)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px 8px" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, letterSpacing: "0.14em", color: "#1A1714", lineHeight: 1 }}>ARCHIVE</div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#B0A89E", marginTop: 3 }}>{owned} owned - {wishlist} wishlist</div>
          </div>
          <button onClick={() => setShowFilter(true)} style={{ width: 40, height: 40, borderRadius: "50%", background: activeFilters > 0 ? "#1A1714" : "#F0EDE8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
            <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
              <path d="M1 1.5h15M4 6.5h9M7 11.5h3" stroke={activeFilters > 0 ? "#FAFAF8" : "#6B5E4E"} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            {activeFilters > 0 && <div style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, background: "#8B7355", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Jost',sans-serif", fontSize: 9, color: "#FAFAF8" }}>{activeFilters}</div>}
          </button>
        </div>
        <div style={{ display: "flex", overflowX: "auto", padding: "0 16px", scrollbarWidth: "none" }}>
          {NAV_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flexShrink: 0, padding: "10px 14px", background: "none", border: "none", borderBottom: activeTab === tab ? "2px solid #1A1714" : "2px solid transparent", fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: activeTab === tab ? "#1A1714" : "#9A928A", cursor: "pointer" }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: "8px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAFAF8", borderBottom: "1px solid #EDE9E3" }}>
        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, color: "#B0A89E" }}>{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</span>
        {activeFilters > 0 && <button onClick={clearFilters} style={{ background: "none", border: "none", fontFamily: "'Jost',sans-serif", fontSize: 10, color: "#9A928A", cursor: "pointer", textDecoration: "underline" }}>Clear filters</button>}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "6px 6px 100px", WebkitOverflowScrolling: "touch" }}>
        {filtered.length === 0
          ? <div style={{ padding: "60px 20px", textAlign: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "#C8C4BE" }}>No pieces match your filters</div>
          : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {filtered.map(item => (
              <div key={item.id} style={{ position: "relative", aspectRatio: "2/3", overflow: "hidden", borderRadius: 10, background: "#EDE9E3", cursor: "pointer" }}>
                <img
                  src={imageMap[item.image] || item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                  onError={e => { e.target.style.display = "none"; e.target.parentElement.style.background = item.colorHex + "33"; }}
                />
                {item.status === "wishlist" && <div style={{ position: "absolute", top: 8, left: 8, fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 7px", background: "rgba(250,250,248,0.9)", borderRadius: 4, color: "#9A928A", fontFamily: "'Jost',sans-serif" }}>Wishlist</div>}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(247,245,242,0.97))", padding: "20px 10px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.colorHex, border: "1px solid rgba(0,0,0,0.08)", flexShrink: 0 }} />
                    <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B5E4E" }}>{item.brand}</div>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: "#1A1714", lineHeight: 1.2, marginTop: 2 }}>{item.name}</div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); toggleStatus(item.id); }}
                  style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, background: "rgba(250,250,248,0.88)", border: "none", borderRadius: "50%", cursor: "pointer", color: item.status === "owned" ? "#6B5E4E" : "#C8C4BE", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {item.status === "owned" ? "v" : "o"}
                </button>
              </div>
            ))}
          </div>
        }
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(250,250,248,0.95)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid #E8E4DF", paddingBottom: "env(safe-area-inset-bottom)", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0", zIndex: 100 }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "0 20px" }}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M1 2h20M1 8h20M1 14h20" stroke="#1A1714" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A1714" }}>Closet</span>
        </button>
        <button onClick={() => setShowUpload(true)} style={{ width: 52, height: 52, borderRadius: "50%", background: "#1A1714", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(26,23,20,0.22)", marginBottom: 10 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#FAFAF8" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="3" x2="10" y2="17" /><line x1="3" y1="10" x2="17" y2="10" /></svg>
        </button>
        <button onClick={() => setShowOutfit(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "0 20px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="9" rx="1.5" stroke="#9A928A" strokeWidth="1.5" /><rect x="14" y="3" width="7" height="9" rx="1.5" stroke="#9A928A" strokeWidth="1.5" /><rect x="3" y="15" width="7" height="6" rx="1.5" stroke="#9A928A" strokeWidth="1.5" /><rect x="14" y="15" width="7" height="6" rx="1.5" stroke="#9A928A" strokeWidth="1.5" /></svg>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A928A" }}>Outfits</span>
        </button>
      </div>

      {showFilter && <FilterSheet occasions={occasions} setOccasions={setOccasions} statusFilter={statusFilter} setStatusFilter={setStatusFilter} onClose={() => setShowFilter(false)} onClear={() => { clearFilters(); setShowFilter(false); }} />}
      {showOutfit && <OutfitSheet items={items.filter(i => i.status === "owned")} imageMap={imageMap} onClose={() => setShowOutfit(false)} />}
      {showUpload && <UploadSheet onClose={() => setShowUpload(false)} onSave={handleAddItem} />}
    </div>
  );
}
