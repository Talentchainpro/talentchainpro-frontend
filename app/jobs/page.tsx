"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { JobPoolCard } from "@/components/jobs/job-pool-card"
import { JobFilters } from "@/components/jobs/job-filters"
import { Button } from "@/components/ui/button"
import { Plus, Briefcase } from "lucide-react"

// Mock data
const mockJobPools = [
  {
    id: "1",
    title: "Senior React Developer",
    description:
      "Build cutting-edge Web3 applications using React, TypeScript, and blockchain technologies. Join our team to create the future of decentralized finance.",
    reward: 0.8,
    requiredSkills: ["React", "TypeScript", "Web3.js", "Smart Contracts"],
    deadline: "2024-03-15",
    applicants: 12,
    maxApplicants: 20,
    creator: { name: "TechCorp DAO", verified: true },
    location: "Remote",
    type: "remote" as const,
    status: "active" as const,
  },
  {
    id: "2",
    title: "Smart Contract Auditor",
    description:
      "Review and audit Solidity smart contracts for security vulnerabilities. Experience with DeFi protocols preferred.",
    reward: 1.5,
    requiredSkills: ["Solidity", "Security", "DeFi", "Auditing"],
    deadline: "2024-03-20",
    applicants: 8,
    maxApplicants: 15,
    creator: { name: "SecureDAO", verified: true },
    location: "San Francisco, CA",
    type: "hybrid" as const,
    status: "active" as const,
  },
  {
    id: "3",
    title: "Full Stack Developer",
    description:
      "Develop end-to-end solutions for our DeFi platform. Work with React, Node.js, and various blockchain networks.",
    reward: 1.2,
    requiredSkills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Web3"],
    deadline: "2024-03-10",
    applicants: 25,
    maxApplicants: 25,
    creator: { name: "DeFi Solutions", verified: false },
    location: "New York, NY",
    type: "onsite" as const,
    status: "filled" as const,
  },
  {
    id: "4",
    title: "Blockchain Developer",
    description:
      "Build and maintain blockchain infrastructure. Experience with Bitcoin, Stacks, and Layer 2 solutions required.",
    reward: 2.0,
    requiredSkills: ["Bitcoin", "Stacks", "Clarity", "Rust", "Layer 2"],
    deadline: "2024-02-28",
    applicants: 5,
    maxApplicants: 10,
    creator: { name: "Bitcoin Builders", verified: true },
    location: "Remote",
    type: "remote" as const,
    status: "expired" as const,
  },
]

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

const mockUserSkills = ["React", "TypeScript", "JavaScript", "Web3.js", "Smart Contracts"]

export default function JobsPage() {
  const [jobPools, setJobPools] = useState(mockJobPools)
  const [filters, setFilters] = useState({
    search: "",
    skills: [],
    minReward: 0,
    maxReward: 10,
    type: "",
    status: "",
    location: "",
  })
  const [showCreateForm, setShowCreateForm] = useState(false)
  const router = useRouter()

  const filteredJobPools = jobPools.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.search.toLowerCase())
    const matchesSkills =
      filters.skills.length === 0 || filters.skills.some((skill) => job.requiredSkills.includes(skill))
    const matchesReward = job.reward >= filters.minReward && job.reward <= filters.maxReward
    const matchesType = !filters.type || job.type === filters.type
    const matchesStatus = !filters.status || job.status === filters.status
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())

    return matchesSearch && matchesSkills && matchesReward && matchesType && matchesStatus && matchesLocation
  })

  const handleApply = (jobId: string) => {
    // Simulate application
    alert(`Applied to job ${jobId}! You'll be notified when the creator reviews your application.`)
  }

  const handleViewDetails = (jobId: string) => {
    router.push(`/jobs/${jobId}`)
  }

  const handleCreateJobPool = (newJobPool: any) => {
    setJobPools([newJobPool, ...jobPools])
    setShowCreateForm(false)
    alert("Job pool created successfully!")
  }

  if (showCreateForm) {
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
              <div className="text-center py-20">
                <p className="text-muted-foreground">Create Job Pool form would be here</p>
                <Button onClick={() => setShowCreateForm(false)} className="mt-4">
                  Back to Jobs
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-7xl">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-heading text-3xl font-bold mb-2">Job Pools</h1>
                <p className="text-muted-foreground">Discover sBTC-backed opportunities from verified creators</p>
              </div>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="gradient-border bg-transparent hover:glow-primary transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Job Pool
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <JobFilters filters={filters} onFiltersChange={setFilters} availableSkills={availableSkills} />
              </div>

              {/* Job Pools Grid */}
              <div className="lg:col-span-3">
                {filteredJobPools.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-secondary to-accent opacity-20 flex items-center justify-center mb-4">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2">No job pools found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or create the first job pool
                    </p>
                    <Button
                      onClick={() => setShowCreateForm(true)}
                      className="gradient-border bg-transparent hover:glow-primary"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Job Pool
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredJobPools.map((jobPool) => (
                      <JobPoolCard
                        key={jobPool.id}
                        jobPool={jobPool}
                        userSkills={mockUserSkills}
                        onApply={handleApply}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
