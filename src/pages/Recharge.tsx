import { useState } from "react";
import { ArrowLeft, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Recharge = () => {
  const navigate = useNavigate();
  const [credits, setCredits] = useState<string>("");

  const handleRecharge = () => {
    const creditAmount = parseInt(credits);
    
    if (!credits || isNaN(creditAmount) || creditAmount <= 0) {
      toast({
        title: "请输入有效的积分数量",
        description: "积分数量必须为正整数",
        variant: "destructive",
      });
      return;
    }

    if (creditAmount < 1) {
      toast({
        title: "充值金额过低",
        description: "最低充值1积分",
        variant: "destructive",
      });
      return;
    }

    if (creditAmount > 10000) {
      toast({
        title: "充值金额过高",
        description: "单次最多充值10000积分",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "充值成功！",
      description: `已充值${creditAmount}积分，快去使用吧～`,
    });
    
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

  const creditAmount = parseInt(credits) || 0;
  const totalPrice = creditAmount;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-primary pt-safe pb-6 px-6">
        <div className="flex items-center gap-4 pt-8 mb-4">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-white">积分充值</h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-6 text-center">
            <div className="text-sm text-white/80 mb-2">当前积分</div>
            <div className="flex items-center justify-center gap-2">
              <Coins className="w-6 h-6" />
              <span className="text-3xl font-bold">268</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Input Section */}
      <div className="px-4 py-6">
        <Card className="p-6 shadow-lg">
          <Label htmlFor="credits" className="text-sm font-medium mb-3 block">
            充值积分数量
          </Label>
          <div className="relative mb-4">
            <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="credits"
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="pl-12 pr-16 h-14 text-lg rounded-xl"
              placeholder="请输入积分数量"
              min="1"
              max="10000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              积分
            </span>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">兑换比例</span>
              <span className="font-medium">1积分 = 1元</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground">应付金额</span>
              <span className="text-2xl font-bold text-primary">
                ¥{totalPrice}
              </span>
            </div>
          </div>

          <div className="mt-4 text-xs text-muted-foreground space-y-1">
            <div>• 最低充值1积分，最高单次充值10000积分</div>
            <div>• 充值成功后积分立即到账</div>
          </div>
        </Card>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          onClick={handleRecharge}
          disabled={!credits || creditAmount <= 0}
          className="w-full h-14 rounded-full text-base font-bold shadow-lg"
        >
          {creditAmount > 0 ? `立即充值 ¥${totalPrice}` : "立即充值"}
        </Button>
      </div>
    </div>
  );
};

export default Recharge;
