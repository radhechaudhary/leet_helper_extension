import { useState, useEffect, useRef } from 'react'

const PROBLEMS = [
  { id: 1, title: "Two Sum", diff: "Easy", tag: "Array", solved: true },
  { id: 2, title: "Longest Substring", diff: "Medium", tag: "Sliding Window", solved: true },
  { id: 3, title: "Median of Two Sorted Arrays", diff: "Hard", tag: "Binary Search", solved: false },
  { id: 4, title: "Valid Parentheses", diff: "Easy", tag: "Stack", solved: true },
  { id: 5, title: "Merge k Sorted Lists", diff: "Hard", tag: "Heap", solved: false },
]

const FEATURES = [
  {
    icon: "⚡",
    title: "Instant AI Hints",
    desc: "Get context-aware hints without spoilers. The AI nudges you in the right direction, not the answer.",
  },
  {
    icon: "🧠",
    title: "Pattern Recognition",
    desc: "Automatically detects DP, Graph, Greedy and more — and teaches you the pattern behind the problem.",
  },
  {
    icon: "🔍",
    title: "Complexity Analysis",
    desc: "Ask the AI to analyze time and space complexity of your solution with clear explanations.",
  },
  {
    icon: "💬",
    title: "Multi-Model Support",
    desc: "Choose from Gemini, GPT-4, Groq, Ollama, or OpenRouter. Your key, your model, your privacy.",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    desc: "Visual breakdown of solved problems across difficulties. Spot your weak spots at a glance.",
  },
  {
    icon: "🛡️",
    title: "100% Private",
    desc: "API keys are encrypted and stored locally in your browser. Nothing ever leaves your machine.",
  },
]

const CHROME_STEPS = [
  { n: "01", title: "Download Dist ZIP", desc: "Click the 'Download Chrome Dist (.zip)' button above to save leet-helper-1.0.zip.", code: "leet-helper-1.0.zip" },
  { n: "02", title: "Extract the Archive", desc: "Unzip leet-helper-1.0.zip on your computer to get the built extension folder.", code: "unzip leet-helper-1.0.zip" },
  { n: "03", title: "Open Extensions Page", desc: "Navigate to chrome://extensions/ in your Chrome address bar.", code: "chrome://extensions/" },
  { n: "04", title: "Enable Developer Mode", desc: "Toggle on 'Developer mode' located in the top-right corner of the Extensions page." },
  { n: "05", title: "Load Unpacked Extension", desc: "Click 'Load unpacked' in the top-left and select the unzipped dist folder." },
]

const FIREFOX_STEPS = [
  { n: "01", title: "Visit Firefox Add-ons", desc: "Open the official Firefox Add-on listing page for LeetCode AI Helper.", link: "https://addons.mozilla.org/en-US/firefox/addon/leetcode-ai-helper/" },
  { n: "02", title: "Click 'Add to Firefox'", desc: "Press the blue 'Add to Firefox' button on the Firefox Add-on store page." },
  { n: "03", title: "Confirm Permissions", desc: "Click 'Add' on the browser confirmation popup to complete installation." },
  { n: "04", title: "Ready for Fedora & Linux", desc: "Open any problem on LeetCode in Firefox on Fedora or Linux and start chatting with AI!" },
]

const STATS = [
  { value: "50K+", label: "Active Users" },
  { value: "200+", label: "LeetCode Problems Covered" },
  { value: "6", label: "AI Models Supported" },
  { value: "4.9★", label: "Rating across Stores" },
]

const diffClass = (d) =>
  d === 'Easy' ? 'difficulty-easy' : d === 'Medium' ? 'difficulty-medium' : 'difficulty-hard'

function ChromeIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#4285F4" />
      <circle cx="12" cy="12" r="4" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="3" fill="#1A73E8" />
      <path d="M12 2C15.8 2 19 4.3 20.3 7.6L12 12V2Z" fill="#EA4335" />
      <path d="M20.3 7.6C21.4 10.3 21.2 13.4 19.7 16L12 12L20.3 7.6Z" fill="#FBBC04" />
      <path d="M19.7 16C18 18.9 15.1 20.9 11.7 21.3L12 12L19.7 16Z" fill="#34A853" />
    </svg>
  )
}

function FirefoxIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FF7139" opacity="0.2"/>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm.5 3.5c3.04 0 5.6 2.03 6.33 4.82-.48-.28-1.03-.44-1.61-.44-1.42 0-2.64.93-3.04 2.22-.38-1.3-1.6-2.22-3.03-2.22-.72 0-1.39.24-1.92.65C9.9 8.04 11.05 5.5 12.5 5.5z" fill="#FF9400"/>
    </svg>
  )
}

function FedoraIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H9V10h2V8c0-1.1.9-2 2-2h2v2h-2v2h2v2h-2v4z" fill="#51A2DA"/>
    </svg>
  )
}

function DownloadZipIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ExternalLinkIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/50 shadow-xl' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
            <LeetIcon size={20} />
          </div>
          <span className="font-bold text-lg text-gradient tracking-tight">Leet Helper</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          {['Features', 'Install', 'How It Works', 'Stats', 'FAQ'].map(s => (
            <a key={s} href={`#${s.toLowerCase().replace(/ /g,'-')}`}
              className="hover:text-white transition-colors hover:text-indigo-300">{s}</a>
          ))}
        </div>
        <a href="#install"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
          Download Free
        </a>
      </div>
    </nav>
  )
}

function LeetIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.274 4.43-.12l1.523 1.415c.54.54 1.414.54 1.955-.002a1.378 1.378 0 0 0 .003-1.952l-1.524-1.416a5.257 5.257 0 0 0-1.46-.894 4.742 4.742 0 0 0-.985-.264 5.616 5.616 0 0 0-1.59.013z" fill="white"/>
      <path d="M15.551 15.55a1.378 1.378 0 0 0 0 1.953l2.396 2.392.02.019a3.021 3.021 0 0 0 4.205-.038l2.396-2.392a1.378 1.378 0 0 0 .003-1.951 1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a.268.268 0 0 1-.376.003l-2.348-2.375a1.374 1.374 0 0 0-1.949 0z" fill="white" opacity="0.6"/>
    </svg>
  )
}

function CodeWindow() {
  const lines = [
    { txt: 'def twoSum(nums, target):', color: 'text-indigo-300' },
    { txt: '    seen = {}', color: 'text-zinc-300' },
    { txt: '    for i, n in enumerate(nums):', color: 'text-zinc-300' },
    { txt: '        diff = target - n', color: 'text-zinc-400' },
    { txt: '        if diff in seen:', color: 'text-zinc-300' },
    { txt: '            return [seen[diff], i]', color: 'text-emerald-400' },
    { txt: '        seen[n] = i', color: 'text-zinc-400' },
  ]
  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/50 animate-float">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/40">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs text-zinc-500 font-mono">solution.py</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">Accepted</span>
        </div>
      </div>
      {/* Code */}
      <div className="p-5 font-mono text-sm space-y-1 bg-[#0d0d0d]/60">
        {lines.map((l, i) => (
          <div key={i} className={`${l.color} leading-relaxed`}>{l.txt}</div>
        ))}
        <div className="text-zinc-600 animate-blink mt-1">▎</div>
      </div>
      {/* AI chat bubble */}
      <div className="px-5 pb-5">
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 mt-2">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 rounded-md bg-indigo-500/20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#818cf8"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2"/></svg>
            </div>
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Leet Helper AI</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">Great use of a hash map! This gives O(n) time. Consider adding edge case handling for empty arrays.</p>
        </div>
      </div>
    </div>
  )
}

function ProblemList() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-xl shadow-black/40 animate-float-delay">
      <div className="px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LeetIcon size={16} />
          <span className="text-xs font-semibold text-zinc-300">Problems</span>
        </div>
        <span className="text-[10px] text-indigo-400 font-semibold">3/5 solved</span>
      </div>
      <div className="divide-y divide-zinc-800/40">
        {PROBLEMS.map(p => (
          <div key={p.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800/20 transition-colors cursor-pointer">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${p.solved ? 'bg-emerald-500/20' : 'bg-zinc-800'}`}>
              {p.solved && <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
            </div>
            <span className="text-xs text-zinc-300 flex-1 truncate">{p.title}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${diffClass(p.diff)}`}>{p.diff}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Now Available for Firefox, Fedora & Chrome
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="text-gradient">Crack LeetCode</span>
            <br />
            <span className="shimmer-text">with AI by</span>
            <br />
            <span className="text-gradient-brand">your side.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
            Leet Helper brings an AI pair programmer directly inside LeetCode — offering hints, pattern breakdowns, and complexity analysis on Chrome, Firefox, and Fedora Linux.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/leet-helper-1.0.zip" download="leet-helper-1.0.zip"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-indigo-500/30 animate-glow-pulse">
              <DownloadZipIcon size={18} />
              Chrome Dist (.zip)
            </a>
            <a href="https://addons.mozilla.org/en-US/firefox/addon/leetcode-ai-helper/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-orange-500/40 bg-orange-500/10 text-orange-200 font-semibold text-sm hover:bg-orange-500/20 hover:border-orange-500/60 transition-all">
              <FirefoxIcon size={18} />
              Firefox / Fedora Add-on
              <ExternalLinkIcon size={14} />
            </a>
          </div>
          <div className="flex items-center gap-6 pt-2">
            {[['50K+', 'users'], ['4.9★', 'rating'], ['Free', 'forever']].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-white font-bold text-lg">{v}</div>
                <div className="text-zinc-500 text-xs uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - floating UI cards */}
        <div className="relative h-[520px] hidden lg:block">
          <div className="absolute top-0 right-0 w-[340px]">
            <CodeWindow />
          </div>
          <div className="absolute bottom-0 left-0 w-[280px]">
            <ProblemList />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-xs text-zinc-400 font-semibold">
            ✦ Features
          </div>
          <h2 className="text-4xl font-black text-gradient tracking-tight">Everything you need to level up</h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto">Built specifically for competitive programmers who want guidance, not giveaways.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className={`glass-card glass-card-hover rounded-2xl p-6 space-y-3 animate-slide-up delay-${(i+1)*100}`}>
              <div className="text-3xl">{f.icon}</div>
              <h3 className="text-white font-bold text-lg">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DownloadInstallSection() {
  const [activeTab, setActiveTab] = useState('chrome')

  return (
    <section id="install" className="py-24 relative bg-zinc-950/50 border-y border-zinc-800/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-semibold">
            ✦ Get the Extension
          </div>
          <h2 className="text-4xl font-black text-gradient tracking-tight">Downloads & Platform Links</h2>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto">
            Choose your platform below to download the Chrome extension build package or install directly on Firefox for Fedora Linux.
          </p>
        </div>

        {/* Platform Download Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Chrome Dist Card */}
          <div className="glass-card rounded-2xl p-7 flex flex-col justify-between border-indigo-500/20 hover:border-indigo-500/40 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <ChromeIcon size={26} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Chrome / Chromium</h3>
                    <span className="text-xs text-indigo-400 font-medium">Build Dist Package (.zip)</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold">
                  v1.0.0 ZIP
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Download the production <code className="text-indigo-300 bg-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono">dist</code> directory archive to load manually into Chrome, Brave, Edge, or Arc.
              </p>
            </div>
            <a
              href="/leet-helper-1.0.zip"
              download="leet-helper-1.0.zip"
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
            >
              <DownloadZipIcon size={18} />
              Download Dist ZIP (leet-helper-1.0.zip)
            </a>
          </div>

          {/* Firefox & Fedora Card */}
          <div className="glass-card rounded-2xl p-7 flex flex-col justify-between border-orange-500/20 hover:border-orange-500/40 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl group-hover:bg-orange-600/20 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-1.5">
                    <FirefoxIcon size={24} />
                    <FedoraIcon size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Firefox / Fedora Linux</h3>
                    <span className="text-xs text-orange-400 font-medium">Official Mozilla Add-on</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-[11px] font-semibold">
                  Fedora Ready
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Install directly from the Mozilla Firefox Add-ons store. Recommended for Linux distributions including Fedora workstation.
              </p>
            </div>
            <a
              href="https://addons.mozilla.org/en-US/firefox/addon/leetcode-ai-helper/"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
            >
              <FirefoxIcon size={18} />
              Install on Firefox / Fedora
              <ExternalLinkIcon size={15} />
            </a>
          </div>
        </div>

        {/* Interactive Step-by-step Tabs */}
        <div id="how-it-works" className="glass-card rounded-3xl p-8 border-zinc-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-800/60 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Installation Guide</h3>
              <p className="text-zinc-400 text-sm mt-1">Select your platform for step-by-step instructions</p>
            </div>
            <div className="flex p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl self-start md:self-auto">
              <button
                onClick={() => setActiveTab('chrome')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'chrome'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ChromeIcon size={16} />
                Chrome (Dist ZIP)
              </button>
              <button
                onClick={() => setActiveTab('firefox')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'firefox'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <FirefoxIcon size={16} />
                Firefox / Fedora
              </button>
            </div>
          </div>

          {/* Chrome Steps */}
          {activeTab === 'chrome' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
              {CHROME_STEPS.map((s, i) => (
                <div key={i} className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-indigo-400 font-mono">{s.n}</span>
                      <span className="w-2 h-2 rounded-full bg-indigo-500/50" />
                    </div>
                    <h4 className="text-white font-bold text-base mb-2">{s.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">{s.desc}</p>
                  </div>
                  {s.code && (
                    <div className="mt-2 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 font-mono text-xs text-indigo-300 truncate">
                      {s.code}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Firefox / Fedora Steps */}
          {activeTab === 'firefox' && (
            <div className="grid md:grid-cols-2 gap-5 animate-fade-in">
              {FIREFOX_STEPS.map((s, i) => (
                <div key={i} className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-orange-400 font-mono">{s.n}</span>
                      <span className="w-2 h-2 rounded-full bg-orange-500/50" />
                    </div>
                    <h4 className="text-white font-bold text-base mb-2">{s.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">{s.desc}</p>
                  </div>
                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium underline underline-offset-4"
                    >
                      addons.mozilla.org listing
                      <ExternalLinkIcon size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section id="stats" className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="glass-card rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 pointer-events-none rounded-3xl" />
          {STATS.map((s, i) => (
            <div key={i} className="space-y-1 relative">
              <div className="text-3xl font-black shimmer-text">{s.value}</div>
              <div className="text-zinc-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState(null)
  const faqs = [
    { q: 'Is Leet Helper free?', a: 'Yes. The extension is completely free. You only need your own API key from a supported AI provider.' },
    { q: 'How do I install the extension on Fedora Linux?', a: 'You can install it directly in Firefox on Fedora via the official Firefox Add-ons store link (addons.mozilla.org/en-US/firefox/addon/leetcode-ai-helper/). Alternatively, if using Chromium on Fedora, download the dist ZIP and load unpacked.' },
    { q: 'How do I install on Chrome with the dist folder ZIP?', a: 'Download leet-helper-1.0.zip, extract it, open chrome://extensions/, enable Developer Mode in top right, and click "Load unpacked" to select the extracted folder.' },
    { q: 'Does it store my API key on a server?', a: 'Never. Keys are stored in your browser\'s local storage using encryption. They never leave your device.' },
    { q: 'Which AI models are supported?', a: 'Gemini, GPT-4o, Groq (Llama 3), OpenRouter, Ollama (local), and more.' },
    { q: 'Will it just give me the answer?', a: 'No — by design. The AI provides hints, patterns, and complexity analysis to help you think, not copy.' },
  ]
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-xs text-zinc-400 font-semibold">✦ FAQ</div>
          <h2 className="text-4xl font-black text-gradient tracking-tight">Common questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? 'border-indigo-500/30' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-zinc-800/20 transition-colors">
                <span className="text-zinc-200 font-medium">{f.q}</span>
                <span className={`text-zinc-500 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 blur-3xl rounded-full" />
          <div className="relative glass-card rounded-3xl px-8 md:px-12 py-14 space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl shadow-indigo-500/30">
                <LeetIcon size={40} />
              </div>
            </div>
            <h2 className="text-4xl font-black text-gradient">Start solving smarter today.</h2>
            <p className="text-zinc-500 text-lg max-w-lg mx-auto">Join thousands of developers who use Leet Helper to practice better, learn patterns faster, and ace their technical interviews.</p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a href="/leet-helper-1.0.zip" download="leet-helper-1.0.zip"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-indigo-500/30">
                <DownloadZipIcon size={18} />
                Download Chrome Dist (.zip)
              </a>
              <a href="https://addons.mozilla.org/en-US/firefox/addon/leetcode-ai-helper/" target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-orange-500/40 bg-orange-500/10 text-orange-200 font-semibold hover:bg-orange-500/20 transition-all active:scale-95">
                <FirefoxIcon size={18} />
                Firefox Add-on for Fedora
                <ExternalLinkIcon size={14} />
              </a>
            </div>
            <p className="text-xs text-zinc-600">No sign-up required. Works instantly after install.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
            <LeetIcon size={14} />
          </div>
          <span className="text-zinc-400 text-sm font-semibold">Leet Helper</span>
        </div>
        <p className="text-zinc-600 text-xs">Built with ❤️ for the competitive programming community</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-600 text-xs uppercase tracking-wider font-semibold">All Systems Operational</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-[#0a0a0a] text-zinc-100 min-h-screen font-sans">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <DownloadInstallSection />
      <StatsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
