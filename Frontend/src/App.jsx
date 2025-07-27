import { useState, useEffect } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)

  const [review, setReview] = useState('')

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      setReview('Error: Could not fetch review.')
      console.error(error)
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, 'javascript')
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: '1px solid #ddd',
              borderRadius: '0.7rem',
              height: '100%',
              width: '100%',
              backgroundColor: '#1e1e1e',
              color: '#f8f8f2',
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">
          Review
        </div>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
      </div>
    </main>
  )
}

export default App
