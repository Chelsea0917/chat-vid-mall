import { Search, Plus } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: "互动消息",
      avatar: "💬",
      lastMessage: "用户1 赞了你的回复",
      time: "昨天",
      unread: 2,
      type: "system",
    },
    {
      id: 2,
      name: "用户1",
      avatar: "👤",
      lastMessage: "1小时内在线",
      time: "00:07",
      unread: 110,
      status: "online",
    },
    {
      id: 3,
      name: "用户2",
      avatar: "👤",
      lastMessage: "最新中 1/3",
      time: "05:31",
      status: "online",
    },
    {
      id: 4,
      name: "用户3",
      avatar: "👤",
      lastMessage: "[分享视频]",
      time: "昨天 12:10",
    },
    {
      id: 5,
      name: "陌生人消息",
      avatar: "👤",
      lastMessage: "用户4: 我们可以提供服务...",
      time: "昨天",
      unread: 1,
    },
    {
      id: 6,
      name: "购物消息",
      avatar: "🛍️",
      lastMessage: "买商家旗舰店: 【卡片消息】",
      time: "周六",
      unread: 1,
      type: "shopping",
    },
    {
      id: 7,
      name: "用户5",
      avatar: "👤",
      lastMessage: "[表情]",
      time: "周三",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-background border-b border-border z-40 pt-safe">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold">消息</h1>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Search className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Conversations List */}
      <div className="divide-y divide-border/50">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors"
          >
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  conv.type === "system"
                    ? "bg-gradient-primary"
                    : conv.type === "shopping"
                    ? "bg-gradient-secondary"
                    : "bg-muted"
                }`}
              >
                {conv.avatar}
              </div>
              {conv.status === "online" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
            
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium truncate">{conv.name}</h3>
                <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {conv.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">
                  {conv.lastMessage}
                </p>
                {conv.unread && (
                  <Badge
                    variant="destructive"
                    className="ml-2 flex-shrink-0 bg-primary hover:bg-primary rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5"
                  >
                    {conv.unread}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Messages;
