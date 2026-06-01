"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  CreditCard,
  FileText,
  DollarSign,
  Edit,
  MessageSquare,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { members, transactions, events, notes, dependents  } from "@/lib/data"
import { motion } from "framer-motion"
import * as React from "react"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import AddDependentDialog from "@/components/dependents/add-dependent-dialog"
import DependentsList from "@/components/dependents/dependents-list"
import { validateFileSize } from "@/components/file-size"

export default function MemberDetailPage() {
  const params = useParams()
  const id = params.id as string
  const member = members.find((m) => m.id === id)

  const [paymentModalOpen, setPaymentModalOpen] = React.useState(false)
  const [noteModalOpen, setNoteModalOpen] = React.useState(false)
  const [editModalOpen, setEditModalOpen] = React.useState(false)


  if (!member) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-muted-foreground">Membre non trouvé</p>
          <Button asChild>
            <Link href="/admin/members">Retour à la liste</Link>
          </Button>
        </div>
    )
  }
  const [initials, setInitials] = React.useState("")

  React.useEffect(() => {
    setInitials(getInitials(member.name))
  }, [member.name])

  const memberTransactions = transactions.filter((t) => t.memberId === member.id)
  const totalPaid = memberTransactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  const memberNotes = notes.filter((n) => n.title.includes(member.name))

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getTierProgress = (tier: string) => {
    const progress = { Bronze: 30, Argent: 60, Or: 100 }
    return progress[tier as keyof typeof progress] || 0
  }

  const handleAddPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log("[v0] Adding payment for member:", member.id, Object.fromEntries(formData))
    setPaymentModalOpen(false)
  }

  const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log("[v0] Adding note for member:", member.id, Object.fromEntries(formData))
    setNoteModalOpen(false)
  }

  const handleEditMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log("[v0] Updating member:", member.id, Object.fromEntries(formData))
    setEditModalOpen(false)
  }

  const handleSendNotification = () => {
    console.log("[v0] Sending notification to member:", member.id)
    alert(`Notification envoyée à ${member.name}`)
  }
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = React.useState(member.avatar || "/placeholder.svg")

    const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !validateFileSize(file)) return

    const imageUrl = URL.createObjectURL(file)
    setAvatar(imageUrl)
  }

  return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href="/admin/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux membres
          </Link>
        </Button>

        {/* Member Profile Header - Vue 360° */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    className="h-32 w-32 ring-4 ring-primary/10 cursor-pointer hover:scale-105 transition"
                    onClick={handleClick}
                  >
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>


                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <p className="text-xs text-muted-foreground">
                    Cliquez sur la photo pour changer
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Taille maximale : 1 Mo
                  </p>

                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{member.name}</h1>
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.status === "active" ? "Actif" : "Inactif"}
                      </Badge>
                      <Badge variant="outline" className="font-semibold">
                        {member.tier}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">Membre {member.id}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Depuis {new Date(member.joinDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sm text-muted-foreground">Progression {member.tier}</span>
                      <span className="font-medium">{getTierProgress(member.tier)}%</span>
                    </div>
                    <Progress value={getTierProgress(member.tier)} className="h-2" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Enregistrer un paiement
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleAddPayment}>
                        <DialogHeader>
                          <DialogTitle>Enregistrer un paiement</DialogTitle>
                          <DialogDescription>
                            Enregistrer une cotisation ou un paiement pour {member.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="amount">Montant (FCFA) *</Label>
                            <Input id="amount" name="amount" type="number" placeholder="5000" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="type">Type de transaction *</Label>
                            <Select name="type" defaultValue="cotisation">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cotisation">Cotisation</SelectItem>
                                <SelectItem value="don">Don</SelectItem>
                                <SelectItem value="amende">Amende</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="method">Méthode de paiement *</Label>
                            <Select name="method" defaultValue="mobile_money">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mobile_money">Mobile Money</SelectItem>
                                <SelectItem value="cash">Espèces</SelectItem>
                                <SelectItem value="virement">Virement</SelectItem>
                                <SelectItem value="cheque">Chèque</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="Cotisation mensuelle janvier 2025"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setPaymentModalOpen(false)}>
                            Annuler
                          </Button>
                          <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleEditMember}>
                        <DialogHeader>
                          <DialogTitle>Modifier les informations</DialogTitle>
                          <DialogDescription>Mettre à jour les informations de {member.name}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="editName">Nom complet</Label>
                            <Input id="editName" name="name" defaultValue={member.name} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="editEmail">Email</Label>
                            <Input id="editEmail" name="email" type="email" defaultValue={member.email} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="editPhone">Téléphone</Label>
                            <Input id="editPhone" name="phone" defaultValue={member.phone} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="editTier">Niveau</Label>
                            <Select name="tier" defaultValue={member.tier}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Bronze">Bronze</SelectItem>
                                <SelectItem value="Argent">Argent</SelectItem>
                                <SelectItem value="Or">Or</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="editStatus">Statut</Label>
                            <Select name="status" defaultValue={member.status}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Actif</SelectItem>
                                <SelectItem value="inactive">Inactif</SelectItem>
                                <SelectItem value="pending">En attente</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                            Annuler
                          </Button>
                          <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full bg-transparent" onClick={handleSendNotification}>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Solde Actuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{member.balance.toLocaleString()} FCFA</div>
              <p className="text-xs text-muted-foreground mt-1">À jour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Versé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalPaid.toLocaleString()} FCFA</div>
              <p className="text-xs text-muted-foreground mt-1">{memberTransactions.length} paiements</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ancienneté</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {Math.floor((new Date().getTime() - new Date(member.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 30))}{" "}
                mois
              </div>
              <p className="text-xs text-muted-foreground mt-1">Depuis {new Date(member.joinDate).getFullYear()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Niveau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold text-foreground">{member.tier}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Membre fidèle</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs - Vue 360° */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dependents">Parents</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des Transactions</CardTitle>
                <CardDescription>Tous les paiements effectués par ce membre</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberTransactions.slice(0, 10).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground capitalize">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString("fr-FR")} • {transaction.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{transaction.amount.toLocaleString()} FCFA</p>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Journal d'Activité</CardTitle>
                <CardDescription>Actions et participation du membre</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chart-2/10">
                        <TrendingUp className="h-5 w-5 text-chart-2" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <Badge variant="outline">Participé</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents du Membre</CardTitle>
                <CardDescription>Fichiers et documents associés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                        <FileText className="h-5 w-5 text-chart-3" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Formulaire d'inscription</p>
                        <p className="text-sm text-muted-foreground">PDF • 245 KB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                        <FileText className="h-5 w-5 text-chart-3" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Justificatif d'identité</p>
                        <p className="text-sm text-muted-foreground">PDF • 1.2 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Notes Internes</CardTitle>
                  <CardDescription>Notes et mémos concernant ce membre</CardDescription>
                </div>
                <Dialog open={noteModalOpen} onOpenChange={setNoteModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ajouter une note
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleAddNote}>
                      <DialogHeader>
                        <DialogTitle>Ajouter une note</DialogTitle>
                        <DialogDescription>Créer une note privée concernant {member.name}</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="noteTitle">Titre</Label>
                          <Input id="noteTitle" name="title" placeholder="Note importante" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="noteContent">Contenu</Label>
                          <Textarea
                            id="noteContent"
                            name="content"
                            placeholder="Détails de la note..."
                            rows={4}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setNoteModalOpen(false)}>
                          Annuler
                        </Button>
                        <Button type="submit">Enregistrer</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberNotes.length > 0 ? (
                    memberNotes.map((note) => (
                      <div key={note.id} className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-foreground">{note.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{note.content}</p>
                        <p className="text-xs text-muted-foreground">Par {note.author}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">Aucune note pour ce membre</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dependents" className="space-y-4">
            <div className="grid gap-4 ">
              <Card>
                <CardHeader>
                  <CardTitle>Ayants droits</CardTitle>
                  <CardDescription>Gérez vos Ayants droits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <DependentsList memberId={id} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  )
}
