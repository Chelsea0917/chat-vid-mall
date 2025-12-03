import { ChevronRight, Copy, UserPlus, Gift, Users, Calendar, HelpCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CoinIcon, DiamondIcon } from "@/components/CurrencyIcons";

const Profile = () => {
  const navigate = useNavigate();

  const quickActions = [
    { type: "coin", label: "金币", count: 1280 },
    { type: "diamond", label: "元宝", count: 56 },
  ];

  const menuItems = [
    { icon: UserPlus, label: "邀请好友", rightText: "现金赚不停", rightIcon: "🧧" },
  ];

  const listItems = [
    { icon: Users, label: "访客", path: "/" },
    { icon: Calendar, label: "我的日常", path: "/" },
    { icon: Gift, label: "我的订单", path: "/" },
    { icon: HelpCircle, label: "帮助与反馈", path: "/" },
    { icon: Settings, label: "设置", path: "/account-settings" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-primary pt-safe pb-6 px-4">
        <div className="flex items-center gap-3 pt-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-2 border-white/30">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" 
              alt="用户头像" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-lg font-bold mb-0.5">认真的船长</h2>
            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <span>ID：14561213</span>
              <Copy className="w-3 h-3 cursor-pointer hover:text-white" />
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80" />
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="px-4 -mt-3">
        <Card className="overflow-hidden shadow-md rounded-xl">
          <div className="flex justify-around py-3">
            {quickActions.map((action, index) => (
              <button key={index} className="flex flex-col items-center gap-1.5 px-2">
                {action.type === "coin" ? (
                  <CoinIcon className="w-8 h-8" />
                ) : (
                  <DiamondIcon className="w-8 h-8" />
                )}
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-foreground">{action.count}</span>
                  <span className="text-xs text-muted-foreground">{action.label}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-3">
        <Card className="overflow-hidden shadow-sm rounded-xl">
          <div className="divide-y divide-border/50">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full px-3 py-3 flex items-center gap-2.5 hover:bg-muted/50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.rightText}</span>
                  <span className="text-sm">{item.rightIcon}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>

        </Card>
      </div>

      {/* List Items */}
      <div className="px-4 mt-3">
        <Card className="overflow-hidden shadow-sm rounded-xl">
          <div className="divide-y divide-border/50">
            {listItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="w-full px-3 py-3 flex items-center gap-2.5 hover:bg-muted/50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      <FloatingChatButton />
      <BottomNav />
    </div>
  );
};

export default Profile;