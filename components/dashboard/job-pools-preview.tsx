"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Bitcoin, Clock, Plus } from "lucide-react"

interface JobPool {
  id: string
  title: string
  reward: number
  requiredSkills: string[]
  deadline: string
  applicants: number
}

interface JobPoolsPreviewProps {
  jobPools: JobPool[]
  onViewAll: () => void
  onCreatePool: () => void
}

export function JobPoolsPreview({ jobPools, onViewAll, onCreatePool }: JobPoolsPreviewProps) {
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading">Job Pools</CardTitle>
            <CardDescription>sBTC-backed opportunities</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button onClick={onCreatePool} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
            <Button onClick={onViewAll} size="sm" className="gradient-border bg-transparent">
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {jobPools.length === 0 ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-secondary to-accent opacity-20 flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8" />
            </div>
            <p className="text-muted-foreground mb-4">No job pools available</p>
            <Button onClick={onCreatePool} className="gradient-border bg-transparent">
              Create First Job Pool
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobPools.slice(0, 3).map((pool) => (
              <div
                key={pool.id}
                className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium mb-1">{pool.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Bitcoin className="h-4 w-4 text-orange-400" />
                        <span>{pool.reward} sBTC</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(pool.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{pool.applicants} applicants</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pool.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
