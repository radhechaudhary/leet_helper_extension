import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";
import { ChatOpenRouter } from "@langchain/openrouter";
import { ChatOllama } from "@langchain/ollama";

console.log(document.querySelector("meta[name=description]")?.getAttribute("content"))

function getApiKey(model) {
    return new Promise((resolve) => {
        chrome.storage.local.get([`${model}_API_KEY`], (result) => {
            resolve(result[`${model}_API_KEY`]);
        });
    });
}
function getModel() {
    return new Promise((resolve) => {
        chrome.storage.local.get([`SELECTED_MODEL`], (result) => {
            resolve(result[`SELECTED_MODEL`]);
        });
    });
}
function getModelName(model) {
    return new Promise((resolve) => {
        chrome.storage.local.get([`${model}_MODEL_NAME`], (result) => {
            resolve(result[`${model}_MODEL_NAME`]);
        });
    });
}

const model = await getModel()
const key = await getApiKey(model)
const modelName = await getModelName(model)
console.log(modelName)
var llm = null;
if (model === "gemini") {
    llm = new ChatGoogleGenerativeAI({
        apiKey: key,
        model: modelName,
    });
}
else if (model === "groq") {
    llm = new ChatGroq({
        model: modelName,
        apiKey: key,
    });
}
else if (model === 'open-ai') {
    llm = new ChatOpenAI({
        apiKey: key,
        model: modelName,
    })
}
else if (model === "ollama") {
    llm = new ChatOllama({
        model: modelName,
    })
}
else if (model === "open-router") {
    llm = new ChatOpenRouter(
        modelName,
        { apiKey: key }
    );
}
var level = 1;

async function generateResponse(messages) {
    const code = document.getElementsByClassName("view-lines")
    var codeString = ""
    const lines = code[0].getElementsByTagName("div")
    for (let line of lines) {
        codeString += line.innerText + "\n"
    }
    // #
    const language = document.querySelectorAll('[aria-haspopup="dialog"]')[5].innerText;
    console.log(language)
    // console.log(model + " " + key)
    const systemPrompt = `
        You are an expert Socratic DSA tutor and competitive programming mentor.

        Help the user understand and solve LeetCode problems themselves. Be accurate, concise,
        practical, and adapt to the user's current level of understanding.

        ## Core Rules

        - Understand the problem and the user's approach before responding.
        - Do not invent bugs, edge cases, constraints, or performance problems.
        - If the user's solution is correct, clearly say so.
        - Distinguish correctness issues from style or optional optimizations.
        - Judge time and space complexity against the actual constraints.
        - Prefer improving the user's approach rather than replacing it.
        - Do not give the complete solution or code unless the user explicitly asks for it.
        - Avoid unnecessary praise, repetition, filler, and long explanations.

        ## Socratic Hints

        Give only the next useful hint rather than revealing the entire solution.

        Progressively increase detail:

        Level 0: conceptual direction.
        Level 1: relevant observation, pattern, or data structure.
        Level 2: explain the key idea.
        Level 3: explain the complete algorithm.
        Level 4: pseudocode or implementation guidance.
        Level 5: complete solution when explicitly requested.

        Use the current hint level and previous conversation to avoid repeating or skipping hints.

        ## Code Review

        When code is provided:

        1. Understand the intended approach.
        2. Check logical correctness.
        3. Check important edge cases.
        4. Check time and space complexity when relevant.
        5. Compare complexity with the problem constraints.
        6. Identify the specific issue and explain why it occurs.

        If there is a bug, prefer a small counterexample and a guiding question over rewriting
        the code.

        If the code is correct, say so instead of manufacturing problems.

        ## Debugging

        If the user reports a failure, use provided test cases or execution results as evidence.
        Identify whether the issue is correctness, an edge case, complexity, or implementation.

        ## Response Style

        Be concise and specific to the problem and code.

        Use these sections only when relevant:

        ### 🧩 Understanding
        ### 💡 Hint
        ### ⚠️ Code Analysis
        ### 🚀 Improvement
        ### ⏱ Complexity

        Do not leave empty sections.

        Answer direct questions directly. Do not force a Socratic question when the user asks
        for a specific explanation. When appropriate, end with one question that helps the user
        reason about the next step.

        Never assume missing information. If important problem details are unavailable, say so.
    `;
    const metaDesc = document.querySelector("meta[name=description]")?.getAttribute("content");
    const problem = metaDesc.split("Explanation")[0];
    const constraints = metaDesc.split("Explanation")[1];
    const context = [
        {
            role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: `
                Problem:
                ${problem}

                Constraints:
                ${constraints}

                Language:
                ${language}

                User Code:
                ${codeString}

                Current Hint Level:
                ${level}
                `
        },
        ...messages
    ];
    const res = await llm.invoke(context);
    level++;
    // console.log(res)
    return res.content;
}


export { generateResponse }