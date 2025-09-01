"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Vote, Clock, Plus } from "lucide-react"

interface DAOProposal {
  id: string
  title: string
  status: "active" | "passed" | "failed"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  deadline: string
}

interface DAOProposalsPreviewProps {
  proposals: DAOProposal[]
  onViewAll: () => void
  onCreateProposal: () => void
}

export function DAOProposalsPreview({ proposals, onViewAll, onCreateProposal }: DAOProposalsPreviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "passed":
        return "bg-green-500 text-white"
      case "failed":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading">DAO Proposals</CardTitle>
            <CardDescription>Community governance</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button onClick={onCreateProposal} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Propose
            </Button>
            <Button onClick={onViewAll} size="sm" className="gradient-border bg-transparent">
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {proposals.length === 0 ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-accent to-primary opacity-20 flex items-center justify-center mb-4">
              <Vote className="h-8 w-8" />
            </div>
            <p className="text-muted-foreground mb-4">No active proposals</p>
            <Button onClick={onCreateProposal} className="gradient-border bg-transparent">
              Create First Proposal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {proposals.slice(0, 3).map((proposal) => (
              <div key={proposal.id} className="p-4 rounded-lg border border-border/50 bg-muted/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{proposal.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Ends {new Date(proposal.deadline).toLocaleDateString()}</span>
                      </div>
                      <span>{proposal.totalVotes} votes</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>For: {proposal.votesFor}</span>
                        <span>Against: {proposal.votesAgainst}</span>
                      </div>
                      <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />
                    </div>
                  </div>
                  <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
