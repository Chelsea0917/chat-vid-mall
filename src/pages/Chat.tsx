import { useState, useEffect, useRef } from "react";
import { Send, Mic, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, type: "ai", text: "你好！我是你的AI陪伴助手，有什么可以帮助你的吗？😊" },
    { id: 2, type: "user", text: "最近有什么新品推荐吗？" },
    { id: 3, type: "ai", text: "当然有！最近上新了几款智能设备，比如AI智能音箱和无线耳机Pro，都很受欢迎。需要我详细介绍吗？" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const animationFrameRef = useRef<number>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate smooth audio level changes for demo
    let targetLevel = 50;
    
    const simulateAudioLevel = () => {
      // Smooth transition to target level
      setAudioLevel(prev => {
        const diff = targetLevel - prev;
        return prev + diff * 0.1;
      });
      
      // Randomly change target level
      if (Math.random() < 0.05) {
        targetLevel = Math.random() * 100;
      }
      
      animationFrameRef.current = requestAnimationFrame(simulateAudioLevel);
    };
    
    simulateAudioLevel();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const getVoiceScale = () => {
    return 1 + (audioLevel / 100) * 0.5; // Scale from 1 to 1.5 based on audio level
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputValue.trim(),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
    
    // Auto scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-muted/30">
      <Tabs defaultValue="text" className="flex-1 flex flex-col">
        <div className="flex items-center px-4 py-3 bg-background border-b border-border pt-safe gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="voice">语音</TabsTrigger>
            <TabsTrigger value="text">文字</TabsTrigger>
          </TabsList>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>

        {/* Voice Chat Mode */}
        <TabsContent value="voice" className="flex-1 hidden flex-col m-0 data-[state=active]:flex">
          {/* Empty space */}
          <div className="flex-1"></div>
          
          {/* Start chat button with waveform above it */}
          <div className="p-6 pb-24 flex flex-col items-center gap-3">
            {/* Horizontal voice waveform above button */}
            {isRecording && (
              <div className="flex items-center gap-0.5 h-8">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-gradient-primary rounded-full transition-all duration-150"
                    style={{
                      height: `${8 + Math.sin((audioLevel + i * 15) / 10) * 12}px`,
                      opacity: 0.6 + Math.random() * 0.4,
                    }}
                  />
                ))}
              </div>
            )}
            
            <Button 
              size="default"
              className="rounded-full h-11 px-6"
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-4 h-4 mr-2" />
              {isRecording ? "停止" : "开始"}
            </Button>
          </div>
        </TabsContent>

        {/* Text Chat Mode */}
        <TabsContent value="text" className="flex-1 hidden flex-col !mt-0 data-[state=active]:flex">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                {msg.type === "ai" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-primary text-white text-xs">AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.type === "user"
                      ? "bg-gradient-primary text-white"
                      : "bg-background shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.type === "user" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">我</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-background border-t border-border px-4 py-3 pb-safe">
            <div className="flex items-center gap-2">
              <Input
                placeholder="输入消息..."
                className="flex-1 rounded-full bg-muted/50 border-0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                size="icon" 
                className="bg-primary hover:bg-primary/90 rounded-full"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Chat;
