import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { sendMessage } from "@/services/geminiService";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hey there! 👋 I'm **Magudesh Gemini ChatBot**, your smart AI companion developed by *H. Magudeshwaran*. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationHistory, setConversationHistory] = useState<
    { role: string; parts: { text: string }[] }[]
  >([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Update conversation history
      const updatedHistory = [
        ...conversationHistory,
        { role: "user", parts: [{ text: input }] },
      ];

      const response = await sendMessage(input, updatedHistory);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // Update history with bot response
      setConversationHistory([
        ...updatedHistory,
        { role: "model", parts: [{ text: response }] },
      ]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 mb-4 glow-effect">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-glow flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">Magudesh Gemini ChatBot</h1>
            <p className="text-sm text-muted-foreground">Powered by Gemini AI • Trained by H. Magudeshwaran</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-card rounded-2xl p-4 border border-primary/20">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 bg-background/50 border-border/50 focus-visible:ring-primary"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="gradient-glow hover:opacity-90 transition-opacity"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
