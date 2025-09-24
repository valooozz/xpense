# User Stories

## Comptes

### US-01 – Création de compte

En tant qu’utilisateur, je veux pouvoir créer un compte, afin que mes données ne soient visibles que par moi-même.

**Critères d’acceptation :**
- L’utilisateur peut saisir un nom d'utilisateur et un mot de passe.
- Les champs obligatoires sont validés.
- Un compte est créé et l’utilisateur est automatiquement redirigé vers la page de connexion.

### US-02 – Connexion

En tant qu’utilisateur, je veux pouvoir me connecter à mon compte, afin d’utiliser l’application.

**Critères d’acceptation :**
- L’utilisateur peut saisir son nom d'utilisateur et son mot de passe.
- Une erreur claire est affichée si les informations sont incorrectes.
- L’utilisateur est redirigé vers le tableau de bord après connexion.

## Transactions

### US-03 – Ajouter une transaction

En tant qu’utilisateur, je veux pouvoir ajouter une transaction, afin de suivre mes dépenses et revenus quotidiens.

**Critères d’acceptation :**
- L’utilisateur peut saisir le titre, le montant, le type de transaction, la catégorie, et la date.
- La transaction apparaît immédiatement dans la liste.
- Les champs obligatoires sont validés.

### US-04 – Modifier une transaction

En tant qu’utilisateur, je veux pouvoir modifier une transaction, afin de corriger facilement une éventuelle erreur.

**Critères d’acceptation :**
- L’utilisateur peut modifier tous les champs de la transaction.
- Les modifications sont enregistrées et reflétées immédiatement dans la liste.

### US-05 – Supprimer une transaction

En tant qu’utilisateur, je veux pouvoir supprimer une transaction, afin de retirer une transaction incorrecte ou inutile.

**Critères d’acceptation :**
- La transaction est retirée immédiatement de la liste.

## Analyse

### US-06 – Comparer les dépenses par catégorie

En tant qu’utilisateur, je veux pouvoir comparer mes dépenses par catégorie, afin de repérer dans quels domaines je dépense le plus.

**Critères d’acceptation :**
- Les dépenses sont regroupées par catégorie.
- Un graphique affiche les totaux par catégorie.

### US-07 – Comparer les dépenses sur les derniers mois

En tant qu’utilisateur, je veux pouvoir comparer mes dépenses sur les derniers mois, afin de suivre l’évolution de mes dépenses.

**Critères d’acceptation :**
- Les transactions sont regroupées par mois.
- L’évolution des dépenses est affichée sous forme de graphique.
