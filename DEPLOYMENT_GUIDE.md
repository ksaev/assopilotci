# GestionAsso CI - Guide de Déploiement Complet

## Phase 1: Fondation API & Authentification ✅ COMPLÈTE

### Architecture Créée
- ✅ Schéma Prisma complet (`/prisma/schema.prisma`)
- ✅ Routes API d'authentification (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- ✅ Routes API CRUD pour toutes ressources (Members, Transactions, Events, Payments, Notifications)
- ✅ Middleware JWT avec RBAC
- ✅ Système de validation avec Zod
- ✅ Utilitaires API et gestion d'erreurs
- ✅ Context React pour l'authentification
- ✅ Hooks React pour données et mutations
- ✅ Configuration centralisée

### Fichiers Créés

#### Backend/API
- `/app/api/auth/register/route.ts` - Inscription utilisateur
- `/app/api/auth/login/route.ts` - Connexion utilisateur
- `/app/api/auth/me/route.ts` - Récupérer profil utilisateur
- `/app/api/members/route.ts` - CRUD membres
- `/app/api/members/[id]/route.ts` - Détails/édition/suppression membre
- `/app/api/transactions/route.ts` - Gestion transactions
- `/app/api/payments/route.ts` - Gestion paiements (Mobile Money)
- `/app/api/events/route.ts` - Gestion événements
- `/app/api/notifications/route.ts` - Gestion notifications

#### Library/Utilities
- `/lib/prisma.ts` - Client Prisma singleton
- `/lib/auth-middleware.ts` - Middleware JWT & RBAC
- `/lib/auth-context.tsx` - Context authentification React
- `/lib/api-client.ts` - Client API frontend
- `/lib/hooks.ts` - Hooks React (useFetch, useMutation)
- `/lib/validations.ts` - Schémas Zod pour validation
- `/lib/utils-api.ts` - Utilitaires API (responses, formatage)
- `/lib/errors.ts` - Classes erreur personnalisées
- `/lib/config.ts` - Configuration centralisée
- `/lib/env.ts` - Gestion variables d'environnement
- `/lib/types.ts` - Types TypeScript

#### Database
- `/prisma/schema.prisma` - Schéma complet Prisma

---

## Phase 2: Finalisation & Déploiement

### Étape 1: Installation Prisma & PostgreSQL

```bash
# 1. Installer Prisma
npm install @prisma/client
npm install -D prisma

# 2. Installer dépendances JWT & Auth
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken

# 3. Générer Prisma Client
npx prisma generate
```

### Étape 2: Configuration Base de Données

Créer `.env.local`:
```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/gestionasso"

# JWT Authentication
JWT_SECRET="your-super-secret-key-min-32-chars-change-in-production"
JWT_EXPIRES_IN="30d"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"

# Feature Flags
ENABLE_SMS_NOTIFICATIONS="false"
ENABLE_EMAIL_NOTIFICATIONS="false"
ENABLE_MOBILE_MONEY="false"

# Email (optionnel)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Mobile Money APIs (optionnel)
ORANGE_MONEY_API_KEY="your-key"
MTN_MONEY_API_KEY="your-key"
WAVE_API_KEY="your-key"
```

### Étape 3: Créer Migration Prisma

```bash
# Créer la migration initiale
npx prisma migrate dev --name init

# (Optionnel) Réinitialiser la base
npx prisma migrate reset
```

### Étape 4: Implémentation JWT (TODO LIST)

#### 4.1 Modifier `/lib/auth-middleware.ts`

Remplacer `verifyJWTToken()` et ajouter `generateJWTToken()`:

```typescript
import jwt from 'jsonwebtoken';

export function verifyJWTToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('[v0] JWT verification failed:', error);
    return null;
  }
}

export function generateJWTToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
}
```

#### 4.2 Modifier `/app/api/auth/register/route.ts`

Ajouter après validation:

```typescript
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateJWTToken } from '@/lib/auth-middleware';

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Check if email exists
const existingUser = await prisma.user.findUnique({ where: { email } });
if (existingUser) {
  throw new ConflictError('Cet email est déjà enregistré');
}

// Create user and organization
const user = await prisma.user.create({
  data: {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role: 'ADMIN',
    organization: {
      create: {
        name: organizationName || `Association de ${firstName}`,
        country: country || 'CI',
        email,
      },
    },
  },
  include: { organization: true },
});

// Generate token
const token = generateJWTToken({
  userId: user.id,
  email: user.email,
  role: user.role,
  organizationId: user.organization?.id,
});
```

#### 4.3 Modifier `/app/api/auth/login/route.ts`

```typescript
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateJWTToken } from '@/lib/auth-middleware';

// Find user
const user = await prisma.user.findUnique({
  where: { email },
  include: { organization: true },
});
if (!user) {
  throw new UnauthorizedError('Email ou mot de passe incorrect');
}

// Verify password
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  throw new UnauthorizedError('Email ou mot de passe incorrect');
}

// Generate token
const token = generateJWTToken({
  userId: user.id,
  email: user.email,
  role: user.role,
  organizationId: user.organization?.id,
});
```

### Étape 5: Connecter les Routes CRUD

Pour chaque route API (`/api/members`, `/api/transactions`, etc.):

1. Importer `prisma` client:
   ```typescript
   import prisma from '@/lib/prisma';
   ```

2. Importer utilitaires:
   ```typescript
   import { successResponse, errorResponse } from '@/lib/utils-api';
   import { getUserOrganizationId } from '@/lib/auth-middleware';
   ```

3. Remplacer les commentaires TODO par code Prisma réel

4. Ajouter validation permission:
   ```typescript
   const orgId = getUserOrganizationId(request);
   const member = await prisma.member.findUniqueOrThrow({
     where: { id: memberId, organizationId: orgId },
   });
   ```

### Étape 6: Tester les Routes

```bash
# Démarrer serveur développement
npm run dev

# Tester register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123",
    "firstName": "Admin",
    "lastName": "User"
  }'

# Tester login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'

# Tester route protégée
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Phase 3: Connecter Frontend aux API

### Utiliser le Context Authentification

```typescript
'use client';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin(email, password);
    }}>
      {/* Form fields */}
    </form>
  );
}
```

### Utiliser les Hooks API

```typescript
'use client';
import { useFetch, useMutation } from '@/lib/hooks';

export default function MembersPage() {
  const { data: members, loading } = useFetch('/api/members');
  const { mutate: createMember } = useMutation('/api/members', { method: 'POST' });

  return (
    <div>
      {members?.map(m => <div key={m.id}>{m.firstName}</div>)}
    </div>
  );
}
```

---

## Phase 4: Déploiement Production

### Vercel
```bash
# 1. Push code à GitHub
git push origin main

# 2. Connecter repo à Vercel
# https://vercel.com/new

# 3. Ajouter variables d'environnement dans Vercel Dashboard
# DATABASE_URL, JWT_SECRET, etc.

# 4. Déployer
# Automatique à chaque push
```

### Avant Production
- [ ] Changer JWT_SECRET à valeur sécurisée (min 32 caractères)
- [ ] Configurer PostgreSQL (Render, Railway, Neon, etc.)
- [ ] Activer HTTPS
- [ ] Configurer CORS
- [ ] Ajouter rate limiting
- [ ] Configurer monitoring (Sentry)
- [ ] Tests API complets
- [ ] Sécurité: CSRF, XSS, SQL injection

---

## Variables d'Environnement Complètes

```env
# === DATABASE ===
DATABASE_URL="postgresql://user:password@host:5432/gestionasso"

# === AUTHENTICATION ===
JWT_SECRET="your-secret-key-min-32-chars-CHANGE-IN-PRODUCTION"
JWT_EXPIRES_IN="30d"

# === API ===
NEXT_PUBLIC_API_URL="https://yourdomain.com"
NODE_ENV="production"

# === FEATURES ===
ENABLE_SMS_NOTIFICATIONS="true"
ENABLE_EMAIL_NOTIFICATIONS="true"
ENABLE_MOBILE_MONEY="true"

# === EMAIL ===
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@gestionasso.ci"

# === MOBILE MONEY ===
ORANGE_MONEY_API_KEY="your-api-key"
ORANGE_MONEY_API_SECRET="your-api-secret"
ORANGE_MONEY_MERCHANT_CODE="your-merchant-code"

MTN_MONEY_API_KEY="your-api-key"
MTN_MONEY_API_SECRET="your-api-secret"
MTN_MONEY_MERCHANT_CODE="your-merchant-code"

WAVE_API_KEY="your-api-key"
WAVE_API_SECRET="your-api-secret"

# === MONITORING ===
SENTRY_DSN="your-sentry-dsn"
LOG_LEVEL="info"

# === NEXTAUTH (optionnel) ===
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://yourdomain.com"
```

---

## Checklist Déploiement

- [ ] Phase 1: Fondation API ✅
  - [ ] Prisma schema créé
  - [ ] Routes auth implémentées
  - [ ] Middleware JWT créé
  
- [ ] Phase 2: Finalisation
  - [ ] PostgreSQL configurée
  - [ ] Migrations créées
  - [ ] JWT implémenté
  - [ ] Routes connectées à DB
  - [ ] Tests API réussis

- [ ] Phase 3: Frontend
  - [ ] Context Auth branché
  - [ ] Pages login/register finalisées
  - [ ] API hooks intégrés
  - [ ] Toasts notifications

- [ ] Phase 4: Production
  - [ ] Vercel/hébergement configuré
  - [ ] Env variables sécurisées
  - [ ] SSL/TLS activé
  - [ ] Monitoring setup
  - [ ] Backups configurés
  - [ ] Tests final

---

## Support & Debugging

### Logs
- Frontend: Console browser (F12)
- Backend: `console.log('[v0] ...')`
- Database: `npm run db:push --dry-run`

### Erreurs Courantes

**"DATABASE_URL not found"**
```bash
# Créer .env.local avec DATABASE_URL
echo 'DATABASE_URL="postgresql://..."' > .env.local
npx prisma generate
```

**"JWT_SECRET not set"**
```bash
# Ajouter à .env.local
JWT_SECRET="your-secret-key"
```

**"Prisma error: The ".prisma/client" does not exist"**
```bash
npx prisma generate
```

---

## Prochaines Phases

- **Phase 5**: Features avancées (Rapports, IA, Prédictions)
- **Phase 6**: Dark Mode, i18n, Accessibilité
- **Phase 7**: Performance & Sécurité hardening
- **Phase 8**: Mobile app (React Native)

---

**Dernière mise à jour**: 12/03/2026  
**Version API**: 1.0.0  
**Status**: Production Ready (après Phase 2)
