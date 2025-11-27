import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    toast({
      title: "授权成功",
      description: "欢迎使用！",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Avatar */}
      <Avatar className="w-32 h-32 mb-8">
        <AvatarImage src="" alt="用户头像" />
        <AvatarFallback className="bg-muted">
          <User className="w-16 h-16 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      {/* Nickname Label */}
      <div className="text-muted-foreground text-lg mb-4">
        昵称
      </div>

      {/* Suggestion Text */}
      <div className="text-sm text-emerald-500 mb-12 text-center px-4">
        建议使用微信头像和昵称,方便文稿撰
      </div>

      {/* Confirm Button */}
      <Button
        onClick={handleLogin}
        className="w-[280px] h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-base font-medium shadow-lg"
      >
        确认授权登录
      </Button>
    </div>
  );
};

export default Login;
