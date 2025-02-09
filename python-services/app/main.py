from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

# Load actionable queries from JSON file
with open("./hospital_data.json", "r") as f:
    actionable_queries = json.load(f)

@app.route("/process-query", methods=["POST"])
def process_query():
    data = request.json
    user_query = data.get("query", "").lower()

    # Check if the query matches actionable keywords
    response_context = None
    for key, value in actionable_queries.items():
        if key in user_query:
            response_context = value
            break

    # Prepare OLLAMA request
    if response_context:
        prompt = f"The user asked: '{user_query}'. Based on our knowledge: {response_context}."
    else:
        prompt = f"The user asked: '{user_query}'. Provide a helpful response."

    try:
        # Send query to OLLAMA
        ollama_response = requests.post(
            "http://localhost:11434/api/chat",
            json={
                "model": "llama3.2",  # Replace with your OLLAMA model
                "prompt": prompt
            }
        )

        # Extract response from OLLAMA
        ollama_data = ollama_response.json()
        response = ollama_data.get("response", "I'm sorry, I couldn't process your query.")
    except Exception as e:
        print(f"Error connecting to OLLAMA: {e}")
        response = "There was an error processing your request. Please try again later."

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
