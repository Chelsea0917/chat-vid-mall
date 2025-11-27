import { Settings, ChevronRight, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CoinIcon, DiamondIcon } from "@/components/CurrencyIcons";

const Profile = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: CreditCard, label: "元宝充值", badge: "", path: "/recharge" },
    { icon: Settings, label: "账号设置", badge: "", path: "/account-settings" },
  ];

  const stats = [
    { label: "元宝", value: "2,580", type: "diamond" as const },
    { label: "金币", value: "1,268", type: "coin" as const },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-primary pt-safe pb-20 px-6">
        <div className="flex items-center gap-4 mb-6 pt-8">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-4 border-white/30">
            👤
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-xl font-bold mb-1">用户昵称</h2>
            <p className="text-sm text-white/80">ID: 123456789</p>
          </div>
        </div>

        <div className="flex justify-around gap-4">
          {stats.map((stat) => {
            return (
              <button key={stat.label} className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-white">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {stat.type === "diamond" ? (
                    <DiamondIcon className="w-5 h-5" />
                  ) : (
                    <CoinIcon className="w-5 h-5" />
                  )}
                  <div className="text-xl font-bold">{stat.value}</div>
                </div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </button>
            );
          })}
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
                  onClick={() => navigate(item.path)}
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
          onClick={() => navigate("/login")}
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
