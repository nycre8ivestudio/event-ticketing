"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type FormData = {
  name: string
  email: string
  companyName: string
  companySize: string
  role: string
  experience: string
  goals: string[]
}

const initialFormData: FormData = {
  name: "",
  email: "",
  companyName: "",
  companySize: "",
  role: "",
  experience: "",
  goals: [],
}

export default function Component() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5))
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <CompanyStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <RoleStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <PreferencesStep formData={formData} updateFormData={updateFormData} />
      case 5:
        return <ConfirmationStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>SaaS Onboarding - Step {step} of 5</CardTitle>
      </CardHeader>
      <CardContent>{renderStep()}</CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={handlePrev} variant="outline">
            Previous
          </Button>
        )}
        {step < 5 ? (
          <Button onClick={handleNext} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button onClick={() => console.log("Form submitted:", formData)} className="ml-auto">
            Complete Onboarding
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function WelcomeStep({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: string) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Welcome! Let's get started.</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="john@example.com"
        />
      </div>
    </div>
  )
}

function CompanyStep({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: string) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Tell us about your company</h2>
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => updateFormData("companyName", e.target.value)}
          placeholder="Acme Inc."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companySize">Company Size</Label>
        <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-200">51-200 employees</SelectItem>
            <SelectItem value="201-500">201-500 employees</SelectItem>
            <SelectItem value="500+">500+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function RoleStep({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: string) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">What's your role?</h2>
      <div className="space-y-2">
        <Label htmlFor="role">Your Role</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => updateFormData("role", e.target.value)}
          placeholder="e.g. Marketing Manager"
        />
      </div>
      <div className="space-y-2">
        <Label>Experience Level</Label>
        <RadioGroup value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="beginner" id="beginner" />
            <Label htmlFor="beginner">Beginner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediate" id="intermediate" />
            <Label htmlFor="intermediate">Intermediate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="advanced" id="advanced" />
            <Label htmlFor="advanced">Advanced</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function PreferencesStep({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: string[]) => void }) {
  const toggleGoal = (goal: string) => {
    const updatedGoals = formData.goals.includes(goal)
      ? formData.goals.filter((g) => g !== goal)
      : [...formData.goals, goal]
    updateFormData("goals", updatedGoals)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">What are your goals?</h2>
      <div className="space-y-2">
        {["Increase productivity", "Improve team collaboration", "Streamline workflows", "Enhance customer support", "Boost sales"].map((goal) => (
          <div key={goal} className="flex items-center space-x-2">
            <Checkbox id={goal} checked={formData.goals.includes(goal)} onCheckedChange={() => toggleGoal(goal)} />
            <Label htmlFor={goal}>{goal}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConfirmationStep({ formData }: { formData: FormData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Confirm your information</h2>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Company:</strong> {formData.companyName}
        </p>
        <p>
          <strong>Company Size:</strong> {formData.companySize}
        </p>
        <p>
          <strong>Role:</strong> {formData.role}
        </p>
        <p>
          <strong>Experience:</strong> {formData.experience}
        </p>
        <p>
          <strong>Goals:</strong> {formData.goals.join(", ")}
        </p>
      </div>
    </div>
  )
}