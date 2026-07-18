"use strict";

const subjects = [
  { id: "francais", name: "Français", icon: "✏️", color: "color-coral", count: 8, description: "Lire, comprendre, écrire et jouer avec les mots.", topics: ["Lecture et compréhension", "Expression écrite", "Grammaire", "Conjugaison", "Orthographe", "Vocabulaire"] },
  { id: "allemand", name: "Allemand", icon: "💬", color: "color-gold", count: 4, description: "Découvrir du vocabulaire et communiquer simplement.", topics: ["Vocabulaire", "Compréhension", "Petits dialogues", "Culture"] },
  { id: "mathematiques", name: "Mathématiques", icon: "➗", color: "color-blue", count: 7, description: "Calculer, mesurer, chercher et résoudre des problèmes.", topics: ["Nombres et opérations", "Grandeurs et mesures", "Espace et géométrie", "Résolution de problèmes"] },
  { id: "sciences", name: "Sciences de la nature", icon: "🔬", color: "color-teal", count: 5, description: "Observer le vivant, la matière et l’environnement.", topics: ["Le vivant", "La matière", "L’environnement", "Expériences"] },
  { id: "histoire-geographie", name: "Histoire & géographie", icon: "🌍", color: "color-gold", count: 5, description: "Se repérer dans le temps, l’espace et la vie collective.", topics: ["Repères historiques", "Repères géographiques", "Citoyenneté"] },
  { id: "arts", name: "Arts & création", icon: "🎨", color: "color-coral", count: 6, description: "Imaginer, fabriquer, dessiner et écouter.", topics: ["Arts visuels", "Activités créatrices", "Musique"] },
  { id: "education-physique", name: "Corps & mouvement", icon: "🏃", color: "color-blue", count: 3, description: "Bouger, coopérer et prendre soin de soi.", topics: ["Éducation physique", "Santé et bien-être", "Coopération"] },
  { id: "numerique", name: "Éducation numérique", icon: "💻", color: "color-teal", count: 4, description: "Comprendre les médias et utiliser le numérique avec prudence.", topics: ["Médias", "Informatique", "Usages responsables"] }
];

const resources = [
  { id: 1, title: "Plan d’études romand", subject: "Toutes les matières", type: "Lien", description: "Le référentiel officiel des apprentissages de l’école romande.", url: "https://www.plandetudes.ch/", source: "CIIP", verified: "18.07.2026" },
  { id: 2, title: "Grille horaire de l’enseignement primaire", subject: "Toutes les matières", type: "PDF", description: "La répartition officielle des disciplines de 5P à Genève.", url: "https://www.ge.ch/document/grille-horaire-enseignement-primaire", source: "État de Genève", verified: "18.07.2026" },
  { id: 3, title: "RTS Kids", subject: "Sciences de la nature", type: "Vidéo", description: "Des vidéos et émissions éducatives adaptées aux enfants.", url: "https://www.rts.ch/kids/", source: "Radio Télévision Suisse", verified: "18.07.2026" },
  { id: 4, title: "Bibliothèque numérique romande", subject: "Français", type: "Lecture", description: "Des textes et livres numériques à découvrir avec un adulte.", url: "https://ebooks-bnr.com/", source: "BNR", verified: "18.07.2026" },
  { id: 5, title: "Jeunes et médias", subject: "Éducation numérique", type: "Lien", description: "Conseils suisses pour utiliser Internet de façon sûre et responsable.", url: "https://www.bsv.admin.ch/fr/plateforme-nationale-jeunes-et-medias", source: "Confédération suisse", verified: "18.07.2026" },
  { id: 6, title: "Mathématiques 5e–6e", subject: "Mathématiques", type: "Lien", description: "Ressources d’apprentissage liées au Plan d’études romand.", url: "https://bdper.plandetudes.ch/", source: "PER", verified: "18.07.2026" }
];

const paraschool = [
  { icon: "⚽", title: "Mon coin football", description: "Dribbles, défis, esprit d’équipe et petits objectifs pour progresser en s’amusant." },
  { icon: "📚", title: "Lecture plaisir", description: "Choisir un livre, noter une phrase aimée et raconter l’histoire avec ses propres mots." },
  { icon: "🎵", title: "Musique & rythme", description: "Découvrir le rythme, écouter des instruments et créer de petites séquences musicales." },
  { icon: "🧩", title: "Jeux de logique", description: "Résoudre des énigmes, construire des stratégies et développer sa persévérance." },
  { icon: "🖌️", title: "Créations personnelles", description: "Présenter des dessins et bricolages validés par un adulte, sans image reconnaissable d’enfant." }
];

const state = {
  memberDemo: sessionStorage.getItem("hamza-member-demo") === "true",
  memberView: "dashboard",
  filters: { query: "", subject: "Toutes les matières", type: "Tous les formats" }
};

const main = document.querySelector("main");
const memberDialog = document.querySelector("#member-dialog");
const memberDialogContent = document.querySelector("#member-dialog-content");
const reportDialog = document.querySelector("#report-dialog");
const toast = document.querySelector("#toast");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function pageHero(title, description, eyebrow = "Le club de Hamza") {
  return `
    <section class="page-hero">
      <div class="page-shell" style="padding-block:0">
        <div class="breadcrumbs"><a href="#accueil">Accueil</a><span>›</span><span>${escapeHtml(title)}</span></div>
        <span class="eyebrow">${escapeHtml(eyebrow)}</span>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
      </div>
    </section>`;
}

function subjectCard(subject) {
  return `
    <article class="card subject-card">
      <span class="count">${subject.count} ressources</span>
      <div class="card-icon ${subject.color}" aria-hidden="true">${subject.icon}</div>
      <h3>${subject.name}</h3>
      <p>${subject.description}</p>
      <a class="card-link" href="#matiere/${subject.id}">Entrer sur le terrain <span aria-hidden="true">→</span></a>
    </article>`;
}

function homePage() {
  const featured = subjects.slice(0, 6).map(subjectCard).join("");
  return `
    <section class="hero">
      <div class="hero-inner">
        <div>
          <span class="eyebrow">Bienvenue dans mon club !</span>
          <h1>Apprendre,<br><em>c’est mon super jeu !</em></h1>
          <p class="lead">Salut, moi c’est Hamza ! J’ai 8 ans, j’aime le foot, les défis et découvrir plein de choses. Entre dans mon univers de 5P !</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#matieres">⚡ Lancer un défi <span aria-hidden="true">→</span></a>
            <a class="button button-secondary" href="#parascolaire">⚽ Mon coin foot</a>
          </div>
        </div>
        <aside class="football-card" aria-label="Le terrain des défis">
          <div class="score-bubble">HAMZA <strong>8</strong></div>
          <div class="football-player" aria-hidden="true">⚽</div>
          <div class="goal" aria-hidden="true"><span></span></div>
          <div class="field-line" aria-hidden="true"></div>
          <p><strong>Objectif du jour</strong><br>Marquer 3 buts de curiosité !</p>
        </aside>
      </div>
    </section>

    <section class="section section-white">
      <div class="section-inner">
        <div class="section-heading">
          <div><span class="eyebrow">Choisis ton terrain</span><h2>Quelle mission veux-tu jouer ?</h2></div>
          <p>Chaque matière devient une aventure avec des missions courtes, des défis et des découvertes.</p>
        </div>
        <div class="cards">${featured}</div>
        <div class="stats-strip">
          <div class="stat"><strong>8</strong><span>terrains à explorer</span></div>
          <div class="stat"><strong>⭐</strong><span>des défis pour progresser</span></div>
          <div class="stat"><strong>🛡️</strong><span>un espace protégé</span></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-inner split-layout">
        <div>
          <span class="eyebrow">Après l’école</span>
          <h2>Le foot, les créations et mes passions</h2>
          <p class="lead">Dribbler, lire, créer, écouter de la musique et résoudre des énigmes : ici, toutes mes passions ont leur place.</p>
          <a class="button button-primary" href="#parascolaire">⚽ Découvrir mes passions</a>
        </div>
        <div class="info-panel">
          <h3>La règle la plus importante</h3>
          <p>Ce site protège la vie privée des enfants. Il ne publie ni adresse, ni horaire habituel, ni position, ni photo reconnaissable sans autorisation spécifique.</p>
          <ul class="safe-list"><li>Pseudonymes dans l’espace privé</li><li>Validation par un adulte</li><li>Chat collectif modéré uniquement</li></ul>
          <a class="button button-secondary" href="#securite">Comprendre la sécurité</a>
        </div>
      </div>
    </section>`;
}

function subjectsPage() {
  return `${pageHero("Activités scolaires de 5P", "Toutes les matières sont regroupées dans un espace clair, pensé pour apprendre à son rythme.", "Programme scolaire")}
    <section class="section"><div class="section-inner"><div class="subject-grid">${subjects.map(subjectCard).join("")}</div></div></section>`;
}

function subjectPage(id) {
  const subject = subjects.find(item => item.id === id) || subjects[0];
  return `${pageHero(subject.name, subject.description, `${subject.icon} Mission scolaire`)}
    <section class="section subject-zone"><div class="section-inner">
      <div class="subject-tabs" role="tablist" aria-label="Rubriques de la matière">
        <button class="subject-tab active" role="tab" aria-selected="true" data-subject-tab="missions" data-subject-id="${subject.id}">🎯 Mes missions</button>
        <button class="subject-tab" role="tab" aria-selected="false" data-subject-tab="challenges" data-subject-id="${subject.id}">⚡ Défis express</button>
        <button class="subject-tab" role="tab" aria-selected="false" data-subject-tab="further" data-subject-id="${subject.id}">🚀 Pour aller plus loin</button>
      </div>
      <div id="subject-tab-content" class="subject-tab-content" role="tabpanel">${subjectTabContent(subject, "missions")}</div>
    </div></section>`;
}

function subjectTabContent(subject, tab) {
  if (tab === "challenges") {
    return `<div class="challenge-intro"><span class="eyebrow">À toi de jouer !</span><h2>3 petits défis</h2><p>Choisis un défi, essaie à ton rythme et demande de l’aide si tu en as besoin.</p></div><div class="challenge-grid">
      <article class="challenge-card"><span>1</span><h3>Échauffement</h3><p>Explique un mot important de ${subject.name.toLowerCase()} avec tes propres mots.</p></article>
      <article class="challenge-card"><span>2</span><h3>Le tir précis</h3><p>Choisis une mission et réussis-la sans te presser.</p></article>
      <article class="challenge-card"><span>3</span><h3>Le but bonus</h3><p>Raconte à un adulte ce que tu viens d’apprendre.</p></article>
    </div>`;
  }
  if (tab === "further") {
    const related = resources.filter(item => item.subject === subject.name || item.subject === "Toutes les matières");
    return `<div class="challenge-intro"><span class="eyebrow">Coin des curieux</span><h2>Vidéos, lectures et liens</h2><p>Ces ressources s’ouvrent seulement quand tu choisis cet onglet.</p></div><div class="resource-grid">${related.map(resourceCard).join("") || '<div class="empty-state"><h3>Bientôt disponible !</h3><p>De nouvelles ressources arrivent sur le terrain.</p></div>'}</div>`;
  }
  return `<div class="mission-layout"><div><span class="eyebrow">Choisis une mission</span><div class="mission-grid">${subject.topics.map((topic, index) => `<article class="mission-card"><span class="mission-number">${index + 1}</span><div><small>Mission ${index + 1}</small><h3>${topic}</h3><p>Une activité courte pour découvrir, essayer et progresser.</p></div><button type="button" aria-label="Commencer la mission ${escapeHtml(topic)}">GO !</button></article>`).join("")}</div></div><aside class="coach-card"><div class="coach-ball">${subject.icon}</div><span>Conseil du coach</span><h2>Joue à ton rythme</h2><p>Tu peux essayer, te tromper et recommencer. C’est comme ça qu’on progresse !</p><div class="coach-stars">⭐ ⭐ ⭐</div></aside></div>`;
}

function paraschoolPage() {
  return `${pageHero("Activités parascolaires", "Des passions et projets présentés sans afficher les horaires, les lieux habituels ni les déplacements d’un enfant.", "Après la classe")}
    <section class="section"><div class="section-inner">
      <div class="cards">${paraschool.slice(0, 3).map(item => `<article class="card"><div class="card-icon color-gold">${item.icon}</div><h3>${item.title}</h3><p>${item.description}</p></article>`).join("")}</div>
      <div class="cards" style="margin-top:20px">${paraschool.slice(3).map(item => `<article class="card"><div class="card-icon color-blue">${item.icon}</div><h3>${item.title}</h3><p>${item.description}</p></article>`).join("")}<article class="card privacy-box"><h3>Protection de la localisation</h3><p>Les adresses, horaires réguliers et positions en temps réel ne sont jamais publiés.</p><a class="card-link" href="#securite">Voir toutes les règles →</a></article></div>
    </div></section>`;
}

function resourceCard(resource) {
  return `<article class="card resource-card" data-subject="${escapeHtml(resource.subject)}" data-type="${escapeHtml(resource.type)}">
    <div class="badge-row"><span class="badge">${resource.subject}</span><span class="badge badge-neutral">${resource.type}</span></div>
    <h3>${resource.title}</h3><p>${resource.description}</p>
    <p><small>Source : ${resource.source}<br>Vérifié le ${resource.verified}</small></p>
    <a class="card-link" href="${resource.url}" target="_blank" rel="noopener noreferrer">Ouvrir la ressource <span aria-hidden="true">↗</span></a>
  </article>`;
}

function resourcesPage() {
  const subjectOptions = ["Toutes les matières", ...new Set(resources.map(item => item.subject).filter(subject => subject !== "Toutes les matières"))];
  const typeOptions = ["Tous les formats", ...new Set(resources.map(item => item.type))];
  return `${pageHero("Ressources éducatives", "Des liens, documents et vidéos provenant de sources identifiées et vérifiées par un adulte.", "Bibliothèque")}
    <section class="section"><div class="section-inner">
      <div class="filter-bar">
        <label for="resource-search">Rechercher</label><input id="resource-search" type="search" placeholder="Ex. mathématiques, vidéo…">
        <select id="subject-filter" aria-label="Filtrer par matière">${subjectOptions.map(value => `<option>${value}</option>`).join("")}</select>
        <select id="type-filter" aria-label="Filtrer par format">${typeOptions.map(value => `<option>${value}</option>`).join("")}</select>
      </div>
      <div id="resource-results" class="resource-grid">${resources.map(resourceCard).join("")}</div>
    </div></section>`;
}

function rulePage() {
  return `${pageHero("Règlement de l’école", "Un accès direct aux règles officielles et un rappel simple des bons comportements.", "Vie scolaire")}
    <section class="section"><div class="section-inner split-layout">
      <article class="rule-box">
        <span class="eyebrow">Document de référence</span><h2>Le document officiel fait foi</h2>
        <p>Le règlement présenté ici doit toujours renvoyer vers la version officielle publiée par l’école ou le Département de l’instruction publique.</p>
        <div class="rule-meta"><div><small>Statut</small><strong>Lien à confirmer</strong></div><div><small>Révision</small><strong>Annuelle</strong></div><div><small>Responsable</small><strong>Adulte administrateur</strong></div></div>
        <a class="button button-primary" href="https://www.ge.ch/bienvenue-ecole-primaire" target="_blank" rel="noopener noreferrer">Informations officielles du primaire ↗</a>
      </article>
      <aside class="info-panel"><h2>À retenir à l’école</h2><ul class="safe-list"><li>Respecter les autres et les adultes</li><li>Prendre soin du matériel</li><li>Protéger le droit à l’image</li><li>Utiliser Internet pour apprendre</li><li>Demander de l’aide en cas de problème</li></ul><p><small>Ce résumé est non officiel. Il sera remplacé ou complété après validation par l’établissement.</small></p></aside>
    </div></section>`;
}

function safetyPage() {
  const rules = [
    ["Un pseudonyme seulement", "Dans l’espace privé, on n’utilise ni nom complet, ni adresse, ni école ou quartier."],
    ["Aucune rencontre organisée", "On ne partage jamais un lieu, un horaire ou une localisation dans le chat."],
    ["Un adulte est présent", "Le chat collectif ne fonctionne que lorsqu’un modérateur adulte est disponible."],
    ["Signaler sans répondre", "Face à un message gênant, on le signale et on parle à un adulte de confiance."],
    ["Pas de photos ni de fichiers", "Le chat pilote refuse les images, les vidéos, les liens et les pièces jointes."],
    ["La gentillesse est obligatoire", "Les moqueries, insultes, menaces et exclusions ne sont pas acceptées."]
  ];
  return `${pageHero("Sécurité et règles de la communauté", "Des règles courtes et concrètes pour protéger chaque enfant sur le site.", "Protection des mineurs")}
    <section class="section"><div class="section-inner"><div class="cards">${rules.map((rule, index) => `<article class="card"><div class="card-icon ${index % 2 ? 'color-blue' : 'color-teal'}">${index + 1}</div><h3>${rule[0]}</h3><p>${rule[1]}</p></article>`).join("")}</div>
    <div class="privacy-box" style="margin-top:24px"><h3>En cas de danger</h3><p>Le site n’est pas un service d’urgence. Ferme la conversation et parle immédiatement à un parent, un enseignant ou un autre adulte de confiance.</p><button class="button button-primary" type="button" data-action="report">Signaler un problème</button></div></div></section>`;
}

function aboutPage() {
  return `${pageHero("À propos du projet", "Un projet familial pour apprendre à publier sur Internet avec responsabilité.", "Qui sommes-nous ?")}
    <section class="section"><div class="section-inner split-layout"><div><h2>Un site personnel, pas un site officiel</h2><p class="lead">Le bureau de Hamza valorise ses apprentissages et ses projets. Il n’est ni géré ni approuvé par l’École des Allobroges ou le DIP, sauf mention écrite contraire.</p><p>La publication, l’inscription des membres et la modération restent sous la responsabilité d’un représentant légal majeur.</p></div><aside class="info-panel"><h3>Contact adulte</h3><p>L’adresse de contact sera ajoutée avant la mise en ligne publique. Aucune coordonnée personnelle de Hamza ne sera publiée.</p><button class="button button-secondary" data-action="report" type="button">Envoyer une demande</button></aside></div></section>`;
}

function privacyPage() {
  return `${pageHero("Confidentialité", "Une présentation claire des données utilisées par le prototype et des exigences de la future version en ligne.", "Données personnelles")}
    <section class="section"><div class="section-inner split-layout"><div><h2>Ce prototype</h2><p>Le prototype fonctionne uniquement dans le navigateur. La demande d’inscription de démonstration est conservée localement sur l’appareil et n’est envoyée à aucun serveur.</p><h3>Avant une vraie mise en ligne</h3><ul><li>hébergement sécurisé et contrats avec les prestataires ;</li><li>notice enfant et notice adulte ;</li><li>preuve d’autorisation du représentant légal ;</li><li>durées de conservation définies ;</li><li>procédure d’accès, rectification et suppression ;</li><li>analyse juridique adaptée au service réel.</li></ul></div><aside class="privacy-box"><h3>Principe de minimisation</h3><p>Le site ne doit collecter que ce qui est réellement nécessaire. Aucun profilage, aucune revente de données et aucune publicité comportementale ne sont autorisés.</p></aside></div></section>`;
}

function memberPage() {
  if (!state.memberDemo) {
    openMemberDialog("login");
    return `${pageHero("Espace membres", "Cette partie est fermée. Une autorisation parentale et la validation d’un adulte sont nécessaires.", "Accès privé")}
      <section class="section"><div class="section-inner"><div class="empty-state"><h2>Accès protégé</h2><p>Utilisez le bouton « Espace membres » pour demander une inscription ou ouvrir la démonstration locale.</p><button class="button button-primary" data-action="open-member">Ouvrir l’espace membres</button></div></div></section>`;
  }
  return `${pageHero("Espace membres — démonstration", "Aucune donnée réelle d’enfant n’est utilisée dans cet aperçu local.", "Zone privée")}
    <section class="section"><div class="section-inner member-shell">
      <aside class="member-sidebar"><h2>Mon espace</h2><button class="active" data-member-view="dashboard">Tableau de bord</button><button data-member-view="favorites">Favoris</button><button data-member-view="chat">Chat collectif</button><button data-member-view="account">Mon compte</button><button data-action="logout-demo">Quitter la démo</button></aside>
      <div id="member-content" class="member-content">${memberDashboard()}</div>
    </div></section>`;
}

function memberDashboard() {
  return `<span class="eyebrow">Bonjour Explorateur·rice</span><h2>Que veux-tu découvrir ?</h2><div class="cards"><article class="card"><div class="card-icon color-coral">📖</div><h3>Continuer la lecture</h3><p>Retrouve la dernière ressource consultée.</p></article><article class="card"><div class="card-icon color-blue">⭐</div><h3>Mes favoris</h3><p>Deux ressources enregistrées dans cette démonstration.</p></article><article class="card"><div class="card-icon color-teal">💬</div><h3>Chat collectif</h3><p>Le salon pilote est ouvert avec un adulte modérateur fictif.</p><button class="button button-small button-primary" data-member-view="chat">Ouvrir le salon</button></article></div><div class="privacy-box" style="margin-top:22px"><strong>Rappel :</strong> ne partage jamais ton vrai nom, ton adresse, ton école, ton téléphone ou un lieu de rendez-vous.</div>`;
}

function favoritesView() {
  return `<span class="eyebrow">Mes ressources</span><h2>Favoris de démonstration</h2><div class="resource-grid">${resources.slice(0, 2).map(resourceCard).join("")}</div>`;
}

function accountView() {
  return `<span class="eyebrow">Compte protégé</span><h2>Mon compte</h2><div class="card"><p><strong>Pseudonyme :</strong> Explorateur·rice</p><p><strong>Statut :</strong> Compte de démonstration locale</p><p><strong>Représentant légal :</strong> validation requise dans la version en ligne</p><hr style="border:0;border-top:1px solid var(--line);margin:22px 0"><button class="button button-secondary" type="button" data-action="demo-delete">Demander la suppression</button></div>`;
}

function chatView() {
  const stored = JSON.parse(localStorage.getItem("hamza-demo-chat") || "[]");
  const initial = [
    { author: "Modérateur adulte", text: "Bienvenue dans le salon éducatif. Pense à protéger tes informations personnelles.", time: "Aujourd’hui" },
    { author: "Léa-Étoile", text: "J’ai aimé le défi sur les mesures !", time: "14:08" }
  ];
  const messages = [...initial, ...stored];
  return `<span class="eyebrow">Salon pilote</span><h2>Chat collectif modéré</h2>
    <div class="chat-shell"><div class="chat-head"><strong>Le coin des découvertes</strong><span class="online">Modérateur fictif présent</span></div>
    <div id="chat-messages" class="chat-messages">${messages.map((message, index) => `<div class="message ${message.mine ? 'mine' : ''}"><strong>${escapeHtml(message.author)}</strong><div>${escapeHtml(message.text)}</div><small>${escapeHtml(message.time)}</small>${message.mine ? '' : `<div class="message-actions"><button data-report-message="${index}">Signaler</button></div>`}</div>`).join("")}</div>
    <form id="chat-form" class="chat-compose"><label class="sr-only" for="chat-input">Écrire un message</label><input id="chat-input" maxlength="220" autocomplete="off" placeholder="Écrire sans information personnelle…"><button class="button button-primary" type="submit">Envoyer</button></form></div>
    <p class="chat-rules">Pas de messages privés, images, fichiers, liens, numéros, adresses électroniques ou localisation. Les messages de cette démonstration restent uniquement sur cet appareil.</p>`;
}

function openMemberDialog(tab = "login") {
  if (memberDialog.open) memberDialog.close();
  memberDialogContent.innerHTML = `<span class="eyebrow">Espace protégé</span><h2>Entrer dans l’espace membres</h2><p>La vraie version exigera l’autorisation d’un représentant légal et la validation de l’administrateur.</p>
    <div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="${tab === 'login'}" data-dialog-tab="login">Connexion</button><button class="tab" role="tab" aria-selected="${tab === 'register'}" data-dialog-tab="register">Inscription</button></div><div id="dialog-tab-content">${tab === "register" ? registrationForm() : loginDemo()}</div>`;
  memberDialog.showModal();
}

function loginDemo() {
  return `<div class="form-note">Aucun compte réel n’existe encore. Le bouton ci-dessous ouvre uniquement un aperçu local sans authentification.</div><button class="button button-primary" style="margin-top:16px" type="button" data-action="start-demo">Ouvrir la démonstration membre</button>`;
}

function registrationForm() {
  return `<form id="registration-form"><label for="parent-email">Adresse du représentant légal</label><input id="parent-email" name="parentEmail" type="email" autocomplete="email" required><label for="child-alias">Pseudonyme souhaité</label><input id="child-alias" name="alias" minlength="3" maxlength="24" pattern="[A-Za-zÀ-ÿ0-9_-]+" required><p class="form-note">Le pseudonyme ne doit contenir ni nom complet, ni date de naissance, ni école, ni quartier.</p><label class="checkbox"><input name="legal" type="checkbox" required><span>Je confirme être un représentant légal majeur et demande l’examen de cette inscription.</span></label><label class="checkbox"><input name="rules" type="checkbox" required><span>J’accepte les règles de la communauté et la notice de confidentialité du prototype.</span></label><button class="button button-primary" type="submit">Envoyer la demande locale</button></form>`;
}

const routes = {
  "": homePage,
  "accueil": homePage,
  "matieres": subjectsPage,
  "parascolaire": paraschoolPage,
  "ressources": resourcesPage,
  "reglement": rulePage,
  "securite": safetyPage,
  "apropos": aboutPage,
  "confidentialite": privacyPage,
  "membre": memberPage
};

function renderRoute() {
  const hash = location.hash.replace(/^#/, "") || "accueil";
  const [route, param] = hash.split("/");
  const render = route === "matiere" ? () => subjectPage(param) : (routes[route] || homePage);
  main.innerHTML = render();
  document.querySelectorAll("[data-route]").forEach(link => link.toggleAttribute("aria-current", link.dataset.route === route));
  document.querySelector(".main-nav")?.classList.remove("open");
  document.querySelector(".menu-toggle")?.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "instant" });
  bindPageEvents(route);
}

function bindPageEvents(route) {
  if (route === "ressources") {
    const search = document.querySelector("#resource-search");
    const subjectFilter = document.querySelector("#subject-filter");
    const typeFilter = document.querySelector("#type-filter");
    [search, subjectFilter, typeFilter].forEach(control => control?.addEventListener("input", filterResources));
  }
  if (route === "matiere") {
    document.querySelectorAll("[data-subject-tab]").forEach(button => button.addEventListener("click", () => {
      const subject = subjects.find(item => item.id === button.dataset.subjectId) || subjects[0];
      document.querySelectorAll("[data-subject-tab]").forEach(tab => {
        const selected = tab === button;
        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", String(selected));
      });
      document.querySelector("#subject-tab-content").innerHTML = subjectTabContent(subject, button.dataset.subjectTab);
    }));
  }
  if (route === "membre") bindMemberEvents();
}

function filterResources() {
  const query = document.querySelector("#resource-search").value.trim().toLocaleLowerCase("fr");
  const subject = document.querySelector("#subject-filter").value;
  const type = document.querySelector("#type-filter").value;
  const filtered = resources.filter(resource => {
    const haystack = `${resource.title} ${resource.description} ${resource.subject} ${resource.source}`.toLocaleLowerCase("fr");
    return haystack.includes(query) && (subject === "Toutes les matières" || resource.subject === subject) && (type === "Tous les formats" || resource.type === type);
  });
  document.querySelector("#resource-results").innerHTML = filtered.length ? filtered.map(resourceCard).join("") : '<div class="empty-state"><h2>Aucun résultat</h2><p>Essaie un autre mot ou retire un filtre.</p></div>';
}

function bindMemberEvents() {
  document.querySelectorAll("[data-member-view]").forEach(button => button.addEventListener("click", () => setMemberView(button.dataset.memberView)));
}

function setMemberView(view) {
  state.memberView = view;
  document.querySelectorAll(".member-sidebar [data-member-view]").forEach(button => button.classList.toggle("active", button.dataset.memberView === view));
  const content = document.querySelector("#member-content");
  if (!content) return;
  content.innerHTML = view === "chat" ? chatView() : view === "favorites" ? favoritesView() : view === "account" ? accountView() : memberDashboard();
  content.querySelectorAll("[data-member-view]").forEach(button => button.addEventListener("click", () => setMemberView(button.dataset.memberView)));
  if (view === "chat") bindChat();
}

function bindChat() {
  const form = document.querySelector("#chat-form");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector("#chat-input");
    const value = input.value.trim();
    if (!value) return;
    const unsafe = /(https?:\/\/|www\.|@|\b\d{6,}\b|\+\d|rue\s|avenue\s|chemin\s)/i;
    if (unsafe.test(value)) {
      showToast("Message bloqué : retire les liens, coordonnées ou informations de localisation.");
      return;
    }
    const messages = JSON.parse(localStorage.getItem("hamza-demo-chat") || "[]");
    messages.push({ author: "Explorateur·rice", text: value, time: new Date().toLocaleTimeString("fr-CH", { hour: "2-digit", minute: "2-digit" }), mine: true });
    localStorage.setItem("hamza-demo-chat", JSON.stringify(messages.slice(-20)));
    setMemberView("chat");
  });
  document.querySelectorAll("[data-report-message]").forEach(button => button.addEventListener("click", () => { reportDialog.showModal(); showToast("Le message a été préparé pour signalement."); }));
  const messages = document.querySelector("#chat-messages");
  if (messages) messages.scrollTop = messages.scrollHeight;
}

document.addEventListener("click", event => {
  const target = event.target.closest("button, a");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "open-member") openMemberDialog("login");
  if (action === "close-modal") target.closest("dialog")?.close();
  if (action === "report") reportDialog.showModal();
  if (action === "start-demo") {
    state.memberDemo = true;
    sessionStorage.setItem("hamza-member-demo", "true");
    memberDialog.close();
    location.hash = "membre";
    renderRoute();
  }
  if (action === "logout-demo") {
    state.memberDemo = false;
    sessionStorage.removeItem("hamza-member-demo");
    location.hash = "accueil";
  }
  if (action === "demo-delete") showToast("Demande simulée : aucune donnée réelle n’est enregistrée sur un serveur.");
  if (target.dataset.dialogTab) {
    const tab = target.dataset.dialogTab;
    memberDialogContent.querySelectorAll("[data-dialog-tab]").forEach(button => button.setAttribute("aria-selected", String(button.dataset.dialogTab === tab)));
    memberDialogContent.querySelector("#dialog-tab-content").innerHTML = tab === "register" ? registrationForm() : loginDemo();
  }
});

document.addEventListener("submit", event => {
  if (event.target.id === "registration-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    const request = { parentEmail: data.get("parentEmail"), alias: data.get("alias"), status: "pending", createdAt: new Date().toISOString() };
    localStorage.setItem("hamza-demo-registration", JSON.stringify(request));
    memberDialogContent.querySelector("#dialog-tab-content").innerHTML = `<div class="privacy-box"><h3>Demande enregistrée sur cet appareil</h3><p>Dans la version en ligne, un e-mail de confirmation serait envoyé au représentant légal puis la demande serait examinée par un administrateur adulte.</p></div>`;
  }
  if (event.target.id === "report-form") {
    event.preventDefault();
    reportDialog.close();
    event.target.reset();
    showToast("Signalement simulé. Dans la version en ligne, il sera transmis au responsable adulte.");
  }
});

document.querySelector(".menu-toggle").addEventListener("click", event => {
  const open = document.querySelector(".main-nav").classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
}));

document.querySelector("#current-year").textContent = new Date().getFullYear();
window.addEventListener("hashchange", renderRoute);
renderRoute();
