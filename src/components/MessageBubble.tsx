import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";
import developerImg from "@/assets/developer.jpg";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  showDeveloperImage?: boolean;
}

const MessageBubble = ({ message, isUser, showDeveloperImage }: MessageBubbleProps) => {
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-start max-w-[85%] ${isUser ? "ml-auto" : "mr-auto"}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? "bg-gradient-glow" : "glass-card border border-primary/30"
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-primary" />
        )}
      </div>
      
      <div className={`flex-1 px-4 py-3 rounded-2xl ${
        isUser 
          ? "bg-chat-user glass-card" 
          : "glass-card gradient-border"
      }`}>
        {showDeveloperImage && (
          <div className="mb-4 flex justify-center">
            <img 
              src={"/me.jpg"}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.onerror = null;
                img.src = developerImg;
              }}
              alt="H. Magudeshwaran - AI Developer" 
              className="rounded-lg max-w-xs w-full object-cover border-2 border-primary/30 glow-effect"
            />
          </div>
        )}
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
              strong: ({ children }) => <strong className="text-primary font-semibold">{children}</strong>,
              a: ({ href, children }) => (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-secondary transition-colors shadow-sm mr-2 mb-2"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm">
                    {children}
                  </code>
                ) : (
                  <code className="block px-4 py-3 rounded-lg bg-muted text-foreground font-mono text-sm overflow-x-auto">
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 text-gradient">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-2 text-gradient">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 text-foreground">{children}</h3>,
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
