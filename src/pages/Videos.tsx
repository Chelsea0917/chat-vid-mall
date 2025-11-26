import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";
import coinIcon from "@/assets/coin-icon.png";

const Videos = () => {
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"recommend" | "earn">("recommend");
  const [adProgress, setAdProgress] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  // 广告进度条逻辑
  useEffect(() => {
    if (activeTab === "earn" && adProgress < 100) {
      const timer = setInterval(() => {
        setAdProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            // 显示奖励提示
            setShowReward(true);
            setEarnedCoins(2);
            setTimeout(() => setShowReward(false), 2000);
            return 100;
          }
          return prev + 1;
        });
      }, 100); // 10秒完成 (100 * 100ms = 10s)

      return () => clearInterval(timer);
    }
  }, [activeTab, adProgress]);

  // 切换标签时重置进度
  useEffect(() => {
    if (activeTab === "earn") {
      setAdProgress(0);
    }
  }, [activeTab]);

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Top Category Tabs */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-safe">
        <div className="flex items-center justify-center gap-8 py-4">
          <button
            onClick={() => setActiveTab("recommend")}
            className={cn(
              "text-lg font-medium transition-all",
              activeTab === "recommend"
                ? "text-white scale-110"
                : "text-white/60"
            )}
          >
            推荐
          </button>
          <button
            onClick={() => setActiveTab("earn")}
            className={cn(
              "text-lg font-medium transition-all",
              activeTab === "earn"
                ? "text-white scale-110"
                : "text-white/60"
            )}
          >
            赚金币
          </button>
        </div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/20 text-9xl">🎬</div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-video-overlay pointer-events-none" />

      {/* Ad Progress Indicator (only for earn tab) */}
      {activeTab === "earn" && (
        <div className="absolute top-20 left-4 z-30">
          <div className="relative w-12 h-12">
            {/* Progress Circle */}
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="hsl(var(--coin-gold))"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - adProgress / 100)}`}
                className="transition-all duration-100"
              />
            </svg>
            {/* Coin Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={coinIcon} alt="金币" className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Reward Notification */}
      {showReward && (
        <div className="absolute top-32 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
          <div className="bg-black/70 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
            <img src={coinIcon} alt="金币" className="w-5 h-5" />
            <span className="text-[hsl(var(--coin-gold))] font-medium">+{earnedCoins}金币</span>
          </div>
        </div>
      )}

      {/* Video Info */}
      <div className="absolute bottom-24 left-0 right-20 z-20 px-4 text-white">
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
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 items-center">
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
