export interface Member {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "pending"
  tier: "Bronze" | "Argent" | "Or"
  balance: number
  joinDate: string
  avatar?: string
  du : number
}

export interface Transaction {
  id: string
  memberId: string
  memberName: string
  amount: number
  type: "cotisation" | "don" | "amende" | "autre"
  method: "cash" | "mobile_money" | "virement" | "cheque"
  date: string
  status: "completed" | "pending" | "failed"
  description?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  type: "assemblee" | "nettoyage" | "don" | "formation" | "social"
  participants: number
  cost: number
  revenue: number
  status: "upcoming" | "completed" | "cancelled"
}

export interface Document {
  id: string
  title: string
  type: "statut" | "pv" | "rapport" | "budget" | "autre"
  uploadDate: string
  size: string
  url?: string
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  author: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "payment" | "event" | "message" | "alert"
  read: boolean
  date: string
}

export interface Dependent {
  id: string
  memberId: string
  memberName: string
  name: string
  relationShip: string
  birthDate: Date | string 
  phone?: string
  photo?: { name: string; url: string }[] 
}

// Noms ivoiriens et francophones africains
const firstNames = [
  "Adama",
  "Kouassi",
  "Nadia",
  "Jean-Baptiste",
  "Fatoumata",
  "Yao",
  "Aminata",
  "N'dri",
  "Mariam",
  "Kouadio",
  "Aissatou",
  "Konan",
  "Seydou",
  "Awa",
  "Kouame",
  "Bintou",
  "Koffi",
  "Djénéba",
  "Ibrahim",
  "Kadiatou",
  "Mamadou",
  "Aïcha",
  "Ousmane",
  "Ramatou",
]

const lastNames = [
  "Koné",
  "Traoré",
  "Diallo",
  "Yao",
  "Kouadio",
  "Kouassi",
  "N'dri",
  "Bamba",
  "Sanogo",
  "Diomandé",
  "Touré",
  "Ouattara",
  "Diabaté",
  "Coulibaly",
  "Doumbia",
  "Camara",
  "Keita",
  "Sylla",
  "Soro",
  "Fofana",
  "Kone",
  "Dembélé",
  "Cissé",
  "Bakayoko",
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function generatePhoneNumber(): string {
  const prefixes = ["07", "05", "01"]
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const number = Math.floor(Math.random() * 90000000) + 10000000
  return `+225 ${prefix} ${number.toString().slice(0, 2)} ${number.toString().slice(2, 4)} ${number.toString().slice(4, 6)} ${number.toString().slice(6)}`
}

function generateEmail(name: string): string {
  const cleanName = name.toLowerCase().replace(/['\s]/g, "")
  const domains = ["gmail.com", "yahoo.fr", "hotmail.com", "outlook.com"]
  return `${cleanName}@${domains[Math.floor(Math.random() * domains.length)]}`
}

function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

// Génération des membres
export const members: Member[] = Array.from({ length: 20 }, (_, i) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const name = `${firstName} ${lastName}`

  return {

    id: `MBR${String(i + 1).padStart(3, "0")}`,

    id: `MBR-${String(i + 1).padStart(3, "0")}`,

    name,
    email: generateEmail(name),
    phone: generatePhoneNumber(),
    status: ["active", "active", "active", "inactive", "pending"][Math.floor(Math.random() * 5)] as
      | "active"
      | "inactive"
      | "pending",
    tier: ["Bronze", "Argent", "Or"][Math.floor(Math.random() * 3)] as "Bronze" | "Argent" | "Or",
    balance: Math.floor(Math.random() * 50000) + 5000,
    joinDate: randomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
    avatar: undefined,
    du : 0,
  }
})


// Ayant droit (dependents)

const Dependent = [
  {
    id: "dep1",
    memberId: "MBR001",
    name: "Marie Kouassi",
    relationShip: "Épouse",
    birthDate: "1992-03-15",
    phone: "0701234567",
    photo: "/images/dependents/woman.jpg",
  },
  {
    id: "dep2",
    memberId: "MBR001",
    name: "Jean Kouassi",
    relationShip: "Fils",
    birthDate: "2016-08-20",
    photo: "/images/dependents/boy.jpg",
  },
]

const relations = ["Épouse", "Époux", "Fils", "Fille", "Frère", "Sœur"]

export const dependents: Dependent[] = members.flatMap((member, i) => {
  const count = Math.floor(Math.random() * 3)

  return Array.from({ length: count }, (_, j) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    return {
      id: `DEP${i}${j}`,
      memberId: member.id,
      memberName: member.name,
      name: `${firstName} ${lastName}`,
      relationShip: relations[Math.floor(Math.random() * relations.length)],
      birthDate: randomDate(new Date(1990, 0, 1), new Date(2020, 0, 1)),
      phone: generatePhoneNumber(),
      photo: undefined,
    }
  })
})

// Génération des transactions
export const transactions: Transaction[] = Array.from({ length: 50 }, (_, i) => {
  const member = members[Math.floor(Math.random() * members.length)]
  const types = ["cotisation", "don", "amende", "autre"] as const
  const methods = ["cash", "mobile_money", "virement", "cheque"] as const

  return {
    id: `TXN${String(i + 1).padStart(4, "0")}`,
    memberId: member.id,
    memberName: member.name,
    amount: [1000, 2500, 5000, 7500, 10000][Math.floor(Math.random() * 5)],
    type: types[Math.floor(Math.random() * types.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    date: randomDate(new Date(2024, 0, 1), new Date()),
    status: ["completed", "completed", "completed", "pending"][Math.floor(Math.random() * 4)] as
      | "completed"
      | "pending"
      | "failed",
    description: undefined,
  }
})

// Génération des événements
const eventTitles = [
  "Assemblée Générale Ordinaire",
  "Nettoyage Communautaire",
  "Don aux Orphelinats",
  "Formation en Gestion",
  "Cérémonie de Fin d'Année",
  "Journée Portes Ouvertes",
  "Atelier de Formation",
  "Collecte de Fonds",
]

export const events: Event[] = Array.from({ length: 8 }, (_, i) => {
  const types = ["assemblee", "nettoyage", "don", "formation", "social"] as const
  const isUpcoming = i < 3

  return {
    id: `EVT${String(i + 1).padStart(3, "0")}`,
    title: eventTitles[i],
    description: `Description de l'événement ${eventTitles[i]}`,
    date: isUpcoming ? randomDate(new Date(), new Date(2025, 11, 31)) : randomDate(new Date(2024, 0, 1), new Date()),
    type: types[Math.floor(Math.random() * types.length)],
    participants: Math.floor(Math.random() * 15) + 5,
    cost: Math.floor(Math.random() * 50000) + 10000,
    revenue: Math.floor(Math.random() * 100000) + 20000,
    status: isUpcoming ? "upcoming" : "completed",
  }
})

// Génération des documents
const documentTitles = [
  "Statuts de l'Association",
  "Procès-Verbal AG 2024",
  "Rapport Financier Q4 2024",
  "Budget Prévisionnel 2025",
  "Règlement Intérieur",
]

export const documents: Document[] = Array.from({ length: 5 }, (_, i) => {
  const types = ["statut", "pv", "rapport", "budget", "autre"] as const

  return {
    id: `DOC${String(i + 1).padStart(3, "0")}`,
    title: documentTitles[i],
    type: types[i % types.length],
    uploadDate: randomDate(new Date(2024, 0, 1), new Date()),
    size: `${Math.floor(Math.random() * 500) + 100} KB`,
    url: undefined,
  }
})

// Génération des notes
export const notes: Note[] = [
  {
    id: "NOTE001",
    title: "Planning des activités de Janvier",
    content: "Prévoir la réunion du bureau pour le 15 janvier. Organiser la collecte des cotisations.",
    createdAt: new Date(2024, 11, 20).toISOString(),
    updatedAt: new Date(2024, 11, 20).toISOString(),
    author: "Admin",
  },
  {
    id: "NOTE002",
    title: "Liste des membres à relancer",
    content: "Kouassi N'dri, Fatoumata Diallo, Yao Kouadio - paiements en retard",
    createdAt: new Date(2024, 11, 15).toISOString(),
    updatedAt: new Date(2024, 11, 18).toISOString(),
    author: "Admin",
  },
]

// Génération des notifications
export const notifications: Notification[] = [
  {
    id: "NOTIF001",
    title: "Nouveau paiement",
    message: "Adama Koné a effectué un paiement de 5000 FCFA",
    type: "payment",
    read: false,
    date: new Date().toISOString(),
  },
  {
    id: "NOTIF002",
    title: "Événement à venir",
    message: "L'Assemblée Générale est prévue pour le 20 janvier 2025",
    type: "event",
    read: false,
    date: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "NOTIF003",
    title: "Rappel de cotisation",
    message: "5 membres n'ont pas encore payé leur cotisation mensuelle",
    type: "alert",
    read: true,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
]

// Statistiques calculées
export function getStats() {
  const totalMembers = members.length
  const activeMembers = members.filter((m) => m.status === "active").length
  const totalTransactions = transactions.reduce((sum, t) => sum + (t.status === "completed" ? t.amount : 0), 0)
  const totalEvents = events.length
  const upcomingEvents = events.filter((e) => e.status === "upcoming").length

  return {
    totalMembers,
    activeMembers,
    totalTransactions,
    totalEvents,
    upcomingEvents,
  }
}

// Données pour les graphiques
export function getMonthlyRevenue() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]
  return months.map((month, i) => ({
    month,
    revenue: Math.floor(Math.random() * 100000) + 50000,
    expenses: Math.floor(Math.random() * 80000) + 30000,
  }))
}

export function getMemberGrowth() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]
  let total = 10
  return months.map((month) => {
    total += Math.floor(Math.random() * 3) + 1
    return { month, members: total }
  })
}
