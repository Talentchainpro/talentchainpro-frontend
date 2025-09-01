"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Wallet, Bell, Shield, Palette, Download, Trash2, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    jobMatches: true,
    daoProposals: true,
    skillVerification: false,
    marketing: false,
  })

  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [isDemoMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("talentchain_demo_mode") === "true",
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and platform settings</p>
        {isDemoMode && (
          <Badge variant="secondary" className="mt-2">
            Demo Mode Active
          </Badge>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="glassmorphism border-border">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and professional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Chen" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex.chen@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                  defaultValue="Full-stack developer with 5+ years experience in Web3 and blockchain technologies."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>
              <Button className="w-full">Save Profile Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet" className="space-y-6">
          <Card className="glassmorphism border-border">
            <CardHeader>
              <CardTitle>Wallet Connection</CardTitle>
              <CardDescription>Manage your connected wallets and blockchain settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/50">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{isDemoMode ? "Demo Wallet" : "Xverse Wallet"}</p>
                    <p className="text-sm text-muted-foreground">{isDemoMode ? "SP1234...DEMO" : "SP1052...HB6V"}</p>
                  </div>
                </div>
                <Badge variant={isDemoMode ? "secondary" : "default"}>{isDemoMode ? "Demo" : "Connected"}</Badge>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-connect on startup</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically connect to your wallet when opening the app
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Transaction notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about transaction status</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Backup Phrase</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type={showPrivateKey ? "text" : "password"}
                    value={
                      showPrivateKey
                        ? "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12"
                        : "••••••••••••••••••••••••"
                    }
                    readOnly
                  />
                  <Button variant="outline" size="icon" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                    {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Keep your backup phrase secure and never share it</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export Wallet
                </Button>
                <Button variant="destructive" className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glassmorphism border-border">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Job Match Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when jobs match your skills</p>
                </div>
                <Switch
                  checked={notifications.jobMatches}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, jobMatches: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>DAO Proposal Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications about new proposals and voting</p>
                </div>
                <Switch
                  checked={notifications.daoProposals}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, daoProposals: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Skill Verification Results</Label>
                  <p className="text-sm text-muted-foreground">Updates on your skill verification status</p>
                </div>
                <Switch
                  checked={notifications.skillVerification}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, skillVerification: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Marketing & Updates</Label>
                  <p className="text-sm text-muted-foreground">Platform updates and promotional content</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                />
              </div>

              <Button className="w-full">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="glassmorphism border-border">
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Control your data privacy and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to employers</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Skill Badge Display</Label>
                  <p className="text-sm text-muted-foreground">Show your verified skills publicly</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Activity Tracking</Label>
                  <p className="text-sm text-muted-foreground">Allow analytics for platform improvement</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Export</Label>
                  <p className="text-sm text-muted-foreground">Download all your platform data</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-destructive">Danger Zone</Label>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="glassmorphism border-border">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                    <div className="h-6 w-6 rounded bg-background border mb-2" />
                    Light
                  </Button>
                  <Button variant="default" className="h-20 flex flex-col items-center justify-center">
                    <div className="h-6 w-6 rounded bg-foreground mb-2" />
                    Dark
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                    <div className="h-6 w-6 rounded bg-gradient-to-br from-background to-foreground mb-2" />
                    Auto
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </select>
              </div>

              <Button className="w-full">Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
