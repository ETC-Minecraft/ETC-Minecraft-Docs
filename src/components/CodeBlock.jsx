import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

/**
 * CodeBlock — renders a syntax-highlighted code block with a copy button.
 */
export default function CodeBlock({ code, language = 'yaml', title }) {
  const copy = () => navigator.clipboard?.writeText(code)

  return (
    <div className="rounded-lg overflow-hidden border border-zinc-700 my-4">
      {title && (
        <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-xs text-zinc-400">
          <span>{title}</span>
          <button
            onClick={copy}
            className="hover:text-white transition-colors"
            title="Copiar"
          >
            📋 Copiar
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.82rem' }}
        showLineNumbers
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
