# 📈 MarketGPT: Context-Aware AI for Indian Retail Investors

![MarketGPT Banner](https://via.placeholder.com/1200x400?text=MarketGPT+Dashboard) *(Note: Replace this link with a screenshot of your dashboard)*

MarketGPT is an elite, autonomous financial intelligence platform tailored for the Indian stock market. It goes beyond generic AI chatbots by directly integrating with a user's live brokerage portfolio, offering highly contextual, institutional-grade market insights and real-time trend scanning.

Built with performance and modern UI/UX in mind, MarketGPT features a lightning-fast React+Vite frontend and a robust Python FastAPI backend, all powered by Google's state-of-the-art **Gemini 2.5 Flash** model.

---

## ✨ Key Features
* **🧠 Context-Aware AI Chat:** The AI natively understands your current holdings (e.g., Tata Motors, TCS, Reliance) and risk profile, answering market queries with hyper-personalized advice.
* **⚡ Real-Time Streaming Responses:** Utilizes Server-Sent Events (SSE) for a seamless, typewriter-style chat experience directly from the AI engine.
* **📡 Autonomous Market Scanner:** A backend intelligence layer that continuously extracts, analyzes, and caches trending NSE/BSE stocks, predicting Bullish/Bearish momentum.
* **🎨 Premium Glassmorphism UI:** A sleek, deep-indigo dark mode dashboard built with Tailwind CSS and Recharts for professional data visualization.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS, Recharts, Lucide React
* **Backend:** Python 3, FastAPI, Uvicorn
* **AI Engine:** Google Gemini 2.5 Flash API (via `google-genai` SDK)

---

## 🚀 Complete Step-by-Step Installation Guide

Follow these exact steps to run the complete MarketGPT platform on your local machine. You will need to run two separate terminals in VS Code: one for the AI Backend, and one for the Dashboard UI.

### Step 0: Prerequisites
Ensure you have the following installed on your computer:
1. **Node.js** (v18 or higher) - [Download Here](https://nodejs.org/)
2. **Python** (v3.8 or higher) - [Download Here](https://www.python.org/downloads/)
3. A free **Google Gemini API Key** - [Get it Here](https://aistudio.google.com/app/apikey)

### Step 1: Open the Project in VS Code
1. Clone this repository to your computer:
   ```bash
   git clone [https://github.com/awasthi-1425/Market-GPT.git](https://github.com/awasthi-1425/Market-GPT.git)
Open Visual Studio Code (VS Code).

Click File > Open Folder... and select the Market-GPT folder.

Step 2: Setup the Python AI Backend (Terminal 1)
The backend powers the AI chat and the live market scanner.

In VS Code, look at the very top menu bar and click Terminal > New Terminal.

Type this command and press Enter to go into the backend folder:
<pre>
Bash
cd backend
</pre>
Install the required Python AI tools by running:
<pre>
Bash
pip install fastapi uvicorn google-genai python-dotenv
</pre>
Security Step: Look at the file explorer on the left. Inside the backend folder, right-click and create a new file named exactly .env

Open that .env file and paste your Gemini API key inside like this (no spaces or quotes):

Code snippet
GEMINI_API_KEY=your_actual_api_key_here
Start the AI Server:
<pre>
Bash
python main.py
</pre>
✅ You should see a message saying Application startup complete. The API is now awake on Port 8001! Leave this terminal running.

Step 3: Setup the React Dashboard UI (Terminal 2)
Now we need to launch the visual interface.

In your VS Code terminal panel (at the bottom), look to the far right side and click the + (Plus icon) to open a second, brand new terminal.

Type this command and press Enter to go into the frontend folder:
<pre>
Bash
cd investor-dashboard
</pre>
Install the UI packages by running:
<pre>
Bash
npm install
</pre>
Start the dashboard server:
<pre>
Bash
npm run dev
</pre>
✅ The terminal will display a local link (usually http://localhost:5173). Hold Ctrl and click that link to open MarketGPT in your browser!

🔌 API Documentation
The FastAPI backend exposes two primary endpoints running on http://127.0.0.1:8001.

1. The Market Scanner
Endpoint: GET /api/scanner

Description: Returns an AI-generated list of 6 trending Indian stocks, complete with bullish/bearish patterns and confidence scores.

Features: Cached for 300 seconds to minimize API calls.

2. The Contextual Chat
Endpoint: POST /v1/chat/completions

Description: Accepts a user's prompt, injects their portfolio data, and streams the Gemini 2.5 Flash response back to the client.

Payload Structure: ```json
{
"messages": [{"role": "user", "content": "What should I do with my Tata Motors shares today?"}],
"stream": true
}


🛠️ Troubleshooting
Backend Error: ValueError: No API key was provided
Ensure your .env file is located exactly inside the backend folder, is named .env (not .env.txt), and contains your valid Gemini key.

Frontend Error: 404 (Not Found) on Chat or Scanner
Ensure your Python backend is running simultaneously on port 8001 (Terminal 1) and your frontend is fetching from 8001.
