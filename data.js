// Produits de base : quantité par personne et par semaine, prix unitaire estimé (€).
// TODO (issue #4) : remplacer par une vraie source de prix.
const BASE = [
  {id:"riz",nom:"Riz",unite:"kg",parPers:.3,prix:2.2,essentiel:true},
  {id:"pates",nom:"Pâtes",unite:"kg",parPers:.4,prix:1.6,essentiel:true},
  {id:"pdt",nom:"Pommes de terre",unite:"kg",parPers:.8,prix:1.5,essentiel:true},
  {id:"leg",nom:"Légumes de saison",unite:"kg",parPers:1.5,prix:2.4,essentiel:true},
  {id:"fruit",nom:"Fruits de saison",unite:"kg",parPers:1,prix:2.8,essentiel:true},
  {id:"oeufs",nom:"Œufs",unite:"unité",parPers:3,prix:.35,essentiel:true},
  {id:"lait",nom:"Lait",unite:"L",parPers:1.5,prix:1.1,essentiel:true},
  {id:"pain",nom:"Pain",unite:"unité",parPers:2,prix:1.1,essentiel:true},
  {id:"lentilles",nom:"Lentilles",unite:"kg",parPers:.15,prix:3,essentiel:true},
  {id:"poulet",nom:"Poulet",unite:"kg",parPers:.4,prix:7,essentiel:false},
  {id:"fromage",nom:"Fromage",unite:"kg",parPers:.15,prix:11,essentiel:false},
  {id:"yaourt",nom:"Yaourts",unite:"unité",parPers:3,prix:.4,essentiel:false},
  {id:"biscuits",nom:"Biscuits",unite:"paquet",parPers:.5,prix:2,essentiel:false}
];
// Offres anti-gaspi (données de démo). "jours" = jours avant la date limite.
// TODO (issue #6) : remplacer par une API / base de données.
const OFFRES = [
  {id:1,nom:"Panier de légumes moches",lieu:"Marché du centre",type:"marché",jours:0,prixOrig:8,prix:3},
  {id:2,nom:"Yaourts nature x8",lieu:"Supermarché Nord",type:"magasin",jours:1,prixOrig:3.2,prix:1.5},
  {id:3,nom:"Pain de la veille x3",lieu:"Boulangerie Dupont",type:"magasin",jours:0,prixOrig:4.5,prix:1.5},
  {id:4,nom:"Fraises 1 kg",lieu:"Marché de la Place",type:"marché",jours:1,prixOrig:7,prix:3.5},
  {id:5,nom:"Poulet rôti",lieu:"Supermarché Nord",type:"magasin",jours:2,prixOrig:9,prix:5},
  {id:6,nom:"Pommes 2 kg",lieu:"Marché du centre",type:"marché",jours:3,prixOrig:5,prix:2.5}
];
