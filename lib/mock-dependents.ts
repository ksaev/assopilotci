
export type DependentStatus = "pending" | "approved" | "rejected"

export type DocumentFile = {
  id: string
  name: string
  url: string
}

export type Dependent = {
  id: string
  name: string
  relation: string
  birthDate: string
  photo?: string

  status: DependentStatus

  createdAt: string

  user: {
    name: string
    email: string
  }

  documents: DocumentFile[]

  approvedAt?: string
  rejectedReason?: string
}

export const mockDependents: Dependent[] = [
  {
    id: "1",
    name: "Kouassi Nadia",
    relation: "Epouse",
    birthDate: "1992-05-12",
    photo: "/placeholder.svg",
    status: "pending",
    createdAt: "2026-03-15T14:32:00",

    user: {
      name: "Marc Kouassi",
      email: "marc@email.com"
    },

    documents: [
      {
        id: "1",
        name: "Acte de naissance",
        url: "#"
      },
      {
        id: "2",
        name: "Photo identité",
        url: "#"
      }
    ]
  },

  {
    id: "2",
    name: "Kouassi Nadia",
    relation: "Epouse",
    birthDate: "1992-05-12",
    photo: "/placeholder.svg",
    status: "pending",
    createdAt: "2026-03-15T14:32:00",

    user: {
      name: "Marc Kouassi",
      email: "marc@email.com"
    },

    documents: [
      {
        id: "1",
        name: "Acte de naissance",
        url: "#"
      },
      {
        id: "2",
        name: "Photo identité",
        url: "#"
      }
    ]
  }


]