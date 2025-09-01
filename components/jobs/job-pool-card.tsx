"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bitcoin, Clock, Users, MapPin, CheckCircle } from "lucide-react"

interface JobPool {
  id: string
  title: string
  description: string
  reward: number
  requiredSkills: string[]
  deadline: string
  applicants: number
  maxApplicants: number
  creator: {
    name: string
    avatar?: string
    verified: boolean
  }
  location?: string
  type: "remote" | "onsite" | "hybrid"
  status: "active" | "filled" | "expired"
}

interface JobPoolCardProps {
  jobPool: JobPool
  userSkills?: string[]
  onApply: (jobId: string) => void
  onViewDetails: (jobId: string) => void
}

export function JobPoolCard({ jobPool, userSkills = [], onApply, onViewDetails }: JobPoolCardProps) {
  const matchingSkills = jobPool.requiredSkills.filter((skill) => userSkills.includes(skill))
  const skillMatchPercentage = (matchingSkills.length / jobPool.requiredSkills.length) * 100
  const canApply = skillMatchPercentage >= 50 && jobPool.status === "active"

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "filled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "remote":
        return "bg-primary/20 text-primary border-primary/30"
      case "onsite":
        return "bg-secondary/20 text-secondary border-secondary/30"
      case "hybrid":
        return "bg-accent/20 text-accent border-accent/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="glassmorphism hover:glow-primary transition-all duration-300 h-full">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className="font-heading text-lg">{jobPool.title}</CardTitle>
              {jobPool.creator.verified && <CheckCircle className="h-4 w-4 text-primary" />}
            </div>
            <CardDescription className="line-clamp-2">{jobPool.description}</CardDescription>
          </div>
          <Badge className={getStatusColor(jobPool.status)}>{jobPool.status}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={jobPool.creator.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">{jobPool.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{jobPool.creator.name}</span>
          </div>
          <Badge className={getTypeColor(jobPool.type)}>{jobPool.type}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Reward and Deadline */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div className="flex items-center space-x-2">
            <Bitcoin className="h-5 w-5 text-orange-400" />
            <span className="font-heading font-semibold">{jobPool.reward} sBTC</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{new Date(jobPool.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Required Skills</span>
            {skillMatchPercentage > 0 && (
              <Badge variant="secondary" className="text-xs">
                {Math.round(skillMatchPercentage)}% match
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {jobPool.requiredSkills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className={`text-xs ${
                  matchingSkills.includes(skill)
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Applicants */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            {jobPool.applicants}/{jobPool.maxApplicants} applicants
          </span>
        </div>

        {/* Location */}
        {jobPool.location && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{jobPool.location}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" onClick={() => onViewDetails(jobPool.id)} className="flex-1">
            View Details
          </Button>
          <Button
            onClick={() => onApply(jobPool.id)}
            disabled={!canApply}
            className={`flex-1 ${
              canApply ? "gradient-border bg-transparent hover:glow-primary" : ""
            } transition-all duration-300`}
          >
            {canApply ? "Apply" : skillMatchPercentage === 0 ? "Skills Required" : "Insufficient Match"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
