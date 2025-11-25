import { Search, ShoppingCart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Mall = () => {
  const categories = [
    { name: "数码", icon: "📱" },
    { name: "服饰", icon: "👔" },
    { name: "美妆", icon: "💄" },
    { name: "食品", icon: "🍎" },
    { name: "家居", icon: "🏠" },
    { name: "运动", icon: "⚽" },
  ];

  const products = [
    { id: 1, name: "AI智能音箱", price: "¥299", image: "🔊", sales: "1.2万" },
    { id: 2, name: "无线耳机Pro", price: "¥899", image: "🎧", sales: "5.8万" },
    { id: 3, name: "智能手表", price: "¥1299", image: "⌚", sales: "3.2万" },
    { id: 4, name: "运动相机", price: "¥1599", image: "📷", sales: "2.1万" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索商品..."
              className="pl-10 rounded-full bg-muted/50 border-0"
            />
          </div>
          <Button size="icon" variant="ghost" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </header>

      {/* Banner */}
      <div className="px-4 pt-4">
        <div className="h-40 bg-gradient-primary rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg animate-fade-in">
          🎉 新品首发 限时优惠
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-2 hover:scale-110 transition-transform"
            >
              <div className="w-12 h-12 bg-background rounded-xl shadow-sm flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <span className="text-xs text-foreground/70">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold mb-4">推荐商品</h2>
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-square bg-muted/50 flex items-center justify-center text-6xl">
                {product.image}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">{product.price}</span>
                  <span className="text-xs text-muted-foreground">{product.sales}人付款</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Mall;
