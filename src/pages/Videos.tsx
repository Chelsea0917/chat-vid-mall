import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { cn } from "@/lib/utils";
import { CoinIcon } from "@/components/CurrencyIcons";

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
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            // 显示奖励提示
            setTimeout(() => {
              setShowReward(true);
              setEarnedCoins(2);
              setTimeout(() => setShowReward(false), 3500);
            }, 100);
            return 100;
          }
          return newProgress;
        });
      }, 100); // 10秒完成 (100 * 100ms = 10s)

      return () => clearInterval(timer);
    }
  }, [activeTab, adProgress]);

  // 切换标签时重置进度
  useEffect(() => {
    if (activeTab === "earn") {
      setAdProgress(0);
      setShowReward(false);
    }
  }, [activeTab]);

  return (
    <div className="relative h-screen bg-black overflow-hidden">

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
          视频播放区域<br />
          🤖 智能生活新体验 | 让AI陪伴你的每一天
        </p>
        <div className="flex gap-2 text-xs">
          <span>#AI陪伴</span>
          <span>#智能生活</span>
          <span>#科技</span>
        </div>
      </div>


      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Videos;
