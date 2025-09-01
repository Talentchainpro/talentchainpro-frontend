"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, ThumbsUp, ThumbsDown, Users, CheckCircle, AlertCircle } from "lucide-react"

interface Proposal {
  id: string
  title: string
  description: string
  category: string
  status: "active" | "passed" | "failed" | "pending"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  quorum: number
  deadline: string
  creator: {
    name: string
    avatar?: string
    verified: boolean
  }
  userVote?: "for" | "against" | null
  votingWeight: number
}

interface ProposalCardProps {
  proposal: Proposal
  onVote: (proposalId: string, vote: "for" | "against") => void
  onViewDetails: (proposalId: string) => void
}

export function ProposalCard({ proposal, onVote, onViewDetails }: ProposalCardProps) {
  const votePercentage = proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0
  const quorumPercentage = (proposal.totalVotes / proposal.quorum) * 100
  const timeLeft = new Date(proposal.deadline).getTime() - new Date().getTime()
  const daysLeft = Math.max(0, Math.ceil(timeLeft / (1000 * 60 * 60 * 24)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/20 text-primary border-primary/30"
      case "passed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "platform":
        return "bg-secondary/20 text-secondary border-secondary/30"
      case "rewards":
        return "bg-accent/20 text-accent border-accent/30"
      case "governance":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "technical":
        return "bg-chart-5/20 text-chart-5 border-chart-5/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const canVote = proposal.status === "active" && !proposal.userVote && daysLeft > 0

  return (
    <Card className="glassmorphism hover:glow-primary transition-all duration-300">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className="font-heading text-lg">{proposal.title}</CardTitle>
              {proposal.creator.verified && <CheckCircle className="h-4 w-4 text-primary" />}
            </div>
            <CardDescription className="line-clamp-2">{proposal.description}</CardDescription>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
            <Badge className={getCategoryColor(proposal.category)}>{proposal.category}</Badge>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={proposal.creator.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">{proposal.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{proposal.creator.name}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{daysLeft > 0 ? `${daysLeft}d left` : "Ended"}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{proposal.totalVotes} votes</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Voting Results */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-4 w-4 text-green-400" />
              <span>For: {proposal.votesFor}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThumbsDown className="h-4 w-4 text-red-400" />
              <span>Against: {proposal.votesAgainst}</span>
            </div>
          </div>
          <Progress value={votePercentage} className="h-2" />
          <div className="text-xs text-muted-foreground text-center">{votePercentage.toFixed(1)}% in favor</div>
        </div>

        {/* Quorum Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Quorum Progress</span>
            <span>
              {proposal.totalVotes}/{proposal.quorum}
            </span>
          </div>
          <Progress value={Math.min(100, quorumPercentage)} className="h-2" />
          {quorumPercentage < 100 && (
            <div className="flex items-center space-x-1 text-xs text-yellow-400">
              <AlertCircle className="h-3 w-3" />
              <span>Needs {proposal.quorum - proposal.totalVotes} more votes to reach quorum</span>
            </div>
          )}
        </div>

        {/* User Vote Status */}
        {proposal.userVote && (
          <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center space-x-2 text-sm">
              {proposal.userVote === "for" ? (
                <ThumbsUp className="h-4 w-4 text-green-400" />
              ) : (
                <ThumbsDown className="h-4 w-4 text-red-400" />
              )}
              <span>You voted {proposal.userVote}</span>
              <Badge variant="secondary" className="text-xs">
                Weight: {proposal.votingWeight}
              </Badge>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" onClick={() => onViewDetails(proposal.id)} className="flex-1">
            View Details
          </Button>
          {canVote ? (
            <div className="flex space-x-2 flex-1">
              <Button
                onClick={() => onVote(proposal.id, "against")}
                variant="outline"
                className="flex-1 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400"
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Against
              </Button>
              <Button
                onClick={() => onVote(proposal.id, "for")}
                className="flex-1 gradient-border bg-transparent hover:glow-primary transition-all duration-300"
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                For
              </Button>
            </div>
          ) : (
            <Button disabled className="flex-1">
              {proposal.userVote ? "Already Voted" : daysLeft <= 0 ? "Voting Ended" : "Cannot Vote"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
