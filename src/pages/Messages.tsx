import { useState, useEffect } from "react";
import { X, Heart, Info, Coins, ChevronLeft, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Messages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [goldCoins, setGoldCoins] = useState(5); // 初始金币数量
  const [showInsufficientCoins, setShowInsufficientCoins] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const [cards] = useState([
    { id: 1, name: "小美", age: 24, avatar: "👩", bio: "喜欢旅行和摄影 📷", distance: "2.5km" },
    { id: 2, name: "阳光", age: 26, avatar: "🧑", bio: "健身爱好者 💪", distance: "3.8km" },
    { id: 3, name: "静雯", age: 23, avatar: "👧", bio: "咖啡☕️与书籍📚", distance: "1.2km" },
    { id: 4, name: "浩然", age: 28, avatar: "👨", bio: "音乐制作人 🎵", distance: "4.5km" },
    { id: 5, name: "梦琪", age: 25, avatar: "👩‍🦰", bio: "美食探索者 🍜", distance: "2.1km" },
  ]);

  // 检查是否首次访问
  useEffect(() => {
    const hasVisited = localStorage.getItem("socialPageVisited");
    if (!hasVisited) {
      setShowTutorial(true);
      localStorage.setItem("socialPageVisited", "true");
    }
  }, []);

  const handleLike = () => {
    if (goldCoins < 1) {
      setShowInsufficientCoins(true);
      return;
    }
    
    setGoldCoins(prev => prev - 1);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePass = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleWatchAd = () => {
    // 这里可以集成广告SDK
    setShowInsufficientCoins(false);
    // 观看广告后增加金币
    setGoldCoins(prev => prev + 5);
  };

  // 触摸开始
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  // 触摸移动
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const offsetX = touch.clientX - dragStart.x;
    const offsetY = touch.clientY - dragStart.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // 触摸结束
  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 100; // 滑动阈值

    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        // 右滑 - 喜欢
        handleLike();
      } else {
        // 左滑 - 不喜欢
        handlePass();
      }
    }
    
    // 重置拖动状态
    setDragOffset({ x: 0, y: 0 });
  };

  const currentCard = cards[currentIndex];
  
  // 计算卡片的变换样式
  const getCardTransform = () => {
    if (!isDragging && dragOffset.x === 0) return {};
    
    const rotation = dragOffset.x / 20; // 旋转角度
    const opacity = 1 - Math.abs(dragOffset.x) / 300; // 透明度变化
    
    return {
      transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
      opacity: Math.max(0.5, opacity),
      transition: isDragging ? 'none' : 'all 0.3s ease-out',
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 pb-20">
      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-full max-w-sm mx-4">
            <div className="bg-background rounded-3xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-6">玩法提示</h2>
              
              <div className="space-y-8 mb-8">
                {/* 左滑示意 */}
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 animate-slide-in-right">
                    <ChevronLeft className="w-8 h-8 text-destructive animate-pulse" />
                    <div className="w-16 h-20 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                      <X className="w-8 h-8 text-destructive" />
                    </div>
                  </div>
                  <span className="text-lg font-medium">左滑不喜欢</span>
                </div>
                
                {/* 右滑示意 */}
                <div className="flex items-center justify-center gap-4">
                  <span className="text-lg font-medium">右滑喜欢</span>
                  <div className="flex items-center gap-2 animate-slide-in-right">
                    <div className="w-16 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </div>
                    <ChevronRight className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowTutorial(false)}
                className="w-full rounded-full h-12"
              >
                开始探索
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 金币不足提醒 */}
      <AlertDialog open={showInsufficientCoins} onOpenChange={setShowInsufficientCoins}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              金币不足
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              看广告赚金币
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleWatchAd}>
              观看广告
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            探索
          </h1>
          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{goldCoins}</span>
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-200px)]">
        {currentIndex >= cards.length ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-lg font-medium text-muted-foreground">
              暂时没有更多人了
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              稍后再来看看吧
            </p>
          </div>
        ) : (
          <div className="relative w-full max-w-sm">
            {/* 滑动提示指示器 */}
            {isDragging && (
              <>
                {dragOffset.x > 50 && (
                  <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 z-50">
                    <div className="bg-primary text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                      <Heart className="w-5 h-5 fill-current" />
                      喜欢
                    </div>
                  </div>
                )}
                {dragOffset.x < -50 && (
                  <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 z-50">
                    <div className="bg-destructive text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                      <X className="w-5 h-5" />
                      不喜欢
                    </div>
                  </div>
                )}
              </>
            )}
            
            {/* Card */}
            <div 
              className="relative w-full aspect-[3/4] animate-scale-in cursor-grab active:cursor-grabbing"
              style={getCardTransform()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl overflow-hidden">
                {/* Avatar Background */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-[200px] opacity-90">{currentCard.avatar}</div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Info Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                >
                  <Info className="w-5 h-5" />
                </Button>

                {/* Card Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-3xl font-bold">{currentCard.name}</h2>
                    <span className="text-xl">{currentCard.age}</span>
                  </div>
                  <p className="text-white/90 mb-2">{currentCard.bio}</p>
                  <p className="text-sm text-white/70">📍 距离你 {currentCard.distance}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <Button
                size="icon"
                onClick={handlePass}
                className="w-16 h-16 rounded-full bg-white hover:bg-white/90 shadow-lg hover:scale-110 transition-transform"
              >
                <X className="w-8 h-8 text-red-500" />
              </Button>

              <Button
                size="icon"
                onClick={handleLike}
                className="w-16 h-16 rounded-full bg-gradient-primary hover:opacity-90 shadow-lg hover:scale-110 transition-transform"
              >
                <Heart className="w-8 h-8 text-white fill-white" />
              </Button>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : index < currentIndex
                      ? "w-2 bg-primary/30"
                      : "w-2 bg-border"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Messages;
