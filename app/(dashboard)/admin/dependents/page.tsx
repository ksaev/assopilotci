"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { mockDependents, Dependent } from "@/lib/mock-dependents"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

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

import { Check, X } from "lucide-react"

export default function AdminDependentsPage(){

const [dependents,setDependents] = useState<Dependent[]>(mockDependents)

const [search,setSearch] = useState("")
const router = useRouter()

function updateStatus(id:string,status:"approved"|"rejected"){

setDependents(prev =>
prev.map(dep =>
dep.id === id ? {...dep,status} : dep
)
)

if(status === "approved"){
toast.success("Ayant droit validé")
}else{
toast.error("Ayant droit refusé")
}

}

function statusBadge(status:string){

if(status==="approved"){
return <Badge className="bg-green-500">Validé</Badge>
}

if(status==="pending"){
return <Badge variant="secondary">En attente</Badge>
}

return <Badge variant="destructive">Refusé</Badge>

}

const filtered = dependents.filter(dep =>
dep.name.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="p-6">

<Card>

<CardHeader>

<div className="flex justify-between items-center">

<CardTitle>
Validation des ayants droits
</CardTitle>

<Input
placeholder="Rechercher..."
className="w-64"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

</CardHeader>

<CardContent>

<table className="w-full text-sm">

<thead className="border-b text-muted-foreground">

<tr>

<th className="py-3">Personne</th>
<th>Relation</th>
<th>Utilisateur</th>
<th>Statut</th>
<th className="text-right">Actions</th>

</tr>

</thead>

<tbody>
    

{filtered.map(dep => (

<tr
key={dep.id}
className="border-b cursor-pointer hover:bg-muted/50 transition"
onClick={() => router.push(`/admin/dependents/${dep.id}`)}
>
<td className="py-3 flex items-center gap-3">

<Avatar>

<AvatarImage src={dep.photo}/>

<AvatarFallback>
{dep.name[0]}
</AvatarFallback>

</Avatar>

{dep.name}

</td>

<td>{dep.relation}</td>

<td>{dep.name}</td>

<td>{statusBadge(dep.status)}</td>

<td className="flex justify-end gap-2">

{dep.status === "pending" && (

<>

<Button
size="icon"
className="bg-green-600 hover:bg-green-700"
onClick={(e)=>{
e.stopPropagation()
updateStatus(dep.id,"approved")
}}
>
<Check className="w-4 h-4"/>
</Button>


<Button
size="icon"
variant="destructive"
onClick={(e)=>{
e.stopPropagation()
updateStatus(dep.id,"rejected")
}}
>
<X className="w-4 h-4"/>
</Button>

</>

)}

</td>

</tr>

))}

</tbody>

</table>

</CardContent>

</Card>

</div>



)

}