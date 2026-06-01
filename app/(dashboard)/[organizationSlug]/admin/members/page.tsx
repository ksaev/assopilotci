"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, UserPlus, Download, Eye, Edit, Trash2 } from "lucide-react";
import { members } from "@/lib/data";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MembersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [addMemberOpen, setAddMemberOpen] = React.useState(false);
  const [deleteMemberOpen, setDeleteMemberOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<string | null>(
    null,
  );



  const [type, setType] = useState("PRINCIPAL")
  const [principaux, setPrincipaux] = useState([])

  useEffect(() => {
    if (type === "DEPENDANT") {
      fetch("/api/adherents/principaux")
        .then(res => res.json())
        .then(setPrincipaux)
    }
  }, [type])


  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
    } as const;
    return variants[status as keyof typeof variants] || "secondary";
  };

  const getTierColor = (tier: string) => {
    const colors = {
      Bronze: "bg-chart-4/10 text-chart-4",
      Argent: "bg-muted text-muted-foreground",
      Or: "bg-chart-3/10 text-chart-3",
    };
    return (
      colors[tier as keyof typeof colors] || "bg-muted text-muted-foreground"
    );
  };

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log("[v0] Adding new member:", Object.fromEntries(formData));
    setAddMemberOpen(false);
    // In a real app, this would call an API

    console.log("[Adding new member:", Object.fromEntries(formData));
    setAddMemberOpen(false);
    //call an API

  };

  const handleDeleteMember = () => {
    console.log("[v0] Deleting member:", selectedMember);
    setDeleteMemberOpen(false);
    setSelectedMember(null);
    // In a real app, this would call an API
  };

  const handleExport = () => {
    console.log("[v0] Exporting members data");
    // Create CSV content
    const headers = [
      "ID",
      "Nom",
      "Email",
      "Téléphone",
      "Statut",
      "Niveau",
      "Contributions",
      "Solde Dû",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredMembers.map((m) =>
        [
          m.id,
          m.name,
          m.email,
          m.phone,
          m.status,
          m.tier,
          m.balance,
          m.du,
        ].join(","),
      ),
    ].join("\n");

    // Download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `membres-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Membres
            </h1>
            <p className="text-muted-foreground">
              Gérer tous les membres de l'association
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>

            <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un membre
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleAddMember}>
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau membre</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations du nouveau membre de
                      l'association
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Adama Koné"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="adama@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+225 07 12 34 56 78"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tier">Niveau</Label>
                      <Select name="tier" defaultValue="Bronze">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bronze">Bronze</SelectItem>
                          <SelectItem value="Argent">Argent</SelectItem>
                          <SelectItem value="Or">Or</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="initialBalance">
                        Solde initial (FCFA)
                      </Label>
                      <Input
                        id="initialBalance"
                        name="initialBalance"
                        type="number"
                        defaultValue="0"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setAddMemberOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit">Ajouter le membre</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

    <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un membre
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleAddMember}>
          <DialogHeader>
            <DialogTitle>Ajouter un membre</DialogTitle>
            <DialogDescription>
              Créez un adhérent principal ou un membre à charge
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">

            {/* TYPE */}
            <div className="grid gap-2">
              <Label>Type de membre *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRINCIPAL">
                    Adhérent principal
                  </SelectItem>
                  <SelectItem value="DEPENDANT">
                    Membre à charge
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* NOM */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input id="name" name="name" required />
            </div>

            {/* EMAIL + PASSWORD UNIQUEMENT PRINCIPAL */}
            {type === "PRINCIPAL" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
              </>
            )}

            {/* TELEPHONE OPTIONNEL */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input id="phone" name="phone" placeholder="+225 07 58 98 80 04" required  />
            </div>

            {/* DEPENDANT → CHOIX DU PARENT */}
            {type === "DEPENDANT" && (
              <div className="grid gap-2">
                <Label>Rattaché à *</Label>
                <Select name="parentId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un adhérent principal" />
                  </SelectTrigger>
                  <SelectContent>
                    {principaux.map((p: any) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.nom} {p.prenom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* NIVEAU */}
            <div className="grid gap-2">
              <Label>Niveau</Label>
              <Select name="tier" defaultValue="Bronze">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Argent">Argent</SelectItem>
                  <SelectItem value="Or">Or</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* SOLDE  UNIQUEMENT PRINCIPAL */}
            {type === "PRINCIPAL" && (
              <>
            <div className="grid gap-2">
              <Label>Solde initial (FCFA)</Label>
              <Input
                name="initialBalance"
                type="number"
                defaultValue="0"
              />
            </div>

              </>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddMemberOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des membres</CardTitle>
            <CardDescription>
              {filteredMembers.length} membre(s) trouvé(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Membre</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Contributions</TableHead>
                    <TableHead>Solde dû</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-border"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {member.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {member.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-foreground">
                            {member.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(member.status)}>
                          {member.status === "active"
                            ? "Actif"
                            : member.status === "inactive"
                              ? "Inactif"
                              : "En attente"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getTierColor(member.tier)}
                          variant="secondary"
                        >
                          {member.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {member.balance.toLocaleString()} FCFA
                      </TableCell>
                      <TableCell className="font-semibold text-destructive">
                        {member.du.toLocaleString()} FCFA
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(member.joinDate).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              router.push(`/admin/members/${member.id}`)
                            }
                            title="Vue 360°"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              console.log("[v0] Editing member:", member.id);
                              // Open edit modal (to be implemented)
                            }}
                            title="Modifier"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedMember(member.id);
                              setDeleteMemberOpen(true);
                            }}
                            className="text-destructive hover:text-destructive"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={deleteMemberOpen} onOpenChange={setDeleteMemberOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer ce membre ? Cette action est
                irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteMemberOpen(false)}
              >
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDeleteMember}>
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}
