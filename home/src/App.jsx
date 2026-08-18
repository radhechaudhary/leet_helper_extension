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

const STEPS = [
  { n: "01", title: "Install the Extension", desc: "Add Leet Helper to Chrome from the Web Store in one click." },
  { n: "02", title: "Add Your API Key", desc: "Paste your preferred AI provider key. It stays local — always." },
  { n: "03", title: "Open Any Problem", desc: "Navigate to any LeetCode problem as you normally would." },
  { n: "04", title: "Ask Anything", desc: "Click the chat bubble and start a conversation with your AI pair." },
]

const STATS = [
  { value: "50K+", label: "Active Users" },
  { value: "200+", label: "LeetCode Problems Covered" },
  { value: "6", label: "AI Models Supported" },
  { value: "4.9★", label: "Chrome Store Rating" },
]

const diffClass = (d) =>
  d === 'Easy' ? 'difficulty-easy' : d === 'Medium' ? 'difficulty-medium' : 'difficulty-hard'

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
          {['Features', 'How It Works', 'Stats', 'FAQ'].map(s => (
            <a key={s} href={`#${s.toLowerCase().replace(/ /g,'-')}`}
              className="hover:text-white transition-colors hover:text-indigo-300">{s}</a>
          ))}
        </div>
        <a href="#install"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
          Install Free
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
            Now with Multi-Model AI Support
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="text-gradient">Crack LeetCode</span>
            <br />
            <span className="shimmer-text">with AI by</span>
            <br />
            <span className="text-gradient-brand">your side.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
            Leet Helper is a Chrome extension that brings an AI pair programmer directly inside LeetCode — offering hints, pattern breakdowns, and complexity analysis without breaking your flow.
          </p>
          <div className="flex flex-wrap gap-4">
            <a id="install" href="#how-it-works"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-indigo-500/30 animate-glow-pulse">
              <LeetIcon size={16} />
              Install Extension
            </a>
            <a href="#features"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 font-semibold text-sm hover:border-indigo-500/50 hover:text-white transition-all">
              See Features →
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

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900 text-xs text-zinc-400 font-semibold">
            ✦ How It Works
          </div>
          <h2 className="text-4xl font-black text-gradient tracking-tight">Up and running in 2 minutes</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className={`glass-card glass-card-hover rounded-2xl p-6 flex gap-5 animate-slide-up delay-${(i+1)*100}`}>
              <div className="text-4xl font-black text-gradient-brand opacity-60 flex-shrink-0 leading-none">{s.n}</div>
              <div>
                <h3 className="text-white font-bold mb-1.5">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
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
    { q: 'Does it store my API key on a server?', a: 'Never. Keys are stored in Chrome\'s local storage using encryption. They never leave your device.' },
    { q: 'Which AI models are supported?', a: 'Gemini, GPT-4o, Groq (Llama 3), Open Router, Ollama (local), and more coming soon.' },
    { q: 'Will it just give me the answer?', a: 'No — by design. The AI provides hints, patterns, and complexity analysis to help you think, not copy.' },
    { q: 'Does it work on all LeetCode problems?', a: 'It works on all problems with a code editor — the AI reads the problem statement automatically.' },
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
          <div className="relative glass-card rounded-3xl px-12 py-14 space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl shadow-indigo-500/30">
                <LeetIcon size={40} />
              </div>
            </div>
            <h2 className="text-4xl font-black text-gradient">Start solving smarter today.</h2>
            <p className="text-zinc-500 text-lg max-w-lg mx-auto">Join thousands of developers who use Leet Helper to practice better, learn patterns faster, and ace their technical interviews.</p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a href="https://chrome.google.com/webstore" target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-indigo-500/30">
                <LeetIcon size={18} />
                Add to Chrome — It's Free
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
      <HowItWorksSection />
      <StatsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
