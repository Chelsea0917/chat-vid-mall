import { useState } from "react";
import { Send } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Chat = () => {
  const [messages] = useState([
    { id: 1, type: "ai", text: "你好！我是你的AI陪伴助手，有什么可以帮助你的吗？😊" },
    { id: 2, type: "user", text: "最近有什么新品推荐吗？" },
    { id: 3, type: "ai", text: "当然有！最近上新了几款智能设备，比如AI智能音箱和无线耳机Pro，都很受欢迎。需要我详细介绍吗？" },
  ]);

  return (
    <div className="flex flex-col h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border px-4 py-3 pt-safe">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-semibold">AI助手</h1>
        </div>
      </header>

      <Tabs defaultValue="text" className="flex-1 flex flex-col">
        <div className="flex justify-center px-4 py-3 bg-background border-b border-border">
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="voice">语音对话</TabsTrigger>
            <TabsTrigger value="text">文字对话</TabsTrigger>
          </TabsList>
        </div>

        {/* Voice Chat Mode */}
        <TabsContent value="voice" className="flex-1 flex items-center justify-center m-0 data-[state=active]:flex">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-primary animate-pulse" />
            <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-primary animate-ping opacity-75" />
          </div>
        </TabsContent>

        {/* Text Chat Mode */}
        <TabsContent value="text" className="flex-1 flex flex-col m-0 data-[state=active]:flex">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.type === "user"
                      ? "bg-gradient-primary text-white"
                      : "bg-background shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-background border-t border-border px-4 py-3 pb-20">
            <div className="flex items-center gap-2">
              <Input
                placeholder="输入消息..."
                className="flex-1 rounded-full bg-muted/50 border-0"
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-full">
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
