import { ChevronRight, Crown, ShieldCheck, Copy, UserPlus, Gift, Users, Calendar, HelpCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CoinIcon, DiamondIcon } from "@/components/CurrencyIcons";

const Profile = () => {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Crown, label: "会员", color: "text-yellow-500" },
    { icon: ShieldCheck, label: "认证", color: "text-blue-500" },
    { type: "coin", label: "金币" },
    { type: "diamond", label: "元宝" },
  ];

  const menuItems = [
    { icon: UserPlus, label: "邀请好友", rightText: "现金赚不停", rightIcon: "🧧" },
    { icon: Gift, label: "福利中心", rightText: "上传本人头像", rightIcon: "💎" },
  ];

  const listItems = [
    { icon: Users, label: "访客", path: "/" },
    { icon: Calendar, label: "我的日常", path: "/" },
    { icon: HelpCircle, label: "帮助与反馈", path: "/" },
    { icon: Settings, label: "设置", path: "/account-settings" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-primary pt-safe pb-8 px-4">
        <div className="flex items-center gap-4 pt-6">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/30">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" 
              alt="用户头像" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-xl font-bold mb-1">认真的船长</h2>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>ID：14561213</span>
              <Copy className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white/80" />
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="px-4 -mt-4">
        <Card className="overflow-hidden shadow-lg rounded-2xl">
          <div className="flex justify-around py-4">
            {quickActions.map((action, index) => (
              <button key={index} className="flex flex-col items-center gap-2 px-4">
                {action.type === "coin" ? (
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <CoinIcon className="w-6 h-6" />
                  </div>
                ) : action.type === "diamond" ? (
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <DiamondIcon className="w-6 h-6" />
                  </div>
                ) : (
                  <div className={`w-10 h-10 rounded-full ${action.color === "text-yellow-500" ? "bg-yellow-100" : "bg-blue-100"} flex items-center justify-center`}>
                    {action.icon && <action.icon className={`w-6 h-6 ${action.color}`} />}
                  </div>
                )}
                <span className="text-sm text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-4">
        <Card className="overflow-hidden shadow-sm rounded-2xl">
          <div className="divide-y divide-border/50">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.rightText}</span>
                  <span className="text-lg">{item.rightIcon}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              );
            })}
          </div>

          {/* Task Card */}
          <div className="mx-4 mb-4 p-4 bg-muted/50 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">上传本人头像</p>
              <p className="text-sm text-primary flex items-center gap-1">
                <DiamondIcon className="w-4 h-4" />
                <span>+3元宝</span>
              </p>
            </div>
            <Button size="sm" className="rounded-full px-6 bg-primary hover:bg-primary/90">
              去完成
            </Button>
          </div>
        </Card>
      </div>

      {/* List Items */}
      <div className="px-4 mt-4">
        <Card className="overflow-hidden shadow-sm rounded-2xl">
          <div className="divide-y divide-border/50">
            {listItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
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