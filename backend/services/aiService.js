import axios from "axios";

export const analyzeWithAI = async (repoData) => {
  try {
    const prompt = `
Analyze this GitHub repository:

Name: ${repoData.name}
Description: ${repoData.description}
Primary Language: ${repoData.language}
Language Distribution (bytes): ${JSON.stringify(repoData.languages)}
Files: ${repoData.files.join(", ")}
README Snippet:
${repoData.readme}

Focus on evaluating code quality, architecture, readability, the README documentation, and potential improvements. 
CRITICAL: You MUST include at least 1 or 2 specific, creative suggestions on how this repository/project could be significantly improved or extended by integrating Artificial Intelligence (AI) features.

Return strictly formatted JSON:
{
  "summary": "Brief summary of the repo and its architecture",
  "technologies": ["Language 1", "Framework 1", "Tool 1"],
  "score": "A number out of 10 representing overall code health",
  "scoreBreakdown": {
    "quality": 8,
    "readability": 9,
    "structure": 7,
    "readme": 8
  },
  "suggestions": ["suggestion 1", "suggestion 2 including an AI integration idea", "suggestion 3"]
}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
            responseMimeType: "application/json",
        }
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(text); 
    
  } catch (error) {
    console.log("AI ERROR:", error.response?.data || error.message);
    throw new Error(`AI analysis failed: ${error.response?.data?.error?.message || error.message}`);
  }
};