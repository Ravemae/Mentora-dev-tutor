import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, Code, GitBranch, Terminal, Heart } from "lucide-react";
import mentorLogo1 from "@/assets/mentora-logo.png";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Mentora, your AI coding tutor. I'm here to help you learn programming, Git, Docker, and DevOps concepts. What would you like to learn today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: Code, label: "Python Basics", color: "bg-blue-500/20 text-blue-400" },
    { icon: GitBranch, label: "Git Commands", color: "bg-green-500/20 text-green-400" },  
    { icon: Terminal, label: "Terminal Help", color: "bg-purple-500/20 text-purple-400" },
    { icon: Heart, label: "DevOps Guide", color: "bg-red-500/20 text-red-400" },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'd be happy to help you with that! Let me break it down step by step and provide you with clear examples and explanations.",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src={mentorLogo1} alt="Mentora" className="w-12 h-12 ai-glow rounded-full" />
            <div className="text-center">
              <h1 className="text-2xl font-bold gradient-text">Mentora</h1>
              <p className="text-muted-foreground">Your Smart Conversational Coding Companion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "ai" && (
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ai-glow">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
              )}
              
              <Card className={`p-4 max-w-[70%] chat-bubble ${
                message.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card"
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </Card>

              {message.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-medium">You</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground mb-4 text-center">Quick start topics:</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {quickActions.map((action, index) => (
                <Badge
                  key={index}
                  className={`cursor-pointer px-4 py-2 ${action.color} hover:scale-105 transition-transform`}
                  onClick={() => setInputValue(`Tell me about ${action.label.toLowerCase()}`)}
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-6 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Input
              placeholder="What's on your mind today?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12 h-12 text-base"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 ai-glow"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;