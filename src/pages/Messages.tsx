import { useState, useEffect } from "react";
import { X, Heart, Info, ChevronLeft, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CoinIcon } from "@/components/CurrencyIcons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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
  const [tutorialStep, setTutorialStep] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const [cards] = useState([
    { id: 1, name: "小美", age: 24, avatar: "👩", bio: "喜欢旅行和摄影 📷" },
    { id: 2, name: "阳光", age: 26, avatar: "🧑", bio: "健身爱好者 💪" },
    { id: 3, name: "静雯", age: 23, avatar: "👧", bio: "咖啡☕️与书籍📚" },
    { id: 4, name: "浩然", age: 28, avatar: "👨", bio: "音乐制作人 🎵" },
    { id: 5, name: "梦琪", age: 25, avatar: "👩‍🦰", bio: "美食探索者 🍜" },
  ]);

  // 每次进入页面时显示教程
  useEffect(() => {
    // 延迟显示教程，让页面先加载
    setTimeout(() => {
      setShowTutorial(true);
    }, 500);
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

  // 鼠标按下
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  // 鼠标移动
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offsetX = e.clientX - dragStart.x;
    const offsetY = e.clientY - dragStart.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  // 鼠标松开
  const handleMouseUp = () => {
    if (!isDragging) return;
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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col">
      {/* Tutorial Guide - 新手引导 */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm">
            {/* Step 1: 欢迎 */}
            {tutorialStep === 0 && (
              <div className="bg-background rounded-3xl p-8 text-center animate-scale-in">
                <div className="text-6xl mb-4">👋</div>
                <h2 className="text-2xl font-bold mb-3">欢迎来到探索</h2>
                <p className="text-muted-foreground mb-6">
                  在这里你可以发现有趣的人<br />
                  让我们快速了解一下怎么玩
                </p>
                <Button 
                  onClick={() => setTutorialStep(1)}
                  className="w-full rounded-full h-12"
                >
                  开始教程
                </Button>
              </div>
            )}

            {/* Step 2: 右滑喜欢 */}
            {tutorialStep === 1 && (
              <div className="bg-background rounded-3xl p-8 animate-scale-in">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Heart className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">右滑表示喜欢</h3>
                  <p className="text-muted-foreground text-sm">
                    向右滑动卡片或点击❤️按钮<br />
                    表示你对这个人感兴趣
                  </p>
                </div>
                
                {/* 演示动画 */}
                <div className="relative h-40 mb-6 flex items-center justify-center">
                  <div 
                    className="w-24 h-32 rounded-2xl bg-gradient-primary shadow-lg flex items-center justify-center text-4xl"
                    style={{
                      animation: 'swipe-right-demo 2s ease-in-out infinite'
                    }}
                  >
                    👤
                  </div>
                  <ChevronRight className="absolute right-8 w-12 h-12 text-primary animate-pulse" />
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setTutorialStep(0)}
                    className="flex-1 rounded-full"
                  >
                    上一步
                  </Button>
                  <Button 
                    onClick={() => setTutorialStep(2)}
                    className="flex-1 rounded-full"
                  >
                    下一步
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: 左滑不喜欢 */}
            {tutorialStep === 2 && (
              <div className="bg-background rounded-3xl p-8 animate-scale-in">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                    <X className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">左滑跳过</h3>
                  <p className="text-muted-foreground text-sm">
                    向左滑动卡片或点击❌按钮<br />
                    可以跳过不感兴趣的人
                  </p>
                </div>
                
                {/* 演示动画 */}
                <div className="relative h-40 mb-6 flex items-center justify-center">
                  <ChevronLeft className="absolute left-8 w-12 h-12 text-destructive animate-pulse" />
                  <div 
                    className="w-24 h-32 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 shadow-lg flex items-center justify-center text-4xl"
                    style={{
                      animation: 'swipe-left-demo 2s ease-in-out infinite'
                    }}
                  >
                    👤
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setTutorialStep(1)}
                    className="flex-1 rounded-full"
                  >
                    上一步
                  </Button>
                  <Button 
                    onClick={() => setTutorialStep(3)}
                    className="flex-1 rounded-full"
                  >
                    下一步
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: 完成教程 */}
            {tutorialStep === 3 && (
              <div className="bg-background rounded-3xl p-8 animate-scale-in">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-3">恭喜完成指南！</h3>
                  <p className="text-muted-foreground text-base mb-4">
                    你已经掌握了所有玩法<br />
                    获得新手奖励 10 金币
                  </p>
                  
                  <div className="bg-gradient-primary/10 rounded-2xl p-6 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CoinIcon className="w-8 h-8" />
                      <span className="text-4xl font-bold text-primary">+10</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      开始你的探索之旅吧！
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setTutorialStep(2)}
                    className="flex-1 rounded-full"
                  >
                    上一步
                  </Button>
                  <Button 
                    onClick={() => {
                      setGoldCoins(prev => prev + 10);
                      setShowTutorial(false);
                      setTutorialStep(0);
                    }}
                    className="flex-1 rounded-full"
                  >
                    开始探索
                  </Button>
                </div>
              </div>
            )}

            {/* 进度指示器 */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    step === tutorialStep
                      ? "w-8 bg-primary"
                      : "w-2 bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>
          
          <style>{`
            @keyframes swipe-right-demo {
              0%, 100% {
                transform: translateX(0) rotate(0deg);
              }
              50% {
                transform: translateX(60px) rotate(15deg);
              }
            }
            @keyframes swipe-left-demo {
              0%, 100% {
                transform: translateX(0) rotate(0deg);
              }
              50% {
                transform: translateX(-60px) rotate(-15deg);
              }
            }
          `}</style>
        </div>
      )}

      {/* 金币不足提醒 */}
      <AlertDialog open={showInsufficientCoins} onOpenChange={setShowInsufficientCoins}>
        <AlertDialogContent className="max-w-sm">
          <button
            onClick={() => setShowInsufficientCoins(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CoinIcon className="w-5 h-5" />
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
      <div className="flex-shrink-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="px-4 py-2 flex items-center justify-between">
          <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            探索
          </h1>
          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
            <CoinIcon className="w-4 h-4" />
            <span className="text-sm font-bold text-primary">{goldCoins}</span>
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center px-4 pb-24 overflow-hidden">
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
          <div className="relative w-full max-w-sm h-full flex flex-col justify-center">
            {/* Card */}
            <div 
              className="relative w-full max-h-[55vh] aspect-[3/4] animate-scale-in cursor-grab active:cursor-grabbing"
              style={getCardTransform()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl overflow-hidden">
                {/* Avatar Background */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="text-[200px] opacity-90">{currentCard.avatar}</div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Card Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-3xl font-bold">{currentCard.name}</h2>
                    <span className="text-xl">{currentCard.age}</span>
                  </div>
                  <p className="text-white/80 text-sm mb-1">ID: {currentCard.id}</p>
                  <p className="text-white/90">{currentCard.bio}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-6 mt-4">
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

          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Messages;
