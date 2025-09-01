"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Vote, Users, TrendingUp, Clock } from "lucide-react"

interface VotingStatsProps {
  stats: {
    totalProposals: number
    activeProposals: number
    totalVoters: number
    yourVotingPower: number
    participationRate: number
    avgQuorum: number
  }
}

export function VotingStats({ stats }: VotingStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glassmorphism hover:glow-primary transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
          <Vote className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-heading">{stats.totalProposals}</div>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
              {stats.activeProposals} active
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism hover:glow-secondary transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Voters</CardTitle>
          <Users className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-heading">{stats.totalVoters.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-2">Eligible to vote</div>
        </CardContent>
      </Card>

      <Card className="glassmorphism hover:glow-accent transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Your Voting Power</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-heading">{stats.yourVotingPower}</div>
          <div className="text-xs text-muted-foreground mt-2">Based on SBT holdings</div>
        </CardContent>
      </Card>

      <Card className="glassmorphism hover:glow-chart-4 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Participation Rate</CardTitle>
          <Clock className="h-4 w-4 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-heading">{stats.participationRate}%</div>
          <Progress value={stats.participationRate} className="mt-2 h-2" />
        </CardContent>
      </Card>
    </div>
  )
}
