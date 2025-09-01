"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, X, Briefcase, Bitcoin } from "lucide-react"

interface CreateJobPoolProps {
  onSubmit: (jobPool: any) => void
  onCancel: () => void
  availableSkills: string[]
}

export function CreateJobPool({ onSubmit, onCancel, availableSkills }: CreateJobPoolProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: [0.5],
    requiredSkills: [] as string[],
    maxApplicants: [10],
    type: "",
    location: "",
    deadline: undefined as Date | undefined,
  })
  const [skillInput, setSkillInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (updates: any) => {
    setFormData({ ...formData, ...updates })
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      updateFormData({ requiredSkills: [...formData.requiredSkills, skill] })
    }
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    updateFormData({ requiredSkills: formData.requiredSkills.filter((s) => s !== skill) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const jobPool = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        description: formData.description,
        reward: formData.reward[0],
        requiredSkills: formData.requiredSkills,
        maxApplicants: formData.maxApplicants[0],
        type: formData.type,
        location: formData.location,
        deadline: formData.deadline?.toISOString() || "",
        applicants: 0,
        creator: {
          name: "You",
          verified: true,
        },
        status: "active",
      }

      onSubmit(jobPool)
      setIsSubmitting(false)
    }, 2000)
  }

  const isFormValid = () => {
    return (
      formData.title &&
      formData.description &&
      formData.reward[0] > 0 &&
      formData.requiredSkills.length > 0 &&
      formData.type &&
      formData.deadline
    )
  }

  const filteredSkills = availableSkills.filter(
    (skill) => skill.toLowerCase().includes(skillInput.toLowerCase()) && !formData.requiredSkills.includes(skill),
  )

  return (
    <div className="space-y-6">
      <Card className="glassmorphism glow-primary">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="font-heading">Create Job Pool</CardTitle>
              <CardDescription>Post an sBTC-backed position for verified developers</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior React Developer"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Job Type *</Label>
                <Select value={formData.type} onValueChange={(value) => updateFormData({ type: value })}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and requirements..."
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                className="min-h-[120px] bg-muted/50 border-border"
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills *</Label>
              <div className="relative">
                <Input
                  id="skills"
                  placeholder="Type to search and add skills..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      if (skillInput) addSkill(skillInput)
                    }
                  }}
                  className="bg-muted/50 border-border"
                />
                {skillInput && filteredSkills.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-card border border-border rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredSkills.slice(0, 5).map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        className="w-full text-left px-3 py-2 hover:bg-muted/50 text-sm"
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {formData.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-2 hover:bg-transparent"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Reward and Applicants */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Reward Amount (sBTC) *</Label>
                <div className="px-2">
                  <Slider
                    value={formData.reward}
                    onValueChange={(value) => updateFormData({ reward: value })}
                    max={5}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-center mt-2">
                    <div className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-orange-400/20 to-orange-600/20 border border-orange-400/30">
                      <Bitcoin className="h-4 w-4 text-orange-400" />
                      <span className="font-heading font-semibold">{formData.reward[0]} sBTC</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Max Applicants</Label>
                <div className="px-2">
                  <Slider
                    value={formData.maxApplicants}
                    onValueChange={(value) => updateFormData({ maxApplicants: value })}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center mt-2">
                    <span className="text-sm font-medium">{formData.maxApplicants[0]} applicants</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location and Deadline */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA or Remote"
                  value={formData.location}
                  onChange={(e) => updateFormData({ location: e.target.value })}
                  className="bg-muted/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Application Deadline *</Label>
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
                    <span>Creating Job Pool...</span>
                  </div>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Job Pool
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
