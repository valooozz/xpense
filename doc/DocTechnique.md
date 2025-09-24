# Documentation technique - Backend 

## 1. Présentation générale
Le backend de Xpense est développé en **Java 21 avec Spring Boot**, et expose une **API REST** pour gérer les utilisateurs et les transactions.  
Il est structuré selon le modèle classique **Controller → Service → Repository** :

- **Controllers** : reçoivent les requêtes HTTP et les transmettent aux services correspondants.  
- **Services** : contiennent la logique métier.  
- **Repositories** : accèdent à la base de données via **JPA/Hibernate**.  

La base de données utilisée est **PostgreSQL**, et la sécurité repose sur **Spring Security** avec des **JWT** pour l’authentification et l’autorisation.

## 2. Organisation des packages

- `com.demo.xpense.controller` : controllers REST  
- `com.demo.xpense.service` : logique métier  
- `com.demo.xpense.repository` : accès aux données via JPA  
- `com.demo.xpense.model` : entités JPA  
- `com.demo.xpense.dto` : objets de transfert de données (DTO)  
- `com.demo.xpense.config` : configuration Spring Boot (sécurité, JWT, CORS, etc.)  
- `com.demo.xpense.util` : classes utilitaires (ex : JwtUtil)
- `com.demo.xpense.filter` : filtres (ex : JwtFilter)

## 3. Sécurité
- **JWT (JSON Web Token)** : utilisé pour authentifier et autoriser les requêtes.  
- **Spring Security** : filtre les requêtes entrantes et vérifie les tokens.  
- Les endpoints sensibles nécessitent un token JWT valide, automatiquement transmis au serveur via un **cookie HttpOnly**
- Les mots de passe sont stockés **hachés** avec BCrypt.

## 4. Base de données
- Base : PostgreSQL  
- Entités :
  - `User` : **id**, username, password  
  - `Category` : **id**, label
  - `Transaction` : **id**, title, type, amount, date, *category_id*, *user_id*  

## 5. Endpoints

| Méthode | Endpoint | Description | Paramètres | Sécurité |
|---------|---------|------------|-----------|----------|
| POST    | /api/auth/register | Créer un utilisateur | username, password | Public |
| POST    | /api/auth/login | Authentifier un utilisateur | username, password | Public |
| POST    | /api/auth/logout | Déconnecter un utilisateur | - | JWT requis |
|
| GET     | /api/category | Récupérer toutes les catégories existantes | - | Public |
|
| GET     | /api/user | Récupérer l'utilisateur connecté | - | JWT requis |
|
| GET     | /api/transaction/user | Récupérer toutes les transaction de l'utilisateur connecté, regroupées par mois | - | JWT requis |
| GET     | /api/transaction/user/last | Récupérer les quatre dernières transactions de l'utilisateur connecté | - | JWT requis |
| POST    | /api/transaction | Ajouter une dépense | Objet Transaction dans le body | JWT requis |
| PUT     | /api/transaction/{id} | Modifier une dépense | Objet Transaction dans le body et id dans l'URL de la requête | JWT requis |
| DELETE  | /api/transaction/{id} | Supprimer une dépense | id dans l'URL de la requête | JWT requis |
|
| GET     | /api/stats/category | Récupérer les statistiques sur les dépenses par catégorie | - | JWT requis |
| GET     | /api/stats/month | Récupérer les statistiques sur les dépenses par mois  | - | JWT requis |


# Documentation technique - Frontend

## 1. Présentation générale

Le frontend de Xpense est développé avec **Angular** en utilisant uniquement des **composants standalone**.  
L’application fournit l’interface utilisateur pour gérer les dépenses et le budget, et communique avec le backend via des services HTTP.

## 2. Architecture du frontend

- `core/services/` : services pour la communication avec le backend (ex : AuthService, TransactionService)
- `features/` : composants UI présentant une fonctionnalité unique (ex : login, register, dashboard, expense-form)
- `models/` : interfaces pour représenter les objets manipulés dans l'application
- `shared/` : composants UI génériques, utilisés dans plusieurs composants (ex : generic-form, button, graph-card, modal)
- `utils/` : fonctions utilitaires

Chaque composant gère sa propre vue et interactions. Les **services** centralisent les appels HTTP vers le backend et gèrent les données partagées entre composants.
Tous les composants importent uniquement les modules Angular et autres composants nécessaires.

## 3. Sécurité
- L’authentification se fait via JWT généré par le backend lors de la connexion.  
- Le token est stocké côté client dans un **cookie HttpOnly** (non accessible en JavaScript).  
- Les navigateurs envoient automatiquement ce cookie lors des requêtes vers les endpoints sécurisés.

## 4. Gestion des erreurs
- Les erreurs du backend (401, 404, 500, etc.) sont capturées par les services et peuvent être affichées aux utilisateurs via des notifications ou des alertes.
- Les formulaires utilisent des validations Angular (`Validators.required`, `Validators.minLength`, etc.) pour éviter les requêtes invalides et guider l’utilisateur.

## Extensibilité et maintenabilité de l’application

L’architecture de Xpense a été conçue pour être simple à comprendre et à faire évoluer.

### Backend

La structure **Controller → Service → Repository** garantit que la logique métier reste isolée des couches d’accès aux données et de l’exposition des endpoints.
Ajouter une nouvelle fonctionnalité consiste généralement à :
- créer une nouvelle entité et son repository associé,
- ajouter la logique métier dans un service,
- exposer cette logique via un controller.

Grâce à cette approche modulaire, chaque nouvelle fonctionnalité est bien délimitée et n’impacte pas le reste du code.

### Frontend

Chaque fonctionnalité est encapsulée dans son propre composant, ce qui facilite la réutilisation et limite les dépendances entre les parties du code.
Les services Angular centralisent les appels au backend et peuvent être enrichis sans modifier les composants existants.
Ainsi, ajouter une nouvelle page ou un nouveau formulaire se fait de manière autonome, sans risque de casser d’autres parties de l’application.
De plus, l'accent a été mis sur le développement de composant génériques, qui pourront être réutilisés lors du développement de nouvelles fonctionnalités.
