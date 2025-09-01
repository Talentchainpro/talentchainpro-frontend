"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Code, Upload, FileText, Lightbulb } from "lucide-react"

interface CodeEditorProps {
  skill: string
  onSubmit: (code: string) => void
  onBack: () => void
}

const skillExamples = {
  React: `// Example: Create a counter component
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,
  TypeScript: `// Example: Define interfaces and implement a class
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}`,
  Solidity: `// Example: Simple smart contract
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    function set(uint256 x) public {
        storedData = x;
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}`,
}

export function CodeEditor({ skill, onSubmit, onBack }: CodeEditorProps) {
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!code.trim()) return

    setIsSubmitting(true)
    // Simulate API call delay
    setTimeout(() => {
      onSubmit(code)
      setIsSubmitting(false)
    }, 2000)
  }

  const loadExample = () => {
    const example = skillExamples[skill as keyof typeof skillExamples] || "// Write your code here..."
    setCode(example)
  }

  return (
    <div className="space-y-6">
      <Card className="glassmorphism glow-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="font-heading">Code Verification</CardTitle>
                <CardDescription>Submit your {skill} code for evaluation</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              {skill}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Paste your code below or upload a file</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={loadExample}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Load Example
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
          </div>

          <Textarea
            placeholder={`// Write your ${skill} code here...
// Your code will be evaluated for:
// - Syntax correctness
// - Best practices
// - Problem-solving approach
// - Code quality and structure`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[400px] font-mono text-sm bg-muted/50 border-border"
          />

          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={onBack}>
              Back to Skills
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!code.trim() || isSubmitting}
              className="gradient-border bg-transparent hover:glow-primary transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span>Evaluating Code...</span>
                </div>
              ) : (
                "Submit for Evaluation"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Evaluation Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-sm">Code Quality</p>
                <p className="text-xs text-muted-foreground">Clean, readable, and well-structured code</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
              <div>
                <p className="font-medium text-sm">Best Practices</p>
                <p className="text-xs text-muted-foreground">Follow language-specific conventions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-accent mt-2" />
              <div>
                <p className="font-medium text-sm">Problem Solving</p>
                <p className="text-xs text-muted-foreground">Demonstrate logical thinking and efficiency</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-chart-4 mt-2" />
              <div>
                <p className="font-medium text-sm">Documentation</p>
                <p className="text-xs text-muted-foreground">Include comments and clear variable names</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
