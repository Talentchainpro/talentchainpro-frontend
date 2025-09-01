"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Briefcase, Vote, Search } from "lucide-react"

interface QuickActionsProps {
  onVerifySkill: () => void
  onCreateJobPool: () => void
  onCreateProposal: () => void
  onSearchTalent: () => void
}

export function QuickActions({ onVerifySkill, onCreateJobPool, onCreateProposal, onSearchTalent }: QuickActionsProps) {
  const actions = [
    {
      title: "Verify Skill",
      description: "Submit code for evaluation",
      icon: Zap,
      onClick: onVerifySkill,
      gradient: "from-primary to-secondary",
    },
    {
      title: "Create Job Pool",
      description: "Post sBTC-backed position",
      icon: Briefcase,
      onClick: onCreateJobPool,
      gradient: "from-secondary to-accent",
    },
    {
      title: "Create Proposal",
      description: "Submit DAO governance",
      icon: Vote,
      onClick: onCreateProposal,
      gradient: "from-accent to-primary",
    },
    {
      title: "Search Talent",
      description: "Find verified developers",
      icon: Search,
      onClick: onSearchTalent,
      gradient: "from-chart-4 to-chart-5",
    },
  ]

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="font-heading">Quick Actions</CardTitle>
        <CardDescription>Get started with TalentChain Pro</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {actions.map((action) => (
            <Button
              key={action.title}
              onClick={action.onClick}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:glow-primary transition-all duration-300 bg-transparent"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient}`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
