"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Shield, Upload, FileText } from "lucide-react"

interface KYCVerificationProps {
  userData: any
  onComplete: () => void
}

export function KYCVerification({ userData, onComplete }: KYCVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)

    // Simulate KYC verification process
    setTimeout(() => {
      setIsVerifying(false)
      setIsComplete(true)

      // Auto-proceed to dashboard after showing success
      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 3000)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-primary/10">
        <Card className="w-full max-w-md glassmorphism glow-primary text-center">
          <CardContent className="pt-8 space-y-6">
            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary">Verification Complete!</h2>
              <p className="text-muted-foreground mt-2">Welcome to TalentChain Pro, {userData.username}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Identity verified</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Wallet connected</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Ready to earn SBTs</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/10">
      <Card className="w-full max-w-md glassmorphism glow-accent">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center glow-accent">
            <Shield className="h-8 w-8 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="font-heading text-2xl">KYC Verification</CardTitle>
            <CardDescription className="text-muted-foreground">
              Verify your identity to access all features
            </CardDescription>
          </div>
          <Progress value={100} className="w-full" />
          <p className="text-xs text-muted-foreground">Step 3 of 3</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
              <h3 className="font-medium mb-2">Profile Information</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium">Username:</span> {userData.username}
                </p>
                <p>
                  <span className="font-medium">Name:</span> {userData.fullName}
                </p>
                <p>
                  <span className="font-medium">Age:</span> {userData.age}
                </p>
                <p>
                  <span className="font-medium">Country:</span> {userData.country}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm">Identity verification (automated)</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-secondary" />
                <span className="text-sm">Compliance check</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Upload className="h-5 w-5 text-accent" />
                <span className="text-sm">Blockchain registration</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full gradient-border bg-transparent hover:glow-accent transition-all duration-300"
            size="lg"
          >
            {isVerifying ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                <span>Verifying Identity...</span>
              </div>
            ) : (
              "Start Verification"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            This process is automated and typically takes 30-60 seconds
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
