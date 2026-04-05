import axios from "axios";

export const analyzeWithAI = async (repoData) => {
  try {
    const prompt = `
Analyze this GitHub repository:

Name: ${repoData.name}
Description: ${repoData.description}
Language: ${repoData.language}
Files: ${repoData.files.join(", ")}

Focus on evaluating code quality, architecture, and potential improvements. 
CRITICAL: You MUST include at least 1 or 2 specific, creative suggestions on how this repository/project could be significantly improved or extended by integrating Artificial Intelligence (AI) features.

Return JSON:
{
  "summary": "Brief summary of the repo and its architecture",
  "technologies": ["Language 1", "Framework 1", "Tool 1"],
  "score": "A number out of 10 representing overall code health",
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
    throw new Error("AI analysis failed");
  }
};