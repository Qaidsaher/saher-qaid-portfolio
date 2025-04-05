import { useState, useEffect } from "react"
import { Head } from '@inertiajs/react'
import UserLayout from "@/layouts/user-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { Link, usePage } from "@inertiajs/react";
import { type SharedData } from '@/types';

type ContactInfo = {
  email: string
  phone: string
  location: string
}

type Availability = {
  status: string
  responseTime: string
  preferredProjects: string
}

const Index = () => {
    const { website } = usePage<SharedData>().props;

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Contact info state
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email:  ((website as { email: string })?.email) ?? "saherqaid2020@gmail.com",
    phone: ((website as { phone: string })?.phone) ?? "+967 712238264",
    location: ((website as { location: string })?.location) ?? "Yemen Ibb city",
  })

  // Availability state
  const [availability, setAvailability] = useState<Availability>({
    status:((website as { status: string })?.status) ?? "Open to Offers",
    responseTime: ((website as { responseTime: string })?.responseTime) ??"Within 24 hours",
    preferredProjects:((website as { preferredProjects: string })?.preferredProjects) ?? "Web & Mobile Apps",
  })

  // Function to update form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you can call your Laravel API endpoint to save the message,
    // for example using axios or fetch.
    // await axios.post('/api/contact', formData)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    alert(JSON.stringify(formData))
    setIsSubmitting(false)
  }

  // Example functions to update the contact and availability info dynamically.
  // You could call these functions on input change, via a modal, or when fetching data from Laravel.
  const updateContactInfo = (newInfo: Partial<ContactInfo>) => {
    setContactInfo((prev) => ({ ...prev, ...newInfo }))
  }

  const updateAvailability = (newData: Partial<Availability>) => {
    setAvailability((prev) => ({ ...prev, ...newData }))
  }

  // Example: Update contact info on mount from an API (Laravel endpoint)
  useEffect(() => {
    // Uncomment and adjust the API call as needed.
    // fetch('/api/contact-info')
    //   .then(response => response.json())
    //   .then((data: ContactInfo) => setContactInfo(data))
  }, [])

  return (
    <>
      <Head title="Contact" />
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl">
            Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <div className="md:col-span-1 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">{contactInfo.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>Current status and response time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Project Availability</span>
                    <span className="text-sm font-medium">{availability.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">{availability.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Preferred Projects</span>
                    <span className="text-sm font-medium">{availability.preferredProjects}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

Index.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default Index
