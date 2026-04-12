# RepoIQ 🚀

**RepoIQ** is an AI-powered GitHub repository evaluator that provides deep architectural insights, code health metrics, and actionable improvement strategies in seconds.

![RepoIQ UI](https://img.shields.io/badge/UI-Modern_Glassmorphism-blue)
![AI-Powered](https://img.shields.io/badge/Powered_By-Gemini_2.5_Flash-orange)
![Visualization](https://img.shields.io/badge/Charts-Recharts-teal)

## ✨ Key Features

- **🧠 Deep AI Analysis**: Evaluates repository structure, code quality, and readability using Google's Gemini AI.
- **📄 README Scoring**: Analyzes the quality of documentation and provides specific feedback.
- **📊 Visual Metrics**: 
  - **Radar Charts**: Multi-dimensional score breakdown.
  - **Pie Charts**: Real-time language distribution analysis.
  - **Bar Charts**: Structural repository composition (Source, Assets, Config, etc.).
- **💡 Actionable Suggestions**: Creative, AI-driven ideas for project extension and AI integration.
- **⚡ GitHub Integration**: Seamlessly fetches repository metadata, languages, and file structures.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Recharts, Lucide React, CSS3 (Glassmorphism).
- **Backend**: Node.js, Express.
- **AI**: Gemini 2.5 Flash API.
- **External API**: GitHub REST API.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- A Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/))
- (Optional) GitHub Personal Access Token for higher rate limits.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pururajsingh06/RepoIQ.git
   cd RepoIQ
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GITHUB_TOKEN=your_optional_github_token_here
   PORT=5000
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

### Running the App

- **Start Backend**: `npm run dev` (inside `/backend`)
- **Start Frontend**: `npm run dev` (inside `/frontend`)

Open `http://localhost:5173` to start analyzing repositories!

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 👤 Author

**Pururaj Singh**  
- [GitHub](https://github.com/pururajsingh06)  
- [LinkedIn](https://linkedin.com/in/pururaj-singh-07611a243/)

---

*Made with ❤️ for the Developer Community.*
