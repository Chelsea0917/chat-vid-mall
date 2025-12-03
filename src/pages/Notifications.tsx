import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const conversations = [
    {
      id: 1,
      user: { name: "小美", avatar: "👩" },
      lastMessage: "好的，那我们明天见！",
      time: "刚刚",
      unread: 3,
      online: true,
    },
    {
      id: 2,
      user: { name: "阳光先生", avatar: "🧑" },
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
      user: { name: "静雯", avatar: "👧" },
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
      user: { name: "浩然", avatar: "👨" },
      lastMessage: "那首歌叫什么名字来着？",
      time: "3小时前",
      unread: 0,
      online: true,
    },
    {
      id: 7,
      user: { name: "梦琪", avatar: "👩‍🦰" },
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

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">消息</h1>
          <span className="text-sm text-muted-foreground">
            {conversations.filter(c => c.unread > 0).length} 条未读
          </span>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="divide-y divide-border/50">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="px-4 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer active:bg-muted"
            >
              {/* Avatar with online indicator */}
              <div className="relative flex-shrink-0">
                <Avatar className="w-14 h-14">
                  <AvatarFallback 
                    className={cn(
                      "text-2xl",
                      conversation.isSystem 
                        ? "bg-gradient-to-br from-secondary/20 to-secondary/10" 
                        : "bg-gradient-to-br from-primary/10 to-secondary/10"
                    )}
                  >
                    {conversation.user.avatar}
                  </AvatarFallback>
                </Avatar>
                {conversation.online && !conversation.isSystem && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
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

              {/* Unread badge */}
              {conversation.unread > 0 && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-primary rounded-full">
                    {conversation.unread > 99 ? "99+" : conversation.unread}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Notifications;
