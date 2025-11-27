import { useState, useEffect, useRef } from "react";
import { Send, Mic } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Chat = () => {
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
        <div className="flex justify-center px-4 py-3 bg-background border-b border-border pt-safe">
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="voice">语音</TabsTrigger>
            <TabsTrigger value="text">文字</TabsTrigger>
          </TabsList>
        </div>

        {/* Voice Chat Mode */}
        <TabsContent value="voice" className="flex-1 hidden flex-col m-0 data-[state=active]:flex">
          {/* Reserved space at top */}
          <div className="flex-1 flex flex-col">
            {/* Voice waveform and transcription area */}
            {isRecording && (
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
                {/* Voice waveform */}
                <div className="flex items-end justify-center gap-1 mb-8 h-24">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-primary rounded-full transition-all duration-150"
                      style={{
                        height: `${20 + Math.sin((audioLevel + i * 10) / 10) * 40}%`,
                        opacity: 0.7 + Math.random() * 0.3,
                      }}
                    />
                  ))}
                </div>
                
                {/* Real-time transcription display */}
                <div className="w-full max-w-md bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">实时转录</p>
                  <p className="text-base leading-relaxed">
                    {messages.length > 0 ? messages[messages.length - 1].text : "正在聆听..."}
                  </p>
                </div>
              </div>
            )}
            
            {!isRecording && (
              <div className="flex-1 flex items-center justify-center px-6">
                <p className="text-muted-foreground text-center">
                  点击下方按钮开始语音对话
                </p>
              </div>
            )}
          </div>
          
          {/* Start chat button at bottom */}
          <div className="p-6 pb-24">
            <Button 
              size="lg"
              className="w-full rounded-full h-14 font-bold"
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-5 h-5 mr-2" />
              {isRecording ? "停止聊天" : "开始聊天"}
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
          <div className="bg-background border-t border-border px-4 py-3 pb-20">
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

      <BottomNav />
    </div>
  );
};

export default Chat;
