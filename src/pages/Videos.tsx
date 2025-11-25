import { useState } from "react";
import { Heart, Star, MessageCircle, Share2, Plus, User } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Videos = () => {
  const [liked, setLiked] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/20 text-9xl">🎬</div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-video-overlay pointer-events-none" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-safe">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex gap-4">
            <button className="text-white text-sm font-medium">推荐</button>
            <button className="text-white/60 text-sm">关注</button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20 rounded-full"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Video Info */}
      <div className="absolute bottom-24 left-0 right-20 z-20 px-4 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="font-medium">@ai_lifestyle</div>
            <div className="text-sm text-white/80">AI生活助手</div>
          </div>
          <Button
            size="sm"
            className="ml-auto bg-primary hover:bg-primary/90 rounded-full px-6"
          >
            关注
          </Button>
        </div>
        <p className="text-sm mb-2 line-clamp-2">
          视频播放区域<br />
          🤖 智能生活新体验 | 让AI陪伴你的每一天
        </p>
        <div className="flex gap-2 text-xs">
          <span>#AI陪伴</span>
          <span>#智能生活</span>
          <span>#科技</span>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-32 z-20 flex flex-col gap-6 items-center">
        <button
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1 text-white group"
        >
          <div className={cn(
            "w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform",
            liked && "bg-primary"
          )}>
            <Heart className={cn("w-6 h-6", liked && "fill-current")} />
          </div>
          <span className="text-xs">12.5k</span>
        </button>

        <button
          onClick={() => setStarred(!starred)}
          className="flex flex-col items-center gap-1 text-white"
        >
          <div className={cn(
            "w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform",
            starred && "bg-accent"
          )}>
            <Star className={cn("w-6 h-6", starred && "fill-current")} />
          </div>
          <span className="text-xs">3.2k</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-white">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-xs">856</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-white">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
            <Share2 className="w-6 h-6" />
          </div>
          <span className="text-xs">分享</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Videos;
