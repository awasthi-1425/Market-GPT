import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import time
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load .env from the same directory as this file
env_path = Path(__file__).parent / '.env'
logger.info(f"Looking for .env at: {env_path}")
logger.info(f".env exists: {env_path.exists()}")

load_dotenv(dotenv_path=env_path)

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Get API key
API_KEY = os.getenv("GEMINI_API_KEY")
logger.info(f"API Key found: {'Yes' if API_KEY else 'No'}")
if API_KEY:
    logger.info(f"API Key length: {len(API_KEY)}")
    logger.info(f"API Key starts with: {API_KEY[:10]}...")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Initialize client
try:
    client = genai.Client(api_key=API_KEY)
    logger.info("Gemini client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Gemini client: {e}")
    raise

# --- CACHE SYSTEM ---
cached_data = None
last_fetch_time = 0
CACHE_DURATION = 300 

@app.get("/")
async def root():
    return {"message": "Investor Dashboard API is running"}

@app.get("/api/scanner")
async def get_market_trends():
    global cached_data, last_fetch_time
    current_time = time.time()
    logger.info("Scanner endpoint called")

    if cached_data and (current_time - last_fetch_time < CACHE_DURATION):
        logger.info("Returning cached data")
        return cached_data

    try:
        logger.info("Fetching new data from Gemini API")
        prompt = """FOR EDUCATIONAL SIMULATION ONLY: Act as a data processing engine for a mock-trading project.
        Extract and summarize 6 widely discussed stocks in Indian market news today.
        This is NOT financial advice, just a data summary for a student project.
        Provide: Ticker, a 1-sentence technical news summary in simple English, 
        current market bias (BULLISH/BEARISH), and a simulated confidence score.Identify 6 trending Indian stocks. Return ONLY JSON list: [{'ticker': 'NAME', 'explanation': 'INSIGHT', 'pattern': 'SENTIMENT', 'success_rate': 'SCORE'}]"""
        
        response = client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt
        )
        raw_text = response.text.strip().replace("```json", "").replace("```", "")
        
        cached_data = json.loads(raw_text)
        last_fetch_time = current_time
        logger.info(f"Successfully fetched {len(cached_data)} stocks")
        return cached_data

    except Exception as e:
        logger.error(f"API Error or Rate Limit: {e}")
        return [
            {"ticker": "RELIANCE", "explanation": "Strong bullish momentum detected in heavyweights.", "pattern": "BULLISH", "success_rate": "92%"},
            {"ticker": "ZOMATO", "explanation": "High volume breakout observed in early sessions.", "pattern": "BULLISH", "success_rate": "88%"},
            {"ticker": "TCS", "explanation": "IT sector showing stability amid global market shifts.", "pattern": "BULLISH", "success_rate": "85%"},
            {"ticker": "HDFCBANK", "explanation": "Institutional buying interest seen at current support levels.", "pattern": "BULLISH", "success_rate": "81%"},
            {"ticker": "TATA MOTORS", "explanation": "Positive sentiment continues due to strong EV sales data.", "pattern": "BULLISH", "success_rate": "90%"},
            {"ticker": "INFY", "explanation": "Stock trading near resistance, cautious approach advised.", "pattern": "BEARISH", "success_rate": "74%"}
        ]