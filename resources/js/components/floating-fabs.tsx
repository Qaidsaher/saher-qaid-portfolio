
import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, X, Paperclip, ExternalLink, Smile, ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "@inertiajs/react"

export function FloatingFabs() {

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
      messageType: "text",
      status: "read",
    },
    {
      id: "2",
      role: "assistant",
      content: "I can help with coding questions, provide information, or assist with various tasks.",
      timestamp: new Date(Date.now() - 60000),
      messageType: "text",
      status: "read",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fabsVisible, setFabsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null)
  const [typingText, setTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState({ min: 15, max: 35 })

  type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
    attachment?: {
      name: string
      type: string
      url?: string
    }
    messageType?: "text" | "code" | "link" | "file" | "image"
    status?: "sent" | "delivered" | "read"
    imageUrl?: string
    linkPreview?: {
      title: string
      description: string
      image: string
      url: string
    }
  }

  // Hide FABs on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current + 50) {
        setFabsVisible(false)
        lastScrollY.current = currentScrollY
      } else if (currentScrollY < lastScrollY.current - 50) {
        setFabsVisible(true)
        lastScrollY.current = currentScrollY
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom()
    }
  }, [messages, isChatOpen])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      messageType: "text",
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      // Update status of user message to "read"
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" as const } : msg)))

      // Determine response type based on user input
      let messageType: "text" | "code" | "link" | "image" = "text"
      let content = ""
      let imageUrl = ""
      let linkPreview = null

      if (
        inputValue.toLowerCase().includes("code") ||
        inputValue.toLowerCase().includes("function") ||
        inputValue.toLowerCase().includes("programming")
      ) {
        messageType = "code"
        content = `Here's an example function in JavaScript:
\`\`\`javascript
function calculateTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}
\`\`\`
This function takes an array of items with price and quantity properties and returns the total cost.`
      } else if (
        inputValue.toLowerCase().includes("link") ||
        inputValue.toLowerCase().includes("website") ||
        inputValue.toLowerCase().includes("resource")
      ) {
        messageType = "link"
        content = `Here are some helpful resources:`
        linkPreview = {
          title: "MDN Web Docs",
          description: "Resources for developers, by developers",
          image: "https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png",
          url: "https://developer.mozilla.org",
        }
      } else if (
        inputValue.toLowerCase().includes("image") ||
        inputValue.toLowerCase().includes("picture") ||
        inputValue.toLowerCase().includes("photo") ||
        inputValue.toLowerCase().includes("chart") ||
        inputValue.toLowerCase().includes("graph")
      ) {
        messageType = "image"
        content = "Here's a visualization of the data you requested:"
        imageUrl = "https://miro.medium.com/v2/resize:fit:720/format:webp/1*K-4RqDC6zFrpAG31ayDDOg.png"
      } else {
        const responses = [
          "I'm happy to help with that! Let me know if you need more details.",
          "That's an interesting question. Here's what I think would work best for your situation.",
          "Based on my analysis, I'd recommend the following approach to solve this problem.",
          "I've looked into this, and here's what I found that might help you.",
          "Great question! Here's a comprehensive answer to help you understand this better.",
        ]
        content = responses[Math.floor(Math.random() * responses.length)]
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: content,
        timestamp: new Date(),
        messageType: messageType,
        status: "sent",
        imageUrl: imageUrl,
        linkPreview: linkPreview as any,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)

      // Start the typing animation
      setTypingMessageId(assistantMessage.id)
      setTypingText("")
      setTypingIndex(0)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a message with the file attachment
    const fileMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `Sent a file: ${file.name}`,
      timestamp: new Date(),
      attachment: {
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      },
    }

    setMessages((prev) => [...prev, fileMessage])

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    // Simulate AI response to the file
    setIsTyping(true)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've received your file "${file.name}". What would you like me to do with it?`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)

      // Start the typing animation
      setTypingMessageId(assistantMessage.id)
      setTypingText("")
      setTypingIndex(0)
    }, 1500)
  }

  // Animation variants
  const fabContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const fabItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const chatWindowVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const linkPreviewVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2,
      },
    },
  }

  // Text generation animation effect
  useEffect(() => {
    if (!typingMessageId) return

    const message = messages.find((m) => m.id === typingMessageId)
    if (!message) return

    if (typingIndex < message.content.length) {
      const delay = Math.floor(Math.random() * (typingSpeed.max - typingSpeed.min + 1)) + typingSpeed.min

      const timeout = setTimeout(() => {
        // Handle HTML tags properly
        if (message.content[typingIndex] === "<" && message.content.indexOf(">", typingIndex) > typingIndex) {
          const closeTagIndex = message.content.indexOf(">", typingIndex)
          setTypingText((prev) => prev + message.content.substring(typingIndex, closeTagIndex + 1))
          setTypingIndex(closeTagIndex + 1)
        }
        // Handle code blocks properly
        else if (
          typingIndex + 3 < message.content.length &&
          message.content.substring(typingIndex, typingIndex + 3) === "```"
        ) {
          const endCodeBlock = message.content.indexOf("```", typingIndex + 3)
          if (endCodeBlock !== -1) {
            setTypingText((prev) => prev + message.content.substring(typingIndex, endCodeBlock + 3))
            setTypingIndex(endCodeBlock + 3)
          } else {
            setTypingText((prev) => prev + message.content[typingIndex])
            setTypingIndex(typingIndex + 1)
          }
        } else {
          setTypingText((prev) => prev + message.content[typingIndex])
          setTypingIndex(typingIndex + 1)
        }
      }, delay)

      return () => clearTimeout(timeout)
    } else {
      // Finished typing
      setTypingMessageId(null)
      setTypingText("")
      setTypingIndex(0)
    }
  }, [typingMessageId, typingIndex, messages, typingSpeed])

  return (
    <>
      {/* Backdrop for chat when open */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={toggleChat}
          />
        )}
      </AnimatePresence>

      {/* FABs Container */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
        variants={fabContainerVariants}
        initial="hidden"
        animate={fabsVisible ? "visible" : "hidden"}
      >
        {/* WhatsApp FAB */}
        <motion.div variants={fabItemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transition-all hover:shadow-green-500/25 hover:shadow-xl"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.div>
              <motion.span
                className="absolute -right-6 -top-6 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-green-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                  delay: 1,
                }}
              >
                1
              </motion.span>
            </div>
          </Link>
        </motion.div>

        {/* LinkedIn FAB */}
        <motion.div variants={fabItemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="https://linkedin.com/in/johnprogrammer"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transition-all hover:shadow-blue-500/25 hover:shadow-xl"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.div>
              <motion.span
                className="absolute -right-6 -top-6 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-blue-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                  delay: 1,
                }}
              >
                2
              </motion.span>
            </div>
          </Link>
        </motion.div>

        {/* AI Assistant FAB */}
        <motion.div variants={fabItemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={toggleChat}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg transition-all hover:shadow-purple-500/25 hover:shadow-xl"
          >
            <motion.div
              animate={
                isChatOpen
                  ? { rotate: 90 }
                  : {
                      rotate: [0, 0, -10, 10, 0],
                      scale: [1, 1, 1.1, 1.1, 1],
                    }
              }
              transition={
                isChatOpen
                  ? {
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }
                  : {
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 4,
                    }
              }
              className="transition-transform duration-300 group-hover:scale-110"
            >
              {isChatOpen ? <X size={12} /> : <MessageSquare size={12} />}
            </motion.div>
            {!isChatOpen && (
              <motion.span
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-purple-500"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                3
              </motion.span>
            )}
          </button>
        </motion.div>

        {/* Chat Window */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              variants={chatWindowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-20 right-0 w-80 overflow-hidden rounded-2xl border bg-background/80 backdrop-blur-md shadow-2xl sm:w-96"
            >
              <div className="flex items-center justify-between border-b bg-gradient-to-r from-violet-500/10 to-purple-500/10 p-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-gradient-to-r from-violet-500 to-purple-600 p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                      <span className="text-xs font-medium text-purple-600">AI</span>
                    </div>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-medium">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="h-7 w-7 rounded-full hover:bg-purple-500/10"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <div
                className="h-80 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.03) 0%, rgba(124, 58, 237, 0) 70%)",
                }}
              >
                <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} group`}
                    >
                      {message.role === "assistant" && (
                        <div className="mr-1 mt-1 flex-shrink-0">
                          <Avatar className="h-6 w-6 bg-gradient-to-r from-violet-500 to-purple-600 p-[1px]">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                              {message.messageType === "code" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-purple-600"
                                >
                                  <polyline points="16 18 22 12 16 6"></polyline>
                                  <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                              ) : message.messageType === "link" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-purple-600"
                                >
                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                              ) : message.messageType === "image" ? (
                                <ImageIcon className="h-4 w-4 text-purple-600" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-purple-600"
                                >
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                              )}
                            </div>
                          </Avatar>
                        </div>
                      )}

                      <div
                        className={`max-w-[75%] rounded-xl p-2 text-xs ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                            : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
                        }`}
                      >
                        {message.messageType === "code" ? (
                          <div className="prose-sm max-w-none dark:prose-invert">
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  message.id === typingMessageId
                                    ? typingText.replace(
                                        /```(\w+)?\n([\s\S]*?)```/g,
                                        (_, lang, code) =>
                                          `<div class="mt-2 rounded-md bg-gray-800 p-2 text-xs text-white overflow-x-auto"><pre>${code}</pre></div>`,
                                      )
                                    : message.content.replace(
                                        /```(\w+)?\n([\s\S]*?)```/g,
                                        (_, lang, code) =>
                                          `<div class="mt-2 rounded-md bg-gray-800 p-2 text-xs text-white overflow-x-auto"><pre>${code}</pre></div>`,
                                      ),
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: message.id === typingMessageId ? typingText : message.content,
                            }}
                          />
                        )}
                        {message.id === typingMessageId && (
                          <span className="ml-[1px] inline-block h-4 w-2 animate-pulse bg-current"></span>
                        )}

                        {/* Image Message */}
                        {message.messageType === "image" && message.imageUrl && (
                          <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            className="mt-3 overflow-hidden rounded-lg"
                          >
                            <img
                              src={message.imageUrl || "/placeholder.svg"}
                              alt="Assistant shared image"
                              className="h-auto w-full object-cover transition-transform hover:scale-105"
                            />
                          </motion.div>
                        )}

                        {/* Link Preview */}
                        {message.messageType === "link" && message.linkPreview && (
                          <motion.div
                            variants={linkPreviewVariants}
                            initial="hidden"
                            animate="visible"
                            className="mt-3 overflow-hidden rounded-lg border bg-white dark:bg-gray-900"
                          >
                            <a
                              href={message.linkPreview.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block transition-transform hover:scale-[1.02]"
                            >
                              <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img
                                  src={message.linkPreview.image || "/placeholder.svg"}
                                  alt={message.linkPreview.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="p-3">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {message.linkPreview.title}
                                </h4>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  {message.linkPreview.description}
                                </p>
                                <div className="mt-2 flex items-center gap-1 text-xs text-blue-500">
                                  <ExternalLink className="h-3 w-3" />
                                  <span>{message.linkPreview.url.replace(/^https?:\/\//, "")}</span>
                                </div>
                              </div>
                            </a>
                          </motion.div>
                        )}

                        {message.attachment && (
                          <div className="mt-2 overflow-hidden rounded-lg border bg-background/90 p-2 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-xs">
                              <Paperclip className="h-3 w-3" />
                              <span className="truncate font-medium">{message.attachment.name}</span>
                              {message.attachment.url && (
                                <a
                                  href={message.attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-auto text-blue-500 transition-colors hover:text-blue-600"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                            {message.attachment.type.startsWith("image/") && message.attachment.url && (
                              <div className="mt-2 overflow-hidden rounded-md">
                                <img
                                  src={message.attachment.url || "/placeholder.svg"}
                                  alt={message.attachment.name}
                                  className="h-auto w-full object-cover transition-transform hover:scale-105"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        <div
                          className={`mt-1 flex items-center justify-end gap-1 text-right text-[10px] ${message.role === "user" ? "opacity-70" : "opacity-50"}
                        `}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          {message.role === "user" && message.status && (
                            <span className="ml-1">
                              {message.status === "sent" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              ) : message.status === "delivered" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-white"
                                >
                                  <path d="M18 6L7 17L2 12"></path>
                                  <path d="M22 10L13 19L11 17"></path>
                                </svg>
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {message.role === "user" && (
                        <div className="ml-1 mt-1 flex-shrink-0">
                          <Avatar className="h-6 w-6 bg-gradient-to-r from-violet-500 to-purple-600 p-[1px]">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
                              <span className="text-[10px] font-medium text-purple-600">You</span>
                            </div>
                          </Avatar>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 p-3 dark:from-gray-800 dark:to-gray-700">
                        <div className="flex items-center gap-1">
                          <motion.div
                            className="h-2 w-2 rounded-full bg-purple-400"
                            animate={{
                              y: [0, -5, 0],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          ></motion.div>
                          <motion.div
                            className="h-2 w-2 rounded-full bg-purple-500"
                            animate={{
                              y: [0, -5, 0],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 0.2,
                              ease: "easeInOut",
                            }}
                          ></motion.div>
                          <motion.div
                            className="h-2 w-2 rounded-full bg-purple-600"
                            animate={{
                              y: [0, -5, 0],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 0.4,
                              ease: "easeInOut",
                            }}
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="border-t bg-gradient-to-r from-violet-500/5 to-purple-500/5 p-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="min-h-[36px] resize-none rounded-full border-purple-100 bg-background/70 pl-3 pr-10 py-1.5 text-xs backdrop-blur-sm focus-visible:ring-purple-500/50 dark:border-purple-900/30"
                      rows={1}
                    />
                    <div className="absolute right-2 top-1 flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-purple-500/10 hover:text-purple-500"
                        onClick={handleFileUpload}
                      >
                        <Paperclip className="h-3 w-3" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-purple-500/10 hover:text-purple-500"
                      >
                        <Smile className="h-3 w-3" />
                        <span className="sr-only">Add emoji</span>
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 p-0 shadow-md hover:shadow-lg hover:shadow-purple-500/25"
                    onClick={handleSendMessage}
                    disabled={inputValue.trim() === ""}
                  >
                    <Send className="h-3 w-3" />
                    <span className="sr-only">Send message</span>
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
