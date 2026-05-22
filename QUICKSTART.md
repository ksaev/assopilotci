# Quick Start - GestionAsso CI

## En 5 minutes

### 1. Installation (2 min)

```bash
# Cloner
git clone <repo-url>
cd gestionasso-ci

# Installer dépendances
npm install

# Créer .env.local
cp .env.example .env.local
```

### 2. Configuration BD (1 min)

Éditer `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/gestionasso"
JWT_SECRET="your-secret-key-min-32-chars"
```

### 3. Base de Données (1 min)

```bash
# Initialiser Prisma
npx prisma generate
npx prisma migrate dev --name init

# (Optionnel) Seed data
npx prisma db seed
```

### 4. Lancer (1 min)

```bash
npm run dev
```

Accéder à: **http://localhost:3000**

---

## Pages Disponibles

### Public
- `/` - Landing page
- `/login` - Connexion/Inscription

### Admin (après login avec admin@example.com)
- `/admin/dashboard` - Tableau de bord
- `/admin/members` - Gestion membres
- `/admin/transactions` - Transactions
- `/admin/events` - Événements
- `/admin/reports` - Rapports
- `/admin/settings` - Paramètres

### Membre (après login avec email@example.com)
- `/membre/dashboard` - Mon espace
- `/membre/payments` - Mes paiements
- `/membre/events` - Mes événements
- `/membre/notifications` - Notifications

---

## Credentials Test

```
Email: admin@example.com
Password: password123 (ou n'importe quel mot de passe)
```

*Note: En développement, les mots de passe ne sont pas validés*

---

## Routes API de Base

### Authentification

```bash
# Register
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

# Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Profil
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Membres

```bash
# Lister
GET /api/members?page=1&limit=10

# Créer
POST /api/members
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com"
}

# Récupérer
GET /api/members/member_id

# Modifier
PUT /api/members/member_id
{ "firstName": "Jean", "status": "ACTIVE" }

# Supprimer
DELETE /api/members/member_id
```

### Paiements

```bash
# Lister
GET /api/payments

# Créer
POST /api/payments
{
  "amount": 50000,
  "memberId": "member_id",
  "type": "MEMBERSHIP_FEE",
  "method": "ORANGE_MONEY"
}
```

---

## Configuration Rapide (Optionnel)

### Email Notifications
```env
ENABLE_EMAIL_NOTIFICATIONS="true"
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Mobile Money
```env
ENABLE_MOBILE_MONEY="true"
ORANGE_MONEY_API_KEY="your-key"
MTN_MONEY_API_KEY="your-key"
WAVE_API_KEY="your-key"
```

---

## Scripts Utiles

```bash
# Développement
npm run dev              # Démarrer le serveur

# Database
npx prisma generate     # Générer Prisma Client
npx prisma migrate dev  # Créer migration
npx prisma db seed      # Seed données
npx prisma studio      # Ouvrir Prisma Studio (GUI)

# Build/Production
npm run build           # Build pour production
npm start               # Lancer en production

# Testing
npm test               # Tests (à implémenter)
```

---

## Dossiers Importants

```
/app              → Routes Next.js et API
/components       → Composants React
/lib              → Utilitaires et logique métier
/prisma           → Schema et migrations
/public           → Assets statiques
/styles           → CSS global
```

---

## Fichiers de Documentation

- **README_COMPLET.md** - Documentation complète
- **DEPLOYMENT_GUIDE.md** - Guide de déploiement
- **DEVELOPMENT.md** - Standards de code et bonnes pratiques
- **API_SETUP.md** - Setup API détaillé

---

## Troubleshooting

### "DATABASE_URL not found"
```bash
# Ajouter à .env.local
echo 'DATABASE_URL="postgresql://..."' >> .env.local
```

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Port 3000 déjà utilisé"
```bash
npm run dev -- -p 3001  # Utiliser port 3001
```

### "CORS error"
```typescript
// Vérifier headers dans /app/api/route.ts
// Les routes Next.js API n'ont pas besoin de CORS
```

---

## Étapes Suivantes

1. ✅ Application running
2. Connecter à PostgreSQL réelle
3. Implémenter JWT avec `jsonwebtoken`
4. Connecter les routes API à Prisma
5. Tester toutes les routes
6. Ajouter authentification réelle
7. Déployer sur Vercel

---

## Support

- Docs: Lire les fichiers MD
- Errors: Vérifier logs frontend (F12) et console serveur
- Questions: Consulter `/DEVELOPMENT.md`

---

**Prêt à développer! 🚀**
