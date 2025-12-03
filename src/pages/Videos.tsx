import { useState, useEffect, useCallback } from "react";
import { Heart, MessageCircle, Share2, BadgeCheck, Music, Users, MapPin, Eye } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { cn } from "@/lib/utils";
import { CoinIcon } from "@/components/CurrencyIcons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// 好友动态数据（关注）
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

// 发现页陌生人动态（推荐）
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

// 好友动态
const buddyPosts = [
  {
    id: 1,
    user: { name: "老友小张", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", verified: false },
    time: "5分钟前",
    content: "周末一起打球吗？",
    images: [],
    likes: 12,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    user: { name: "闺蜜小美", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", verified: true },
    time: "20分钟前",
    content: "新买的裙子好看吗？",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop"
    ],
    likes: 45,
    comments: 15,
    liked: false,
  },
];

// K歌房邀请动态
const karaokeInvites = [
  {
    id: 1,
    user: { name: "K歌达人", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true },
    time: "刚刚",
    content: "今晚一起唱歌！粤语金曲专场~",
    room: {
      id: "#32518",
      storeName: "星光KTV",
      storeAddress: "朝阳区建国路88号",
      title: "粤语金曲之夜",
      price: 9.9,
      capacity: 5,
      current: 3,
      users: ["👨", "👩", "🧓"],
    },
    likes: 18,
    comments: 6,
    liked: false,
  },
  {
    id: 2,
    user: { name: "音乐爱好者", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop", verified: false },
    time: "10分钟前",
    content: "90后经典歌曲拼单，还差2人！",
    room: {
      id: "#28734",
      storeName: "欢乐迪KTV",
      storeAddress: "海淀区中关村大街1号",
      title: "90后怀旧经典",
      price: 12.9,
      capacity: 10,
      current: 8,
      users: ["👦", "👧", "🧑", "👨", "👩"],
    },
    likes: 32,
    comments: 12,
    liked: false,
  },
  {
    id: 3,
    user: { name: "唱歌小能手", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: true },
    time: "30分钟前",
    content: "情歌对唱，找人一起！有女生吗？",
    room: {
      id: "#19283",
      storeName: "唱享时光KTV",
      storeAddress: "东城区王府井大街58号",
      title: "情歌对唱专场",
      price: 15.9,
      capacity: 6,
      current: 4,
      users: ["💑", "👫", "👩", "🧑"],
    },
    likes: 56,
    comments: 24,
    liked: false,
  },
];

const Videos = () => {
  const [liked, setLiked] = useState(false);
  const [mainTab, setMainTab] = useState<"video" | "daily">("video");
  const [dailyTab, setDailyTab] = useState<"recommend" | "follow" | "friends" | "karaoke">("recommend");
  const [onlyFollowing, setOnlyFollowing] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  // 动态数据状态
  const [discoverPostsState, setDiscoverPostsState] = useState(discoverPosts);
  const [friendPostsState, setFriendPostsState] = useState(friendPosts);
  const [buddyPostsState, setBuddyPostsState] = useState(buddyPosts);
  const [karaokeInvitesState, setKaraokeInvitesState] = useState(karaokeInvites);

  // 广告进度条逻辑
  useEffect(() => {
    if (mainTab === "video" && adProgress < 100) {
      const timer = setInterval(() => {
        setAdProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setTimeout(() => {
              setShowReward(true);
              setEarnedCoins(2);
              setTimeout(() => setShowReward(false), 3500);
            }, 100);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [mainTab, adProgress]);

  // 切换到视频时重置进度
  useEffect(() => {
    if (mainTab === "video") {
      setAdProgress(0);
      setShowReward(false);
    }
  }, [mainTab]);

  const handleLikePost = (postId: number, type: "discover" | "friend" | "buddy" | "karaoke") => {
    const updatePosts = (posts: any[], setFn: any) => {
      setFn(posts.map(post =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      ));
    };

    switch (type) {
      case "discover":
        updatePosts(discoverPostsState, setDiscoverPostsState);
        break;
      case "friend":
        updatePosts(friendPostsState, setFriendPostsState);
        break;
      case "buddy":
        updatePosts(buddyPostsState, setBuddyPostsState);
        break;
      case "karaoke":
        updatePosts(karaokeInvitesState, setKaraokeInvitesState);
        break;
    }
  };

  // 普通动态卡片
  const PostCard = ({ post, type }: { post: typeof friendPosts[0]; type: "discover" | "friend" | "buddy" }) => (
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
          {post.images.length > 0 && (
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
          )}

          {/* 互动按钮 */}
          <div className="flex items-center justify-between text-muted-foreground">
            <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              <span>转发</span>
            </button>
            <button
              onClick={() => handleLikePost(post.id, type)}
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

  // K歌房邀请卡片
  const KaraokeInviteCard = ({ post }: { post: typeof karaokeInvites[0] }) => {
    const isFull = post.room.current >= post.room.capacity;
    return (
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
              <span className="text-xs text-muted-foreground">{post.time}</span>
            </div>
            
            {post.content && (
              <p className="text-sm text-foreground mb-3 leading-relaxed">{post.content}</p>
            )}

            {/* K歌房卡片 */}
            <Card className="p-3 mb-3 bg-muted/30">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Music className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground text-sm">{post.room.storeName}</span>
                    <span className="text-xs text-muted-foreground">{post.room.id}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{post.room.storeAddress}</span>
                  </div>
                  <h3 className="text-sm text-foreground">{post.room.title}</h3>
                </div>
                <Badge variant={isFull ? "secondary" : "default"} className="rounded-full text-xs">
                  ¥{post.room.price}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {post.room.users.slice(0, 4).map((user, idx) => (
                      <Avatar key={idx} className="w-6 h-6 border-2 border-background">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-primary/10 to-secondary/10">
                          {user}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{post.room.current}/{post.room.capacity}人</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="rounded-full h-7 text-xs"
                  disabled={isFull}
                  variant={isFull ? "secondary" : "default"}
                >
                  {isFull ? "已满" : "加入"}
                </Button>
              </div>
            </Card>

            {/* 互动按钮 */}
            <div className="flex items-center justify-between text-muted-foreground">
              <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                <Share2 className="w-4 h-4" />
                <span>转发</span>
              </button>
              <button
                onClick={() => handleLikePost(post.id, "karaoke")}
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
  };

  // 日常分类选项
  const dailyCategories = [
    { key: "recommend" as const, label: "推荐", icon: "🔥" },
    { key: "follow" as const, label: "关注", icon: "❤️" },
    { key: "friends" as const, label: "好友", icon: "👥" },
    { key: "karaoke" as const, label: "K歌", icon: "🎤" },
  ];

  return (
    <div className="relative h-screen bg-background overflow-hidden flex flex-col">
      {/* 顶部主分类条 - 抖音风格 */}
      {(() => {
        const isVideoMode = mainTab === "video";
        const activeColor = isVideoMode ? "text-white" : "text-foreground";
        const inactiveColor = isVideoMode ? "text-white/60" : "text-muted-foreground";
        const underlineColor = isVideoMode ? "bg-white" : "bg-foreground";
        
        return (
          <div className={cn(
            "pt-safe z-40",
            isVideoMode ? "absolute top-0 left-0 right-0" : "relative bg-background"
          )}>
            <div className="flex items-center justify-center h-11 px-4">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setMainTab("video")}
                  className={cn(
                    "text-[15px] transition-all relative py-2",
                    isVideoMode ? `font-semibold ${activeColor}` : `font-normal ${inactiveColor}`
                  )}
                >
                  视频
                  {isVideoMode && (
                    <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full", underlineColor)} />
                  )}
                </button>
                <button
                  onClick={() => setMainTab("daily")}
                  className={cn(
                    "text-[15px] transition-all relative py-2",
                    !isVideoMode ? `font-semibold ${activeColor}` : `font-normal ${inactiveColor}`
                  )}
                >
                  日常
                  {!isVideoMode && (
                    <span className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full", underlineColor)} />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 视频板块 */}
      {mainTab === "video" && (
        <div className="flex-1 relative bg-black">
          {/* 关注筛选开关 - 右上角 */}
          <div className="absolute top-3 right-4 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
            <span className="text-xs text-white/80">关注</span>
            <Switch
              checked={onlyFollowing}
              onCheckedChange={setOnlyFollowing}
              className="scale-75 data-[state=checked]:bg-primary"
            />
          </div>

          {/* Video Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-9xl">🎬</div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-video-overlay pointer-events-none" />

          {/* Reward Notification */}
          {showReward && (
            <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in duration-300">
              <div className="bg-black/90 backdrop-blur-md rounded-2xl px-8 py-4 flex items-center gap-3 shadow-2xl border-2 border-[hsl(var(--coin-gold))]/30">
                <CoinIcon className="w-8 h-8 animate-pulse" />
                <span className="text-[hsl(var(--coin-gold))] font-bold text-xl">+{earnedCoins} 金币</span>
              </div>
            </div>
          )}

          {/* Video Info */}
          <div className="absolute bottom-24 left-0 right-20 z-20 px-4 text-white">
            <p className="text-sm mb-2 line-clamp-2">
              {onlyFollowing ? "关注用户的视频" : "推荐视频"}<br />
              🤖 智能生活新体验 | 让AI陪伴你的每一天
            </p>
            <div className="flex gap-2 text-xs">
              <span>#AI陪伴</span>
              <span>#智能生活</span>
              <span>#科技</span>
            </div>
          </div>
        </div>
      )}

      {/* 日常板块 */}
      {mainTab === "daily" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 日常分类选项卡 */}
          <div className="flex-shrink-0 bg-background px-4 py-2">
            <div className="flex gap-2 w-full">
              {dailyCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setDailyTab(cat.key)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1 py-2 rounded-full text-sm font-medium transition-all",
                    dailyTab === cat.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 日常内容区域 */}
          <div className="flex-1 overflow-y-auto pb-20 px-4">
            {/* 推荐 */}
            {dailyTab === "recommend" && (
              <div>
                {discoverPostsState.map(post => (
                  <PostCard key={post.id} post={post} type="discover" />
                ))}
              </div>
            )}

            {/* 关注 */}
            {dailyTab === "follow" && (
              <div>
                {friendPostsState.map(post => (
                  <PostCard key={post.id} post={post} type="friend" />
                ))}
              </div>
            )}

            {/* 好友 */}
            {dailyTab === "friends" && (
              <div>
                {buddyPostsState.map(post => (
                  <PostCard key={post.id} post={post} type="buddy" />
                ))}
              </div>
            )}

            {/* K歌 */}
            {dailyTab === "karaoke" && (
              <div>
                {karaokeInvitesState.map(post => (
                  <KaraokeInviteCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Videos;
