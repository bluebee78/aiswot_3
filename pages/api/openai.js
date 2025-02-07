// pages/api/openai.js - API endpoint to interact with the OpenAI API
import { Configuration, OpenAIApi } from "openai"; // Import the necessary classes from the OpenAI library

// Define the API route handler function
export default async function handler(req, res) {
  // Allow only POST requests to this endpoint
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]); // Set allowed HTTP methods
    return res.status(405).json({ error: "Method not allowed" }); // Return 405 if the method is not POST
  }

  // Extract the 'prompt' from the request body
  const { prompt } = req.body;
  // If no prompt is provided, return a 400 error
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Configure the OpenAI API client with your API key from the environment variable
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key should be set in .env.local
  });
  // Initialize the OpenAI API client
  const openai = new OpenAIApi(configuration);

  try {
    // Request a text completion from OpenAI using the specified model and prompt
    const completion = await openai.createCompletion({
      model: "text-davinci-003", // Specify the model to use for completion
      prompt: prompt, // Provide the user input as the prompt
      max_tokens: 150, // Limit the response to 150 tokens
    });

    // Send back the generated text as a JSON response
    return res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error calling OpenAI:", error);
    // Return a 500 error if the OpenAI API call fails
    return res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
}
