import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, X, Minus, Maximize2, MessageSquare, Bot, User, Trash2 } from 'lucide-react'
import { generateResponse } from '../bot.js'
import ReactMarkdown from "react-markdown"
import './chatbox.css'
import leetcode from '../assets/leetcode.png'

function Chatbox({ messages, setMessages }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [isResizing, setIsResizing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dimensions, setDimensions] = useState({ width: 400, height: 600 })

    const [input, setInput] = useState('')
    const scrollRef = useRef(null)
    const containerRef = useRef(null)

    const handleResizeStart = (e) => {
        e.preventDefault()
        setIsResizing(true)
        const startX = e.clientX
        const startY = e.clientY
        const startWidth = dimensions.width
        const startHeight = dimensions.height

        const onMouseMove = (moveEvent) => {
            const deltaX = startX - moveEvent.clientX
            const deltaY = startY - moveEvent.clientY

            setDimensions({
                width: Math.max(320, startWidth + deltaX),
                height: Math.max(400, startHeight + deltaY)
            })
        }

        const onMouseUp = () => {
            setIsResizing(false)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages, isOpen, isMinimized, isLoading])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMsg = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsLoading(true)

        try {
            const res = await generateResponse([...messages, userMsg])
            setMessages(prev => [...prev, { role: 'ai', content: res }])
        } catch (error) {
            console.error("AI Error:", error)
            setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error. Please check your API key and try again." }])
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) {
        return (
            <button
                id="lh-launcher-btn"
                onClick={() => setIsOpen(true)}
            >
                <div id="lh-launcher-pulse" />
                <MessageSquare className="w-6 h-6" />
                <div id="lh-launcher-tooltip">
                    Ask Leet helper
                </div>
            </button>
        )
    }

    return (
        <div
            ref={containerRef}
            id="lh-chat-container"
            className={`${isResizing ? 'resizing' : 'animating'}`}
            style={{
                width: isMinimized ? '300px' : `${dimensions.width}px`,
                height: isMinimized ? '64px' : `${dimensions.height}px`
            }}
        >
            {/* Resize Handle (Top-Left) */}
            {!isMinimized && (
                <div
                    id="lh-resize-handle"
                    onMouseDown={handleResizeStart}
                >
                    <div id="lh-resize-grip" />
                </div>
            )}

            {/* Header */}
            <header id="lh-chat-header">
                <div className="lh-header-title-group">
                    <div className="lh-header-icon-container">
                        <img src='/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png' style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div>
                        <h2 className="lh-header-title">Leet Helper</h2>
                        <div className="lh-header-status">
                            <div className="lh-status-dot" />
                            <span className="lh-status-text">Active Overlay</span>
                        </div>
                    </div>
                </div>
                <div className="lh-header-actions">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lh-icon-btn lh-close-btn"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </header>

            {!isMinimized && (
                <>
                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        id="lh-message-area"
                        className="scrollbar-thin"
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`lh-message-row ${msg.role === 'user' ? 'lh-user-row' : ''}`}
                            >
                                <div className={`lh-avatar ${msg.role === 'ai' ? 'lh-ai-avatar' : 'lh-user-avatar'}`}>
                                    {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                </div>
                                <div className={`lh-message-bubble ${msg.role === 'ai' ? 'lh-ai-bubble' : 'lh-user-bubble'}`}>
                                    <ReactMarkdown
                                        children={msg.content}
                                        components={{
                                            p: ({ children }) => <p style={{ marginBottom: "10px" }}>{children}</p>
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="lh-message-row">
                                <div className="lh-avatar lh-ai-avatar">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="lh-loading-container">
                                    <div className="lh-dot" />
                                    <div className="lh-dot" />
                                    <div className="lh-dot" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div id="lh-input-area">
                        <div id="lh-input-container">
                            <textarea
                                id="lh-chat-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSend()
                                    }
                                }}
                                placeholder="Ask about this problem..."
                                rows={1}
                            />
                            <button
                                id="lh-send-btn"
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Chatbox
