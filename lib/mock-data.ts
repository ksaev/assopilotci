// Mock data engine for Ivorian association management

export type MemberStatus = "Bronze" | "Silver" | "Gold"
export type PaymentStatus = "Paid" | "Pending" | "Overdue"
export type PaymentType = "Cotisation Mensuelle" | "Fonds de Solidarité" | "Aide Sociale" | "Donation" | "Autre"

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  status: MemberStatus
  totalContributed: number
  pendingDues: number
  joinDate: string
  avatar?: string
}

export interface Transaction {
  id: string
  memberId: string
  memberName: string
  amount: number
  type: PaymentType
  status: PaymentStatus
  date: string
  description?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  joinRate: number
  maxParticipants: number
  currentParticipants: number
}

export interface Activity {
  id: string
  type: "payment" | "event" | "document" | "announcement"
  title: string
  description: string
  date: string
  documentUrl?: string
}

// Ivorian names
const firstNames = [
  "Adama",
  "Nadia",
  "Kouassi",
  "Fatou",
  "Ibrahim",
  "Awa",
  "Yao",
  "Mariam",
  "Seydou",
  "Aminata",
  "Koffi",
  "Djénéba",
  "Moussa",
  "Aïcha",
  "Jean-Baptiste",
  "Bintou",
  "Souleymane",
  "Rokia",
  "Emmanuel",
  "Clarisse",
]

const lastNames = [
  "Koné",
  "Kouadio",
  "N'dri",
  "Diomandé",
  "Sylla",
  "Coulibaly",
  "Traoré",
  "Bamba",
  "Ouattara",
  "Diabaté",
  "Konaté",
  "Cissé",
  "Sangaré",
  "Doumbia",
  "Touré",
  "Fofana",
  "Dembélé",
  "Keïta",
  "Sidibé",
  "Diarra",
]

function generateMembers(): Member[] {
  return firstNames.map((firstName, i) => ({
    id: `member-${i + 1}`,
    name: `${firstName} ${lastNames[i]}`,
    email: `${firstName.toLowerCase()}.${lastNames[i].toLowerCase()}@email.ci`,
    phone: `+225 ${String(Math.floor(Math.random() * 90000000) + 10000000).replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4")}`,
    status: (["Bronze", "Silver", "Gold"] as MemberStatus[])[Math.floor(Math.random() * 3)],
    totalContributed: Math.floor(Math.random() * 500000) + 25000,
    pendingDues: Math.random() > 0.6 ? Math.floor(Math.random() * 50000) + 5000 : 0,
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    ).toISOString(),
    avatar: `/placeholder.svg?height=40&width=40&query=african person ${firstName}`,
  }))
}

export const members: Member[] = generateMembers()

export const transactions: Transaction[] = [
  {
    id: "tx-1",
    memberId: "member-1",
    memberName: "Adama Koné",
    amount: 25000,
    type: "Cotisation Mensuelle",
    status: "Paid",
    date: "2024-12-15",
  },
  {
    id: "tx-2",
    memberId: "member-2",
    memberName: "Nadia Kouadio",
    amount: 50000,
    type: "Fonds de Solidarité",
    status: "Paid",
    date: "2024-12-14",
  },
  {
    id: "tx-3",
    memberId: "member-3",
    memberName: "Kouassi N'dri",
    amount: 10000,
    type: "Cotisation Mensuelle",
    status: "Pending",
    date: "2024-12-13",
  },
  {
    id: "tx-4",
    memberId: "member-4",
    memberName: "Fatou Diomandé",
    amount: 100000,
    type: "Donation",
    status: "Paid",
    date: "2024-12-12",
  },
  {
    id: "tx-5",
    memberId: "member-5",
    memberName: "Ibrahim Sylla",
    amount: 25000,
    type: "Cotisation Mensuelle",
    status: "Overdue",
    date: "2024-12-01",
  },
  {
    id: "tx-6",
    memberId: "member-6",
    memberName: "Awa Coulibaly",
    amount: 75000,
    type: "Aide Sociale",
    status: "Paid",
    date: "2024-12-10",
  },
  {
    id: "tx-7",
    memberId: "member-7",
    memberName: "Yao Traoré",
    amount: 25000,
    type: "Cotisation Mensuelle",
    status: "Paid",
    date: "2024-12-09",
  },
  {
    id: "tx-8",
    memberId: "member-8",
    memberName: "Mariam Bamba",
    amount: 30000,
    type: "Fonds de Solidarité",
    status: "Pending",
    date: "2024-12-08",
  },
  {
    id: "tx-9",
    memberId: "member-9",
    memberName: "Seydou Ouattara",
    amount: 25000,
    type: "Cotisation Mensuelle",
    status: "Paid",
    date: "2024-12-07",
  },
  {
    id: "tx-10",
    memberId: "member-10",
    memberName: "Aminata Diabaté",
    amount: 150000,
    type: "Donation",
    status: "Paid",
    date: "2024-12-06",
  },
]

export const events: Event[] = [
  {
    id: "evt-1",
    title: "Assemblée Générale Annuelle",
    description: "Réunion annuelle des membres pour le bilan 2024",
    date: "2024-12-28",
    location: "Salle Polyvalente, Cocody",
    joinRate: 75,
    maxParticipants: 100,
    currentParticipants: 75,
  },
  {
    id: "evt-2",
    title: "Collecte de Fonds Solidarité",
    description: "Campagne de collecte pour les familles dans le besoin",
    date: "2025-01-05",
    location: "En ligne",
    joinRate: 45,
    maxParticipants: 50,
    currentParticipants: 23,
  },
  {
    id: "evt-3",
    title: "Formation Leadership",
    description: "Atelier de développement personnel pour les jeunes membres",
    date: "2025-01-15",
    location: "Centre Culturel, Plateau",
    joinRate: 60,
    maxParticipants: 30,
    currentParticipants: 18,
  },
  {
    id: "evt-4",
    title: "Journée Portes Ouvertes",
    description: "Accueil de nouveaux membres potentiels",
    date: "2025-01-20",
    location: "Siège de l'Association, Marcory",
    joinRate: 30,
    maxParticipants: 80,
    currentParticipants: 24,
  },
]

export const activities: Activity[] = [
  {
    id: "act-1",
    type: "payment",
    title: "Cotisation reçue",
    description: "Votre cotisation mensuelle de Décembre a été confirmée",
    date: "2024-12-15",
  },
  {
    id: "act-2",
    type: "event",
    title: "Invitation: Assemblée Générale",
    description: "Vous êtes invité à l'AG annuelle le 28 Décembre",
    date: "2024-12-14",
  },
  {
    id: "act-3",
    type: "document",
    title: "Nouveau document disponible",
    description: "Le rapport financier Q3 2024 est disponible",
    date: "2024-12-12",
    documentUrl: "#",
  },
  {
    id: "act-4",
    type: "announcement",
    title: "Bienvenue aux nouveaux membres",
    description: "3 nouveaux membres ont rejoint l'association ce mois",
    date: "2024-12-10",
  },
  {
    id: "act-5",
    type: "payment",
    title: "Rappel de cotisation",
    description: "Votre cotisation de Novembre est en attente",
    date: "2024-12-08",
  },
]

// Statistics
export const stats = {
  totalMembers: members.length,
  activeMembers: members.filter((m) => m.pendingDues === 0).length,
  totalFCFA: members.reduce((acc, m) => acc + m.totalContributed, 0),
  pendingFCFA: members.reduce((acc, m) => acc + m.pendingDues, 0),
  totalEvents: events.length,
  upcomingEvents: events.filter((e) => new Date(e.date) > new Date()).length,
  annualBudget: 5000000,
  currentBudget: 3750000,
}

// Monthly revenue data for charts
export const monthlyData = [
  { month: "Jan", revenus: 450000, depenses: 320000 },
  { month: "Fév", revenus: 520000, depenses: 280000 },
  { month: "Mar", revenus: 480000, depenses: 350000 },
  { month: "Avr", revenus: 600000, depenses: 400000 },
  { month: "Mai", revenus: 550000, depenses: 380000 },
  { month: "Jun", revenus: 700000, depenses: 420000 },
  { month: "Jul", revenus: 650000, depenses: 350000 },
  { month: "Aoû", revenus: 580000, depenses: 300000 },
  { month: "Sep", revenus: 720000, depenses: 450000 },
  { month: "Oct", revenus: 680000, depenses: 380000 },
  { month: "Nov", revenus: 750000, depenses: 420000 },
  { month: "Déc", revenus: 800000, depenses: 500000 },
]

// Membership growth data
export const membershipGrowth = [
  { month: "Jan", membres: 12 },
  { month: "Fév", membres: 14 },
  { month: "Mar", membres: 15 },
  { month: "Avr", membres: 15 },
  { month: "Mai", membres: 16 },
  { month: "Jun", membres: 17 },
  { month: "Jul", membres: 18 },
  { month: "Aoû", membres: 18 },
  { month: "Sep", membres: 19 },
  { month: "Oct", membres: 19 },
  { month: "Nov", membres: 20 },
  { month: "Déc", membres: 20 },
]

// Format FCFA
export function formatFCFA(amount: number): string {
  return (
    new Intl.NumberFormat("fr-CI", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + " FCFA"
  )
}

// Get current member (for member dashboard simulation)
export const currentMember: Member = members[0]
