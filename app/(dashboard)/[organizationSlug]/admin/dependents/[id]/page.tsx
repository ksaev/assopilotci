"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useParams } from "next/navigation"

import { mockDependents } from "@/lib/mock-dependents"
import StatusTimeline from "@/components/status-timeline"

import {
Card,
CardContent,
CardHeader,
CardTitle
} from "@/components/ui/card"

import {
Tabs,
TabsContent,
TabsList,
TabsTrigger
} from "@/components/ui/tabs"

import {
Avatar,
AvatarImage,
AvatarFallback
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { Check, X, Download } from "lucide-react"

export default function AdminDependentPage() {

const params = useParams()

const id = Array.isArray(params.id) ? params.id[0] : params.id

const dependentData = mockDependents.find(d => d.id === id)

if (!dependentData) {
return (
<div className="p-10">
<p className="text-red-500 font-medium">
Ayant droit introuvable
</p>
</div>
)
}

const [dependent, setDependent] = useState(dependentData)

function approve() {

setDependent(prev => ({
...prev,
status: "approved",
approvedAt: new Date().toISOString()
}))

toast.success("Ayant droit validé")

}

function reject() {

setDependent(prev => ({
...prev,
status: "rejected"
}))

toast.error("Demande refusée")

}

function statusBadge() {

if (dependent.status === "approved") {
return <Badge className="bg-green-600">Validé</Badge>
}

if (dependent.status === "pending") {
return <Badge variant="secondary">En attente</Badge>
}

return <Badge variant="destructive">Refusé</Badge>

}

const date = new Date(dependent.createdAt)

return (

<div className="p-8 max-w-6xl mx-auto space-y-6">

<Card>

<CardHeader>

<div className="flex items-center gap-6">

<Avatar className="h-24 w-24">

<AvatarImage src={dependent.photo} />

<AvatarFallback>
{dependent.name[0]}
</AvatarFallback>

</Avatar>

<div className="space-y-1">

<h2 className="text-2xl font-semibold">
{dependent.name}
</h2>

<p className="text-muted-foreground">
{dependent.relation}
</p>

{statusBadge()}

</div>

</div>

</CardHeader>

<CardContent>

<StatusTimeline status={dependent.status} />

</CardContent>

</Card>

<Tabs defaultValue="overview" className="space-y-4">

<TabsList className="grid w-full grid-cols-4">

<TabsTrigger value="overview">
Aperçu
</TabsTrigger>

<TabsTrigger value="info">
Informations
</TabsTrigger>

<TabsTrigger value="documents">
Documents
</TabsTrigger>

<TabsTrigger value="history">
Historique
</TabsTrigger>

</TabsList>


{/* APERÇU */}

<TabsContent value="overview">

<Card>

<CardHeader>
<CardTitle>Résumé de la demande</CardTitle>
</CardHeader>

<CardContent className="grid grid-cols-2 gap-6">

<div>

<p className="text-sm text-muted-foreground">
Date réception
</p>

<p className="font-medium">
{date.toLocaleDateString("fr-FR")}
</p>

</div>

<div>

<p className="text-sm text-muted-foreground">
Heure
</p>

<p className="font-medium">
{date.toLocaleTimeString("fr-FR")}
</p>

</div>

<div>

<p className="text-sm text-muted-foreground">
Statut
</p>

{statusBadge()}

</div>

</CardContent>

</Card>

</TabsContent>


{/* INFORMATIONS */}

<TabsContent value="info">

<Card>

<CardHeader>
<CardTitle>Membre demandeur</CardTitle>
</CardHeader>

<CardContent className="space-y-2">

<p>
<strong>Nom :</strong> {dependent.user.name}
</p>

<p>
<strong>Email :</strong> {dependent.user.email}
</p>

</CardContent>

</Card>


<Card className="mt-6">

<CardHeader>
<CardTitle>Informations ayant droit</CardTitle>
</CardHeader>

<CardContent className="space-y-2">

<p>
<strong>Nom :</strong> {dependent.name}
</p>

<p>
<strong>Relation :</strong> {dependent.relation}
</p>

<p>
<strong>Date naissance :</strong>{" "}
{new Date(dependent.birthDate).toLocaleDateString("fr-FR")}
</p>

</CardContent>

</Card>

</TabsContent>


{/* DOCUMENTS */}

<TabsContent value="documents">

<Card>

<CardHeader>
<CardTitle>Documents envoyés</CardTitle>
</CardHeader>

<CardContent className="space-y-3">

{dependent.documents.map(doc => (

<div
key={doc.id}
className="flex justify-between items-center border rounded-lg p-3"
>

<span className="font-medium">
{doc.name}
</span>

<a
href={doc.url}
target="_blank"
className="flex items-center gap-2 text-primary underline"
>

<Download size={16} />

Télécharger

</a>

</div>

))}

</CardContent>

</Card>

</TabsContent>


{/* HISTORIQUE */}

<TabsContent value="history">

<Card>

<CardHeader>
<CardTitle>Historique de traitement</CardTitle>
</CardHeader>

<CardContent className="space-y-2">

<p>
Demande reçue le{" "}
<strong>
{date.toLocaleDateString("fr-FR")}
</strong>{" "}
à{" "}
<strong>
{date.toLocaleTimeString("fr-FR")}
</strong>
</p>

{dependent.status === "approved" && (

<p className="text-green-600">
Demande validée
</p>

)}

{dependent.status === "rejected" && (

<p className="text-red-600">
Demande refusée
</p>

)}

</CardContent>

</Card>

</TabsContent>

</Tabs>


{dependent.status === "pending" && (

<Card>

<CardHeader>
<CardTitle>Action Administrateur</CardTitle>
</CardHeader>

<CardContent className="flex gap-4">

<Button
className="bg-green-600 hover:bg-green-700"
onClick={approve}
>

<Check className="w-4 h-4 mr-2" />
Valider

</Button>

<Button
variant="destructive"
onClick={reject}
>

<X className="w-4 h-4 mr-2" />
Refuser

</Button>

</CardContent>

</Card>

)}

</div>

)

}