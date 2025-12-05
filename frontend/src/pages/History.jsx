import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
function History() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const {serverUrl, token}=useContext(AuthContext)
    
    const getReviews=async()=>{
        try {
            setLoading(true)
            const response= await axios.get(serverUrl+"api/review/history",{headers:{Authorization:`Bearer ${token}`}})
            if(response.data){
                setReviews(response.data)
                setLoading(false)
            }
        } catch (error) {
            console.log("get reviews ERROR -> ",error);
            setLoading(false)
        }
    }

    useEffect(()=>{
        getReviews()
    },[])
    console.log(reviews);
    
  return (
    <div className="max-w-5xl mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6 text-slate-900">
    Review History
  </h1>

  {loading ? (
    <p className="text-slate-500 dark:text-slate-400">Loading...</p>
  ) : reviews.length === 0 ? (
    <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-8 text-center">
      <p className="text-white">
        No reviews yet. Run your first code review to see it here.
      </p>
    </div>
  ) : (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-1">
                {review.language || review.langauge}
              </p>
              <div className='ml-[-8px]'>
                {<ReactMarkdown
                                  children={review.review.slice(0, 200)}
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
                                />}
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-500">
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString()
                : ''}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 dark:bg-slate-800 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                AI Review
              </span>
            </div>

            <button
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-3 py-1.5 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-slate-900"
            >
              View Full Review
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  )
}

export default History
