"use client"

import * as React from "react"
import DependentCard from "./dependents-card"
import AddDependentDialog from "./add-dependent-dialog"
import { Dependent, dependents as initialDependents } from "@/lib/data"

interface Props {
  memberId: string
}

export default function DependentsList({ memberId }: Props) {
  const [list, setList] = React.useState<Dependent[]>(
    initialDependents.filter((d) => d.memberId === memberId)
  )

  const handleAddDependent = (newDependent: Dependent) => {
    setList((prev) => [...prev, newDependent])
  }

  const handleUpdateDependent = (updated: Dependent) => {
    setList((prev) => prev.map((d) => (d.id === updated.id ? updated : d)))
  }

  const handleDeleteDependent = (id: string) => {
    setList((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Ayants droits ({list.length})</h3>
        <AddDependentDialog memberId={memberId} onAdd={handleAddDependent} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((d) => (
          <DependentCard
            key={d.id}
            dependent={d}
            onUpdate={handleUpdateDependent}
            onDelete={handleDeleteDependent}
          />
        ))}
      </div>
    </div>
  )
}