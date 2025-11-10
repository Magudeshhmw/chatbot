const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 px-4 py-3 glass-card rounded-2xl w-fit">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
      <span className="text-sm text-muted-foreground">Thinking...</span>
    </div>
  );
};

export default TypingIndicator;
