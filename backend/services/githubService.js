import axios from "axios";

export const getRepoData = async (repoUrl) => {
  try {
    let urlString = repoUrl;
    if (!urlString.startsWith("http")) {
      urlString = `https://${urlString}`;
    }
    const urlObj = new URL(urlString);
    const pathname = urlObj.pathname.replace(/^\/|\/$/g, "");
    const parts = pathname.split("/");
    const owner = parts[0];
    const repo = parts[1];

    if (!owner || !repo) {
      throw new Error("Invalid GitHub URL");
    }

    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const repoRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers }
    );

    const contentsRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents`,
      { headers }
    );

    return {
      name: repoRes.data.name,
      description: repoRes.data.description,
      stars: repoRes.data.stargazers_count,
      forks: repoRes.data.forks_count,
      language: repoRes.data.language,
      files: contentsRes.data.map((file) => file.name),
    };
  } catch (error) {
    if (error.response?.status === 403 || error.response?.status === 429) {
      throw new Error(`GitHub API rate limit exceeded. Please try again later. ${error.response?.data?.message || ''}`);
    } else if (error.response?.status === 404) {
      throw new Error("GitHub repository not found or is private.");
    }
    throw new Error(`Failed to fetch GitHub data: ${error.response?.data?.message || error.message}`);
  }
};