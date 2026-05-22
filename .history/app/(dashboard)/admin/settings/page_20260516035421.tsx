"use client"


import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, Bell, Shield, Save, Globe, Mail, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // General
    associationName: "Association des Cadres Ivoiriens",
    email: "contact@aci.ci",
    phone: "+225 27 22 00 00 00",
    address: "Cocody, Abidjan, Côte d'Ivoire",
    description: "Association regroupant les cadres ivoiriens pour le développement professionnel et la solidarité.",
    language: "fr",
    currency: "XOF",
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    eventReminders: true,
    newMemberAlerts: true,
    monthlyReports: true,
    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
  })

  const handleSave = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Vos modifications ont été sauvegardées avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez les paramètres de votre association</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Général</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'Association</CardTitle>
                <CardDescription>Les informations de base de votre organisation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'association</Label>
                    <Input
                      id="name"
                      value={settings.associationName}
                      onChange={(e) => setSettings({ ...settings, associationName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={settings.description}
                    onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Préférences Régionales</CardTitle>
                <CardDescription>Langue et devise par défaut.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings({ ...settings, language: value })}
                    >
                      <SelectTrigger>
                        <Globe className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) => setSettings({ ...settings, currency: value })}

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Building2,
  Bell,
  Shield,
  Save,
  Globe,
  Mail,
  Smartphone,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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

import {
  settingsSchema,
  type SettingsInput,
} from "@/lib/validations"

export default function SettingsPage({
  params,
}: {
  params: Promise<{
    organizationSlug: string
  }>
}) {
  const { toast } = useToast()

  const [organizationSlug, setOrganizationSlug] =
    useState("")

  const [loading, setLoading] = useState(true)

  const [loadError, setLoadError] =
    useState(false)

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

  //////////////////////////////////////////////////////
  // LOAD PARAMS
  //////////////////////////////////////////////////////

  useEffect(() => {
    async function init() {
      try {
        const resolvedParams = await params

        setOrganizationSlug(
          resolvedParams.organizationSlug
        )
      } catch (error) {
        console.error(error)

        setLoadError(true)

        toast({
          title: "Erreur",
          description:
            "Impossible de charger l'organisation.",
          variant: "destructive",
        })
      }
    }

    init()
  }, [params, toast])

  //////////////////////////////////////////////////////
  // LOAD SETTINGS
  //////////////////////////////////////////////////////

  async function loadSettings() {
    if (!organizationSlug) return

    try {
      setLoading(true)

      setLoadError(false)

      const response = await fetch(
        `/api/${organizationSlug}/settings`,
        {
          method: "GET",
          cache: "no-store",
        }
      )

      if (!response.ok) {
        throw new Error(
          "Erreur chargement paramètres"
        )
      }

      const data = await response.json()

      reset({
        associationName:
          data?.associationName || "",

        email: data?.email || "",

        phone: data?.phone || "",

        address: data?.address || "",

        description: data?.description || "",

        language: data?.language || "fr",

        currency: data?.currency || "XOF",

        emailNotifications:
          data?.emailNotifications ?? true,

        smsNotifications:
          data?.smsNotifications ?? false,

        paymentReminders:
          data?.paymentReminders ?? true,

        eventReminders:
          data?.eventReminders ?? true,

        monthlyReports:
          data?.monthlyReports ?? true,

        twoFactorAuth:
          data?.twoFactorAuth ?? false,

        sessionTimeout:
          data?.sessionTimeout ?? 30,
      })
    } catch (error) {
      console.error(error)

      setLoadError(true)

      toast({
        title: "Chargement impossible",
        description:
          "Impossible de charger les données actuelles.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [organizationSlug])

  //////////////////////////////////////////////////////
  // SAVE SETTINGS
  //////////////////////////////////////////////////////

  async function onSubmit(
    values: SettingsInput
  ) {
    try {
      const response = await fetch(
        `/api/${organizationSlug}/settings`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(values),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Erreur sauvegarde"
        )
      }

      toast({
        title: "Succès",
        description:
          "Paramètres sauvegardés.",
      })
    } catch (error) {
      console.error(error)

      toast({
        title: "Erreur",
        description:
          "Impossible de sauvegarder.",
        variant: "destructive",
      })
    }
  }

  //////////////////////////////////////////////////////
  // LOADING UI
  //////////////////////////////////////////////////////

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />

          <p className="text-muted-foreground">
            Chargement des paramètres...
          </p>
        </motion.div>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Paramètres
        </h1>

        <p className="text-muted-foreground">
          Gérez les paramètres de votre
          organisation.
        </p>
      </div>

      {/* ALERT */}
      {loadError && (
        <Alert
          variant="destructive"
          className="border-red-500/30"
        >
          <AlertTriangle className="h-4 w-4" />

          <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Impossible de charger les
              données actuelles.
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={loadSettings}
            >
              <RefreshCw className="w-4 h-4 mr-2" />

              Réessayer
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Tabs
          defaultValue="general"
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger
              value="general"
              className="gap-2"
            >
              <Building2 className="w-4 h-4" />

              <span className="hidden sm:inline">
                Général
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="notifications"
              className="gap-2"
            >
              <Bell className="w-4 h-4" />

              <span className="hidden sm:inline">
                Notifications
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="security"
              className="gap-2"
            >
              <Shield className="w-4 h-4" />

              <span className="hidden sm:inline">
                Sécurité
              </span>
            </TabsTrigger>
          </TabsList>

          {/* GENERAL */}
          <TabsContent value="general">
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    Informations de
                    l'organisation
                  </CardTitle>

                  <CardDescription>
                    Informations principales
                    de votre organisation.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>
                        Nom
                      </Label>

                      <Input
                        {...register(
                          "associationName"
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Email
                      </Label>

                      <Input
                        type="email"
                        {...register(
                          "email"
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Téléphone
                      </Label>

                      <Input
                        {...register(
                          "phone"
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Adresse
                      </Label>

                      <Input
                        {...register(
                          "address"
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Description
                    </Label>

                    <Textarea
                      rows={4}
                      {...register(
                        "description"
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Préférences Régionales
                  </CardTitle>

                  <CardDescription>
                    Langue et devise.
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>
                      Langue
                    </Label>

                    <Select
                      value={watch(
                        "language"
                      )}
                      onValueChange={(
                        value
                      ) =>
                        setValue(
                          "language",
                          value
                        )
                      }
                    >
                      <SelectTrigger>
                        <Globe className="w-4 h-4 mr-2" />

                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="fr">
                          Français
                        </SelectItem>

                        <SelectItem value="en">
                          English
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Devise
                    </Label>

                    <Select
                      value={watch(
                        "currency"
                      )}
                      onValueChange={(
                        value
                      ) =>
                        setValue(
                          "currency",
                          value
                        )
                      }

                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="XOF">FCFA (XOF)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="USD">Dollar (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Préférences de Notifications</CardTitle>
                <CardDescription>Configurez comment vous souhaitez être notifié.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Canaux de notification</h4>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Notifications par Email</p>
                        <p className="text-sm text-muted-foreground">Recevez les alertes par email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Notifications SMS</p>
                        <p className="text-sm text-muted-foreground">Recevez les alertes par SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Types de notifications</h4>
                  <div className="space-y-3">
                    {[
                      {
                        key: "paymentReminders",
                        label: "Rappels de paiement",
                        desc: "Alertes pour les cotisations dues",
                      },
                      {
                        key: "eventReminders",
                        label: "Rappels d'événements",
                        desc: "Notifications avant les réunions",
                      },
                      { key: "newMemberAlerts", label: "Nouveaux membres", desc: "Alertes quand un membre rejoint" },
                      { key: "monthlyReports", label: "Rapports mensuels", desc: "Résumé mensuel par email" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={settings[item.key as keyof typeof settings] as boolean}
                          onCheckedChange={(checked) => setSettings({ ...settings, [item.key]: checked })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentification</CardTitle>
                <CardDescription>Renforcez la sécurité de votre compte.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Authentification à deux facteurs</p>
                      <p className="text-sm text-muted-foreground">Ajoutez une couche de sécurité supplémentaire</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}


                      <SelectContent>
                        <SelectItem value="XOF">
                          FCFA (XOF)
                        </SelectItem>

                        <SelectItem value="EUR">
                          Euro (EUR)
                        </SelectItem>

                        <SelectItem value="USD">
                          Dollar (USD)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* NOTIFICATIONS */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>
                  Notifications
                </CardTitle>

                <CardDescription>
                  Préférences de
                  notifications.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />

                    <div>
                      <p className="font-medium">
                        Email
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Notifications
                        email
                      </p>
                    </div>
                  </div>

                  <Switch
                    checked={watch(
                      "emailNotifications"
                    )}
                    onCheckedChange={(
                      checked
                    ) =>
                      setValue(
                        "emailNotifications",
                        checked
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" />

                    <div>
                      <p className="font-medium">
                        SMS
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Notifications SMS
                      </p>
                    </div>
                  </div>

                  <Switch
                    checked={watch(
                      "smsNotifications"
                    )}
                    onCheckedChange={(
                      checked
                    ) =>
                      setValue(
                        "smsNotifications",
                        checked
                      )
                    }

                  />
                </div>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle>Politique de Session</CardTitle>
                <CardDescription>Configurez les paramètres de session et mot de passe.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Expiration de session (minutes)</Label>
                    <Select
                      value={settings.sessionTimeout}
                      onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 heure</SelectItem>
                        <SelectItem value="120">2 heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Expiration mot de passe (jours)</Label>
                    <Select
                      value={settings.passwordExpiry}
                      onValueChange={(value) => setSettings({ ...settings, passwordExpiry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 jours</SelectItem>
                        <SelectItem value="60">60 jours</SelectItem>
                        <SelectItem value="90">90 jours</SelectItem>
                        <SelectItem value="never">Jamais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}

          </TabsContent>

          {/* SECURITY */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>
                  Sécurité
                </CardTitle>

                <CardDescription>
                  Paramètres de sécurité.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />

                    <div>
                      <p className="font-medium">
                        Double authentification
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Sécurité renforcée
                      </p>
                    </div>
                  </div>

                  <Switch
                    checked={watch(
                      "twoFactorAuth"
                    )}
                    onCheckedChange={(
                      checked
                    ) =>
                      setValue(
                        "twoFactorAuth",
                        checked
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* SAVE */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />

            {isSubmitting
              ? "Sauvegarde..."
              : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  )
}

