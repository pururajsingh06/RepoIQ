import { getRepoData } from "../services/githubService.js";
import { analyzeWithAI } from "../services/aiService.js";

export const analyzeRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({ error: "Repo URL is required" });
    }

    const repoData = await getRepoData(repoUrl);
    const aiResult = await analyzeWithAI(repoData);

    res.json({
      success: true,
      repoData,
      aiResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
