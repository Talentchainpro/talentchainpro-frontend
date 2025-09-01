"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Award, Bitcoin, Shield, Copy, ExternalLink, Sparkles } from "lucide-react"

interface VerificationResultProps {
  skill: string
  code: string
  onComplete: () => void
  onVerifyAnother: () => void
}

interface EvaluationResult {
  score: number
  level: string
  feedback: {
    codeQuality: number
    bestPractices: number
    problemSolving: number
    documentation: number
  }
  proofHash: string
  bitcoinAnchor: boolean
  sbtMinted: boolean
}

export function VerificationResult({ skill, code, onComplete, onVerifyAnother }: VerificationResultProps) {
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    // Simulate evaluation process
    const evaluationSteps = [
      "Analyzing code structure...",
      "Checking best practices...",
      "Evaluating problem-solving approach...",
      "Generating proof hash...",
      "Anchoring to Bitcoin...",
      "Minting SBT...",
    ]

    let stepIndex = 0
    const interval = setInterval(() => {
      setAnimationStep(stepIndex)
      stepIndex++

      if (stepIndex >= evaluationSteps.length) {
        clearInterval(interval)
        // Generate mock result
        const mockResult: EvaluationResult = {
          score: Math.floor(Math.random() * 30) + 70, // 70-100
          level: "Advanced",
          feedback: {
            codeQuality: Math.floor(Math.random() * 20) + 80,
            bestPractices: Math.floor(Math.random() * 25) + 75,
            problemSolving: Math.floor(Math.random() * 30) + 70,
            documentation: Math.floor(Math.random() * 35) + 65,
          },
          proofHash: "0x" + Math.random().toString(16).substr(2, 40),
          bitcoinAnchor: true,
          sbtMinted: true,
        }
        setResult(mockResult)
        setIsLoading(false)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const evaluationSteps = [
    "Analyzing code structure...",
    "Checking best practices...",
    "Evaluating problem-solving approach...",
    "Generating proof hash...",
    "Anchoring to Bitcoin...",
    "Minting SBT...",
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 80) return "text-primary"
    if (score >= 70) return "text-yellow-400"
    return "text-orange-400"
  }

  const copyProofHash = () => {
    if (result?.proofHash) {
      navigator.clipboard.writeText(result.proofHash)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md glassmorphism glow-primary">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold mb-2">Evaluating Your Code</h2>
              <p className="text-sm text-muted-foreground mb-4">{evaluationSteps[animationStep] || "Processing..."}</p>
              <Progress value={((animationStep + 1) / evaluationSteps.length) * 100} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!result) return null

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="glassmorphism glow-primary text-center">
        <CardContent className="pt-8 space-y-4">
          <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary animate-pulse">
            <Award className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold text-primary mb-2">Skill Verified!</h1>
            <p className="text-muted-foreground">Your {skill} skills have been successfully evaluated</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              SBT Minted
            </Badge>
            {result.bitcoinAnchor && (
              <Badge className="bg-gradient-to-r from-orange-400 to-orange-600 text-white border-0 px-4 py-2">
                <Bitcoin className="h-4 w-4 mr-2" />
                Bitcoin Anchored
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Score and Level */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="font-heading">Overall Score</CardTitle>
            <CardDescription>Your skill level assessment</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className={`text-6xl font-bold font-heading ${getScoreColor(result.score)}`}>{result.score}</div>
            <div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {result.level}
              </Badge>
            </div>
            <Progress value={result.score} className="w-full" />
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="font-heading">Detailed Feedback</CardTitle>
            <CardDescription>Breakdown of your evaluation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(result.feedback).map(([category, score]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{category.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className={getScoreColor(score)}>{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Proof Details */}
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="font-heading flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Verification Proof</span>
          </CardTitle>
          <CardDescription>Immutable proof of your skill verification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Proof Hash</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 p-2 bg-muted/50 rounded text-xs font-mono">{result.proofHash}</code>
                <Button size="sm" variant="outline" onClick={copyProofHash}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bitcoin Anchor</label>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm">Anchored to Bitcoin blockchain</span>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-center space-x-4">
        <Button variant="outline" onClick={onVerifyAnother}>
          Verify Another Skill
        </Button>
        <Button onClick={onComplete} className="gradient-border bg-transparent hover:glow-primary">
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}
