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

    const languagesRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      { headers }
    ).catch(() => ({ data: {} }));

    let readmeText = "No README found.";
    try {
      const readmeRes = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        { headers }
      );
      readmeText = Buffer.from(readmeRes.data.content, 'base64').toString("utf-8");
    } catch (e) {
      console.log("No README found or error fetching it.");
    }

    const allFiles = contentsRes.data.map((file) => file.name);

    const fileCategories = {
      Code: 0,
      Assets: 0,
      Config: 0,
      Docs: 0,
      Other: 0
    };

    const codeExt = ['.js', '.jsx', '.ts', '.tsx', '.py', '.go', '.java', '.cpp', '.c', '.cs', '.php', '.rb', '.swift', '.html', '.css', '.scss'];
    const assetExt = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.mp4', '.mp3'];
    const configExt = ['.json', '.yml', '.yaml', '.xml', '.ini', '.env'];
    const docExt = ['.md', '.txt', '.pdf'];

    allFiles.forEach(file => {
      const lowerFile = file.toLowerCase();
      if (codeExt.some(ext => lowerFile.endsWith(ext))) fileCategories.Code++;
      else if (assetExt.some(ext => lowerFile.endsWith(ext))) fileCategories.Assets++;
      else if (configExt.some(ext => lowerFile.endsWith(ext)) || lowerFile.includes('config') || lowerFile.includes('ignore') || lowerFile.includes('lock')) fileCategories.Config++;
      else if (docExt.some(ext => lowerFile.endsWith(ext))) fileCategories.Docs++;
      else fileCategories.Other++;
    });

    return {
      name: repoRes.data.name,
      description: repoRes.data.description,
      stars: repoRes.data.stargazers_count,
      forks: repoRes.data.forks_count,
      language: repoRes.data.language,
      files: allFiles,
      languages: languagesRes.data,
      readme: readmeText.substring(0, 2000), // truncated for AI limit
      fileCategories
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