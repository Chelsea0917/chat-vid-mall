import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<"messages" | "friends">("messages");

  const conversations = [
    {
      id: 1,
      user: { name: "小美", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop" },
      lastMessage: "好的，那我们明天见！",
      time: "刚刚",
      unread: 3,
      online: true,
    },
    {
      id: 2,
      user: { name: "阳光先生", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      lastMessage: "这首歌真的很好听，推荐给你～",
      time: "5分钟前",
      unread: 1,
      online: true,
    },
    {
      id: 3,
      user: { name: "系统通知", avatar: "🔔" },
      lastMessage: "您有一个新的好友请求",
      time: "10分钟前",
      unread: 0,
      online: false,
      isSystem: true,
    },
    {
      id: 4,
      user: { name: "静雯", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
      lastMessage: "周末一起去爬山吗？",
      time: "1小时前",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      user: { name: "K歌房助手", avatar: "🎤" },
      lastMessage: "您预约的房间即将开始",
      time: "2小时前",
      unread: 2,
      online: false,
      isSystem: true,
    },
    {
      id: 6,
      user: { name: "浩然", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      lastMessage: "那首歌叫什么名字来着？",
      time: "3小时前",
      unread: 0,
      online: true,
    },
    {
      id: 7,
      user: { name: "梦琪", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
      lastMessage: "谢谢你的帮助！🙏",
      time: "昨天",
      unread: 0,
      online: false,
    },
    {
      id: 8,
      user: { name: "官方活动", avatar: "🎁" },
      lastMessage: "恭喜您获得新人礼包！",
      time: "昨天",
      unread: 1,
      online: false,
      isSystem: true,
    },
  ];

  const friends = [
    {
      id: 1,
      user: { name: "小美", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop" },
      status: "在线",
      online: true,
    },
    {
      id: 2,
      user: { name: "阳光先生", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      status: "5分钟前在线",
      online: false,
    },
    {
      id: 3,
      user: { name: "静雯", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
      status: "1小时前在线",
      online: false,
    },
    {
      id: 4,
      user: { name: "浩然", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
      status: "在线",
      online: true,
    },
    {
      id: 5,
      user: { name: "梦琪", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
      status: "昨天在线",
      online: false,
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header with Tabs */}
      <div className="flex-shrink-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("messages")}
              className={cn(
                "text-xl font-bold transition-colors",
                activeTab === "messages" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              消息
            </button>
            <button
              onClick={() => setActiveTab("friends")}
              className={cn(
                "text-xl font-bold transition-colors",
                activeTab === "friends" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              好友
            </button>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === "messages" && (
          <div className="divide-y divide-border/50">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer active:bg-muted"
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <Avatar className="w-14 h-14">
                    {conversation.isSystem ? (
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-secondary/20 to-secondary/10">
                        {conversation.user.avatar}
                      </AvatarFallback>
                    ) : (
                      <img src={conversation.user.avatar} alt={conversation.user.name} className="w-full h-full object-cover" />
                    )}
                  </Avatar>
                  {conversation.online && !conversation.isSystem && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
                  )}
                  {conversation.unread > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-primary rounded-full">
                      {conversation.unread > 99 ? "99+" : conversation.unread}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "font-semibold truncate",
                      conversation.unread > 0 && "text-foreground",
                      conversation.unread === 0 && "text-foreground/80"
                    )}>
                      {conversation.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {conversation.time}
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm truncate",
                    conversation.unread > 0 ? "text-foreground/90" : "text-muted-foreground"
                  )}>
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "friends" && (
          <div className="divide-y divide-border/50">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer active:bg-muted"
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <Avatar className="w-14 h-14">
                    <img src={friend.user.avatar} alt={friend.user.name} className="w-full h-full object-cover" />
                  </Avatar>
                  {friend.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-foreground">{friend.user.name}</span>
                  <p className="text-sm text-muted-foreground">{friend.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Notifications;
