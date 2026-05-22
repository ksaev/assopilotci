"use client"

import * as React from "react"
import { Dependent } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import EditDependentDialog from "./edit-dependent-dialog"



interface Props {
  dependent: Dependent
  onUpdate: (dependent: Dependent) => void
  onDelete: (id: string) => void
}

export default function DependentCard({ dependent, onUpdate, onDelete }: Props) {

  const photos = dependent.photo || [];

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{dependent.name}</CardTitle>
          <div className="flex gap-2">
            <EditDependentDialog dependent={dependent} onUpdate={onUpdate} />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (confirm(`Supprimer ${dependent.name} ?`)) onDelete(dependent.id)
              }}
            >
              Supprimer
            </Button>
          </div>
        </div>
        <CardDescription>
          <p>{dependent.relationShip} </p> 
        <p>
        {new Date(dependent.birthDate).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })}
        </p>          
        <p>{dependent.phone && `${dependent.phone}`}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar className="h-24 w-24 mb-2">
          {dependent.photo?.length ? (
            <AvatarImage src={dependent.photo[0].url} />
          ) : (
            <AvatarFallback>{dependent.name[0]}</AvatarFallback>
          )}
        </Avatar>


        {photos.length > 0 && (
            <div className="space-y-1 mt-2">
                <p className="font-semibold text-sm">Pièces jointes :</p>
                {photos.map((file) => (
                <div key={file.name} className="flex justify-between items-center text-sm">
                    <span>{file.name}</span>
                    <a
                    href={file.url}
                    download={file.name}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                    >
                    Télécharger
                    </a>
                </div>
                ))}
            </div>
        )}
      </CardContent>
    </Card>
  )
}