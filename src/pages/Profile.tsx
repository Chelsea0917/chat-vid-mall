import { Settings, ShoppingBag, Heart, Video, Bell, HelpCircle, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Profile = () => {
  const menuItems = [
    { icon: ShoppingBag, label: "我的订单", badge: "3" },
    { icon: Heart, label: "我的收藏", badge: "" },
    { icon: Video, label: "我的发布", badge: "" },
    { icon: Bell, label: "通知设置", badge: "" },
    { icon: HelpCircle, label: "客服与帮助", badge: "" },
    { icon: Settings, label: "账号设置", badge: "" },
  ];

  const stats = [
    { label: "关注", value: "128" },
    { label: "粉丝", value: "1.2k" },
    { label: "获赞", value: "5.8k" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-primary pt-safe pb-20 px-6">
        <div className="flex justify-end mb-8">
          <Button size="icon" variant="ghost" className="text-white">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-4 border-white/30">
            👤
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-xl font-bold mb-1">用户昵称</h2>
            <p className="text-sm text-white/80">ID: 123456789</p>
          </div>
        </div>

        <div className="flex justify-around">
          {stats.map((stat) => (
            <button key={stat.label} className="text-white text-center">
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-white/80">{stat.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 -mt-12">
        <Card className="overflow-hidden shadow-lg">
          <div className="divide-y divide-border/50">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full px-4 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full mt-6 rounded-full h-12 font-medium"
        >
          退出登录
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
