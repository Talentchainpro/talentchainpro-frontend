"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface JobFilters {
  search: string
  skills: string[]
  minReward: number
  maxReward: number
  type: string
  status: string
  location: string
}

interface JobFiltersProps {
  filters: JobFilters
  onFiltersChange: (filters: JobFilters) => void
  availableSkills: string[]
}

export function JobFilters({ filters, onFiltersChange, availableSkills }: JobFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [skillInput, setSkillInput] = useState("")

  const updateFilters = (updates: Partial<JobFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      updateFilters({ skills: [...filters.skills, skill] })
    }
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    updateFilters({ skills: filters.skills.filter((s) => s !== skill) })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      skills: [],
      minReward: 0,
      maxReward: 10,
      type: "",
      status: "",
      location: "",
    })
  }

  const filteredSkills = availableSkills.filter(
    (skill) => skill.toLowerCase().includes(skillInput.toLowerCase()) && !filters.skills.includes(skill),
  )

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
            <CardDescription>Find the perfect job pools</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Less" : "More"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search job pools..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10 bg-muted/50 border-border"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.type === "remote" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilters({ type: filters.type === "remote" ? "" : "remote" })}
            className={filters.type === "remote" ? "gradient-border bg-transparent" : ""}
          >
            Remote
          </Button>
          <Button
            variant={filters.status === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilters({ status: filters.status === "active" ? "" : "active" })}
            className={filters.status === "active" ? "gradient-border bg-transparent" : ""}
          >
            Active
          </Button>
        </div>

        {/* Selected Skills */}
        {filters.skills.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Selected Skills</Label>
            <div className="flex flex-wrap gap-2">
              {filters.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  {skill}
                  <Button
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
          </div>
        )}

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border/50">
            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Add Skills</Label>
              <div className="relative">
                <Input
                  id="skills"
                  placeholder="Type to search skills..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && skillInput) {
                      addSkill(skillInput)
                    }
                  }}
                  className="bg-muted/50 border-border"
                />
                {skillInput && filteredSkills.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-card border border-border rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredSkills.slice(0, 5).map((skill) => (
                      <button
                        key={skill}
                        className="w-full text-left px-3 py-2 hover:bg-muted/50 text-sm"
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Reward Range */}
            <div className="space-y-2">
              <Label>Reward Range (sBTC)</Label>
              <div className="px-2">
                <Slider
                  value={[filters.minReward, filters.maxReward]}
                  onValueChange={([min, max]) => updateFilters({ minReward: min, maxReward: max })}
                  max={10}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{filters.minReward} sBTC</span>
                  <span>{filters.maxReward} sBTC</span>
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select value={filters.type || "all"} onValueChange={(value) => updateFilters({ type: value })}>
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status || "all"} onValueChange={(value) => updateFilters({ status: value })}>
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="filled">Filled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => updateFilters({ location: e.target.value })}
                className="bg-muted/50 border-border"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
