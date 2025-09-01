"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Code, Database, Globe, Smartphone, Shield, Cpu } from "lucide-react"

const skillCategories = [
  {
    name: "Frontend",
    icon: Globe,
    skills: ["React", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML/CSS", "Next.js", "Svelte"],
    color: "from-primary to-secondary",
  },
  {
    name: "Backend",
    icon: Database,
    skills: ["Node.js", "Python", "Java", "Go", "Rust", "PHP", "Ruby", "C#"],
    color: "from-secondary to-accent",
  },
  {
    name: "Blockchain",
    icon: Shield,
    skills: ["Solidity", "Web3.js", "Ethers.js", "Smart Contracts", "DeFi", "Bitcoin", "Stacks", "Clarity"],
    color: "from-accent to-primary",
  },
  {
    name: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin"],
    color: "from-chart-4 to-chart-5",
  },
  {
    name: "DevOps",
    icon: Cpu,
    skills: ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Terraform", "Jenkins"],
    color: "from-chart-5 to-primary",
  },
]

interface SkillSelectorProps {
  onSkillSelect: (skill: string) => void
}

export function SkillSelector({ onSkillSelect }: SkillSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategories = skillCategories.map((category) => ({
    ...category,
    skills: category.skills.filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  }))

  const displayCategories = selectedCategory
    ? filteredCategories.filter((cat) => cat.name === selectedCategory)
    : filteredCategories

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-muted/50 border-border"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? "gradient-border bg-transparent" : ""}
        >
          All Categories
        </Button>
        {skillCategories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.name)}
            className={selectedCategory === category.name ? "gradient-border bg-transparent" : ""}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="space-y-6">
        {displayCategories.map((category) => (
          <Card key={category.name} className="glassmorphism">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="font-heading">{category.name}</CardTitle>
                  <CardDescription>{category.skills.length} skills available</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {category.skills.map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    onClick={() => onSkillSelect(skill)}
                    className="justify-start h-auto p-3 hover:glow-primary transition-all duration-300"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    {skill}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
