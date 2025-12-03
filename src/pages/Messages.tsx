import { useState } from "react";
import { Heart, MessageCircle, RefreshCw, Search, Users, Music, Plus } from "lucide-react";
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
    user: { name: "小美", avatar: "👩" },
    time: "10分钟前",
    content: "今天天气真好，出门散步心情超棒！☀️",
    images: ["🌸", "🌺", "🌻"],
    likes: 24,
    comments: 5,
    liked: false,
  },
  {
    id: 2,
    user: { name: "阳光先生", avatar: "🧑" },
    time: "1小时前",
    content: "分享一首最近很喜欢的歌，希望你们也喜欢 🎵",
    images: ["🎵"],
    likes: 56,
    comments: 12,
    liked: true,
  },
  {
    id: 3,
    user: { name: "静雯", avatar: "👧" },
    time: "3小时前",
    content: "周末和朋友们一起去爬山，风景太美了！推荐大家有空也去看看～",
    images: ["🏔️", "🌄"],
    likes: 89,
    comments: 23,
    liked: false,
  },
];

// 发现页陌生人动态
const discoverPosts = [
  {
    id: 1,
    user: { name: "旅行者小王", avatar: "👨‍🦱" },
    time: "刚刚",
    content: "第一次来这个城市，有什么好玩的推荐吗？",
    images: ["🏙️"],
    likes: 8,
    comments: 3,
    liked: false,
  },
  {
    id: 2,
    user: { name: "美食达人", avatar: "👩‍🍳" },
    time: "15分钟前",
    content: "今天做了一道拿手菜，味道绝了！",
    images: ["🍜", "🥗", "🍰"],
    likes: 156,
    comments: 45,
    liked: false,
  },
  {
    id: 3,
    user: { name: "音乐小哥", avatar: "🎸" },
    time: "30分钟前",
    content: "晚上直播唱歌，欢迎来捧场！",
    images: ["🎤"],
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

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // 动态卡片组件
  const PostCard = ({ post, isFriend }: { post: typeof friendPosts[0]; isFriend: boolean }) => (
    <Card className="p-4 mb-3">
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
            {post.user.avatar}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-foreground">{post.user.name}</span>
            <span className="text-xs text-muted-foreground">{post.time}</span>
          </div>
          <p className="text-sm text-foreground/90 mb-3 leading-relaxed">{post.content}</p>
          
          {/* 图片网格 */}
          <div className={cn(
            "grid gap-2 mb-3",
            post.images.length === 1 && "grid-cols-1 max-w-[200px]",
            post.images.length === 2 && "grid-cols-2 max-w-[280px]",
            post.images.length >= 3 && "grid-cols-3 max-w-[320px]"
          )}>
            {post.images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-4xl"
              >
                {img}
              </div>
            ))}
          </div>

          {/* 互动按钮 */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLikePost(post.id, isFriend)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className={cn("w-4 h-4", post.liked && "fill-primary text-primary")} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
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
              好友
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

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 好友动态 */}
        {activeTab === "friends" && (
          <div className="p-4">
            {/* 发布动态入口 */}
            <Card className="p-4 mb-4 flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-primary text-white">👤</AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
                分享你的生活...
              </div>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Plus className="w-5 h-5" />
              </Button>
            </Card>
            
            {friendPostsState.map(post => (
              <PostCard key={post.id} post={post} isFriend={true} />
            ))}
          </div>
        )}

        {/* 发现页面 */}
        {activeTab === "discover" && (
          <div className="p-4">
            {/* 刷新按钮 */}
            <Button
              variant="outline"
              className="w-full mb-4 rounded-full"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
              {isRefreshing ? "刷新中..." : "刷新动态"}
            </Button>

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
