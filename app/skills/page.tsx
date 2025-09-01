"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { SkillSelector } from "@/components/skills/skill-selector"
import { CodeEditor } from "@/components/skills/code-editor"
import { VerificationResult } from "@/components/skills/verification-result"

type SkillVerificationStep = "select" | "code" | "result"

export default function SkillsPage() {
  const [currentStep, setCurrentStep] = useState<SkillVerificationStep>("select")
  const [selectedSkill, setSelectedSkill] = useState<string>("")
  const [submittedCode, setSubmittedCode] = useState<string>("")
  const router = useRouter()

  const handleSkillSelect = (skill: string) => {
    setSelectedSkill(skill)
    setCurrentStep("code")
  }

  const handleCodeSubmit = (code: string) => {
    setSubmittedCode(code)
    setCurrentStep("result")
  }

  const handleComplete = () => {
    router.push("/")
  }

  const handleVerifyAnother = () => {
    setSelectedSkill("")
    setSubmittedCode("")
    setCurrentStep("select")
  }

  const handleBack = () => {
    setCurrentStep("select")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 md:ml-64">
        <Header />

        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-4xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold mb-2">Skill Verification</h1>
              <p className="text-muted-foreground">
                {currentStep === "select" && "Choose a skill to verify and earn your SBT"}
                {currentStep === "code" && `Submit your ${selectedSkill} code for evaluation`}
                {currentStep === "result" && "Your skill has been verified and SBT minted"}
              </p>
            </div>

            {/* Step Content */}
            {currentStep === "select" && <SkillSelector onSkillSelect={handleSkillSelect} />}
            {currentStep === "code" && (
              <CodeEditor skill={selectedSkill} onSubmit={handleCodeSubmit} onBack={handleBack} />
            )}
            {currentStep === "result" && (
              <VerificationResult
                skill={selectedSkill}
                code={submittedCode}
                onComplete={handleComplete}
                onVerifyAnother={handleVerifyAnother}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
