// pages/index.js - The main landing page of the application
import { useState } from "react"; // Import useState hook for managing component state
import { motion } from "framer-motion"; // Import motion component for animations

// Define the Home component
export default function Home() {
  const [input, setInput] = useState(""); // State to store the user's prompt input
  const [result, setResult] = useState(""); // State to store the result from OpenAI
  const [loading, setLoading] = useState(false); // State to indicate if a request is in progress

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true to indicate processing
    setResult(""); // Clear any previous results

    try {
      // Send a POST request to the /api/openai endpoint with the prompt
      const response = await fetch("/api/openai", {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Set the request content type to JSON
        },
        body: JSON.stringify({ prompt: input }), // Convert the prompt to a JSON string for the request body
      });

      // Parse the JSON response from the API
      const data = await response.json();
      // If the response is OK, update the result state with the generated text
      if (response.ok) {
        setResult(data.result);
      } else {
        // Otherwise, display an error message
        setResult("Error: " + data.error);
      }
    } catch (error) {
      // Handle any unexpected errors by updating the result state with the error message
      setResult("Error: " + error.message);
    }
    setLoading(false); // Set loading state to false once the request is complete
  };

  // Return the JSX for rendering the landing page
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header section with a title and introduction */}
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">AI OpenAI App</h1> {/* App title */}
        <p className="mt-2">
          Experience the power of AI! Our application uses OpenAI's API to generate creative responses to your prompts.
        </p> {/* Brief description of the app */}
      </header>

      {/* Main content area */}
      <main className="p-6">
        {/* Section that explains what the application does */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What is this application?</h2> {/* Section title */}
          <p className="mb-4">
            This site allows you to interact with OpenAI's API. Simply enter your prompt in the box below, and our AI will generate a response.
            No login or subscription is required—it's free and open to everyone!
          </p> {/* Detailed explanation */}
          {/* Image to visually explain the concept (place your image in public/images/) */}
          <img
            src="/images/ai.png" // Source path for the image
            alt="AI Illustration" // Alt text for accessibility
            className="w-full max-w-md mx-auto" // Styling: full width up to a maximum, centered
          />
        </section>

        {/* Section for user interaction with the AI */}
        <section className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Try it out</h2> {/* Section title for interaction */}
          {/* Form for submitting a prompt */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <textarea
              className="border rounded p-3" // Styling for the textarea
              rows="4" // Number of rows for the input box
              placeholder="Enter your prompt for OpenAI..." // Placeholder text to guide the user
              value={input} // Bind the textarea's value to the input state
              onChange={(e) => setInput(e.target.value)} // Update the input state when the user types
            ></textarea>
            <button
              type="submit" // Button type submit to trigger form submission
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" // Styling for the button with hover effects
              disabled={loading} // Disable the button when a request is in progress
            >
              {loading ? "Generating..." : "Generate Response"} {/* Change button text based on loading state */}
            </button>
          </form>

          {/* Display the AI-generated result with a fade-in animation */}
          {result && (
            <motion.div
              initial={{ opacity: 0 }} // Initial animation state: invisible
              animate={{ opacity: 1 }} // Animate to: fully visible
              className="mt-6 p-4 bg-gray-50 border rounded" // Styling for the result container
            >
              <h3 className="font-bold mb-2">Result:</h3> {/* Title for the result display */}
              <p>{result}</p> {/* Display the generated result */}
            </motion.div>
          )}
        </section>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-200 text-center p-4 mt-8">
        <p>© 2025 AI OpenAI App. All rights reserved.</p> {/* Footer text */}
      </footer>
    </div>
  );
}
