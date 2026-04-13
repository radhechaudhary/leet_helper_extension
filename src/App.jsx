import React, { useEffect, useState } from 'react'
import { Sparkles, Key, Save, Terminal, Shield, ChevronRight, Cpu } from 'lucide-react'

function App() {

  const [apiKey, setApiKey] = useState('')
  const [selectedModel, setSelectedModel] = useState('groq-(Llama 3.1 70b)')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (!chrome?.storage?.local) return;
    chrome.storage.local.get(["SELECTED_MODEL"], (result) => {
      setSelectedModel(result.SELECTED_MODEL || "gemini-1-5-pro");
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set({
      API_KEY: apiKey
    });
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const changeModel = async (val) => {
    if (!val) return;

    setSelectedModel(val);

    if (chrome?.storage?.local) {
      await chrome.storage.local.set({
        SELECTED_MODEL: val
      });
    }
    console.log("Model updated:", val);
  };

  return (
    <div className="w-[400px] min-h-[400px] bg-[#0a0a0a] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="p-6 border-b border-zinc-800/50 bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-linear-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                LeetCode AI
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500">System Ready</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors">
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* API Key Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Key className="w-4 h-4" />
            <h2 className="text-sm font-semibold uppercase tracking-wider">Configuration</h2>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold ml-1">AI Model Specialist</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Cpu className="w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <select
                value={selectedModel}
                onChange={(e) => changeModel(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer hover:bg-zinc-800/30"
              >
                {/* <option value="gpt-4o">GPT-4o (Omni)</option> */}
                <option value="open AI">Open AI</option>
                <option value="open Router">Open Router</option>
                <option value="gemini-1-5-pro">Gemini 1.5 Pro</option>
                <option value="groq-(Llama 3.1 70b)">groq (Llama 3.1 70b)</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <ChevronRight className="w-4 h-4 text-zinc-600 rotate-90" />
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500/20 to-violet-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your AI API key..."
                className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
              />
              <button
                onClick={handleSave}
                className="bg-zinc-100 hover:bg-white text-black px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                disabled={!apiKey}
              >
                {isSaved ? <Save className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed italic">
            Your key is encrypted and stored locally in your browser.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Connected</span>
        </div>
      </footer>
    </div>
  )
}

export default App