"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { CreateProposal } from "@/components/dao/create-proposal"

export default function CreateProposalPage() {
  const router = useRouter()

  const handleSubmit = (proposal: any) => {
    // In a real app, this would make an API call
    console.log("Creating proposal:", proposal)
    alert("Proposal created successfully! It will be active for voting shortly.")
    router.push("/dao")
  }

  const handleCancel = () => {
    router.push("/dao")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold mb-2">Create Proposal</h1>
              <p className="text-muted-foreground">Submit a governance proposal for community voting</p>
            </div>

            <CreateProposal onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </main>
      </div>
    </div>
  )
}
