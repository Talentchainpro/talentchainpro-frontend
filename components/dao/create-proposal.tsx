"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { CalendarIcon, Vote, Users, Clock } from "lucide-react"

interface CreateProposalProps {
  onSubmit: (proposal: any) => void
  onCancel: () => void
}

export function CreateProposal({ onSubmit, onCancel }: CreateProposalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    quorum: [100],
    votingPeriod: [7],
    deadline: undefined as Date | undefined,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (updates: any) => {
    setFormData({ ...formData, ...updates })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const proposal = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: "active",
        votesFor: 0,
        votesAgainst: 0,
        totalVotes: 0,
        quorum: formData.quorum[0],
        deadline: formData.deadline?.toISOString() || "",
        creator: {
          name: "You",
          verified: true,
        },
        userVote: null,
        votingWeight: 0,
      }

      onSubmit(proposal)
      setIsSubmitting(false)
    }, 2000)
  }

  const isFormValid = () => {
    return formData.title && formData.description && formData.category && formData.deadline
  }

  // Auto-calculate deadline based on voting period
  const handleVotingPeriodChange = (days: number[]) => {
    const newDeadline = new Date()
    newDeadline.setDate(newDeadline.getDate() + days[0])
    updateFormData({ votingPeriod: days, deadline: newDeadline })
  }

  return (
    <div className="space-y-6">
      <Card className="glassmorphism glow-primary">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Vote className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="font-heading">Create Proposal</CardTitle>
              <CardDescription>Submit a governance proposal for community voting</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Proposal Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Increase skill verification rewards"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Select proposal category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platform">Platform</SelectItem>
                    <SelectItem value="rewards">Rewards</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of your proposal, including rationale, implementation details, and expected outcomes..."
                  value={formData.description}
                  onChange={(e) => updateFormData({ description: e.target.value })}
                  className="min-h-[150px] bg-muted/50 border-border"
                />
              </div>
            </div>

            {/* Voting Parameters */}
            <div className="space-y-6 p-4 rounded-lg bg-muted/30 border border-border/50">
              <h3 className="font-heading text-lg font-semibold">Voting Parameters</h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Quorum Required</Label>
                  <div className="px-2">
                    <Slider
                      value={formData.quorum}
                      onValueChange={(value) => updateFormData({ quorum: value })}
                      max={500}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex items-center justify-center mt-2">
                      <div className="flex items-center space-x-2 p-2 rounded-lg bg-primary/20 border border-primary/30">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-heading font-semibold">{formData.quorum[0]} votes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Voting Period</Label>
                  <div className="px-2">
                    <Slider
                      value={formData.votingPeriod}
                      onValueChange={handleVotingPeriodChange}
                      max={30}
                      min={3}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex items-center justify-center mt-2">
                      <div className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/20 border border-secondary/30">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span className="font-heading font-semibold">{formData.votingPeriod[0]} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Voting Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-muted/50 border-border"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deadline}
                      onSelect={(date) => updateFormData({ deadline: date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
              <h3 className="font-heading text-lg font-semibold">Preview</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Title:</span>
                  <span className="text-sm text-muted-foreground">{formData.title || "Not set"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Category:</span>
                  <span className="text-sm text-muted-foreground">{formData.category || "Not set"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Quorum:</span>
                  <span className="text-sm text-muted-foreground">{formData.quorum[0]} votes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Voting Period:</span>
                  <span className="text-sm text-muted-foreground">{formData.votingPeriod[0]} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Deadline:</span>
                  <span className="text-sm text-muted-foreground">
                    {formData.deadline ? format(formData.deadline, "PPP") : "Not set"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border/50">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="gradient-border bg-transparent hover:glow-primary transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span>Creating Proposal...</span>
                  </div>
                ) : (
                  <>
                    <Vote className="h-4 w-4 mr-2" />
                    Submit Proposal
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Proposal Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-sm">Clear Objective</p>
                <p className="text-xs text-muted-foreground">State exactly what you want to achieve</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
              <div>
                <p className="font-medium text-sm">Detailed Rationale</p>
                <p className="text-xs text-muted-foreground">Explain why this change is needed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-accent mt-2" />
              <div>
                <p className="font-medium text-sm">Implementation Plan</p>
                <p className="text-xs text-muted-foreground">How will this be executed if passed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-chart-4 mt-2" />
              <div>
                <p className="font-medium text-sm">Community Impact</p>
                <p className="text-xs text-muted-foreground">Consider effects on all stakeholders</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
