# GestionAsso CI - API Setup Guide

## Phase 1: Routes API & Prisma Schema ✅

Toutes les routes API et le schéma Prisma ont été créés. Les TODO suivants doivent être complétés:

### 1. **Configuration de la Base de Données**

#### 1.1 Installer Prisma
```bash
npm install @prisma/client
npm install -D prisma
```

#### 1.2 Configuration PostgreSQL
Créer `.env.local` avec:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/gestionasso"
JWT_SECRET="your-super-secret-key-change-in-production"
```

#### 1.3 Initialiser la Migration
```bash
npx prisma migrate dev --name init
```

#### 1.4 Générer le Client Prisma
```bash
npx prisma generate
```

### 2. **Configuration JWT & Authentification**

#### 2.1 Installer les dépendances
```bash
npm install jsonwebtoken bcryptjs
npm install -D @types/jsonwebtoken
```

#### 2.2 Modifier `/lib/auth-middleware.ts`
Remplacer la fonction `verifyJWTToken()` avec:
```typescript
import jwt from 'jsonwebtoken';
import { ENV } from './env';

export function verifyJWTToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('[JWT] Token verification failed:', error);
    return null;
  }
}

export function generateJWTToken(payload: JWTPayload): string {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });
}
```

#### 2.3 Modifier `/app/api/auth/register/route.ts`
Ajouter après les validations:
```typescript
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateJWTToken } from '@/lib/auth-middleware';

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Check if email exists
const existingUser = await prisma.user.findUnique({ where: { email } });
if (existingUser) {
  return NextResponse.json(
    { success: false, error: 'Cet email est déjà enregistré' },
    { status: 409 }
  );
}

// Create user and organization
const user = await prisma.user.create({
  data: {
    email,
    password: hashedPassword,
    firstName: firstName || null,
    lastName: lastName || null,
    role: 'ADMIN',
    organization: {
      create: {
        name: organizationName || 'Mon Association',
        country: country || 'CI',
        email,
      },
    },
  },
});

// Generate token
const token = generateJWTToken({
  userId: user.id,
  email: user.email,
  role: user.role,
  organizationId: user.organizationId || undefined,
});

return NextResponse.json(
  {
    success: true,
    message: 'Inscription réussie',
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  },
  { status: 201 }
);
```

#### 2.4 Modifier `/app/api/auth/login/route.ts`
Ajouter après les validations:
```typescript
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateJWTToken } from '@/lib/auth-middleware';

// Find user
const user = await prisma.user.findUnique({ where: { email } });
if (!user) {
  return NextResponse.json(
    { success: false, error: 'Email ou mot de passe incorrect' },
    { status: 401 }
  );
}

// Verify password
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  return NextResponse.json(
    { success: false, error: 'Email ou mot de passe incorrect' },
    { status: 401 }
  );
}

// Generate token
const token = generateJWTToken({
  userId: user.id,
  email: user.email,
  role: user.role,
  organizationId: user.organizationId || undefined,
});

return NextResponse.json({
  success: true,
  message: 'Connexion réussie',
  token,
  user: {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  },
});
```

### 3. **Créer Prisma Client Helper**

Créer `/lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
```

### 4. **Connecter les Routes CRUD**

Pour chaque route (`/app/api/members`, `/app/api/transactions`, etc.):
1. Importer `prisma` client
2. Remplacer les commentaires TODO par le code réel Prisma
3. Ajouter la validation des permissions avec `getUserOrganizationId()`

### 5. **Variables d'Environnement Complètes**

`.env.local` avec tous les paramètres:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gestionasso"

# Authentication
JWT_SECRET="votre-clé-secrète-très-sécurisée"
JWT_EXPIRES_IN="30d"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"

# Email (optionnel)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@gestionasso.ci"

# Mobile Money APIs (optionnel)
ORANGE_MONEY_API_KEY="your-key"
ORANGE_MONEY_API_SECRET="your-secret"
ORANGE_MONEY_MERCHANT_CODE="your-code"

# Feature Flags
ENABLE_SMS_NOTIFICATIONS="false"
ENABLE_EMAIL_NOTIFICATIONS="false"
ENABLE_MOBILE_MONEY="false"
```

## Résumé des Routes API Créées

### Authentication
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Members Management
- `GET /api/members` - Lister les membres
- `POST /api/members` - Créer un membre
- `GET /api/members/[id]` - Détails d'un membre
- `PUT /api/members/[id]` - Modifier un membre
- `DELETE /api/members/[id]` - Supprimer un membre

### Payments
- `GET /api/payments` - Lister les paiements
- `POST /api/payments` - Créer un paiement

### Transactions
- `GET /api/transactions` - Lister les transactions
- `POST /api/transactions` - Créer une transaction

### Events
- `GET /api/events` - Lister les événements
- `POST /api/events` - Créer un événement

### Notifications
- `GET /api/notifications` - Lister les notifications
- `POST /api/notifications` - Créer une notification

## Schéma Prisma

Modèles créés:
- **User** - Utilisateurs (Admin, Treasurer, Secretary, Member)
- **Organization** - Associations
- **OrganizationSettings** - Paramètres
- **Member** - Membres
- **Payment** - Paiements (Mobile Money)
- **Transaction** - Transactions financières
- **Event** - Événements
- **EventParticipation** - Participations aux événements
- **Notification** - Notifications
- **Document** - Documents partagés
- **Invoice** - Factures
- **Budget** - Budgets

## Prochaines Étapes (Phase 2-5)

1. **Phase 2**: Connecter les pages front-end aux routes API
2. **Phase 3**: Implémenter Mobile Money (Orange, MTN, Wave)
3. **Phase 4**: Ajouter notifications (Email, SMS)
4. **Phase 5**: Features avancées (Rapports, Analytics, IA)

---

Pour toute question: Référez-vous au plan à `/v0_plans/universal-saas-platform.md`
