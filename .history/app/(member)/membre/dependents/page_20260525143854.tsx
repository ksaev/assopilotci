"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Trash2,
  Eye,
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  Filter,
  UserPlus,
  Calendar,
  ShieldCheck,
  Download,
  RefreshCw,
  AlertTriangle,
  FileText,
  Loader2,
  Camera,
  HeartHandshake,
  BadgeCheck,
  Phone,
  Mail,
  Cake,
} from "lucide-react"

import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type DependentStatus = "PENDING" | "APPROVED" | "REJECTED"

type Dependent = {
  id: string
  memberId: string

  firstName: string
  lastName: string

  birthDate: string
  status: DependentStatus

  createdAt: string
  updatedAt: string

  member?: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
  }
}

const RELATIONS = [
  "Enfant",
  "Conjoint(e)",
  "Père",
  "Mère",
  "Frère",
  "Sœur",
  "Autre",
]

const MAX_DEPENDENTS = 5

export default function DependentsPage() {
  const [dependents, setDependents] = useState<Dependent[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  const [openAdd, setOpenAdd] = useState(false)

  const [selected, setSelected] = useState<Dependent | null>(null)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  /* =========================
      FORM
  ========================= */

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [relation, setRelation] = useState("")
  const [birthDate, setBirthDate] = useState("")

  /* =========================
      FETCH
  ========================= */

  async function fetchDependents() {
    try {
      setLoading(true)

      const res = await fetch("/api/dependents")

      if (!res.ok) {
        throw new Error("Erreur")
      }

      const data = await res.json()

      setDependents(data)
    } catch (error) {
      toast.error("Impossible de charger les ayants droits")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDependents()
  }, [])

  /* =========================
      FILTERED
  ========================= */

  const filteredDependents = useMemo(() => {
    return dependents.filter((item) => {
      const fullName =
        `${item.firstName} ${item.lastName}`.toLowerCase()

      const matchSearch = fullName.includes(search.toLowerCase())

      const matchStatus =
        statusFilter === "ALL"
          ? true
          : item.status === statusFilter

      return matchSearch && matchStatus
    })
  }, [dependents, search, statusFilter])

  /* =========================
      STATS
  ========================= */

  const stats = useMemo(() => {
    return {
      total: dependents.length,

      pending: dependents.filter(
        (d) => d.status === "PENDING"
      ).length,

      approved: dependents.filter(
        (d) => d.status === "APPROVED"
      ).length,

      rejected: dependents.filter(
        (d) => d.status === "REJECTED"
      ).length,
    }
  }, [dependents])

  /* =========================
      CREATE
  ========================= */

  async function createDependent() {
    try {
      if (
        !firstName ||
        !lastName ||
        !relation ||
        !birthDate
      ) {
        toast.error("Tous les champs sont obligatoires")
        return
      }

      if (dependents.length >= MAX_DEPENDENTS) {
        toast.error("Limite de 5 ayants droits atteinte")
        return
      }

      setCreating(true)

      const payload = {
        firstName,
        lastName,
        relation,
        birthDate,
      }

      const res = await fetch("/api/dependents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data?.error || "Erreur")
        return
      }

      toast.success("Ayant droit ajouté")

      setFirstName("")
      setLastName("")
      setRelation("")
      setBirthDate("")

      setOpenAdd(false)

      fetchDependents()
    } catch (error) {
      toast.error("Erreur serveur")
    } finally {
      setCreating(false)
    }
  }

  /* =========================
      DELETE
  ========================= */

  async function deleteDependent() {
    try {
      if (!deleteId) return

      setDeleting(true)

      const res = await fetch(
        `/api/dependents/${deleteId}`,
        {
          method: "DELETE",
        }
      )

      if (!res.ok) {
        throw new Error("Erreur")
      }

      toast.success("Ayant droit supprimé")

      setDeleteId(null)

      fetchDependents()
    } catch (error) {
      toast.error("Suppression impossible")
    } finally {
      setDeleting(false)
    }
  }

  /* =========================
      BADGE
  ========================= */

  function renderStatus(status: DependentStatus) {
    if (status === "APPROVED") {
      return (
        <Badge className="bg-green-600 hover:bg-green-600">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Validé
        </Badge>
      )
    }

    if (status === "REJECTED") {
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Refusé
        </Badge>
      )
    }

    return (
      <Badge
        variant="secondary"
        className="bg-yellow-100 text-yellow-800"
      >
        <Clock3 className="w-3 h-3 mr-1" />
        En attente
      </Badge>
    )
  }

  /* =========================
      TIMELINE
  ========================= */

  function Timeline({
    status,
  }: {
    status: DependentStatus
  }) {
    const steps = [
      {
        title: "Création",
        icon: Clock3,
        done: true,
      },
      {
        title: "Validation",
        icon: CheckCircle2,
        done: status === "APPROVED",
      },
      {
        title: "Refus",
        icon: XCircle,
        done: status === "REJECTED",
      },
    ]

    return (
      <div className="flex justify-between relative mt-2">
        {steps.map((step, index) => {
          const Icon = step.icon

          return (
            <div
              key={step.title}
              className="flex-1 flex flex-col items-center relative"
            >
              {index !== 0 && (
                <div
                  className={`absolute top-5 left-[-50%] w-full h-[2px]
                  ${
                    step.done
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}

              <div
                className={`w-11 h-11 rounded-full border flex items-center justify-center z-10
                ${
                  step.done
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-400 border-gray-200"
                }`}
              >
                <Icon size={18} />
              </div>

              <span className="text-xs mt-2 font-medium">
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6 space-y-6">

      {/* =========================
            HERO
      ========================= */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-0 bg-black text-white overflow-hidden relative">
          <CardContent className="p-8">

            <div className="absolute right-0 top-0 opacity-10">
              <Users size={250} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-6 h-6" />

                  <span className="uppercase text-xs tracking-[0.3em] opacity-70">
                    Espace membre
                  </span>
                </div>

                <h1 className="text-3xl font-bold">
                  Gestion des Bénéficiaires
                </h1>

                <p className="text-sm text-white/70 max-w-2xl">
                  Ajoutez et gérez les personnes
                  rattachées à votre profil membre.
                  Chaque demande est analysée et
                  validée par l’administration de
                  l’organisation.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">

                  <Badge className="bg-white/10 text-white border border-white/10">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Sécurisé
                  </Badge>

                  <Badge className="bg-white/10 text-white border border-white/10">
                    Maximum {MAX_DEPENDENTS} ayants
                    droits
                  </Badge>

                  <Badge className="bg-white/10 text-white border border-white/10">
                    Validation administrative
                  </Badge>

                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full lg:w-[380px]">

                <Card className="bg-white/5 border-white/10 text-white">
                  <CardContent className="p-4">
                    <p className="text-xs opacity-70">
                      Total
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                      {stats.total}
                    </h2>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-500/10 border-yellow-500/20 text-white">
                  <CardContent className="p-4">
                    <p className="text-xs opacity-70">
                      En attente
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                      {stats.pending}
                    </h2>
                  </CardContent>
                </Card>

                <Card className="bg-green-500/10 border-green-500/20 text-white">
                  <CardContent className="p-4">
                    <p className="text-xs opacity-70">
                      Validés
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                      {stats.approved}
                    </h2>
                  </CardContent>
                </Card>

                <Card className="bg-red-500/10 border-red-500/20 text-white">
                  <CardContent className="p-4">
                    <p className="text-xs opacity-70">
                      Refusés
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                      {stats.rejected}
                    </h2>
                  </CardContent>
                </Card>

              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* =========================
            ACTIONS
      ========================= */}

      <Card>
        <CardContent className="p-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          <div className="flex gap-3 flex-1">

            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

              <Input
                className="pl-10"
                placeholder="Rechercher un ayant droit..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrer" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">
                  Tous
                </SelectItem>

                <SelectItem value="PENDING">
                  En attente
                </SelectItem>

                <SelectItem value="APPROVED">
                  Validés
                </SelectItem>

                <SelectItem value="REJECTED">
                  Refusés
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">

            <Button
              variant="outline"
              onClick={fetchDependents}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>

            <Button onClick={() => setOpenAdd(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>

          </div>
        </CardContent>
      </Card>

      {/* =========================
            TABLE
      ========================= */}

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            Liste des Ayants Droits
          </CardTitle>

          <CardDescription>
            Historique complet des personnes
            rattachées à votre espace membre
          </CardDescription>
        </CardHeader>

        <CardContent>

          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : filteredDependents.length === 0 ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center">

              <AlertTriangle className="w-10 h-10 text-muted-foreground mb-4" />

              <h3 className="font-semibold text-lg">
                Aucun ayant droit
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Aucun résultat trouvé pour votre
                recherche.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <Table>

                <TableHeader>
                  <TableRow>

                    <TableHead>
                      Personne
                    </TableHead>

                    <TableHead>
                      Date naissance
                    </TableHead>

                    <TableHead>
                      Statut
                    </TableHead>

                    <TableHead>
                      Créé le
                    </TableHead>

                    <TableHead className="text-right">
                      Actions
                    </TableHead>

                  </TableRow>
                </TableHeader>

                <TableBody>

                  <AnimatePresence>

                    {filteredDependents.map((dep) => (
                      <motion.tr
                        key={dep.id}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="border-b"
                      >

                        <TableCell>

                          <div className="flex items-center gap-3">

                            <Avatar className="h-11 w-11">
                              <AvatarImage src="/placeholder.svg" />

                              <AvatarFallback>
                                {dep.firstName[0]}
                                {dep.lastName[0]}
                              </AvatarFallback>
                            </Avatar>

                            <div>

                              <p className="font-medium">
                                {dep.firstName}{" "}
                                {dep.lastName}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                ID: {dep.id}
                              </p>

                            </div>
                          </div>

                        </TableCell>

                        <TableCell>
                          {new Date(
                            dep.birthDate
                          ).toLocaleDateString(
                            "fr-FR"
                          )}
                        </TableCell>

                        <TableCell>
                          {renderStatus(dep.status)}
                        </TableCell>

                        <TableCell>
                          {new Date(
                            dep.createdAt
                          ).toLocaleDateString(
                            "fr-FR"
                          )}
                        </TableCell>

                        <TableCell>

                          <div className="flex justify-end gap-2">

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setSelected(dep)
                              }
                            >
                              <Eye className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() =>
                                setDeleteId(dep.id)
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>

                          </div>

                        </TableCell>

                      </motion.tr>
                    ))}

                  </AnimatePresence>

                </TableBody>

              </Table>

            </div>
          )}

        </CardContent>
      </Card>

      {/* =========================
            ADD DIALOG
      ========================= */}

      <Dialog
        open={openAdd}
        onOpenChange={setOpenAdd}
      >
        <DialogContent className="sm:max-w-[650px]">

          <DialogHeader>

            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Ajouter un Ayant Droit
            </DialogTitle>

            <DialogDescription>
              Toutes les demandes sont soumises à
              validation administrative.
            </DialogDescription>

          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Prénom
              </label>

              <Input
                placeholder="Ex: Junior"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Nom
              </label>

              <Input
                placeholder="Ex: Kouassi"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Relation
              </label>

              <Select
                value={relation}
                onValueChange={setRelation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une relation" />
                </SelectTrigger>

                <SelectContent>

                  {RELATIONS.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Date naissance
              </label>

              <Input
                type="date"
                value={birthDate}
                onChange={(e) =>
                  setBirthDate(e.target.value)
                }
              />
            </div>

          </div>

          <div className="rounded-xl border bg-muted/40 p-4 mt-5">

            <div className="flex items-start gap-3">

              <BadgeCheck className="w-5 h-5 mt-0.5 text-green-600" />

              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Vérification administrative
                </p>

                <p className="text-xs text-muted-foreground">
                  Après ajout, le statut sera placé
                  automatiquement en attente de
                  validation.
                </p>
              </div>

            </div>

          </div>

          <div className="flex justify-end gap-3 mt-6">

            <Button
              variant="outline"
              onClick={() => setOpenAdd(false)}
            >
              Annuler
            </Button>

            <Button
              onClick={createDependent}
              disabled={creating}
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </>
              )}
            </Button>

          </div>

        </DialogContent>
      </Dialog>

      {/* =========================
            DETAILS
      ========================= */}

      <Dialog
        open={!!selected}
        onOpenChange={() => setSelected(null)}
      >
        <DialogContent className="sm:max-w-[700px]">

          {selected && (
            <>
              <DialogHeader>

                <DialogTitle>
                  Fiche Ayant Droit
                </DialogTitle>

                <DialogDescription>
                  Détails complets du profil
                </DialogDescription>

              </DialogHeader>

              <div className="space-y-6 mt-4">

                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

                  <Avatar className="h-28 w-28 border-4 border-muted">
                    <AvatarImage src="/placeholder.svg" />

                    <AvatarFallback className="text-2xl">
                      {selected.firstName[0]}
                      {selected.lastName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {selected.firstName}{" "}
                        {selected.lastName}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        Identifiant: {selected.id}
                      </p>

                    </div>

                    {renderStatus(selected.status)}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">

                      <div className="border rounded-xl p-4">
                        <p className="text-xs text-muted-foreground">
                          Date naissance
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Cake className="w-4 h-4" />

                          <span className="font-medium">
                            {new Date(
                              selected.birthDate
                            ).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="border rounded-xl p-4">
                        <p className="text-xs text-muted-foreground">
                          Date création
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4" />

                          <span className="font-medium">
                            {new Date(
                              selected.createdAt
                            ).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                <Timeline status={selected.status} />

                {selected.member && (
                  <Card className="border-dashed">

                    <CardHeader>
                      <CardTitle className="text-base">
                        Membre rattaché
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div className="flex items-center gap-3 border rounded-xl p-4">
                        <Mail className="w-4 h-4" />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Email
                          </p>

                          <p className="font-medium text-sm">
                            {selected.member.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 border rounded-xl p-4">
                        <Phone className="w-4 h-4" />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Téléphone
                          </p>

                          <p className="font-medium text-sm">
                            {selected.member.phone ||
                              "Non défini"}
                          </p>
                        </div>
                      </div>

                    </CardContent>

                  </Card>
                )}

              </div>
            </>
          )}

        </DialogContent>
      </Dialog>

      {/* =========================
            DELETE
      ========================= */}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>
              Supprimer cet ayant droit ?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Cette action est irréversible.
              Toutes les données liées seront
              supprimées définitivement.
            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>
              Annuler
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={deleteDependent}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Suppression...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </>
              )}
            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}