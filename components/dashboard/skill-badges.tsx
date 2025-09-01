"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Bitcoin, Shield } from "lucide-react"

interface SkillBadge {
  id: string
  skill: string
  level: number
  issuedAt: string
  proofHash: string
  bitcoinAnchor: boolean
}

interface SkillBadgesProps {
  skills: SkillBadge[]
  onAddSkill: () => void
}

export function SkillBadges({ skills, onAddSkill }: SkillBadgesProps) {
  const getSkillColor = (level: number) => {
    if (level >= 90) return "from-accent to-primary"
    if (level >= 70) return "from-secondary to-accent"
    if (level >= 50) return "from-primary to-secondary"
    return "from-muted to-primary"
  }

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading">Your Skills</CardTitle>
            <CardDescription>Verified SBT credentials</CardDescription>
          </div>
          <Button onClick={onAddSkill} size="sm" className="gradient-border bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Verify Skill
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <div className="text-center py-8">
            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <p className="text-muted-foreground mb-4">No skills verified yet</p>
            <Button onClick={onAddSkill} className="gradient-border bg-transparent">
              Verify Your First Skill
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`p-4 rounded-lg bg-gradient-to-br ${getSkillColor(skill.level)} relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-semibold text-white">{skill.skill}</h3>
                    <div className="flex items-center space-x-1">
                      {skill.bitcoinAnchor && <Bitcoin className="h-4 w-4 text-orange-400" />}
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Level {skill.level}
                    </Badge>
                    <span className="text-xs text-white/80">{new Date(skill.issuedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
