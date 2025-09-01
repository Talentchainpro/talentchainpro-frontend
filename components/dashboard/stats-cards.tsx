"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Briefcase, Vote, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalUsers: number
    totalSBTs: number
    activeJobPools: number
    daoProposals: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      description: "Verified developers",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+12%",
    },
    {
      title: "SBTs Minted",
      value: stats.totalSBTs.toLocaleString(),
      description: "Skill tokens issued",
      icon: Zap,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      trend: "+8%",
    },
    {
      title: "Active Job Pools",
      value: stats.activeJobPools.toLocaleString(),
      description: "sBTC-backed positions",
      icon: Briefcase,
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: "+15%",
    },
    {
      title: "DAO Proposals",
      value: stats.daoProposals.toLocaleString(),
      description: "Community governance",
      icon: Vote,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
      trend: "+5%",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="glassmorphism hover:glow-primary transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold font-heading">{card.value}</div>
                <CardDescription className="text-xs">{card.description}</CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                {card.trend}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
