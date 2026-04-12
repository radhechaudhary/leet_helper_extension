import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";

function getApiKey() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["API_KEY"], (result) => {
            resolve(result.API_KEY);
        });
    });
}
function getModel() {
    return new Promise((resolve) => {
        chrome.storage.local.get(["SELECTED_MODEL"], (result) => {
            resolve(result.SELECTED_MODEL);
        });
    });
}
const key = await getApiKey()
const model = await getModel()
var llm = null;
if (model === "gemini-1-5-pro") {
    llm = new ChatGoogleGenerativeAI({
        apiKey: key,
        model: "gemini-2.5-flash-lite", // fast + cheap
        temperature: 0
    });
} else {
    llm = new ChatGroq({
        model: "llama-3.1-8b-instant", // or grok-1
        apiKey: key,
        temperatur: 0.7
    });
}

async function generateResponse(messages) {
    const code = document.getElementsByClassName("view-lines")
    var codeString = ""
    console.log(code)
    const lines = code[0].getElementsByTagName("div")
    for (let line of lines) {
        codeString += line.innerText + "\n"
    }
    const context = [{
        role: "system", content: `You are an expert DSA tutor and interview coach.
        Help the user learn problem-solving instead of giving direct answers.
        Rules:
        * Do NOT give full solutions or code unless user asks.
        * Start with understanding the problem and guide using hints.
        * Provide step-by-step help only when needed.
        * If the user shares code:
        * Analyze it carefully
        * Identify bugs, edge cases, and inefficiencies
        * Suggest improvements without rewriting the full solution immediately
        * Encourage thinking with questions and discuss time/space complexity.
        * If the user is stuck or explicitly asks, provide a clear and well-explained solution.
        
        format:
        - Understanding
        - Hint
        - Code Analysis (if code is provided)
        - Improvement
        - Complexity
        Use bullet points and short paragraphs. Avoid long blocks of text.
        Your priority is analyzing code, learning, not just answering.
        Avoid Extra answers and do what is asked
        Question description = ${document.querySelector("meta[name=description]").getAttribute("content")}
        code = ${codeString}
        ` }, ...messages]



    const res = await llm.invoke(context);
    // console.log(res)
    return res.content;
}


export { generateResponse }