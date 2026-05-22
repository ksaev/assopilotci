"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Building2,
  Bell,
  Shield,
  Globe,
  Mail,
  Smartphone,
  Save,
  RefreshCw,
  AlertTriangle,
  Moon,
  Sun,
  Users,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

import { settingsSchema, type SettingsInput } from "@/lib/validations"

type Props = {
  params: Promise<{ organizationSlug: string }>
}

export default function SettingsPage({ params }: Props) {
  const { toast } = useToast()

  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      associationName: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      language: "fr",
      currency: "XOF",
      emailNotifications: true,
      smsNotifications: false,
      paymentReminders: true,
      eventReminders: true,
      monthlyReports: true,
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
  })

  /* ---------------------------
   * PARAM LOAD
  ----------------------------*/
  useEffect(() => {
    params
      .then((p) => setSlug(p.organizationSlug))
      .catch(() => {
        setError(true)
      })
  }, [params])

  /* ---------------------------
   * LOAD SETTINGS
  ----------------------------*/
  useEffect(() => {
    if (!slug) return

    const load = async () => {
      try {
        setLoading(true)
        setError(false)

        const res = await fetch(`/api/${slug}/settings`)
        if (!res.ok) throw new Error()

        const data = await res.json()
        reset(data)
      } catch {
        setError(true)
        toast({
          title: "Erreur",
          description: "Chargement impossible",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug, reset, toast])

  /* ---------------------------
   * AUTO SAVE (STRIPE STYLE)
  ----------------------------*/
  const watchedValues = watch()

  useEffect(() => {
    if (!slug) return

    const timer = setTimeout(async () => {
      await fetch(`/api/${slug}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watchedValues),
      })
    }, 1200)

    return () => clearTimeout(timer)
  }, [watchedValues, slug])

  /* ---------------------------
   * SAVE MANUAL
  ----------------------------*/
  const onSubmit = async (values: SettingsInput) => {
    try {
      await fetch(`/api/${slug}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      toast({
        title: "Sauvegardé",
        description: "Configuration mise à jour",
      })
    } catch {
      toast({
        title: "Erreur",
        description: "Échec de sauvegarde",
        variant: "destructive",
      })
    }
  }

  /* ---------------------------
   * LOADING UI
  ----------------------------*/
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    )
  }

  /* ---------------------------
   * ERROR UI
  ----------------------------*/
  if (error) {
    return (
      <Alert className="border-red-500/30 bg-red-500/10">
        <AlertTriangle className="w-4 h-4" />
        <AlertDescription className="flex justify-between items-center">
          <span>Impossible de charger les paramètres</span>
          <Button size="sm" onClick={() => location.reload()}>
            Réessayer
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  /* ---------------------------
   * THEME TOGGLE
  ----------------------------*/
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Stripe-level configuration panel
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleTheme}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>

          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Organisations
          </Button>
        </div>
      </div>

      {/* TABS */}
      <Tabs defaultValue="general" className="space-y-6">

        <TabsList className="grid grid-cols-3 w-full lg:w-fit">
          <TabsTrigger value="general">
            <Building2 className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>

          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>

          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* GENERAL */}
        <TabsContent value="general">
          <Card className="border-muted/50">
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>
                Core information and preferences
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 sm:grid-cols-2">

              <Input placeholder="Name" {...register("associationName")} />
              <Input placeholder="Email" {...register("email")} />
              <Input placeholder="Phone" {...register("phone")} />
              <Input placeholder="Address" {...register("address")} />

              <div className="sm:col-span-2">
                <Textarea placeholder="Description" {...register("description")} />
              </div>

              {/* LANGUAGE */}
              <Select
                value={watch("language")}
                onValueChange={(v: "fr" | "en") => setValue("language", v)}
              >
                <SelectTrigger>
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>

              {/* CURRENCY (ELITE UX) */}
              <Select
                value={watch("currency")}
                onValueChange={(v: "XOF" | "EUR" | "USD") =>
                  setValue("currency", v)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="XOF">FCFA (XOF)</SelectItem>
                  <SelectItem value="EUR">Euro</SelectItem>
                  <SelectItem value="USD">Dollar</SelectItem>
                </SelectContent>
              </Select>

            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Mail />
                  <div>
                    <p>Email Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      System notifications
                    </p>
                  </div>
                </div>

                <Switch
                  checked={watch("emailNotifications")}
                  onCheckedChange={(v: boolean) =>
                    setValue("emailNotifications", v)
                  }
                />
              </div>

              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Smartphone />
                  <div>
                    <p>SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Mobile notifications
                    </p>
                  </div>
                </div>

                <Switch
                  checked={watch("smsNotifications")}
                  onCheckedChange={(v: boolean) =>
                    setValue("smsNotifications", v)
                  }
                />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* SECURITY */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Shield />
                  <div>
                    <p>2FA Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Extra protection layer
                    </p>
                  </div>
                </div>

                <Switch
                  checked={watch("twoFactorAuth")}
                  onCheckedChange={(v: boolean) =>
                    setValue("twoFactorAuth", v)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="px-6"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>

    </motion.div>
  )
}