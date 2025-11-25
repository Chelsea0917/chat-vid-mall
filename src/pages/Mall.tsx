import { Search, ShoppingCart, Camera } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Mall = () => {
  const quickAccess = [
    { name: "我的订单", icon: "📋", badge: "2" },
    { name: "充值中心", icon: "💰", badge: "" },
    { name: "券红包", icon: "🎫", badge: "" },
    { name: "足迹", icon: "👣", badge: "" },
    { name: "小时达", icon: "⏰", badge: "" },
  ];

  const flashSale = [
    { id: 1, name: "智能手环", price: "¥89", image: "⌚", originalPrice: "¥299" },
    { id: 2, name: "无线耳机", price: "¥159", image: "🎧", originalPrice: "¥399" },
    { id: 3, name: "运动水杯", price: "¥29", image: "🥤", originalPrice: "¥79" },
    { id: 4, name: "便携风扇", price: "¥39", image: "🌀", originalPrice: "¥99" },
  ];

  const products = [
    { id: 1, name: "AI智能音箱", price: "¥299", image: "🔊", sales: "1.2万" },
    { id: 2, name: "无线充电器", price: "¥119", image: "🔌", sales: "8.5千" },
    { id: 3, name: "蓝牙键盘", price: "¥199", image: "⌨️", sales: "3.2万" },
    { id: 4, name: "智能手表", price: "¥899", image: "⌚", sales: "5.8万" },
    { id: 5, name: "运动相机", price: "¥1299", image: "📷", sales: "2.1万" },
    { id: 6, name: "便携音箱", price: "¥259", image: "📻", sales: "4.5千" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-background z-40">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索商品..."
              className="pl-10 pr-10 rounded-full bg-muted/50 border-0"
            />
            <Camera className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <Button size="icon" variant="ghost" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-medium">
              3
            </span>
          </Button>
        </div>
      </header>

      {/* Quick Access */}
      <div className="bg-background px-4 py-4">
        <div className="flex justify-between">
          {quickAccess.map((item) => (
            <button
              key={item.name}
              className="flex flex-col items-center gap-2 relative"
            >
              <div className="w-12 h-12 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <span className="text-xs text-foreground/80">{item.name}</span>
              {item.badge && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-destructive text-white text-[10px] rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Flash Sale Section */}
      <div className="mt-2 px-4 py-4 bg-background">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">⚡ 低价秒杀</span>
            <span className="text-xs text-muted-foreground">限时抢购</span>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {flashSale.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-24 cursor-pointer"
            >
              <div className="w-24 h-24 bg-muted/50 rounded-lg flex items-center justify-center text-4xl mb-2">
                {item.image}
              </div>
              <div className="text-primary font-bold text-sm">{item.price}</div>
              <div className="text-xs text-muted-foreground line-through">
                {item.originalPrice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-2 px-4 py-4 bg-background">
        <h2 className="text-lg font-bold mb-4">推荐</h2>
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-square bg-muted/30 flex items-center justify-center text-5xl">
                {product.image}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-primary font-bold text-base">¥</span>
                  <span className="text-primary font-bold text-lg">{product.price.replace('¥', '')}</span>
                </div>
                <div className="text-xs text-muted-foreground">{product.sales}人付款</div>
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
