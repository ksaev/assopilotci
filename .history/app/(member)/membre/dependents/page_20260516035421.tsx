"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { toast } from "sonner"

import { mockDependents, Dependent } from "@/lib/mock-dependents"
import { relations } from "@/lib/relations"
import { validateFileSize } from "@/components/file-size"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import {
Card,
CardContent,
CardHeader,
CardTitle
} from "@/components/ui/card"

import {
Avatar,
AvatarImage,
AvatarFallback
} from "@/components/ui/avatar"

import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog"

import {
AlertDialog,
AlertDialogContent,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogCancel,
AlertDialogAction
} from "@/components/ui/alert-dialog"

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select"

import { Plus, Trash2, Eye, CheckCircle2, Clock, XCircle } from "lucide-react"

const MAX_DEPENDENTS = 5

type Status = "pending" | "approved" | "rejected"

function ValidationTimeline({ status }: { status: Status }) {

const steps = [
{ label: "Demande envoyée", icon: Clock, completed: true },
{ label: "Validation", icon: CheckCircle2, completed: status === "approved" },
{ label: "Refus", icon: XCircle, completed: status === "rejected" }
]

return (

<div className="flex items-center justify-between mt-6">

{steps.map((step,index)=>{

const Icon = step.icon
const isCompleted = step.completed
const isRejected = status === "rejected" && step.label === "Refus"

return(

<div key={step.label} className="flex-1 flex flex-col items-center relative">

{index !== 0 && (
<div
className={`absolute left-0 top-5 w-full h-[2px] -z-10
${isCompleted ? "bg-green-500" : "bg-gray-200"}`}
></div>
)}

<div
className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all

${isRejected
? "bg-red-500 border-red-500 text-white"
: isCompleted
? "bg-green-500 border-green-500 text-white"
: "bg-white border-gray-300 text-gray-400"
}
`}
>

<Icon size={20} />

</div>

<span
className={`mt-2 text-sm font-medium
${isRejected
? "text-red-600"
: isCompleted
? "text-green-600"
: "text-gray-400"
}`}
>

{step.label}

</span>

</div>

)

})}

</div>

)

}

export default function DependentsPage(){

const [dependents,setDependents] = useState<Dependent[]>(mockDependents)

const [search,setSearch] = useState("")

const [open,setOpen] = useState(false)
const [deleteId,setDeleteId] = useState<string | null>(null)
const [selected,setSelected] = useState<Dependent | null>(null)

const [name,setName] = useState("")
const [relation,setRelation] = useState("")
const [birthDate,setBirthDate] = useState("")
const [photo,setPhoto] = useState<File | null>(null)

function addDependent(){

if(!name || !relation || !birthDate){
toast.error("Veuillez remplir tous les champs")
return
}

if(dependents.length >= MAX_DEPENDENTS){
toast.error("Maximum 5 ayants droits")
return
}

const newDependent: Dependent = {

id: crypto.randomUUID(),
name,
relation,
birthDate,
photo: photo ? URL.createObjectURL(photo) : "/placeholder.svg",
status: "pending",
createdAt: new Date().toISOString()

}

setDependents(prev => [newDependent,...prev])

toast.success("Ayant droit ajouté")

setName("")
setRelation("")
setBirthDate("")
setPhoto(null)

setOpen(false)

}

function confirmDelete(){

if(!deleteId) return

setDependents(prev => prev.filter(d => d.id !== deleteId))

toast.success("Ayant droit supprimé")

setDeleteId(null)

}

function statusBadge(status:string){

if(status==="approved")
return <Badge className="bg-green-500">Validé</Badge>

if(status==="pending")
return <Badge variant="secondary">En attente</Badge>

return <Badge variant="destructive">Refusé</Badge>

}

const filtered = dependents.filter(d =>
d.name.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="p-6 space-y-6">

<Card>

<CardHeader>

<div className="flex justify-between items-center">

<CardTitle>
Mes Ayants Droits
</CardTitle>

<div className="flex gap-3">

<Input
placeholder="Rechercher..."
className="w-60"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<Button onClick={()=>setOpen(true)}>
<Plus className="w-4 h-4 mr-2"/>
Ajouter
</Button>

</div>

</div>

</CardHeader>

<CardContent>

<div className="overflow-x-auto">

<table className="w-full text-sm">

<thead className="border-b text-muted-foreground">

<tr>

<th className="py-3">Personne</th>
<th>Relation</th>
<th>Date naissance</th>
<th>Statut</th>
<th className="text-right">Actions</th>

</tr>

</thead>

<tbody>

{filtered.map(dep => (

<motion.tr
key={dep.id}
initial={{opacity:0}}
animate={{opacity:1}}
className="border-b"
>

<td className="py-3 flex items-center gap-3">

<Avatar>

<AvatarImage src={dep.photo}/>

<AvatarFallback>
{dep.name[0]}
</AvatarFallback>

</Avatar>

<div>

<p className="font-medium">
{dep.name}
</p>

<p className="text-xs text-muted-foreground">
Ajouté {new Date(dep.createdAt).toLocaleDateString("fr-FR")}
</p>

</div>

</td>

<td>{dep.relation}</td>

<td>
{new Date(dep.birthDate).toLocaleDateString("fr-FR")}
</td>

<td>
{statusBadge(dep.status)}
</td>

<td className="flex justify-end gap-2">

<Button
size="icon"
variant="ghost"
onClick={()=>setSelected(dep)}
>

<Eye className="w-4 h-4"/>

</Button>

<Button
size="icon"
variant="destructive"
onClick={()=>setDeleteId(dep.id)}
>

<Trash2 className="w-4 h-4"/>

</Button>

</td>

</motion.tr>

))}

</tbody>

</table>

</div>

</CardContent>

</Card>

{/* Modal ajout */}

<Dialog open={open} onOpenChange={setOpen}>

<DialogContent>

<DialogHeader>
<DialogTitle>
Ajouter un ayant droit
</DialogTitle>
</DialogHeader>

<div className="space-y-4">

<Input
placeholder="Nom complet"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<Select onValueChange={setRelation}>

<SelectTrigger>
<SelectValue placeholder="Relation"/>
</SelectTrigger>

<SelectContent>

{relations.map(r => (
<SelectItem key={r} value={r}>
{r}
</SelectItem>
))}

</SelectContent>

</Select>

<Input
type="date"
value={birthDate}
onChange={(e)=>setBirthDate(e.target.value)}
/>

<Input
type="file"
onChange={(e)=>{

const file = e.target.files?.[0]

if(file && validateFileSize(file)){
setPhoto(file)
}

}}
/>

<Button
className="w-full"
onClick={addDependent}
>

Ajouter

</Button>

</div>

</DialogContent>

</Dialog>

{/* fiche détail */}

<Dialog open={!!selected} onOpenChange={()=>setSelected(null)}>

<DialogContent>

<DialogHeader>
<DialogTitle>
Fiche Ayant Droit
</DialogTitle>
</DialogHeader>

{selected && (

<div className="space-y-6">

<div className="flex flex-col items-center gap-3">

<Avatar className="h-24 w-24">

<AvatarImage src={selected.photo}/>

<AvatarFallback>
{selected.name[0]}
</AvatarFallback>

</Avatar>

<h3 className="text-lg font-semibold">
{selected.name}
</h3>

{statusBadge(selected.status)}

</div>

<ValidationTimeline status={selected.status as Status} />

<div className="grid grid-cols-2 gap-4 text-sm">

<div>
<p className="text-muted-foreground">Relation</p>
<p className="font-medium">{selected.relation}</p>
</div>

<div>
<p className="text-muted-foreground">Date naissance</p>
<p className="font-medium">
{new Date(selected.birthDate).toLocaleDateString("fr-FR")}
</p>
</div>

<div>
<p className="text-muted-foreground">Ajouté le</p>
<p className="font-medium">
{new Date(selected.createdAt).toLocaleDateString("fr-FR")}
</p>
</div>

</div>

</div>

)}

</DialogContent>

</Dialog>

{/* suppression */}

<AlertDialog open={!!deleteId} onOpenChange={()=>setDeleteId(null)}>

<AlertDialogContent>

<AlertDialogHeader>

<AlertDialogTitle>
Confirmer la suppression
</AlertDialogTitle>

<AlertDialogDescription>
Cette action est irréversible.
</AlertDialogDescription>

</AlertDialogHeader>

<AlertDialogFooter>

<AlertDialogCancel>
Annuler
</AlertDialogCancel>

<AlertDialogAction onClick={confirmDelete}>
Supprimer
</AlertDialogAction>

</AlertDialogFooter>

</AlertDialogContent>

</AlertDialog>

</div>

)


import { Plus, Users, Eye } from "lucide-react"

/* ====
   TYPES
==== */

type Dependent = {
  id: string
  fullName: string
  relation: string
  birthDate: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

/* ====
   MOCK DATA
==== */

const initialDependents: Dependent[] = [
  {
    id: "DEP-2026-001",
    fullName: "Kouassi Junior",
    relation: "Enfant",
    birthDate: "2015-02-10",
    status: "pending",
    createdAt: "2026-05-01"
  },
  {
    id: "DEP-2026-002",
    fullName: "Kouassi Sarah",
    relation: "Enfant",
    birthDate: "2012-06-20",
    status: "approved",
    createdAt: "2026-04-10"
  }
]

/* ====
   STATUS BADGE
==== */

function StatusBadge({ status }: { status: Dependent["status"] }) {
  const map = {
    pending: "bg-yellow-500",
    approved: "bg-green-600",
    rejected: "bg-red-600"
  }

  const label = {
    pending: "En attente",
    approved: "Validé",
    rejected: "Refusé"
  }

  return (
    <span className={`text-white text-xs px-2 py-1 rounded ${map[status]}`}>
      {label[status]}
    </span>
  )
}

/* ====
   MODAL DETAILS
==== */

function Modal({
  open,
  data,
  onClose
}: {
  open: boolean
  data: Dependent | null
  onClose: () => void
}) {
  if (!open || !data) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-5">

        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold text-lg">Détails dépendant</h2>
            <p className="text-xs text-gray-500">ID: {data.id}</p>
          </div>

          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="space-y-3 text-sm">

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Nom complet</p>
            <p className="font-semibold">{data.fullName}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Relation</p>
              <p>{data.relation}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Statut</p>
              <StatusBadge status={data.status} />
            </div>

          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Date naissance</p>
            <p>{data.birthDate}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Ajouté le</p>
            <p>{data.createdAt}</p>
          </div>

        </div>

      </div>
    </div>
  )
}

/* ====
   MAIN PAGE
==== */

export default function DependentsPage() {
  const [dependents, setDependents] = useState<Dependent[]>(initialDependents)

  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<Dependent | null>(null)

  /* FORM */
  const [fullName, setFullName] = useState("")
  const [relation, setRelation] = useState("")
  const [birthDate, setBirthDate] = useState("")

  function generateId() {
    return `DEP-${Date.now()}`
  }

  function addDependent() {
    if (!fullName || !relation || !birthDate) return

    const newDep: Dependent = {
      id: generateId(),
      fullName,
      relation,
      birthDate,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0]
    }

    setDependents([newDep, ...dependents])

    setFullName("")
    setRelation("")
    setBirthDate("")
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-black text-white p-6 rounded-2xl flex justify-between items-center">

        <div>
          <h1 className="text-xl font-bold">Mes personnes à charge</h1>
          <p className="text-xs opacity-60">
            Gestion des dépendants
          </p>
        </div>

        <Users />
      </div>

      {/* FORM ADD */}
      <div className="bg-white p-6 rounded-2xl space-y-3">

        <h2 className="font-semibold">Ajouter une personne à charge</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Nom complet"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Relation (Enfant, Conjoint...)"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <button
          onClick={addDependent}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Ajouter (statut en attente)
        </button>

        <p className="text-xs text-gray-500">
          Validation effectuée par l’administration
        </p>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {dependents.map(dep => (
          <div
            key={dep.id}
            className="bg-white p-4 rounded-xl flex justify-between items-center cursor-pointer hover:shadow"
            onClick={() => {
              setSelected(dep)
              setOpenModal(true)
            }}
          >

            <div>
              <p className="font-semibold">{dep.fullName}</p>
              <p className="text-xs text-gray-500">
                ID: {dep.id} • {dep.relation}
              </p>
            </div>

            <StatusBadge status={dep.status} />

          </div>
        ))}

      </div>

      {/* MODAL */}
      <Modal
        open={openModal}
        data={selected}
        onClose={() => setOpenModal(false)}
      />

    </div>
  )

}