"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Layers3,
  Loader2,
  ShieldCheck,
  Globe,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const countries = [
  { code: "CI", name: "Côte d’Ivoire", dial: "+225" },
  { code: "SN", name: "Sénégal", dial: "+221" },
  { code: "ML", name: "Mali", dial: "+223" },
  { code: "BF", name: "Burkina Faso", dial: "+226" },
  { code: "TG", name: "Togo", dial: "+228" },
  { code: "BJ", name: "Bénin", dial: "+229" },
  { code: "NE", name: "Niger", dial: "+227" },
  { code: "CM", name: "Cameroun", dial: "+237" },
  { code: "CD", name: "RDC", dial: "+243" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "BE", name: "Belgique", dial: "+32" },
  { code: "CA", name: "Canada", dial: "+1" },
]

//////////////////////////////////////////////////////
// 🧠 TYPES STRUCTURES
//////////////////////////////////////////////////////

const types = [
  "Association",
  "ONG",
  "Religion",
  "Cooperative",
  "Entreprise",
  "Fondation",
  "Mutuelle",
  "Sport",
  "Culture",
  "Education",
  "Humanitaire",
  "Social",
  "Autre",
]

//////////////////////////////////////////////////////
// 🚀 PAGE
//////////////////////////////////////////////////////

type FormState = {
  name: string
  organizationType: string
  email: string
  phone: string
  country: string
  city: string
  description: string
}


export default function CreateOrganizationPage() {
  const [loading, setLoading] = useState<boolean>(false)

  const [form, setForm] = useState<FormState>({
    name: "",
    organizationType: "",
    email: "",
    phone: "",
    country: "CI",
    city: "",
    description: "",
  })

  const country = countries.find((c) => c.code === form.country)!

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)

  try {
    const res = await fetch("/api/organization-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Erreur")
    }

    console.log("SUCCESS:", data)
    alert("Demande envoyée avec succès")

    // reset form si besoin
    setForm({
      name: "",
      organizationType: "",
      email: "",
      phone: "",
      country: "CI",
      city: "",
      description: "",
    })
  } catch (error) {
    console.error(error)
    alert("Erreur lors de l'envoi")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">

      <div className="w-full max-w-full grid lg:grid-cols-2 bg-background rounded-3xl overflow-hidden shadow-2xl border">

        {/* === LEFT MARKETING === */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-black p-12">

          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:28px_28px]" />

          <div className="relative z-10 flex flex-col justify-between text-white w-full">

            <div>
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-8 shadow-xl">
                <Building2 className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                GestionAsso CI
              </h1>

              <p className="text-white/70 mt-6 text-lg max-w-full">
                 Plateforme de gestion sécurisée pour associations, ONG, églises et structures communautaires.
              </p>
            </div>

            <div className="space-y-4 mt-10">

              <Feature
                icon={<ShieldCheck className="w-5 h-5 text-primary" />}
                title="Validation sécurisée"
                desc="Chaque organisation est vérifiée avant activation."
              />

              <Feature
                icon={<Layers3 className="w-5 h-5 text-primary" />}
                title="Gestion complète"
                desc="Membres, finances, événements et documents."
              />

              <Feature
                icon={<Phone className="w-5 h-5 text-primary" />}
                title="Paiements flexibles"
                desc="Mobile Money et banques."
              />

              <Feature
                icon={<MapPin className="w-5 h-5 text-primary" />}
                title="Multi-pays"
                desc="Afrique et diaspora francophone."
              />
            </div>

          </div>
        </div>


         {/* === FORM === */}
        <div className="p-6 sm:p-10 flex items-center justify-center">

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl space-y-5"
          >

            <div>
              <h2 className="text-2xl font-bold">Créer une organisation</h2>
              <p className="text-sm text-muted-foreground">
                Remplir pour validation par le super administrateur
              </p>
            </div>

            {/* NOM + TYPE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Field label="Nom">
                <InputIcon
                  icon={<Building2 className="w-4 h-4" />}
                  value={form.name}
                  onChange={(v) => handleChange("name", v)}
                  placeholder="Ex: KAHADE MUTUELLE"
                />
              </Field>

              <Field label="Type">
                <Select value={form.organizationType} onValueChange={(v) => handleChange("organizationType", v)}>
                  <SelectTrigger className="h-11">
                    <Layers3 className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>

                  <SelectContent>
                    {types.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

            </div>

            {/* EMAIL + PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Field label="Email">
                <InputIcon
                  icon={<Mail className="w-4 h-4" />}
                  value={form.email}
                  onChange={(v) => handleChange("email", v)}
                  type="email"
                  placeholder="Ex: contact@organisation.com"
                />
              </Field>

              <Field label="Téléphone">
                <div className="flex h-11 border rounded-lg overflow-hidden bg-background">

                  <div className="px-3 flex items-center gap-2 bg-muted text-sm">
                    <Phone className="w-4 h-4" />
                    {country.dial}
                  </div>

                  <input
                    className="flex-1 px-3 outline-none"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Ex: 0700000000"
                  />
                </div>
              </Field>

            </div>

            {/* COUNTRY + CITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Field label="Pays">
                <Select value={form.country} onValueChange={(v) => handleChange("country", v)}>
                  <SelectTrigger className="h-11">
                    <Globe className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Ville">
                <InputIcon
                  icon={<MapPin className="w-4 h-4" />}
                  value={form.city}
                  onChange={(v) => handleChange("city", v)}
                  placeholder="Ex: ABIDJAN"
                />
              </Field>

            </div>

            {/* DESCRIPTION */}
            <Field label="Description">
              <Textarea
                className="min-h-[110px]"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Ex: Une mutuelle de solidarité pour les membres de la communauté d'Abidjan et intérieure, offrant des services de santé abordables et un soutien financier en cas de besoin."
              />
            </Field>

            {/* SUBMIT */}
            <Button className="w-full h-11" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi...
                </>
              ) : (
                "Soumettre la demande"
              )}
            </Button>

            <a href="/login" className="text-sm text-green-700 hover:underline flex items-center justify-center mt-4">
              Déjà une organisation ? Se connecter
            </a>

          </motion.form>
        </div>
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////
// 🧩 COMPONENTS CLEAN
//////////////////////////////////////////////////////

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function InputIcon({
  icon,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        {icon}
      </div>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full pl-10 pr-3 border rounded-lg outline-none"
        placeholder={placeholder}
        required
      />
    </div>
  )
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-white/60">{desc}</p>
      </div>
    </div>
  )
}


