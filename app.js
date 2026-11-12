const $ = s => document.querySelector(s);
const eur = n => n.toFixed(2).replace(".", ",") + " €";
const esc = t => t.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const KEY = "panier-malin";
let etat = {adultes:2, enfants:0, budget:70, faits:{}, extras:[], filtre:"tous"};
try { Object.assign(etat, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
const sauver = () => { try { localStorage.setItem(KEY, JSON.stringify(etat)); } catch (e) {} };

function articles() {
  const parts = etat.adultes + etat.enfants * 0.6;
  const base = BASE.map(p => {
    const q = p.unite === "kg" || p.unite === "L" ? Math.round(parts * p.parPers * 10) / 10 : Math.ceil(parts * p.parPers);
    return {id:p.id, nom:p.nom, detail:`${q} ${p.unite}`, total:q * p.prix, essentiel:p.essentiel};
  });
  const extras = etat.extras.map(e => ({...e, detail:"ajouté", essentiel:true}));
  return [...base, ...extras].sort((a, b) => b.essentiel - a.essentiel);
}

function renderCourses() {
  const liste = articles();
  let cumul = 0;
  $("#liste").innerHTML = liste.map(a => {
    cumul += a.total;
    const hors = !a.essentiel && cumul > etat.budget;
    return `<li class="${etat.faits[a.id] ? "fait" : ""} ${hors ? "opt" : ""}">
      <input type="checkbox" data-id="${a.id}" ${etat.faits[a.id] ? "checked" : ""} aria-label="${esc(a.nom)}">
      <span class="nom">${esc(a.nom)}<small>${a.detail}${hors ? " · hors budget, à reporter" : ""}</small></span>
      <span class="prix">${eur(a.total)}</span></li>`;
  }).join("");
  const total = liste.reduce((s, a) => s + a.total, 0);
  const reste = etat.budget - total;
  $("#resume").className = reste < 0 ? "depasse" : "";
  $("#resume").innerHTML = `<strong>${eur(total)}</strong> sur ${eur(etat.budget)}<br>${reste >= 0 ? `Il vous reste ${eur(reste)}.` : `Dépassement de ${eur(-reste)} : les produits grisés peuvent attendre.`}
    <div class="barre"><i style="width:${Math.min(100, total / etat.budget * 100)}%"></i></div>`;
}

function renderOffres() {
  const liste = OFFRES.filter(o => etat.filtre === "tous" || o.type === etat.filtre).sort((a, b) => a.jours - b.jours);
  $("#offres").innerHTML = liste.map(o => {
    const quand = o.jours === 0 ? "Aujourd'hui" : o.jours === 1 ? "Demain" : `Dans ${o.jours} jours`;
    return `<li><span class="nom">${esc(o.nom)}<small>${esc(o.lieu)}</small>
      <span class="badge ${o.jours <= 1 ? "urgent" : ""}">À consommer : ${quand}</span></span>
      <span class="prix"><span class="vieux">${eur(o.prixOrig)}</span><br>${eur(o.prix)}</span>
      <button class="cible" data-o="${o.id}">Ajouter</button></li>`;
  }).join("") || "<li>Aucune offre pour ce filtre.</li>";
  document.querySelectorAll(".filtres button").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === etat.filtre));
}

["adultes", "enfants", "budget"].forEach(k => {
  const el = $("#" + k); el.value = etat[k];
  el.addEventListener("input", () => { etat[k] = Math.max(k === "adultes" ? 1 : 0, +el.value || 0); sauver(); renderCourses(); });
});
$("#liste").addEventListener("change", e => { etat.faits[e.target.dataset.id] = e.target.checked; sauver(); renderCourses(); });
$("#ajout").addEventListener("submit", e => {
  e.preventDefault();
  etat.extras.push({id:"x" + Date.now(), nom:$("#ajout-nom").value.trim(), total:+$("#ajout-prix").value});
  e.target.reset(); sauver(); renderCourses();
});
$("#v-gaspi").addEventListener("click", e => {
  if (e.target.dataset.f) { etat.filtre = e.target.dataset.f; renderOffres(); }
  if (e.target.dataset.o) {
    const o = OFFRES.find(x => x.id === +e.target.dataset.o);
    etat.extras.push({id:"o" + o.id + Date.now(), nom:`${o.nom} (${o.lieu})`, total:o.prix});
    sauver(); renderCourses(); e.target.textContent = "Ajouté"; e.target.disabled = true;
  }
});
document.querySelectorAll("nav button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".vue").forEach(v => v.hidden = v.id !== "v-" + b.dataset.v);
  document.querySelectorAll("nav button").forEach(x => x.removeAttribute("aria-current"));
  b.setAttribute("aria-current", "page");
}));
renderCourses(); renderOffres();
