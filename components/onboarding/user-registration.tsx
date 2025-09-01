"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { User } from "lucide-react"

interface UserRegistrationProps {
  walletAddress: string
  onComplete: (userData: UserData) => void
}

interface UserData {
  username: string
  fullName: string
  age: string
  country: string
}

export function UserRegistration({ walletAddress, onComplete }: UserRegistrationProps) {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    fullName: "",
    age: "",
    country: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onComplete(formData)
      setIsSubmitting(false)
    }, 1500)
  }

  const isFormValid = formData.username && formData.fullName && formData.age && formData.country

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/10">
      <Card className="w-full max-w-md glassmorphism glow-secondary">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center glow-secondary">
            <User className="h-8 w-8 text-secondary-foreground" />
          </div>
          <div>
            <CardTitle className="font-heading text-2xl">Complete Your Profile</CardTitle>
            <CardDescription className="text-muted-foreground">Set up your TalentChain Pro identity</CardDescription>
          </div>
          <Progress value={66} className="w-full" />
          <p className="text-xs text-muted-foreground">Step 2 of 3</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-muted/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-muted/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="bg-muted/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full gradient-border bg-transparent hover:glow-secondary transition-all duration-300"
                size="lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
                    <span>Creating Profile...</span>
                  </div>
                ) : (
                  "Continue to KYC"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Connected Wallet:</span> {walletAddress.slice(0, 8)}...
              {walletAddress.slice(-8)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
