import axios from "axios";

export const getRepoData = async (repoUrl) => {
  try {
    const parts = repoUrl.split("/");
    const owner = parts[3];
    const repo = parts[4];

    if (!owner || !repo) {
      throw new Error("Invalid GitHub URL");
    }

    const repoRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    const contentsRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents`
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
    throw new Error("Failed to fetch GitHub data");
  }
};