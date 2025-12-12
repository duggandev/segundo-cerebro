import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }: any) => (
            <h1 className="text-lg font-bold text-gray-900 mt-4 mb-2" {...props} />
          ),
          h2: ({ node, ...props }: any) => (
            <h2 className="text-base font-bold text-gray-900 mt-3 mb-2" {...props} />
          ),
          h3: ({ node, ...props }: any) => (
            <h3 className="text-sm font-bold text-gray-900 mt-2 mb-1" {...props} />
          ),
          h4: ({ node, ...props }: any) => (
            <h4 className="text-sm font-semibold text-gray-900 mt-2 mb-1" {...props} />
          ),
          p: ({ node, ...props }: any) => (
            <p className="text-sm text-gray-700 leading-relaxed mb-2" {...props} />
          ),
          ul: ({ node, ...props }: any) => (
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-2" {...props} />
          ),
          ol: ({ node, ...props }: any) => (
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mb-2" {...props} />
          ),
          li: ({ node, ...props }: any) => (
            <li className="text-sm text-gray-700 ml-2" {...props} />
          ),
          blockquote: ({ node, ...props }: any) => (
            <blockquote
              className="border-l-4 border-blue-500 bg-blue-50 p-3 my-2 text-sm text-gray-700 italic"
              {...props}
            />
          ),
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code
                className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-xs font-mono"
                {...props}
              />
            ) : (
              <code
                className="block bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs font-mono mb-2"
                {...props}
              />
            ),
          pre: ({ node, ...props }: any) => (
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto mb-2" {...props} />
          ),
          a: ({ node, ...props }: any) => (
            <a
              className="text-blue-600 hover:text-blue-800 underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }: any) => (
            <img className="max-w-full h-auto rounded-lg my-2" {...props} />
          ),
          hr: ({ node, ...props }: any) => (
            <hr className="my-2 border-t-2 border-gray-300" {...props} />
          ),
          table: ({ node, ...props }: any) => (
            <table
              className="w-full border-collapse border border-gray-300 my-2 text-sm"
              {...props}
            />
          ),
          thead: ({ node, ...props }: any) => (
            <thead className="bg-gray-100" {...props} />
          ),
          th: ({ node, ...props }: any) => (
            <th className="border border-gray-300 p-1.5 text-left font-bold text-sm" {...props} />
          ),
          td: ({ node, ...props }: any) => (
            <td className="border border-gray-300 p-1.5 text-sm" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
