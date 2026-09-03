# Leet Helper Extension

An AI-powered Chrome extension that enhances your LeetCode problem-solving experience by providing real-time assistance, hints, and interactive chat directly on the problem page.

## ✨ Features

### 🤖 AI Chat Assistant
- Ask questions about problems in context
- Get hints, explanations, and multiple solution approaches
- Supports multiple AI models via LangChain (OpenAI, Gemini, Groq, OpenRouter, Ollama)

### 🧠 Smart Problem Understanding
- Automatically reads the current LeetCode problem
- Provides contextual, problem-aware responses
- Understands code and constraints

### 🎨 Seamless Overlay UI
- Clean floating interface overlaid on LeetCode
- No need to switch tabs or leave the problem page
- Minimal distraction, maximum productivity

### 💻 Code Assistance
- Help refining logic and algorithms
- Optimization suggestions
- Best practice recommendations

### 📝 Interactive Chat History
- Keeps track of previous conversations
- Reuse insights from past problems

### 🎯 Interview Mode (Optional)
- Simulates real interview environment
- Provides minimal hints to encourage problem-solving
- Great for interview preparation

## 📁 Project Structure

```
leet_helper_extension/
├── extension/          # Chrome extension source code
│   ├── src/           # Extension components and logic
│   ├── manifest.json  # Extension configuration
│   └── package.json   # Extension dependencies
├── home/              # Landing/home page (React app)
│   ├── src/           # Home page components
│   └── package.json   # Home page dependencies
├── landing/           # Additional landing resources
└── README.md          # This file
```

## 🚀 Getting Started

### For Users

#### Chrome Web Store (Recommended)
- **Coming Soon!** The extension will be available on the [Chrome Web Store](#) for easy one-click installation

#### Firefox Add-ons (Recommended)
- **Coming Soon!** The extension will be available on [Firefox Add-ons](#) for easy one-click installation

#### Manual Installation (Developer Mode)

**For Chrome:**
1. Download the extension from [releases](https://github.com/radhechaudhary/leet_helper_extension/raw/main/release/leet-helper-1.0.zip)
2. Unzip the downloaded file
3. Navigate to `chrome://extensions/`
4. Enable **Developer Mode** (toggle in the top-right corner)
5. Click **Load unpacked**
6. Select the unzipped `extension` folder
7. The extension icon should appear in your Chrome toolbar

**For Firefox:**
1. Download the extension from [releases](https://github.com/radhechaudhary/leet_helper_extension/raw/main/release/leet-helper-1.0.zip)
2. Unzip the downloaded file
3. Navigate to `about:debugging#/runtime/this-firefox`
4. Click **Load Temporary Add-on**
5. Navigate to the unzipped folder and select the `manifest.json` file
6. The extension should now be loaded and ready to use
   
   **Note:** Temporary add-ons are only active during the current Firefox session. To make it permanent, you'll need to package it as a `.xpi` file and install it through Firefox Add-ons

### For Developers

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Chrome/Chromium browser

#### Setup & Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/radhechaudhary/leet_helper_extension.git
   cd leet_helper_extension
   ```

2. **Install dependencies for the extension**
   ```bash
   cd extension
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load into Chrome**
   - Go to `chrome://extensions/`
   - Enable **Developer Mode**
   - Click **Load unpacked**
   - Select the `extension/dist` folder

5. **For development with hot reload**
   ```bash
   npm run dev
   ```

#### Home Page Setup (Optional)

If you want to set up and develop the home page:

```bash
cd ../home
npm install
npm run dev
```

## 🔧 Tech Stack

### Frontend
- **React.js** (v19+) - UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

### AI & LangChain Integration
- **LangChain** - AI orchestration framework
- **@langchain/openai** - OpenAI integration
- **@langchain/google-genai** - Google Gemini integration
- **@langchain/groq** - Groq API integration
- **@langchain/openrouter** - OpenRouter integration
- **@langchain/ollama** - Ollama local models support

### Extension APIs
- **Chrome Extension Manifest V3**
- **Content Scripts** - Inject functionality into LeetCode pages
- **Chrome Storage API** - Store user preferences

## ⚙️ First Time Setup

After installing the extension:

1. **Configure AI Provider**
   - Click the extension icon in your toolbar
   - Select your preferred AI provider (OpenAI, Gemini, Groq, OpenRouter, or Ollama)
   - Enter your API key (if using cloud-based providers)

2. **Grant Permissions**
   - Allow the extension to access LeetCode.com pages when prompted
   - This is required for the extension to read problem statements

3. **Test the Extension**
   - Go to any LeetCode problem
   - Click the extension icon or look for the floating widget
   - Try sending a test message to verify everything is working

## 💡 Usage

1. Open [LeetCode.com](https://leetcode.com)
2. Navigate to any problem you want to solve
3. Click the extension icon in your toolbar or look for the floating widget overlay
4. Start typing your question about the problem
5. Get AI-powered hints, explanations, and solution approaches
6. Review chat history for future reference
7. Toggle **Interview Mode** for a more challenging experience with minimal hints

## 🎮 Configuration

The extension supports configuration for:
- AI model selection
- API keys for various AI providers
- Interview mode settings
- UI preferences

## 📋 Scripts

### Extension
```bash
cd extension
npm run dev       # Start development with hot reload
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Home Page
```bash
cd home
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙋 Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Happy problem-solving! 🚀**