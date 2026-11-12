# Panier Malin

Application web qui aide un foyer à **acheter et consommer selon son budget**, et qui répertorie les **offres anti-gaspi** (marchés, magasins, produits proches de la date limite).

## Lancer en local
Ouvrir `index.html` dans le navigateur, ou : `npx serve .`

## Structure
```
index.html        page unique (2 vues : Mes courses / Anti-gaspi)
css/style.css     styles (mobile d'abord, mode sombre)
js/data.js        produits de base + offres de démo
js/app.js         logique (foyer, budget, filtres, sauvegarde locale)
docs/PRD.md       spécification produit
docs/ISSUES.md    issues prêtes à copier dans GitHub
AGENTS.md         consignes pour les agents IA
vercel.json       config de déploiement
```

## Déployer
1. Pousser le repo sur GitHub.
2. Sur vercel.com : *Add New Project* → choisir le repo → *Deploy*. Chaque merge sur `main` redéploie.
