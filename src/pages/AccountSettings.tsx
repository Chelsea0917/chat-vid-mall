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
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setAvatarUrl(event.target?.result as string);
          toast({
            title: "头像已更新",
            description: "你的新头像已上传成功",
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

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
        <Card className="p-4 mb-3 shadow-lg">
          <Label className="text-sm font-medium mb-2 block">头像</Label>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-16 h-16 border-4 border-primary/20">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-2xl bg-primary/10">
                  {avatarUrl || "👤"}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 text-xs text-muted-foreground">
              点击相机图标上传新头像
            </div>
          </div>
        </Card>

        {/* Nickname Section */}
        <Card className="p-4 mb-3 shadow-lg">
          <Label htmlFor="nickname" className="text-sm font-medium mb-2 block">
            昵称
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="pl-9 h-10 rounded-xl"
              placeholder="请输入昵称"
              maxLength={20}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1.5 text-right">
            {nickname.length}/20
          </div>
        </Card>

        {/* Account Info */}
        <Card className="p-4 mb-3 shadow-lg">
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">用户ID</Label>
              <div className="text-sm font-medium mt-0.5">123456789</div>
            </div>
            <div className="h-px bg-border" />
            <div>
              <Label className="text-xs text-muted-foreground">注册时间</Label>
              <div className="text-sm font-medium mt-0.5">2024年1月1日</div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full h-11 rounded-full font-bold shadow-lg mb-4"
        >
          保存修改
        </Button>
      </div>
    </div>
  );
};

export default AccountSettings;
