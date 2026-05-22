"use client"

import { toast } from "sonner"
import { Toast } from "@/components/ui/toast"

const MAX_FILE_SIZE = 1024 * 1024 // 1MB


export function validateFileSize(file: File) {
  if (file.size > MAX_FILE_SIZE) {
    toast.error("Le fichier ne doit pas dépasser 1 Mo.")
    return false
  }
  
  toast.success("Fichier ajouté avec succès")

  return true
}