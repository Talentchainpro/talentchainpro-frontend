"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { WalletConnect } from "@/components/wallet/wallet-connect"
import { UserRegistration } from "@/components/onboarding/user-registration"
import { KYCVerification } from "@/components/onboarding/kyc-verification"

type OnboardingStep = "wallet" | "registration" | "kyc"

interface UserData {
  username: string
  fullName: string
  age: string
  country: string
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("wallet")
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [userData, setUserData] = useState<UserData | null>(null)
  const router = useRouter()

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setCurrentStep("registration")
  }

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data)
    setCurrentStep("kyc")
  }

  const handleKYCComplete = () => {
    // Store user data in localStorage or state management
    localStorage.setItem(
      "talentchain_user",
      JSON.stringify({
        walletAddress,
        ...userData,
        isVerified: true,
      }),
    )
    router.push("/")
  }

  return (
    <div className="min-h-screen">
      {currentStep === "wallet" && <WalletConnect onConnect={handleWalletConnect} />}
      {currentStep === "registration" && (
        <UserRegistration walletAddress={walletAddress} onComplete={handleRegistrationComplete} />
      )}
      {currentStep === "kyc" && userData && <KYCVerification userData={userData} onComplete={handleKYCComplete} />}
    </div>
  )
}
