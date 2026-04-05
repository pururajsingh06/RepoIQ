import { useState } from "react";
import axios from "axios";

function RepoInput({ setResult }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const analyzeRepo = async () => {
        if (!url) return;

        try {
            setLoading(true);

            const API_URL = import.meta.env.VITE_API_URL || "";
            const res = await axios.post(
                `${API_URL}/api/repo`,
                { repoUrl: url }
            );

            setResult(res.data);
        } catch (err) {
            console.log("API Failed, using fallback data");

            // 🔥 Fallback data
            const fallback = {
                repoData: {
                    name: "Sample Repo",
                    stars: 123,
                    forks: 45,
                },
                aiResult: {
                    summary:
                        "This is a sample analysis because the API is currently unavailable.",
                    score: 7,
                    suggestions: [
                        "Improve documentation",
                        "Add tests",
                        "Refactor code structure",
                    ],
                },
            };

            setResult(fallback);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-2 w-full max-w-xl mb-6">
            <input
                type="text"
                placeholder="Paste GitHub Repo URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            />

            <button
                onClick={analyzeRepo}
                className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing...
                    </>
                ) : (
                    "Analyze"
                )}
            </button>
        </div>
    );
}

export default RepoInput;