import { useState } from "react";
import { X, Heart, Star, Info } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Messages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards] = useState([
    { id: 1, name: "小美", age: 24, avatar: "👩", bio: "喜欢旅行和摄影 📷", distance: "2.5km" },
    { id: 2, name: "阳光", age: 26, avatar: "🧑", bio: "健身爱好者 💪", distance: "3.8km" },
    { id: 3, name: "静雯", age: 23, avatar: "👧", bio: "咖啡☕️与书籍📚", distance: "1.2km" },
    { id: 4, name: "浩然", age: 28, avatar: "👨", bio: "音乐制作人 🎵", distance: "4.5km" },
    { id: 5, name: "梦琪", age: 25, avatar: "👩‍🦰", bio: "美食探索者 🍜", distance: "2.1km" },
  ]);

  const handleLike = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePass = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSuperLike = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="px-4 py-3 flex items-center justify-center">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            探索
          </h1>
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
            {/* Card */}
            <div className="relative w-full aspect-[3/4] animate-scale-in">
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
                onClick={handleSuperLike}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 shadow-lg hover:scale-110 transition-transform"
              >
                <Star className="w-6 h-6 text-white fill-white" />
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
