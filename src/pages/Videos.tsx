import { useState } from "react";
import { Heart, User } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Videos = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/20 text-9xl">🎬</div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-video-overlay pointer-events-none" />

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
      <div className="absolute right-4 bottom-24 z-20 flex flex-col gap-4 items-center">
        <button
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1 text-white group"
        >
          <div className={cn(
            "w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform",
            liked && "bg-primary"
          )}>
            <Heart className={cn("w-4 h-4", liked && "fill-current")} />
          </div>
          <span className="text-[11px]">12.5k</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Videos;
