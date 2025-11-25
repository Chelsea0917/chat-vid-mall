import { Search, Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Mall = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

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

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/40 pt-safe">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索商品..."
              className="w-full h-10 pl-10 pr-4 bg-muted/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="relative">
            <Heart className="w-6 h-6 text-foreground" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-primary">
              {wishlist.length}
            </Badge>
          </button>
        </div>
      </div>

      {/* Recommended Products */}
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
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <span className="text-xs text-muted-foreground">{product.sales}人付款</span>
                </div>
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

      <BottomNav />
    </div>
  );
};

export default Mall;
