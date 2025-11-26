import { useState } from "react";
import { ArrowLeft, Camera, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("用户昵称");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "你的个人信息已更新",
    });
    
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

  const handleAvatarClick = () => {
    toast({
      title: "上传头像",
      description: "此功能正在开发中...",
    });
  };

  const avatarOptions = [
    "😀", "😎", "🥳", "🤓", "😺", "🐶", "🐼", "🦊",
    "🌟", "💎", "🎮", "🎨", "🎭", "🎪", "🎯", "🎲"
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-primary pt-safe pb-6 px-6">
        <div className="flex items-center gap-4 pt-8">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-white">账号设置</h1>
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Avatar Section */}
        <Card className="p-6 mb-4 shadow-lg">
          <Label className="text-sm font-medium mb-3 block">头像</Label>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-primary/20">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-3xl bg-primary/10">
                  {avatarUrl || "👤"}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
              点击相机图标上传新头像<br />
              或从下方选择默认头像
            </div>
          </div>

          {/* Avatar Options */}
          <div className="grid grid-cols-8 gap-2">
            {avatarOptions.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setAvatarUrl(emoji)}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                  avatarUrl === emoji
                    ? "bg-primary/20 scale-110 shadow-md"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </Card>

        {/* Nickname Section */}
        <Card className="p-6 mb-4 shadow-lg">
          <Label htmlFor="nickname" className="text-sm font-medium mb-3 block">
            昵称
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="pl-10 h-12 rounded-xl"
              placeholder="请输入昵称"
              maxLength={20}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-right">
            {nickname.length}/20
          </div>
        </Card>

        {/* Account Info */}
        <Card className="p-6 mb-4 shadow-lg">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">用户ID</Label>
              <div className="text-base font-medium mt-1">123456789</div>
            </div>
            <div className="h-px bg-border" />
            <div>
              <Label className="text-sm text-muted-foreground">注册时间</Label>
              <div className="text-base font-medium mt-1">2024年1月1日</div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full h-12 rounded-full font-bold shadow-lg mb-6"
        >
          保存修改
        </Button>
      </div>
    </div>
  );
};

export default AccountSettings;
