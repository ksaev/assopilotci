"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  Clock,
  Building2,
} from "lucide-react"

type Org = {
  id: string
  name: string
  email: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<Org[]>([])

  const load = async () => {
    const res = await fetch(
      "/api/admin/organizations"
    )
    const data = await res.json()
    setOrgs(data)
  }

  const action = async (
    id: string,
    type: "approve" | "reject"
  ) => {
    await fetch(
      `/api/admin/organizations/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          action: type,
        }),
      }
    )

    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Super Admin Dashboard
      </h1>

      <div className="grid gap-4">
        {orgs.map((org) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border rounded-xl flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <h2 className="font-semibold">
                  {org.name}
                </h2>
              </div>

              <p className="text-sm text-muted-foreground">
                {org.email}
              </p>

              <p className="text-xs mt-1">
                Status: {org.status}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  action(org.id, "approve")
                }
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                <CheckCircle size={16} />
              </button>

              <button
                onClick={() =>
                  action(org.id, "reject")
                }
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                <XCircle size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}