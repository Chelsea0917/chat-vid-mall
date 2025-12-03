import { useState, useCallback } from "react";
import { Search, BadgeCheck, Gift } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { CoinIcon } from "@/components/CurrencyIcons";
import { cn } from "@/lib/utils";

// 邂逅用户数据
const encounterUsers = [
  {
    id: 1,
    name: "相遇",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    verified: true,
    vip: true,
    location: "深圳",
    age: 48,
    status: "单身",
    bio: "人关建有一颗诚实的心❤️不是去...",
    isNew: false,
  },
  {
    id: 2,
    name: "活泼可爱的美羊羊",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    verified: true,
    vip: false,
    location: "深圳",
    age: 28,
    status: "单身",
    bio: "活泼可爱善良的女孩。想找个安...",
    isNew: false,
  },
  {
    id: 3,
    name: "春天",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    verified: true,
    vip: false,
    location: "深圳",
    age: 55,
    status: "单身",
    bio: "自由自在一点",
    isNew: false,
  },
  {
    id: 4,
    name: "重庆的辣妹",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
    verified: true,
    vip: false,
    location: "深圳",
    age: 40,
    status: "单身",
    bio: "你好，我来自重庆，单身，行业...",
    isNew: false,
  },
  {
    id: 5,
    name: "余生请多指教丫",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
    verified: true,
    vip: false,
    location: "深圳",
    age: 29,
    status: "离异",
    bio: "余生请多指教",
    isNew: true,
  },
  {
    id: 6,
    name: "孤单谁来陪",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    verified: true,
    vip: false,
    location: "深圳",
    age: 46,
    status: "单身",
    bio: "希望找到性格温稳定，包容的男生",
    isNew: false,
  },
  {
    id: 7,
    name: "简单",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    verified: true,
    vip: false,
    location: "深圳",
    age: 55,
    status: "保密",
    bio: "一生很贵，要健康快乐",
    isNew: false,
  },
  {
    id: 8,
    name: "淡然",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    verified: true,
    vip: false,
    location: "深圳",
    age: 57,
    status: "离异",
    bio: "简简单单生活",
    isNew: false,
  },
];

// 盲盒用户池
const blindBoxUsers = [
  {
    id: 1,
    name: "44岁·人事/行政",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    age: 44,
    occupation: "人事/行政",
    bio: "我就是我，不一样的烟火",
  },
  {
    id: 2,
    name: "32岁·设计师",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
    age: 32,
    occupation: "设计师",
    bio: "喜欢旅行，热爱生活",
  },
  {
    id: 3,
    name: "38岁·教师",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    age: 38,
    occupation: "教师",
    bio: "温柔善良，期待遇见",
  },
  {
    id: 4,
    name: "29岁·医生",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    age: 29,
    occupation: "医生",
    bio: "认真工作，用心生活",
  },
  {
    id: 5,
    name: "35岁·自由职业",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop",
    age: 35,
    occupation: "自由职业",
    bio: "随心而行，自由自在",
  },
];

const Messages = () => {
  const [activeTab, setActiveTab] = useState("encounter");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);
  
  // 盲盒状态
  const [drawnUser, setDrawnUser] = useState<typeof blindBoxUsers[0] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setPulling(false);
    }, 1000);
  }, [isRefreshing]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent, scrollTop: number) => {
    if (scrollTop === 0 && e.touches[0].clientY - startY > 50) {
      setPulling(true);
    }
  };

  const handleTouchEnd = () => {
    if (pulling) {
      handleRefresh();
    }
  };

  // 抽盲盒
  const handleDrawBlindBox = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setDrawnUser(null);
    
    // 模拟抽取动画
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * blindBoxUsers.length);
      setDrawnUser(blindBoxUsers[randomIndex]);
      setIsDrawing(false);
    }, 1500);
  };

  // 邂逅用户卡片
  const EncounterUserCard = ({ user }: { user: typeof encounterUsers[0] }) => (
    <div className="flex items-center gap-3 py-4 border-b border-border/30">
      <div className="relative">
        <Avatar className="w-16 h-16 flex-shrink-0">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </Avatar>
        {user.isNew && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">
            新人
          </span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="font-semibold text-primary">{user.name}</span>
          {user.verified && (
            <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-500" />
          )}
          {user.vip && (
            <span className="bg-amber-500 text-white text-[10px] px-1 rounded">👑</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-1">
          {user.location} • {user.age}岁 • {user.status}
        </p>
        <p className="text-sm text-muted-foreground truncate">{user.bio}</p>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex-shrink-0 text-primary hover:text-primary hover:bg-primary/10 h-auto py-1.5 px-3"
      >
        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs mr-1.5">Hi</span>
        打招呼
      </Button>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header with Tabs and Search Button */}
      <div className="flex-shrink-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="flex items-center h-12 px-4">
          {/* 占位，保持居中 */}
          <div className="w-7" />
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="w-full h-12 bg-transparent rounded-none border-b-0 p-0 justify-center gap-6">
              <TabsTrigger
                value="encounter"
                className="h-full px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium"
              >
                邂逅
              </TabsTrigger>
              <TabsTrigger
                value="blindbox"
                className="h-full px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium"
              >
                缘分盲盒
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* 搜索按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
          >
            <Search className="w-5 h-5 text-foreground" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div 
        className="flex-1 overflow-y-auto pb-20"
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => handleTouchMove(e, e.currentTarget.scrollTop)}
        onTouchEnd={handleTouchEnd}
      >
        {/* 下拉刷新指示器 */}
        {(pulling || isRefreshing) && (
          <div className="flex items-center justify-center py-3 text-sm text-muted-foreground">
            {isRefreshing ? "刷新中..." : "松开刷新"}
          </div>
        )}

        {/* 邂逅页面 */}
        {activeTab === "encounter" && (
          <div className="px-4">
            {encounterUsers.map(user => (
              <EncounterUserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {/* 缘分盲盒页面 */}
        {activeTab === "blindbox" && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-6">
            {/* 盲盒展示区 */}
            <div className="relative mb-8">
              {!drawnUser ? (
                // 未抽取状态 - 显示盲盒
                <div className={cn(
                  "w-48 h-48 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center shadow-lg",
                  isDrawing && "animate-pulse"
                )}>
                  <Gift className={cn(
                    "w-24 h-24 text-primary",
                    isDrawing && "animate-bounce"
                  )} />
                </div>
              ) : (
                // 已抽取状态 - 显示用户名片
                <Card className="w-72 p-6 bg-gradient-to-br from-pink-50 to-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <img src={drawnUser.avatar} alt={drawnUser.name} className="w-full h-full object-cover" />
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{drawnUser.age}岁·{drawnUser.occupation}</h3>
                      <p className="text-sm text-muted-foreground">{drawnUser.age}岁·{drawnUser.occupation}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 rounded-lg p-4 mb-4">
                    <p className="text-center text-muted-foreground">{drawnUser.bio}</p>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-5">
                    立即私聊
                  </Button>
                </Card>
              )}
            </div>

            {/* 抽盲盒按钮 */}
            {!drawnUser && (
              <Button
                onClick={handleDrawBlindBox}
                disabled={isDrawing}
                className="bg-gradient-to-r from-primary to-pink-400 hover:from-primary/90 hover:to-pink-400/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium shadow-lg"
              >
                {isDrawing ? (
                  "抽取中..."
                ) : (
                  <span className="flex items-center gap-2">
                    抽盲盒
                    <span className="flex items-center gap-1 text-sm bg-white/20 px-2 py-0.5 rounded-full">
                      <CoinIcon className="w-4 h-4" />
                      1
                    </span>
                  </span>
                )}
              </Button>
            )}

            {/* 再抽一次按钮 */}
            {drawnUser && (
              <Button
                onClick={handleDrawBlindBox}
                variant="outline"
                className="mt-4 rounded-full px-6"
              >
                <span className="flex items-center gap-2">
                  再抽一次
                  <span className="flex items-center gap-1 text-sm">
                    <CoinIcon className="w-4 h-4" />
                    1
                  </span>
                </span>
              </Button>
            )}

            {/* 提示文字 */}
            <p className="text-xs text-muted-foreground mt-6 text-center">
              每次抽取消耗1金币，随机匹配有缘人
            </p>
          </div>
        )}
      </div>

      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Messages;
