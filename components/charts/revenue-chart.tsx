"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { monthlyData } from "@/lib/mock-data"

export function RevenueChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.65 0.2 160)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.65 0.2 160)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDepenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.55 0.15 200)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.55 0.15 200)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
          <YAxis className="text-xs" tick={{ fill: "currentColor" }} tickFormatter={(value) => `${value / 1000}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => new Intl.NumberFormat("fr-CI").format(value) + " FCFA"}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenus"
            name="Revenus"
            stroke="oklch(0.65 0.2 160)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenus)"
          />
          <Area
            type="monotone"
            dataKey="depenses"
            name="Dépenses"
            stroke="oklch(0.55 0.15 200)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorDepenses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
