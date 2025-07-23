import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

export default function MarkdownRenderer({ content, assetBasePath }) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 이미지 경로 처리
          img: ({ src, alt, ...props }) => {
            const imageSrc = src.startsWith('http') 
              ? src 
              : `${assetBasePath}/${src}`;
            return <img src={imageSrc} alt={alt} {...props} />;
          },
          // 코드 블록 스타일링
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className={`${className} bg-gray-100 rounded-lg p-4 overflow-x-auto`}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}