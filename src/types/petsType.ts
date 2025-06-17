export interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: string
  gender: string
  size: string
  color: string
  description: string
  image: string
  status: "available" | "pending" | "adopted"
  location: string
  dateAdded: string
  vaccinated: boolean
  spayed: boolean
}

export interface Application {
  id: string
  petId: string
  petName: string
  applicantName: string
  email: string
  phone: string
  address: string
  experience: string
  reason: string
  status: "pending" | "approved" | "rejected"
  dateSubmitted: string
  applicantImage: string
}

export interface NavigationItem {
  id: string
  label: string
  icon: any
}

export interface DashboardStats {
  totalPets: number
  availablePets: number
  pendingAdoptions: number
  totalApplications: number
  pendingApplications: number
  approvedApplications: number
}
