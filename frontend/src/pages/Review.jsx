import React, { useContext, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Review() {
  const [langauge, setLangauge] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const { serverUrl, token } = useContext(AuthContext);
  const markdownRef = useRef();
  const navigate=useNavigate()

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        serverUrl + "api/review/codeReview",
        { code, langauge },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data) {
        const genReview = response.data;
        setReview(genReview.review || genReview); // keep compatibility
      }
    } catch (error) {
      console.error("handle Review ERROR -> ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReview = async () => {
    if (!review) return;
    await navigator.clipboard.writeText(review);
    // optionally: show toast
  };

  const handleCopyCode = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
  };

  const handleDownloadReview = () => {
    if (!review) return;
    const blob = new Blob([review], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-review-${new Date().toISOString()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-4">
        {/* Header / toolbar */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold">AI Code Review</h2>

          <div className="ml-auto flex items-center gap-3">
            <button onClick={()=>navigate("/history")} className="px-3 py-2 rounded-lg bg-blue-200">See History</button>
            <label className="text-sm text-gray-600">Language</label>
            <select
              value={langauge}
              onChange={(e) => setLangauge(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>

            <button
              onClick={handleCopyCode}
              disabled={!code}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
            >
              Copy Code
            </button>

            <button
              onClick={handleReview}
              disabled={loading || !code}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                loading || !code ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Reviewing..." : "Review"}
            </button>
          </div>
        </div>

        {/* Split pane */}
        <div className="flex gap-4 h-[calc(100vh-140px)]">
          {/* Editor side */}
          <div className="w-1/2 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b flex items-center justify-between">
              <div className="text-sm text-gray-700">Code Editor</div>
            </div>

            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage={langauge}
                defaultValue={""}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  tabSize: 2,
                }}
              />
            </div>
          </div>

          {/* Review side */}
          <div className="w-1/2 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">AI Review</div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyReview}
                  disabled={!review}
                  className="text-sm px-2 py-1 border rounded-md hover:bg-gray-100"
                >
                  Copy Review
                </button>

                <button
                  onClick={handleDownloadReview}
                  disabled={!review}
                  className="text-sm px-2 py-1 border rounded-md hover:bg-gray-100"
                >
                  Download
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 prose max-w-none">
              {loading ? (
                <div className="flex items-center gap-3 text-gray-600">
                  <svg
                    className="animate-spin h-5 w-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <div>Generating review — this may take a few seconds...</div>
                </div>
              ) : review ? (
                <ReactMarkdown
                  children={review}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline ? (
                        <SyntaxHighlighter
                          language={match ? match[1] : "javascript"}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              ) : (
                <div className="text-sm text-gray-500">
                  No review yet. Paste code into the editor and click <strong>Review</strong>.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
