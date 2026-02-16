const messages: Record<string, string> = {
  // Nav
  "nav.home": "Accueil",
  "nav.login": "Connexion",
  "nav.signup": "Inscription",
  "nav.admin": "Administration",
  "nav.logout": "Déconnexion",
  "nav.dashboard": "Tableau de bord",
  "nav.users": "Utilisateurs",
  "nav.roles": "Rôles",

  // Home - Hero
  "home.title": "SGS",
  "home.title.accent": "GYMNASTIQUE",
  "home.hero.headline":
    "L'EXCELLENCE GYMNIQUE À SAINTE-GENEVIÈVE-DES-BOIS",
  "home.hero.subtitle":
    "Passion, Rigueur et Performance. Du Baby Gym au haut niveau national.",
  "home.hero.cta": "REJOINDRE LE CLUB",

  // Home - Philosophy
  "home.philosophy.title": "NOTRE PHILOSOPHIE",
  "home.philosophy.performance.title": "PERFORMANCE",
  "home.philosophy.performance.description":
    "Des entraîneurs diplômés d'État pour accompagner chaque gymnaste vers son meilleur niveau, de l'amical au national.",
  "home.philosophy.passion.title": "PASSION",
  "home.philosophy.passion.description":
    "L'amour du sport et du mouvement au cœur de chaque entraînement, pour tous les âges, de 12 mois aux adultes.",
  "home.philosophy.community.title": "COMMUNAUTÉ",
  "home.philosophy.community.description":
    "Plus qu'un club, une famille sportive de 250 adhérents unie sous les couleurs Rouge et Blanc depuis près de 90 ans.",

  // Home - Stats
  "home.stats.members": "Gymnastes",
  "home.stats.coaches": "Entraîneurs",
  "home.stats.hours": "Heures / semaine",
  "home.stats.years": "Ans d'histoire",

  // Home - Programs
  "home.programs.title": "NOS DISCIPLINES",
  "home.programs.eveil.title": "Éveil gymnique",
  "home.programs.eveil.age": "12 mois à 3 ans",
  "home.programs.eveil.description":
    "Parcours de motricité et d'agilité en salle. Les parents accompagnent leurs enfants jusqu'à 2 ans pour partager ce moment d'éveil sportif.",
  "home.programs.babygym.title": "Baby-Gym",
  "home.programs.babygym.age": "4 à 5 ans",
  "home.programs.babygym.description":
    "Parcours ludiques et techniques adaptés, sans les parents. Les enfants développent leur assurance et découvrent les bases de la gymnastique.",
  "home.programs.decouverte.title": "Découverte",
  "home.programs.decouverte.age": "6 à 13 ans",
  "home.programs.decouverte.description":
    "Pour les débutantes et débutants souhaitant découvrir la gymnastique artistique. 1 séance de 1h30 par semaine aux agrès.",
  "home.programs.competition.title": "Compétition",
  "home.programs.competition.age": "À partir de 6 ans",
  "home.programs.competition.description":
    "Du niveau amical au national, nos gymnastes participent à des compétitions fédérales. 2 séances de 1h30 par semaine minimum.",
  "home.programs.gaf.title": "GAF",
  "home.programs.gaf.age": "Gymnastique Artistique Féminine",
  "home.programs.gaf.description":
    "Sol, saut, poutre et barres asymétriques : les 4 agrès féminins pour développer force, souplesse et grâce.",
  "home.programs.gam.title": "GAM",
  "home.programs.gam.age": "Gymnastique Artistique Masculine",
  "home.programs.gam.description":
    "Sol, saut, barre fixe, barres parallèles et cheval d'arçons : les agrès masculins pour développer puissance et agilité.",

  // Home - Contact
  "home.contact.title": "NOUS TROUVER",
  "home.contact.gym": "Gymnase Raymond Poulidor",
  "home.contact.address": "Rue Léo Lagrange, 91700 Sainte-Geneviève-des-Bois",
  "home.contact.phone": "09 81 49 96 53",
  "home.contact.phoneNote": "(fonctionnel pendant les cours)",
  "home.contact.email": "gymart.sgs91@gmail.com",
  "home.contact.website": "www.sgsgym.fr",
  "home.contact.registration": "Pré-inscription en ligne",

  // Home - CTA
  "home.cta.title": "VOTRE PARCOURS COMMENCE ICI",
  "home.cta.subtitle":
    "Les inscriptions pour la nouvelle saison sont ouvertes. Ne manquez pas votre place.",
  "home.cta.button": "INFORMATIONS & INSCRIPTIONS",

  // Login
  "login.title": "Connexion",
  "login.email": "Adresse e-mail",
  "login.password": "Mot de passe",
  "login.submit": "Se connecter",
  "login.noAccount": "Pas encore de compte ?",
  "login.signupLink": "S'inscrire",

  // Signup
  "signup.title": "Inscription",
  "signup.name": "Nom",
  "signup.email": "Adresse e-mail",
  "signup.password": "Mot de passe",
  "signup.submit": "S'inscrire",
  "signup.hasAccount": "Déjà un compte ?",
  "signup.loginLink": "Se connecter",

  // Admin
  "admin.dashboard.title": "Tableau de bord",
  "admin.dashboard.welcome": "Bienvenue dans l'administration",
  "admin.dashboard.usersCount": "Utilisateurs",
  "admin.dashboard.rolesCount": "Rôles",

  // Users
  "admin.users.title": "Gestion des utilisateurs",
  "admin.users.name": "Nom",
  "admin.users.email": "E-mail",
  "admin.users.role": "Rôle",
  "admin.users.actions": "Actions",
  "admin.users.delete": "Supprimer",
  "admin.users.deleteConfirm": "Confirmer la suppression de cet utilisateur ?",
  "admin.users.noUsers": "Aucun utilisateur.",

  // Roles
  "admin.roles.title": "Gestion des rôles",
  "admin.roles.name": "Nom",
  "admin.roles.description": "Description",
  "admin.roles.permissions": "Permissions",
  "admin.roles.users": "Utilisateurs",
  "admin.roles.actions": "Actions",
  "admin.roles.create": "Créer un rôle",
  "admin.roles.edit": "Modifier",
  "admin.roles.delete": "Supprimer",
  "admin.roles.deleteConfirm": "Confirmer la suppression de ce rôle ?",
  "admin.roles.builtIn": "Rôle système",
  "admin.roles.noRoles": "Aucun rôle.",

  // Role edit
  "admin.roleEdit.title": "Modifier le rôle",
  "admin.roleEdit.save": "Enregistrer",
  "admin.roleEdit.back": "Retour",
  "admin.roleEdit.permissionsLabel": "Permissions du rôle",

  // Errors
  "error.forbidden.title": "Accès refusé",
  "error.forbidden.message": "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
  "error.forbidden.back": "Retour à l'accueil",
  "error.notFound.title": "Page introuvable",
  "error.notFound.message": "La page que vous recherchez n'existe pas.",
  "error.notFound.back": "Retour à l'accueil",
  "error.generic": "Une erreur est survenue.",

  // Common
  "common.loading": "Chargement...",
  "common.save": "Enregistrer",
  "common.cancel": "Annuler",
  "common.delete": "Supprimer",
  "common.edit": "Modifier",
  "common.create": "Créer",
  "common.id": "ID",
  "common.createdAt": "Créé le",
};

export default messages;
