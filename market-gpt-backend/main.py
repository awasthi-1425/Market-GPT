from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from google import genai
from google.genai import types
import time
import json
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Google GenAI client
client = genai.Client(api_key="AIzaSyAidl-RFyiH_u4w2XW9Uhv_2nRVmFYR7Zc")

# --- HACKATHON MAGIC: THE FAKE DATABASE ---
user_portfolio = {
    "investor_name": "Siddhant",
    "risk_profile": "Aggressive",
    "holdings": [
        {"ticker": "TATAMOTORS", "shares": 150, "avg_buy_price": 850},
        {"ticker": "TCS", "shares": 25, "avg_buy_price": 3800}
    ]
}

# The master prompt that controls the AI's brain
system_instruction = f"""
You are Market GPT, an elite AI financial intelligence layer for Indian retail investors.
You must analyze the markets and answer the user's questions. 

CRITICAL CONTEXT: You have direct access to the user's live brokerage account.
Here is their current portfolio data: {json.dumps(user_portfolio)}

RULES:
1. Always address the user by their name.
2. If they ask a general market question, automatically cross-reference it with the stocks they hold.
3. Sound professional, confident, and use Indian stock market terminology (NSE, BSE, FII, DII).
4. Format your response beautifully using Markdown (bolding, bullet points).
"""

@app.post("/v1/chat/completions")
async def chat_completions(request: Request):
    body = await request.json()
    
    messages = body.get("messages", [])
    last_user_message = messages[-1]["content"] if messages else ""

    print(f"\nSiddhant asked: {last_user_message}") 

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=last_user_message,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
            )
        )
        ai_text = response.text
        print("Market GPT generated the response!")
        
    except Exception as e:
        ai_text = f"Error talking to Gemini: {str(e)}"
        print(ai_text)

    # --- THE STREAMING FIX ---
    # This checks if NextChat is asking for a typing effect (stream)
    is_stream = body.get("stream", False)

    if is_stream:
        async def event_stream():
            # 1. Send the initial connection chunk
            yield f"data: {json.dumps({'id': 'chatcmpl-1', 'object': 'chat.completion.chunk', 'created': int(time.time()), 'model': 'market-gpt', 'choices': [{'index': 0, 'delta': {'role': 'assistant'}, 'finish_reason': None}]})}\n\n"
            
            # 2. Slice the text into tiny chunks to create the typing effect!
            chunk_size = 5
            for i in range(0, len(ai_text), chunk_size):
                chunk = ai_text[i:i+chunk_size]
                data = {"choices": [{"index": 0, "delta": {"content": chunk}, "finish_reason": None}]}
                yield f"data: {json.dumps(data)}\n\n"
                await asyncio.sleep(0.01) # This controls the typing speed
            
            # 3. Tell NextChat we are done typing
            yield f"data: {json.dumps({'choices': [{'index': 0, 'delta': {}, 'finish_reason': 'stop'}]})}\n\n"
            yield "data: [DONE]\n\n"

        # Return the stream to the UI
        return StreamingResponse(event_stream(), media_type="text/event-stream")
    
    else:
        # Fallback just in case streaming is off
        return {
            "id": f"chatcmpl-{int(time.time())}",
            "object": "chat.completion",
            "created": int(time.time()),
            "model": "market-gpt-custom",
            "choices": [{"index": 0, "message": {"role": "assistant", "content": ai_text}, "finish_reason": "stop"}]
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)