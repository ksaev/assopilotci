"use client"

import { useMemo, useState } from "react"
import {
  Download,
  Edit,
  Save,
  X,
  PlusCircle,
  CalendarDays,
  HeartHandshake,
  Baby,
  Church,
  Wallet,
  History,
  Eye,
  Trash2,
  FileSpreadsheet,
  Settings2,
} from "lucide-react"

import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Config = {
  year: number
  daily: number
  monthly: number
  yearly: number
}

type Contribution = {
  id: number
  nom: string
  type: string
  montant: number
  year: number
  date: string
  statut: string
  commentaire?: string
}

type CotisationHistory = {
  id: number
  nom: string
  type: string
  montant: number
  date: string
  year: number
}

export default function SolidariteCotisationsPage() {
  /* =
      CONFIGURATION
  = */

  const [configs, setConfigs] = useState<Config[]>([
    {
      year: 2025,
      daily: 300,
      monthly: 4000,
      yearly: 45000,
    },
    {
      year: 2026,
      daily: 500,
      monthly: 5000,
      yearly: 50000,
    },
  ])

  const [activeYear, setActiveYear] = useState(2026)

  const [editConfig, setEditConfig] =
    useState<Config | null>(null)

  /* =
      MODALS
  = */

  const [openContribution, setOpenContribution] =
    useState(false)

  const [details, setDetails] =
    useState<Contribution | null>(null)

  const [showHistory, setShowHistory] =
    useState(false)

  /* =
      SOLIDARITÉ
  = */

  const [contributions, setContributions] =
    useState<Contribution[]>([
      {
        id: 1,
        nom: "Kouassi Jean",
        type: "Décès",
        montant: 150000,
        year: 2026,
        date: "01-05-2026",
        statut: "Validé",
      },

      {
        id: 2,
        nom: "Yao Mireille",
        type: "Naissance",
        montant: 50000,
        year: 2026,
        date: "05-05-2026",
        statut: "En attente",
      },

      {
        id: 3,
        nom: "Aka Serge",
        type: "Mariage / Dot",
        montant: 100000,
        year: 2025,
        date: "15-11-2025",
        statut: "Validé",
      },
    ])

  /* =
      HISTORIQUE COTISATIONS
  = */

  const [cotisationHistory] = useState<
    CotisationHistory[]
  >([
    {
      id: 1,
      nom: "Kouassi Jean",
      type: "Mensuelle",
      montant: 5000,
      date: "02-05-2026",
      year: 2026,
    },

    {
      id: 2,
      nom: "Yao Mireille",
      type: "Annuelle",
      montant: 50000,
      date: "10-01-2026",
      year: 2026,
    },

    {
      id: 3,
      nom: "Aka Serge",
      type: "Journalière",
      montant: 500,
      date: "04-05-2026",
      year: 2026,
    },
  ])

  /* =
      FORM
  = */

  const [form, setForm] = useState({
    nom: "",
    type: "Décès",
    montant: 0,
    commentaire: "",
    date: "",
  })

  /* =
      ACTIVE CONFIG
  = */

  const activeConfig = configs.find(
    (c) => c.year === activeYear
  )!

  /* =
      FILTERS
  = */

  const filteredContributions = useMemo(() => {
    return contributions.filter(
      (c) => c.year === activeYear
    )
  }, [contributions, activeYear])

  const filteredHistory = useMemo(() => {
    return cotisationHistory.filter(
      (c) => c.year === activeYear
    )
  }, [cotisationHistory, activeYear])

  /* =
      STATS
  = */

  const totalSolidarity =
    filteredContributions.reduce(
      (acc, item) => acc + item.montant,
      0
    )

  const validated =
    filteredContributions.filter(
      (c) => c.statut === "Validé"
    ).length

  /* =
      EXPORTS
  = */

  const exportSolidarity = (
    mode: "year" | "all"
  ) => {
    const wb = XLSX.utils.book_new()

    const data =
      mode === "all"
        ? contributions
        : filteredContributions

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(data),
      "Solidarite"
    )

    const buffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    })

    saveAs(
      new Blob([buffer], {
        type: "application/octet-stream",
      }),
      `solidarite_${mode}.xlsx`
    )
  }

  const exportCotisationsHistory = () => {
    const wb = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(filteredHistory),
      "Historique Cotisations"
    )

    const buffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    })

    saveAs(
      new Blob([buffer], {
        type: "application/octet-stream",
      }),
      `historique_cotisations_${activeYear}.xlsx`
    )
  }

  /* =
      SAVE CONFIG
  = */

  const saveConfig = () => {
    if (!editConfig) return

    setConfigs((prev) =>
      prev.map((c) =>
        c.year === editConfig.year
          ? editConfig
          : c
      )
    )

    setEditConfig(null)
  }

  /* =
      ADD CONTRIBUTION
  = */

  const handleAddContribution = () => {
    const newItem: Contribution = {
      id: Date.now(),
      nom: form.nom,
      type: form.type,
      montant: form.montant,
      commentaire: form.commentaire,
      date: form.date,
      statut: "En attente",
      year: activeYear,
    }

    setContributions((prev) => [
      newItem,
      ...prev,
    ])

    setForm({
      nom: "",
      type: "Décès",
      montant: 0,
      commentaire: "",
      date: "",
    })

    setOpenContribution(false)
  }

  /* =
      DELETE
  = */

  const deleteContribution = (id: number) => {
    setContributions((prev) =>
      prev.filter((c) => c.id !== id)
    )
  }

  return (
    <div className="space-y-6">

      {/* =
          HEADER
      = */}

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Solidarité & Cotisations
          </h1>

          <p className="text-muted-foreground text-sm mt-1">
            Gestion des cotisations, aides
            sociales, décès, naissance,
            mariage et historique des
            contributions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <Select
            value={String(activeYear)}
            onValueChange={(v) =>
              setActiveYear(Number(v))
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {configs.map((c) => (
                <SelectItem
                  key={c.year}
                  value={String(c.year)}
                >
                  {c.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() =>
              exportSolidarity("year")
            }
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export année
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              exportSolidarity("all")
            }
          >
            Export global
          </Button>

        </div>
      </div>

      {/* =
          STATS
      = */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10">
              <Wallet className="text-emerald-500" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Solidarité
              </p>

              <h3 className="text-2xl font-bold">
                {totalSolidarity.toLocaleString()} FCFA
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10">
              <CalendarDays className="text-blue-500" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Événements
              </p>

              <h3 className="text-2xl font-bold">
                {filteredContributions.length}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-orange-500/10">
              <History className="text-orange-500" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Validés
              </p>

              <h3 className="text-2xl font-bold">
                {validated}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-pink-500/10">
              <HeartHandshake className="text-pink-500" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Cotisation annuelle
              </p>

              <h3 className="text-2xl font-bold">
                {activeConfig.yearly.toLocaleString()} FCFA
              </h3>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* =
          CONFIGURATION
      = */}

      <Card>

        <CardHeader className="flex flex-row items-center justify-between">

          <CardTitle>
            Configuration {activeYear}
          </CardTitle>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setEditConfig(activeConfig)
            }
          >
            <Settings2 className="w-4 h-4 mr-2" />
            Modifier
          </Button>

        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">
              Journalier
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {activeConfig.daily.toLocaleString()} FCFA
            </h3>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">
              Mensuel
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {activeConfig.monthly.toLocaleString()} FCFA
            </h3>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-muted-foreground">
              Annuel
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {activeConfig.yearly.toLocaleString()} FCFA
            </h3>
          </div>

        </CardContent>

      </Card>

      {/* =
          HISTORIQUE COTISATIONS
      = */}

      <Card>

        <CardHeader className="flex flex-row items-center justify-between">

          <div>
            <CardTitle>
              Historique des Cotisations
            </CardTitle>

            <p className="text-sm text-muted-foreground mt-1">
              Journalières, mensuelles et
              annuelles
            </p>
          </div>

          <div className="flex gap-2">

            <Button
              variant="outline"
              onClick={() =>
                setShowHistory(!showHistory)
              }
            >
              <Eye className="w-4 h-4 mr-2" />
              {showHistory
                ? "Masquer"
                : "Voir"}
            </Button>

            <Button
              onClick={
                exportCotisationsHistory
              }
              className="gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export Excel
            </Button>

          </div>

        </CardHeader>

        {showHistory && (

          <CardContent className="overflow-auto">

            <table className="w-full text-sm">

              <thead className="border-b text-muted-foreground">
                <tr>
                  <th className="text-left py-3">
                    Membre
                  </th>

                  <th className="text-left">
                    Type
                  </th>

                  <th className="text-left">
                    Montant
                  </th>

                  <th className="text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b"
                  >
                    <td className="py-4">
                      {item.nom}
                    </td>

                    <td>{item.type}</td>

                    <td>
                      {item.montant.toLocaleString()} FCFA
                    </td>

                    <td>{item.date}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          </CardContent>

        )}

      </Card>

      {/* =
          CONTRIBUTIONS
      = */}

      <Card>

        <CardHeader className="flex flex-row items-center justify-between">

          <CardTitle>
            Contributions de Solidarité
          </CardTitle>

          <Dialog
            open={openContribution}
            onOpenChange={setOpenContribution}
          >

            <DialogTrigger asChild>

              <Button className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Déclarer
              </Button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">

              <DialogHeader>

                <DialogTitle>
                  Nouvelle déclaration
                </DialogTitle>

                <DialogDescription>
                  Déclarez un décès,
                  naissance, mariage ou dot.
                </DialogDescription>

              </DialogHeader>

              <div className="space-y-4 mt-4">

                <div className="space-y-2">
                  <Label>Nom</Label>

                  <Input
                    placeholder="Nom du membre"
                    value={form.nom}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nom: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Type</Label>

                  <Select
                    value={form.type}
                    onValueChange={(v) =>
                      setForm({
                        ...form,
                        type: v,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="Décès">
                        Décès
                      </SelectItem>

                      <SelectItem value="Naissance">
                        Naissance
                      </SelectItem>

                      <SelectItem value="Mariage / Dot">
                        Mariage / Dot
                      </SelectItem>

                    </SelectContent>

                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Montant</Label>

                  <Input
                    type="number"
                    value={form.montant}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        montant:
                          Number(
                            e.target.value
                          ),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Délai</Label>

                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Commentaire</Label>

                  <textarea
                    className="min-h-[100px] w-full rounded-lg border bg-background p-3 text-sm"
                    placeholder="Commentaire..."
                    value={form.commentaire}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        commentaire:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <AlertDialog>

                  <AlertDialogTrigger asChild>

                    <Button className="w-full">
                      Enregistrer
                    </Button>

                  </AlertDialogTrigger>

                  <AlertDialogContent>

                    <AlertDialogHeader>

                      <AlertDialogTitle>
                        Confirmer
                      </AlertDialogTitle>

                      <AlertDialogDescription>
                        Cette contribution sera
                        ajoutée à l'historique.
                      </AlertDialogDescription>

                    </AlertDialogHeader>

                    <AlertDialogFooter>

                      <AlertDialogCancel>
                        Annuler
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={
                          handleAddContribution
                        }
                      >
                        Confirmer
                      </AlertDialogAction>

                    </AlertDialogFooter>

                  </AlertDialogContent>

                </AlertDialog>

              </div>

            </DialogContent>

          </Dialog>

        </CardHeader>

        <CardContent className="overflow-auto">

          <table className="w-full text-sm">

            <thead className="border-b text-muted-foreground">
              <tr>
                <th className="text-left py-3">
                  Membre
                </th>

                <th className="text-left">
                  Type
                </th>

                <th className="text-left">
                  Montant
                </th>

                <th className="text-left">
                  Date
                </th>

                <th className="text-left">
                  Statut
                </th>

                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredContributions.map(
                (item) => (
                  <tr
                    key={item.id}
                    className="border-b"
                  >
                    <td className="py-4">
                      {item.nom}
                    </td>

                    <td>

                      <div className="flex items-center gap-2">

                        {item.type ===
                          "Décès" && (
                          <HeartHandshake className="w-4 h-4 text-red-500" />
                        )}

                        {item.type ===
                          "Naissance" && (
                          <Baby className="w-4 h-4 text-blue-500" />
                        )}

                        {item.type ===
                          "Mariage / Dot" && (
                          <Church className="w-4 h-4 text-pink-500" />
                        )}

                        {item.type}

                      </div>

                    </td>

                    <td>
                      {item.montant.toLocaleString()} FCFA
                    </td>

                    <td>{item.date}</td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          item.statut ===
                          "Validé"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        {item.statut}
                      </span>

                    </td>

                    <td>

                      <div className="flex justify-end gap-2">

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            setDetails(item)
                          }
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            deleteContribution(
                              item.id
                            )
                          }
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>

                      </div>

                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </CardContent>

      </Card>

      {/* =
          DETAILS MODAL
      = */}

      {details && (

        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

          <div className="w-full max-w-lg rounded-2xl border bg-background p-6">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-semibold">
                Détails contribution
              </h2>

              <button
                onClick={() =>
                  setDetails(null)
                }
              >
                <X />
              </button>

            </div>

            <div className="space-y-4 text-sm">

              <div>
                <p className="text-muted-foreground">
                  Nom
                </p>

                <h3 className="font-medium">
                  {details.nom}
                </h3>
              </div>

              <div>
                <p className="text-muted-foreground">
                  Type
                </p>

                <h3 className="font-medium">
                  {details.type}
                </h3>
              </div>

              <div>
                <p className="text-muted-foreground">
                  Montant
                </p>

                <h3 className="font-medium">
                  {details.montant.toLocaleString()} FCFA
                </h3>
              </div>

              <div>
                <p className="text-muted-foreground">
                  Date
                </p>

                <h3 className="font-medium">
                  {details.date}
                </h3>
              </div>

              <div>
                <p className="text-muted-foreground">
                  Commentaire
                </p>

                <h3 className="font-medium">
                  {details.commentaire ||
                    "Aucun commentaire"}
                </h3>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =
          EDIT CONFIG MODAL
      = */}

      {editConfig && (

        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

          <div className="w-full max-w-md rounded-2xl border bg-background p-6">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-semibold">
                Modifier configuration
              </h2>

              <button
                onClick={() =>
                  setEditConfig(null)
                }
              >
                <X />
              </button>

            </div>

            <div className="space-y-4">

              <div className="space-y-2">
                <Label>Journalier</Label>

                <Input
                  type="number"
                  value={editConfig.daily}
                  onChange={(e) =>
                    setEditConfig({
                      ...editConfig,
                      daily:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Mensuel</Label>

                <Input
                  type="number"
                  value={editConfig.monthly}
                  onChange={(e) =>
                    setEditConfig({
                      ...editConfig,
                      monthly:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Annuel</Label>

                <Input
                  type="number"
                  value={editConfig.yearly}
                  onChange={(e) =>
                    setEditConfig({
                      ...editConfig,
                      yearly:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                />
              </div>

              <Button
                onClick={saveConfig}
                className="w-full gap-2"
              >
                <Save className="w-4 h-4" />
                Sauvegarder
              </Button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}