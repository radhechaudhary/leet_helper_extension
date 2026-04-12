import React, { useEffect, useState } from 'react'
import Chatbox from './components/chatbox'

function ContentPage() {
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hello! I'm your LeetCode AI assistant. How can I help you optimize your solution today?" }
    ])
    const [dec, setDesc] = useState('');

    useEffect(() => {
        const descMetaTag = document.querySelector("meta[name=description]")
        setDesc(descMetaTag.getAttribute("content"))
    }, [])
    return (
        <div className='leetcode-ai-root shadow-2xl'>
            <Chatbox messages={messages} setMessages={setMessages} />
        </div>
    )
}

export default ContentPage