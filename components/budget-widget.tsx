"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { stats, formatFCFA } from "@/lib/mock-data"

export function BudgetWidget() {
  const percentage = Math.round((stats.currentBudget / stats.annualBudget) * 100)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <Card>
      <CardHeader>
        <CardTitle>Objectif Annuel</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <motion.circle
              cx="96"
              cy="96"
              r={radius}
              stroke="oklch(0.65 0.2 160)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold"
            >
              {percentage}%
            </motion.span>
            <span className="text-sm text-muted-foreground">atteint</span>
          </div>
        </div>
        <div className="mt-4 text-center space-y-1">
          <p className="text-lg font-semibold">{formatFCFA(stats.currentBudget)}</p>
          <p className="text-sm text-muted-foreground">sur {formatFCFA(stats.annualBudget)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
