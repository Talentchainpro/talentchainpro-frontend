"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { CreateJobPool } from "@/components/jobs/create-job-pool"

const availableSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Solidity",
  "Web3.js",
  "Ethers.js",
  "Smart Contracts",
  "DeFi",
  "Bitcoin",
  "Stacks",
  "Clarity",
  "Rust",
  "Go",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "Security",
  "Auditing",
  "Layer 2",
  "Next.js",
]

export default function CreateJobPoolPage() {
  const router = useRouter()

  const handleSubmit = (jobPool: any) => {
    // In a real app, this would make an API call
    console.log("Creating job pool:", jobPool)
    alert("Job pool created successfully!")
    router.push("/jobs")
  }

  const handleCancel = () => {
    router.push("/jobs")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold mb-2">Create Job Pool</h1>
              <p className="text-muted-foreground">Post an sBTC-backed position for verified developers</p>
            </div>

            <CreateJobPool onSubmit={handleSubmit} onCancel={handleCancel} availableSkills={availableSkills} />
          </div>
        </main>
      </div>
    </div>
  )
}
