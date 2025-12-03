import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Card } from "@/components/ui/card";
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";

const Notifications = () => {
  const notifications = [
    { id: 1, type: "like", user: "小美", message: "喜欢了你", time: "刚刚", avatar: "👩" },
    { id: 2, type: "match", user: "阳光", message: "和你匹配成功！", time: "5分钟前", avatar: "🧑" },
    { id: 3, type: "message", user: "静雯", message: "给你发送了消息", time: "10分钟前", avatar: "👧" },
    { id: 4, type: "follow", user: "浩然", message: "关注了你", time: "1小时前", avatar: "👨" },
    { id: 5, type: "like", user: "梦琪", message: "喜欢了你", time: "2小时前", avatar: "👩‍🦰" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-primary fill-primary" />;
      case "match":
        return <Heart className="w-4 h-4 text-green-500 fill-green-500" />;
      case "message":
        return <MessageCircle className="w-4 h-4 text-secondary" />;
      case "follow":
        return <UserPlus className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">消息</h1>
          <Bell className="w-6 h-6 text-foreground" />
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-4 space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-2xl">
                {notification.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{notification.user}</span>
                  {getIcon(notification.type)}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
              </div>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </div>
          </Card>
        ))}
      </div>

      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Notifications;
