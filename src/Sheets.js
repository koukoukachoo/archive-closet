import React, { useState, useRef } from "react";

const ALL_OCCASIONS = ["Work", "Casual", "Dinner", "Evening", "Special", "Brunch"];
const ALL_CATEGORIES = ["Dresses", "Tops", "Outerwear", "Shoes", "Bags", "Accessories"];

export function FilterSheet({ occasions, setOccasions, statusFilter, setStatusFilter, onClose, onClear }) {
  const toggleOcc = (o) => setOccasions(p => p.includes(o) ? p.filter(x => x !== o) : [...p, o]);
  const chip = (a) => ({ padding: "8px 16px", fontSize: 13, fontFamily: "Jost,sans-serif", cursor: "pointer", borderRadius: 20, background: a ? "#1A1714" : "#F0EDE8", border: "none", color: a ? "#FAFAF8" : "#6B5E4E" });
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#FAFAF8", borderRadius: "20px 20px 0 0", paddingBottom: "calc(28px + env(safe-area-inset-bottom))" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}><div style={{ width: 36, height: 4, borderRadius: 2, background: "#D8D4CE" }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 20px" }}>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 22, color: "#1A1714" }}>Filter</span>
          <button onClick={onClear} style={{ background: "none", border: "none", fontFamily: "Jost,sans-serif", fontSize: 12, color: "#9A928A", cursor: "pointer", textDecoration: "underline" }}>Clear all</button>
        </div>
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontFamily: "Jost,sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A928A", marginBottom: 12 }}>Occasion</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{ALL_OCCASIONS.map(o => <button key={o} onClick={() => toggleOcc(o)} style={chip(occasions.includes(o))}>{o}</button>)}</div>
        </div>
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontFamily: "Jost,sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A928A", marginBottom: 12 }}>Status</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["All", "owned", "wishlist"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={chip(statusFilter === s)}>
                {s === "All" ? "All Pieces" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 20px" }}>
          <button onClick={onClose} style={{ width: "100%", padding: 16, background: "#1A1714", border: "none", color: "#FAFAF8", fontFamily: "Jost,sans-serif", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", borderRadius: 12 }}>Done</button>
        </div>
      </div>
    </div>
  );
}

export function OutfitSheet({ items, imageMap, onClose }) {
  const [sel, setSel] = useState([]);
  const toggle = (id) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : s.length < 4 ? [...s, id] : s);
  const outfit = items.filter(i => sel.includes(i.id));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#FAFAF8", borderRadius: "20px 20px 0 0", height: "82%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0", flexShrink: 0 }}><div style={{ width: 36, height: 4, borderRadius: 2, background: "#D8D4CE" }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px 0", flexShrink: 0 }}>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 22, color: "#1A1714" }}>Build an Outfit</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: "#9A928A", cursor: "pointer" }}>X</button>
        </div>
        {outfit.length > 0 && (
          <div style={{ padding: "12px 20px 0", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {outfit.map(item => (
                <div key={item.id} style={{ flexShrink: 0, textAlign: "center" }}>
                  <div style={{ width: 56, height: 74, backgroundImage: "url(" + (imageMap[item.image] || item.image) + ")", backgroundSize: "cover", backgroundPosition: "top center", borderRadius: 8, border: "1px solid #D8D4CE" }} />
                  <div style={{ fontFamily: "Jost,sans-serif", fontSize: 8, color: "#9A928A", marginTop: 4, maxWidth: 56, lineHeight: 1.2 }}>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ fontFamily: "Jost,sans-serif", fontSize: 9, color: "#B0A89E", letterSpacing: "0.12em", textTransform: "uppercase", padding: "12px 20px 8px", flexShrink: 0 }}>Select up to 4 pieces</div>
        <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 20px", WebkitOverflowScrolling: "touch" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {items.map(item => {
              const isSel = sel.includes(item.id);
              return (
                <div key={item.id} onClick={() => toggle(item.id)} style={{ cursor: "pointer", border: isSel ? "2px solid #1A1714" : "2px solid transparent", borderRadius: 10, overflow: "hidden", background: "#F0EDE8", position: "relative" }}>
                  <div style={{ height: 140, backgroundImage: "url(" + (imageMap[item.image] || item.image) + ")", backgroundSize: "cover", backgroundPosition: "top center" }} />
                  {isSel && <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, background: "#1A1714", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#FAFAF8" }}>v</div>}
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontFamily: "Jost,sans-serif", fontSize: 9, color: "#6B5E4E", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.brand}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#1A1714", lineHeight: 1.2 }}>{item.name}</div>
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

export function UploadSheet({ onClose, onSave }) {
  const [step, setStep] = useState("upload");
  const [imgData, setImgData] = useState(null);
  const [form, setForm] = useState({ name: "", brand: "", category: "Dresses", color: "", colorHex: "#888888", occasions: [], status: "owned", notes: "" });
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImgData(e.target.result);
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!imgData) return;
    setStep("analyzing");
    setError(null);
    try {
      const base64 = imgData.split(",")[1];
      const mime = imgData.split(";")[0].split(":")[1];
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: mime, data: base64 } },
            { type: "text", text: "Analyze this clothing item. Return ONLY a JSON object, no markdown: {name, brand, category (Dresses/Tops/Outerwear/Shoes/Bags/Accessories), color, colorHex, occasions (array of 2-3 from Work/Casual/Dinner/Evening/Special/Brunch), notes}" }
          ]}]
        })
      });
      const data = await res.json();
      let txt = "";
      if (data.content) {
        txt = data.content.map(c => c.text || "").join("");
      } else {
        throw new Error("No content");
      }
      const start = txt.indexOf("{");
      const end = txt.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("No JSON");
      const parsed = JSON.parse(txt.slice(start, end + 1));
      setForm(f => ({ ...f, ...parsed, status: f.status }));
      setStep("review");
    } catch (e) {
      setError("Could not auto-analyze. Please fill in details manually.");
      setStep("review");
    }
  };

  const toggleOcc = (o) => setForm(f => ({ ...f, occasions: f.occasions.includes(o) ? f.occasions.filter(x => x !== o) : [...f.occasions, o] }));
  const handleSave = () => {
    if (!form.name || !imgData) return;
    onSave({ ...form, image: imgData, id: Date.now() });
    onClose();
  };

  const inp = { width: "100%", padding: "12px 14px", border: "1px solid #E8E4DF", borderRadius: 10, fontFamily: "Jost,sans-serif", fontSize: 14, color: "#1A1714", background: "#F7F5F2", outline: "none", boxSizing: "border-box" };
  const lbl = { fontFamily: "Jost,sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9A928A", marginBottom: 6, display: "block" };
  const chip = (a) => ({ padding: "8px 15px", fontSize: 12, fontFamily: "Jost,sans-serif", cursor: "pointer", borderRadius: 16, background: a ? "#1A1714" : "#F0EDE8", border: "none", color: a ? "#FAFAF8" : "#6B5E4E" });

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#FAFAF8", borderRadius: "20px 20px 0 0", height: "92%", display: "flex", flexDirection: "column", paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0", flexShrink: 0 }}><div style={{ width: 36, height: 4, borderRadius: 2, background: "#D8D4CE" }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px 0", flexShrink: 0 }}>
          <span style={{ fontFamily: "Georgia,serif", fontSize: 22, color: "#1A1714" }}>
            {step === "upload" ? "Add New Piece" : step === "analyzing" ? "Analyzing..." : "Review Details"}
          </span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: "#9A928A", cursor: "pointer" }}>X</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "16px 20px", WebkitOverflowScrolling: "touch" }}>
          {step === "upload" && (
            <div>
              <div onClick={() => fileRef.current.click()} style={{ border: "2px dashed #D8D4CE", borderRadius: 16, textAlign: "center", cursor: "pointer", background: "#F2F0EC", minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {imgData
                  ? <img src={imgData} alt="preview" style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "top" }} />
                  : <div style={{ padding: 40 }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>photo</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#9A928A", marginBottom: 6 }}>Tap to upload photo</div>
                    <div style={{ fontFamily: "Jost,sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8C4BE" }}>from camera roll or files</div>
                  </div>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
              <button onClick={analyzeImage} disabled={!imgData} style={{ width: "100%", marginTop: 16, padding: 16, background: imgData ? "#1A1714" : "#E8E4DF", border: "none", color: imgData ? "#FAFAF8" : "#B0A89E", fontFamily: "Jost,sans-serif", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", cursor: imgData ? "pointer" : "default", borderRadius: 12 }}>
                Analyze with AI
              </button>
            </div>
          )}
          {step === "analyzing" && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              {imgData && <img src={imgData} alt="analyzing" style={{ width: 120, height: 160, objectFit: "cover", objectPosition: "top", borderRadius: 12, marginBottom: 20, opacity: 0.6 }} />}
              <div style={{ fontFamily: "Georgia,serif", fontSize: 20, color: "#9A928A" }}>Reading your piece...</div>
            </div>
          )}
          {step === "review" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {error && <div style={{ fontFamily: "Jost,sans-serif", fontSize: 12, color: "#9A928A", padding: "10px 14px", background: "#F2F0EC", borderRadius: 8 }}>{error}</div>}
              {imgData && <div style={{ borderRadius: 12, overflow: "hidden", height: 200 }}><img src={imgData} alt="item" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} /></div>}
              <div><label style={lbl}>Item Name</label><input style={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Silk Wrap Dress" /></div>
              <div><label style={lbl}>Brand</label><input style={inp} value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="e.g. Zimmermann" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div><label style={lbl}>Category</label>
                  <select style={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {ALL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Status</label>
                  <select style={inp} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="owned">Owned</option>
                    <option value="wishlist">Wishlist</option>
                  </select>
                </div>
              </div>
              <div><label style={lbl}>Color</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input style={{ ...inp, flex: 1 }} value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} placeholder="e.g. Ivory" />
                  <input type="color" value={form.colorHex} onChange={e => setForm(f => ({ ...f, colorHex: e.target.value }))} style={{ width: 44, height: 44, border: "1px solid #E8E4DF", borderRadius: 8, cursor: "pointer", padding: 2, flexShrink: 0 }} />
                </div>
              </div>
              <div><label style={lbl}>Occasions</label>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  {ALL_OCCASIONS.map(o => <button key={o} onClick={() => toggleOcc(o)} style={chip(form.occasions.includes(o))}>{o}</button>)}
                </div>
              </div>
              <div><label style={lbl}>Notes</label><input style={inp} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Brief style description" /></div>
              <button onClick={handleSave} disabled={!form.name} style={{ width: "100%", padding: 16, background: form.name ? "#1A1714" : "#E8E4DF", border: "none", color: form.name ? "#FAFAF8" : "#B0A89E", fontFamily: "Jost,sans-serif", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", cursor: form.name ? "pointer" : "default", borderRadius: 12, marginTop: 4 }}>
                Save to Closet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
