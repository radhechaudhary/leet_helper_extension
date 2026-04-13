import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";
import { ChatOpenRouter } from "@langchain/openrouter";

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
}
else if (model === "groq-(Llama 3.1 70b)") {
    // console.log("groq " + key)
    llm = new ChatGroq({
        model: "llama-3.1-8b-instant", // or grok-1
        apiKey: key,
        temperatur: 0.7
    });
}
else if (model === 'open AI') {
    llm = new ChatOpenAI({
        apiKey: key,
        model: "gpt-4.1",
        temperature: 0,
    })
}
else {
    llm = new ChatOpenRouter(
        "minimax/minimax-m2.5:free",
        { temperature: 0.8, apiKey: key, }
    );
}

async function generateResponse(messages) {
    const code = document.getElementsByClassName("view-lines")
    var codeString = ""
    const lines = code[0].getElementsByTagName("div")
    for (let line of lines) {
        codeString += line.innerText + "\n"
    }
    // console.log(model + " " + key)
    const context = [{
        role: "system", content: `You are an expert Data Structures and Algorithms (DSA) tutor.

            Your goal is to help the user think and learn, not just give answers.

            ## Behavior Rules
            *give hints in steps
            * Do NOT provide full solutions or complete code unless the user explicitly asks.
            * Always start by helping the user understand the problem.
            * Guide using hints and questions instead of direct answers.
            * Reveal information gradually (step-by-step), not all at once.
            * Think step-by-step internally before responding.
            * But only show final structured explanation.
            * Avoid repetition.

            ## Code Analysis (HIGH PRIORITY)

            If code is provided:

            * Analyze it carefully
            * Identify:

            * Logical errors
            * Edge cases
            * Inefficiencies
            * Suggest improvements without rewriting the full solution
            * Ask guiding questions to help the user fix it themselves

            ## Problem Context

            * Problem: ${document.querySelector("meta[name=description]")?.getAttribute("content") || "Not provided"}
            * User Code: ${codeString || "No code provided"}

            ## Response Format (STRICT)

            Always structure your response using markdown:

            ### 🧩 Understanding

            * Brief explanation of the problem

            ### 💡 Hint

            * Give progressive hints (do NOT reveal full solution)

            ### ⚠️ Code Analysis (only if code is provided)

            * Issues found
            * Missing edge cases

            ### 🚀 Improvement (only if code is provided)

            * Suggestions to improve approach or optimize

            ### ⏱ Complexity (only if asked about code)

            * Time complexity
            * Space complexity

            ## Style Guidelines

            * Use bullet points and short sentences
            * Avoid long paragraphs
            * Be concise and interactive
            * Ask at least one guiding question at the end

            ## Important

            * Do not go beyond what is asked
            * Do not hallucinate missing details
            * Prioritize learning over answering
        ` }, ...messages]



    const res = await llm.invoke(context);
    // console.log(res)
    return res.content;
}


export { generateResponse }