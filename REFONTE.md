# Refonte ByARMS — septembre 2026

Référence : byarms-cahier-directeur-repositionnement.pdf, version 1.0.

## Livré
- Nouvelle identité éditoriale et visuelle responsive, accueil, offres Product Launch / AI Operations, méthode ADA et engagement.
- Diagnostic à trois étapes, branche produit / IA, validation navigateur et serveur, qualification versionnée côté serveur et enregistrement dans Demande (administration existante).
- Rendez-vous proposé uniquement après enregistrement d'une demande suffisamment qualifiée.
- Calculateur de capacité libérée avec coûts récurrents et retour indicatif.
- Métadonnées actualisées, identité légale, information sur le traitement du diagnostic.

## Limites et prochain lot
- Le diagnostic utilise des règles déterministes. Pas de connexion au moteur ADA et pas de simulateur IA revendiqué.
- Attribution de la source et score conservés par demande ; suivi des abandons et tableau de bord du funnel à implémenter.
- Onboarding livré : invitation à usage unique de 72 h, session de 7 jours, dossier persistant, cinq sections, statuts des réponses, responsables / échéances, demande de revue et validation des gates par l’administration. Renouveler une invitation révoque tous les accès antérieurs du dossier.
- Pièces jointes, plusieurs collaborateurs par dossier, sauvegarde automatique, journal d’audit complet et Project Room de delivery : à réaliser. La sauvegarde actuelle est explicite et protège les modifications concurrentes par numéro de révision.
- Cas clients et témoignages à fournir avec autorisation avant publication. Les exemples ADA sont explicitement illustratifs.
- Les informations légales doivent être complétées avant publication (adresse enregistrée, hébergeur, conservation, destinataires et autres informations applicables).
- Confirmer tarifs, garanties et périmètres avec la direction avant publication.
- La notification email du diagnostic reste à connecter ; les demandes sont visibles dans l'admin.
- Authentification administrateur : identifiant et hash bcrypt dans `AdminCredential`, initialisés par la migration `20260915190000_admin_credential`. Le login ne lit plus `ADMIN_PASSWORD_HASH`. `ADMIN_JWT_SECRET` (aléatoire, au moins 32 caractères) reste obligatoire dans l’environnement Coolify ; aucun secret de signature ne doit être commité. Les sessions existantes expirent après 8 h ; tourner le secret les révoque.
- La migration contient uniquement le hash du mot de passe de bootstrap demandé. Ce hash reste dans l’historique Git : prévoir une rotation du mot de passe après mise en service. Ne jamais placer de mot de passe en clair dans Git.
- Ajouter limitation distribuée des requêtes et supervision avant déploiement public.

## Vérification
Build de production, TypeScript, lint ciblé et tests de qualification / onboarding. Calculateur contrôlé dans le navigateur (scénario nominal et absence de retour positif). Diagnostic vérifié jusqu’à la base locale avec une demande fictive. Migration additive `20260914160000_onboarding` appliquée uniquement à la base locale. Aucun déploiement public.

Tests : `node --test tests/qualification.test.cjs tests/onboarding.test.cjs`.
Test d’intégration local (serveur sur 127.0.0.1:3102) : `node tests/onboarding-integration.cjs`. Crée un dossier TEST identifiable, puis révoque ses accès.

## Correctifs de dépendances
- Next.js et eslint-config-next mis à jour vers 16.3.5 ; dépendances transitives corrigées via npm audit fix sans --force.
- Override ciblé @prisma/config → deepmerge-ts 8.0.0 : corrige GHSA-ggr8-5vv4-36mx sans rétrograder Prisma. L’appel Prisma utilise deepmerge pour des objets de configuration ; les migrations et la génération du client sont vérifiées.
- Test login : TEST_ADMIN_PASSWORD fourni au processus, puis node tests/admin-login-integration.cjs. Aucun mot de passe en clair dans le test.
