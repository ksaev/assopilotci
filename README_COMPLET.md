# GestionAsso CI - Plateforme Universelle de Gestion d'Association

## Vue d'ensemble

**GestionAsso CI** est une plateforme SaaS professionnelle conçue spécifiquement pour les associations, ONG et entreprises en Côte d'Ivoire et en Afrique de l'Ouest. Elle offre une gestion complète des membres, paiements (Mobile Money), événements, rapports et notifications.

### Caractéristiques Principales

- **Gestion des Membres**: Profils complets, statuts multi-niveaux (Bronze, Silver, Gold, Platinum), import Excel
- **Paiements Mobiles**: Orange Money, MTN, Wave - avec gestion complète des cotisations
- **Événements**: Création, participation, QR Code check-in, notifications automatiques
- **Rapports Avancés**: Statistiques temps réel, graphiques interactifs, exports PDF/Excel/CSV
- **Notifications**: Système intégré Email/SMS avec centre de notifications
- **Dashboard Intelligent**: KPI temps réel, prédictions, alertes critiques
- **Authentification JWT**: Sécurisée avec RBAC (Rôles et Permissions)
- **Multi-organisation**: Support de plusieurs associations/ONG
- **Responsive Design**: Optimisé mobile, desktop et tablette
- **Dark Mode**: Thème clair/sombre

---

## Stack Technologique

### Frontend
- **Next.js 16** - App Router, React Server Components
- **React 19** - Hooks, Context API
- **TypeScript** - Type safety complet
- **TailwindCSS** - Styling utilitaire
- **Shadcn/UI** - 70+ composants UI prêts à l'emploi
- **Framer Motion** - Animations fluides
- **Recharts** - Graphiques interactifs
- **Zod** - Validation schemas

### Backend
- **Next.js API Routes** - Endpoints sécurisés
- **Prisma ORM** - Accès à la base de données typé
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification tokens
- **bcrypt** - Hachage sécurisé des mots de passe

### Architecture
- **RBAC** - Contrôle d'accès basé sur les rôles
- **REST API** - Architecture REST standard
- **Client-side Caching** - SWR/React hooks pour performance
- **Error Handling** - Gestion centralisée des erreurs

---

## Structure du Projet

```
/app
  /api                          # Routes API
    /auth                       # Authentification
      /register/route.ts        # Inscription
      /login/route.ts           # Connexion
      /me/route.ts              # Profil utilisateur
    /members/route.ts           # CRUD membres
    /members/[id]/route.ts      # Détails/édition
    /transactions/route.ts      # Transactions
    /payments/route.ts          # Paiements
    /events/route.ts            # Événements
    /notifications/route.ts     # Notifications

  /(dashboard)                  # Pages Admin
    /admin
      /dashboard/page.tsx       # Tableau de bord
      /members/page.tsx         # Gestion membres
      /transactions/page.tsx    # Transactions
      /events/page.tsx          # Événements
      /reports/page.tsx         # Rapports
      /settings/page.tsx        # Paramètres

  /(member)                     # Pages Membres
    /membre
      /dashboard/page.tsx       # Espace personnel
      /payments/page.tsx        # Mes paiements
      /events/page.tsx          # Mes événements
      /notifications/page.tsx   # Notifications

  /login/page.tsx               # Page de connexion
  /page.tsx                     # Landing page
  /layout.tsx                   # Layout root

/components
  /ui/                          # Shadcn/UI components
  /admin/                       # Composants admin
  /member/                      # Composants membres
  /forms/                       # Formulaires réutilisables
  /tables/                      # Tables et listes
  /charts/                      # Graphiques
  /modals/                      # Modales

/lib
  # API & Auth
  /api-client.ts                # Client API frontend
  /auth-context.tsx             # Context authentification
  /auth-middleware.ts           # Middleware JWT
  /hooks.ts                     # Hooks React

  # Utilities
  /validations.ts               # Schémas Zod
  /utils-api.ts                 # Utilitaires API
  /errors.ts                    # Classes erreur
  /utils.ts                     # Fonctions utilitaires
  /config.ts                    # Configuration app
  /env.ts                       # Env variables
  /types.ts                     # Types TypeScript
  /prisma.ts                    # Client Prisma

/prisma
  /schema.prisma                # Schéma base de données

/public
  # Images, assets, etc.

/styles
  /globals.css                  # Styles globaux

/scripts
  # Scripts de migration, seed data, etc.
```

---

## Installation & Démarrage

### 1. Cloner le projet

```bash
git clone https://github.com/votre-org/gestionasso-ci.git
cd gestionasso-ci
```

### 2. Installer les dépendances

```bash
npm install
# ou
pnpm install
```

### 3. Configuration de la base de données

Créer `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gestionasso"

# JWT Authentication
JWT_SECRET="your-super-secret-key-min-32-characters"
JWT_EXPIRES_IN="30d"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"

# Features (optionnel)
ENABLE_SMS_NOTIFICATIONS="false"
ENABLE_EMAIL_NOTIFICATIONS="false"
ENABLE_MOBILE_MONEY="false"
```

### 4. Initialiser la base de données

```bash
# Générer Prisma Client
npx prisma generate

# Créer les migrations
npx prisma migrate dev --name init

# (Optionnel) Seed data
npx prisma db seed
```

### 5. Démarrer le serveur développement

```bash
npm run dev
```

Accéder à: http://localhost:3000

---

## Authentification & Sécurité

### Rôles Disponibles

| Rôle | Description | Permissions |
|------|-------------|------------|
| **SUPER_ADMIN** | Administrateur système | Accès total |
| **ADMIN** | Administrateur association | Gestion complète |
| **TREASURER** | Trésorier | Paiements, transactions, rapports |
| **SECRETARY** | Secrétaire | Membres, événements, documents |
| **MEMBER** | Membre régulier | Consultation, participation |

### Middleware d'Authentification

Toutes les routes protégées utilisent le middleware JWT:

```typescript
import { withAuth, withRole } from '@/lib/auth-middleware';

export const POST = withAuth(async (request, payload) => {
  // payload contient: userId, email, role, organizationId
});

export const DELETE = withRole(['ADMIN'], async (request, payload) => {
  // Accessible seulement aux ADMIN
});
```

### Stockage Token

Le token est stocké dans `localStorage` avec la clé `authToken` et envoyé dans chaque requête:

```
Authorization: Bearer <token>
```

---

## Utilisation des Routes API

### Authentification

#### Inscription
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@gestionasso.ci",
  "password": "password123",
  "firstName": "Jean",
  "lastName": "Dupont",
  "organizationName": "Mon Association",
  "country": "CI"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

#### Connexion
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@gestionasso.ci",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

#### Récupérer Profil
```bash
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "admin@gestionasso.ci",
    "firstName": "Jean",
    "lastName": "Dupont",
    "role": "ADMIN"
  }
}
```

### Gestion des Membres

#### Lister les Membres
```bash
GET /api/members?page=1&limit=10&status=ACTIVE&tier=GOLD&search=Jean
Authorization: Bearer <token>
```

#### Créer un Membre
```bash
POST /api/members
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "phone": "+225 00 00 00 00",
  "status": "ACTIVE",
  "tier": "GOLD"
}
```

#### Récupérer un Membre
```bash
GET /api/members/member_123
Authorization: Bearer <token>
```

#### Modifier un Membre
```bash
PUT /api/members/member_123
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jean",
  "lastName": "Dupont",
  "status": "SUSPENDED"
}
```

#### Supprimer un Membre
```bash
DELETE /api/members/member_123
Authorization: Bearer <token>
```

### Gestion des Paiements

#### Créer un Paiement
```bash
POST /api/payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50000,
  "memberId": "member_123",
  "type": "MEMBERSHIP_FEE",
  "method": "ORANGE_MONEY",
  "phoneNumber": "+225 00 00 00 00"
}
```

#### Lister les Paiements
```bash
GET /api/payments?page=1&status=CONFIRMED&type=MEMBERSHIP_FEE
Authorization: Bearer <token>
```

---

## Utilisation Frontend

### Context Authentification

```typescript
'use client';
import { useAuth } from '@/lib/auth-context';

export default function MyComponent() {
  const { user, token, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <div>Non authentifié</div>;

  return (
    <div>
      Bienvenue {user?.firstName} !
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
```

### Hooks API

```typescript
'use client';
import { useFetch, useMutation } from '@/lib/hooks';

export default function MembersPage() {
  const { data: members, loading, error } = useFetch('/api/members');
  const { mutate: createMember } = useMutation('/api/members');

  const handleCreate = async (memberData) => {
    await createMember(memberData, 'POST');
  };

  return (
    <div>
      {loading && <p>Chargement...</p>}
      {members?.map(m => (
        <div key={m.id}>{m.firstName} {m.lastName}</div>
      ))}
    </div>
  );
}
```

### Validation Zod

```typescript
import { memberSchema } from '@/lib/validations';

const validation = memberSchema.safeParse(data);
if (!validation.success) {
  console.log(validation.error.flatten().fieldErrors);
}
```

---

## Modèles de Données

### User
```typescript
{
  id: string;
  email: string;
  password: string (hashedavec bcrypt);
  firstName?: string;
  lastName?: string;
  role: UserRole; // SUPER_ADMIN, ADMIN, TREASURER, SECRETARY, MEMBER
  organizationId?: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Member
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: MemberStatus; // ACTIVE, INACTIVE, SUSPENDED, RESIGNED
  tier: MemberTier; // BRONZE, SILVER, GOLD, PLATINUM
  idNumber?: string;
  joinDate: DateTime;
  dateOfBirth?: DateTime;
  organizationId: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Payment
```typescript
{
  id: string;
  amount: number; // En FCFA
  currency: string; // XOF
  status: PaymentStatus; // PENDING, CONFIRMED, FAILED, CANCELLED, REFUNDED
  type: PaymentType; // MEMBERSHIP_FEE, EVENT_REGISTRATION, DONATION, OTHER
  method: PaymentMethod; // ORANGE_MONEY, MTN_MONEY, WAVE, BANK_TRANSFER, CASH
  memberId: string;
  reference?: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

---

## Configuration & Customisation

### Variables d'Environnement

Voir `/lib/env.ts` et `/lib/config.ts` pour la configuration complète:

```typescript
APP_CONFIG.currency = { code: 'XOF', symbol: 'FCFA' };
APP_CONFIG.locales.default = 'fr';
APP_CONFIG.pagination.defaultPageSize = 10;
```

### Couleurs & Thème

Éditer `/app/globals.css` pour personnaliser:

```css
:root {
  --primary: #10B981; /* Vert émeraude */
  --secondary: #059669;
  --accent: #34D399;
  --foreground: #1F2937;
  --background: #FFFFFF;
}
```

---

## Testing

### Routes API

```bash
# Test authentification
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test avec token
TOKEN="your_token_here"
curl -X GET http://localhost:3000/api/members \
  -H "Authorization: Bearer $TOKEN"
```

### Composants Frontend

Les composants shadcn/ui sont déjà testés et prêts à l'emploi. Voir `/components/ui/` pour tous les composants disponibles.

---

## Performance & Optimisation

### Caching
- Frontend: React hooks pour état local
- API: Utilise `localStorage` pour tokens
- Database: Prisma génère des requêtes optimisées

### Lazy Loading
- Images: `<Image />` de Next.js
- Composants: `dynamic()` avec `ssr: false`
- Routes: Code splitting automatique

### Compression
- TailwindCSS: Purge CSS non utilisé
- Images: WebP avec fallback
- Scripts: Minification automatique

---

## Déploiement

### Vercel (Recommandé)

1. Push code sur GitHub
2. Connecter repo à Vercel
3. Ajouter env variables:
   - `DATABASE_URL`
   - `JWT_SECRET` (32+ chars)
   - Autres env vars
4. Déployer

Voir `/DEPLOYMENT_GUIDE.md` pour détails complets.

---

## Support & Documentation

### Fichiers Documentation
- `/DEPLOYMENT_GUIDE.md` - Guide de déploiement complet
- `/API_SETUP.md` - Setup API & authentification
- `/v0_plans/universal-saas-platform.md` - Plan architecture

### Ressources
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://prisma.io/docs)
- [Shadcn/UI](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com)

---

## Roadmap

- [ ] Phase 1: Fondation API ✅
- [ ] Phase 2: Finalisation JWT & DB
- [ ] Phase 3: Features avancées (Rapports, IA)
- [ ] Phase 4: Dark Mode, i18n
- [ ] Phase 5: Mobile app (React Native)
- [ ] Phase 6: Analytics avancées
- [ ] Phase 7: Intégration paiement réel

---

## Licence

Propriétaire - GestionAsso CI 2026

---

## Support

Pour tout problème ou question:
- Email: support@gestionasso.ci
- Issues: GitHub Issues
- Chat: Discord community

---

**Version**: 1.0.0-beta  
**Dernière mise à jour**: 12/03/2026  
**Statut**: Production Ready (après Phase 2)
