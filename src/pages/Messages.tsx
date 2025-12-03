import { useState, useCallback } from "react";
import { Heart, MessageCircle, Search, Users, Music, Share2, BadgeCheck } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// 好友动态数据
const friendPosts = [
  {
    id: 1,
    user: { name: "秀秀", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop", verified: true },
    time: "40秒前",
    content: "",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop"
    ],
    likes: 24,
    comments: 5,
    liked: false,
  },
  {
    id: 2,
    user: { name: "直率的小猪", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: true },
    time: "41秒前",
    content: "",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop"
    ],
    likes: 1,
    comments: 0,
    liked: false,
  },
  {
    id: 3,
    user: { name: "月亮代表我的心", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: true },
    time: "43秒前",
    content: "来认识一下吧",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop"
    ],
    likes: 89,
    comments: 23,
    liked: false,
  },
];

// 发现页陌生人动态
const discoverPosts = [
  {
    id: 1,
    user: { name: "旅行者小王", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", verified: false },
    time: "刚刚",
    content: "第一次来这个城市，有什么好玩的推荐吗？",
    images: [
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop"
    ],
    likes: 8,
    comments: 3,
    liked: false,
  },
  {
    id: 2,
    user: { name: "美食达人", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop", verified: true },
    time: "15分钟前",
    content: "今天做了一道拿手菜，味道绝了！",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit=crop"
    ],
    likes: 156,
    comments: 45,
    liked: false,
  },
  {
    id: 3,
    user: { name: "音乐小哥", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop", verified: false },
    time: "30分钟前",
    content: "晚上直播唱歌，欢迎来捧场！",
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop"
    ],
    likes: 234,
    comments: 67,
    liked: false,
  },
];

// K歌房数据
const karaokeRooms = [
  {
    id: "#32518",
    title: "70后金曲拼单房",
    price: 9.9,
    capacity: 5,
    current: 3,
    users: ["👨", "👩", "🧓"],
  },
  {
    id: "#28734",
    title: "90后怀旧经典",
    price: 12.9,
    capacity: 10,
    current: 10,
    users: ["👦", "👧", "🧑", "👨", "👩"],
  },
  {
    id: "#45621",
    title: "粤语金曲之夜",
    price: 8.8,
    capacity: 8,
    current: 5,
    users: ["🧔", "👱", "👩‍🦰", "👨‍🦳", "👩‍🦱"],
  },
  {
    id: "#19283",
    title: "情歌对唱专场",
    price: 15.9,
    capacity: 6,
    current: 4,
    users: ["💑", "👫", "👩", "🧑"],
  },
];

const Messages = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [friendPostsState, setFriendPostsState] = useState(friendPosts);
  const [discoverPostsState, setDiscoverPostsState] = useState(discoverPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);

  const handleLikePost = (postId: number, isFriend: boolean) => {
    if (isFriend) {
      setFriendPostsState(prev =>
        prev.map(post =>
          post.id === postId
            ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
            : post
        )
      );
    } else {
      setDiscoverPostsState(prev =>
        prev.map(post =>
          post.id === postId
            ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
            : post
        )
      );
    }
  };

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

  // 动态卡片组件 - 无边框设计
  const PostCard = ({ post, isFriend }: { post: typeof friendPosts[0]; isFriend: boolean }) => (
    <div className="py-4 border-b border-border/30">
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12 flex-shrink-0">
          <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">{post.user.name}</span>
              {post.user.verified && (
                <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-primary text-sm font-medium h-auto py-1 px-2">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs mr-1">Hi</span>
              打招呼
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{post.time}</p>
          
          {post.content && (
            <p className="text-sm text-foreground mb-3 leading-relaxed">{post.content}</p>
          )}
          
          {/* 图片网格 */}
          <div className={cn(
            "grid gap-1.5 mb-3",
            post.images.length === 1 && "grid-cols-1 max-w-[200px]",
            post.images.length === 2 && "grid-cols-2 max-w-[280px]",
            post.images.length >= 3 && "grid-cols-3"
          )}>
            {post.images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-md overflow-hidden bg-muted"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* 互动按钮 */}
          <div className="flex items-center justify-between text-muted-foreground">
            <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              <span>转发</span>
            </button>
            <button
              onClick={() => handleLikePost(post.id, isFriend)}
              className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
            >
              <Heart className={cn("w-4 h-4", post.liked && "fill-primary text-primary")} />
              <span>赞{post.likes > 0 && ` ${post.likes}`}</span>
            </button>
            <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>评论{post.comments > 0 && ` ${post.comments}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header with Tabs */}
      <div className="flex-shrink-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-12 bg-transparent rounded-none border-b-0 p-0">
            <TabsTrigger
              value="friends"
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium"
            >
              关注
            </TabsTrigger>
            <TabsTrigger
              value="discover"
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium"
            >
              发现
            </TabsTrigger>
            <TabsTrigger
              value="karaoke"
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium"
            >
              K歌房
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area with Pull to Refresh */}
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

        {/* 关注动态 */}
        {activeTab === "friends" && (
          <div className="px-4">
            {friendPostsState.map(post => (
              <PostCard key={post.id} post={post} isFriend={true} />
            ))}
          </div>
        )}

        {/* 发现页面 */}
        {activeTab === "discover" && (
          <div className="px-4">
            {discoverPostsState.map(post => (
              <PostCard key={post.id} post={post} isFriend={false} />
            ))}
          </div>
        )}

        {/* K歌房 */}
        {activeTab === "karaoke" && (
          <div className="p-4">
            {/* 搜索栏 */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索房间号 / 主播名"
                className="pl-10 rounded-full bg-muted/50 border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 房间列表 */}
            <div className="space-y-3">
              {karaokeRooms.map(room => {
                const isFull = room.current >= room.capacity;
                return (
                  <Card key={room.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Music className="w-4 h-4 text-primary" />
                          <span className="text-xs text-muted-foreground">{room.id}</span>
                        </div>
                        <h3 className="font-semibold text-foreground">{room.title}</h3>
                      </div>
                      <Badge variant={isFull ? "secondary" : "default"} className="rounded-full">
                        ¥{room.price}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* 用户头像 */}
                        <div className="flex -space-x-2">
                          {room.users.slice(0, 4).map((user, idx) => (
                            <Avatar key={idx} className="w-8 h-8 border-2 border-background">
                              <AvatarFallback className="text-sm bg-gradient-to-br from-primary/10 to-secondary/10">
                                {user}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {room.users.length > 4 && (
                            <Avatar className="w-8 h-8 border-2 border-background">
                              <AvatarFallback className="text-xs bg-muted">
                                +{room.users.length - 4}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{room.current}/{room.capacity}人</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="rounded-full"
                        disabled={isFull}
                        variant={isFull ? "secondary" : "default"}
                      >
                        {isFull ? "人已满" : "拼单加入"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Messages;
