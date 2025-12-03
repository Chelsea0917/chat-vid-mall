import { Heart, Music } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Mall = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "ktv">("products");

  const products = [
    { id: 1, name: "AI智能音箱", price: "¥399", image: "🔊", sales: "1.2k" },
    { id: 2, name: "无线充电器", price: "¥199", image: "🔋", sales: "856" },
    { id: 3, name: "智能手环", price: "¥299", image: "⌚", sales: "2.3k" },
    { id: 4, name: "便携音响", price: "¥259", image: "📻", sales: "967" },
    { id: 5, name: "数码相框", price: "¥399", image: "🖼️", sales: "654" },
    { id: 6, name: "智能插座", price: "¥99", image: "🔌", sales: "1.5k" },
    { id: 7, name: "蓝牙耳机", price: "¥159", image: "🎧", sales: "3.1k" },
    { id: 8, name: "智能手表", price: "¥299", image: "⌚", sales: "2.8k" },
  ];

  const ktvRooms = [
    { id: 1, name: "星光KTV", address: "朝阳区建国路88号", price: "¥99/小时", rating: "4.8" },
    { id: 2, name: "欢乐迪KTV", address: "海淀区中关村大街1号", price: "¥79/小时", rating: "4.6" },
    { id: 3, name: "唱享时光KTV", address: "东城区王府井大街58号", price: "¥129/小时", rating: "4.9" },
    { id: 4, name: "麦霸KTV", address: "西城区西单北大街120号", price: "¥89/小时", rating: "4.7" },
  ];

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const tabs = [
    { key: "products" as const, label: "商品" },
    { key: "ktv" as const, label: "KTV" },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">商城</h1>
          <button className="relative">
            <Heart className="w-6 h-6 text-foreground" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-primary">
              {wishlist.length}
            </Badge>
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all",
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">为你推荐</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover-scale cursor-pointer relative">
                  <div className="p-3">
                    <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-6xl mb-2">
                      {product.image}
                    </div>
                    <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* KTV Tab */}
        {activeTab === "ktv" && (
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">附近KTV</h2>
            </div>
            <div className="space-y-3">
              {ktvRooms.map((room) => (
                <Card key={room.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <Music className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground">{room.name}</h3>
                        <span className="text-xs text-amber-500">★ {room.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{room.address}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">{room.price}</span>
                        <Button size="sm" className="rounded-full h-7 text-xs">
                          预约
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Mall;