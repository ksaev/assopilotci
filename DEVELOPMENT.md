# Guide de Développement - GestionAsso CI

## Standards de Code

### TypeScript
- Type tous les fichiers avec `.tsx`, `.ts`
- Utiliser les interfaces explicites au lieu de `any`
- Activer `strict: true` dans `tsconfig.json`

```typescript
// ✅ BON
interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
}

const user: UserProfile = { id: '1', email: 'test@example.com' };

// ❌ MAUVAIS
const user: any = { id: '1', email: 'test@example.com' };
```

### Nommage

#### Fichiers
- Components: `PascalCase` - `UserCard.tsx`
- Hooks: `camelCase` - `useAuth.ts`
- Utils: `kebab-case` - `api-client.ts`
- Styles: `globals.css`, `components.css`

#### Variables & Fonctions
- `const userName = 'John'` - camelCase
- `function getUserById()` - camelCase
- `const USER_ROLES = ['ADMIN']` - UPPER_SNAKE_CASE (constantes)

### Imports

```typescript
// 1. Imports système
import { useState } from 'react';
import { NextRequest, NextResponse } from 'next/server';

// 2. Imports externes
import { Button } from '@/components/ui/button';
import { z } from 'zod';

// 3. Imports locaux
import { apiCall } from '@/lib/api-client';
import type { UserProfile } from '@/lib/types';

// 4. Imports styles
import '@/styles/custom.css';
```

---

## Architecture Frontend

### Components

#### Règle de Base
- 1 composant = 1 responsibility
- Maximum 400 lignes par composant
- Extraire logique dans des custom hooks

```typescript
// components/user-card.tsx
interface UserCardProps {
  userId: string;
  onDelete: (id: string) => void;
}

export function UserCard({ userId, onDelete }: UserCardProps) {
  return <div>{/* ... */}</div>;
}
```

#### Structure de Composant
```typescript
'use client'; // Si client-side rendering

import { ReactNode } from 'react';
import type { SomeType } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function MyComponent({ title, children, onClick }: ComponentProps) {
  // Logique ici
  
  return (
    <div>
      <h1>{title}</h1>
      {children}
      <Button onClick={onClick}>Click</Button>
    </div>
  );
}
```

### Gestion d'État

#### Contextes
Utilisé pour l'état global:
- Authentification (`useAuth()`)
- Thème (`useTheme()`)
- Notifications globales

```typescript
// lib/auth-context.tsx
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be in AuthProvider');
  return context;
}
```

#### Hooks SWR
Utilisé pour données distantes:
```typescript
// Hook pour fetching
const { data, error, isLoading } = useFetch('/api/members');

// Hook pour mutations
const { mutate, loading } = useMutation('/api/members');
```

### Formulaires

Utiliser Zod pour validation:
```typescript
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const validation = loginSchema.safeParse(formData);
if (!validation.success) {
  // Handle errors
}
```

---

## Architecture Backend

### Routes API

#### Structure Basique
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { successResponse, errorResponse } from '@/lib/utils-api';
import { withAuth } from '@/lib/auth-middleware';

export const GET = withAuth(async (request, payload) => {
  try {
    // Logic here
    return successResponse(data);
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});
```

#### Patterns Courants

**Récupérer une ressource:**
```typescript
export const GET = withAuth(async (request, payload) => {
  const { id } = request.nextUrl.searchParams;
  
  // TODO: const item = await prisma.table.findUnique({ where: { id } });
  
  return successResponse(item);
});
```

**Créer une ressource:**
```typescript
export const POST = withAuth(async (request, payload) => {
  const body = await request.json();
  const validation = mySchema.safeParse(body);
  
  if (!validation.success) {
    return errorResponse('Invalid data', 400, validation.error);
  }
  
  // TODO: const created = await prisma.table.create({ data: validation.data });
  
  return successResponse(created, 'Créé avec succès', 201);
});
```

**Mettre à jour une ressource:**
```typescript
export const PUT = withAuth(async (request, payload) => {
  const { id } = request.nextUrl.searchParams;
  const body = await request.json();
  
  // TODO: const updated = await prisma.table.update({
  //   where: { id },
  //   data: body,
  // });
  
  return successResponse(updated);
});
```

**Supprimer une ressource:**
```typescript
export const DELETE = withAuth(async (request, payload) => {
  const { id } = request.nextUrl.searchParams;
  
  // TODO: await prisma.table.delete({ where: { id } });
  
  return successResponse(null, 'Supprimé avec succès');
});
```

### Erreurs

Utiliser les classes erreur personnalisées:
```typescript
import { 
  NotFoundError, 
  UnauthorizedError, 
  ConflictError,
  ValidationError 
} from '@/lib/errors';

throw new NotFoundError('Utilisateur non trouvé');
throw new UnauthorizedError('Token invalide');
throw new ConflictError('Email déjà utilisé');
throw new ValidationError('Email invalide');
```

### Prisma Patterns

#### Query Basique
```typescript
// Créer
const user = await prisma.user.create({
  data: { email, password },
});

// Lire
const user = await prisma.user.findUnique({ where: { id } });
const users = await prisma.user.findMany({
  where: { status: 'ACTIVE' },
  orderBy: { createdAt: 'desc' },
  skip: (page - 1) * limit,
  take: limit,
});

// Mettre à jour
const user = await prisma.user.update({
  where: { id },
  data: { firstName: 'New Name' },
});

// Supprimer
await prisma.user.delete({ where: { id } });
```

#### Relations
```typescript
// Inclure relations
const user = await prisma.user.findUnique({
  where: { id },
  include: { organization: true },
});

// Créer avec relations
const user = await prisma.user.create({
  data: {
    email,
    organization: {
      create: { name: 'New Org' },
    },
  },
  include: { organization: true },
});
```

---

## Sécurité

### Authentification

- Toujours utiliser HTTPS en production
- Tokens JWT stockés en `httpOnly` cookies (futur)
- Tokens expirés automatiquement (30d par défaut)
- Rotate secrets régulièrement

### Validation

```typescript
// ✅ TOUJOURS valider les inputs
const validation = mySchema.safeParse(userInput);
if (!validation.success) return errorResponse(...);

// ❌ JAMAIS accepter inputs sans validation
const user = await db.user.create({ data: userInput });
```

### Permissions

```typescript
// ✅ BON - Vérifier les permissions
export const DELETE = withRole(['ADMIN'], async (request, payload) => {
  // Seuls les ADMIN peuvent accéder
});

// ❌ MAUVAIS - Pas de vérification
export const DELETE = async (request) => {
  await db.user.delete({ where: { id } });
};
```

### SQL Injection

```typescript
// ✅ BON - Prisma empêche SQL injection
const users = await prisma.user.findMany({
  where: { email: userEmail }, // Paramétré automatiquement
});

// ❌ MAUVAIS - Si on utilisait raw SQL
const users = await db.$queryRaw`SELECT * FROM users WHERE email = ${email}`;
```

---

## Performance

### Optimisations Frontend

```typescript
// 1. Code Splitting avec dynamic()
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <Skeleton />,
});

// 2. Image Optimization
import Image from 'next/image';
<Image src="/photo.jpg" alt="Photo" width={400} height={300} />;

// 3. Memoization
const MemoComponent = memo(MyComponent);
const memoValue = useMemo(() => expensiveComputation(), [deps]);
```

### Optimisations Backend

```typescript
// 1. Pagination
const page = parseInt(searchParams.get('page') || '1');
const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);

// 2. Select fields
const users = await prisma.user.findMany({
  select: { id: true, email: true }, // Pas tous les champs
});

// 3. Batch operations
const users = await prisma.user.createMany({
  data: [/* ... */],
});
```

---

## Testing

### Test API Routes

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","firstName":"Test"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Avec token
TOKEN="eyJhbGc..."
curl -X GET http://localhost:3000/api/members \
  -H "Authorization: Bearer $TOKEN"
```

### Debug

```typescript
// Logs dans backend
console.log('[v0] Variable:', variable);

// Logs dans frontend
console.error('[v0] Error:', error);

// Prisma logs
// Set `log: ['query', 'error']` dans prisma.ts
```

---

## Git Workflow

### Commits
```bash
# Feature
git checkout -b feature/member-import

# Commit
git commit -m "feat: add member import from Excel"

# Push
git push origin feature/member-import

# Pull Request
# → Merge après review
```

### Messages Commits
```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

---

## Checklist Avant Production

- [ ] Tous les secrets changés (JWT_SECRET, DB_PASSWORD, etc.)
- [ ] HTTPS activé
- [ ] Rate limiting configuré
- [ ] Monitoring setup (Sentry, logs centralisés)
- [ ] Tests API complets réussis
- [ ] Base de données optimisée (indexes, queries)
- [ ] Backups automatiques configurés
- [ ] CORS configuré correctement
- [ ] CSRF protection
- [ ] Input sanitization
- [ ] Error handling complet
- [ ] Logs centralisés
- [ ] Performance tests réussis
- [ ] Security scan réussi

---

## Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev)
- [OWASP Security](https://owasp.org/www-project-secure-coding-practices/)

---

**Dernière mise à jour**: 12/03/2026
