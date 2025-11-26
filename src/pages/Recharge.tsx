import { useState } from "react";
import { ArrowLeft, Coins, Zap, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Recharge = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const packages = [
    { id: 1, credits: 10, price: "¥10", bonus: 0, icon: Coins, popular: false },
    { id: 2, credits: 50, price: "¥50", bonus: 5, icon: Zap, popular: true },
    { id: 3, credits: 100, price: "¥100", bonus: 20, icon: Gift, popular: false },
    { id: 4, credits: 500, price: "¥500", bonus: 150, icon: Gift, popular: false },
  ];

  const handleRecharge = () => {
    if (!selectedPackage) {
      toast({
        title: "请选择充值套餐",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "充值成功！",
      description: "积分已到账，快去使用吧～",
    });
    
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

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

      {/* Packages */}
      <div className="px-4 py-6 space-y-3">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          const isSelected = selectedPackage === pkg.id;
          
          return (
            <Card
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`relative overflow-hidden transition-all cursor-pointer ${
                isSelected
                  ? "border-primary border-2 shadow-lg scale-[1.02]"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                  最划算
                </div>
              )}
              
              <div className="p-5 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isSelected ? "bg-primary/10" : "bg-muted"
                }`}>
                  <Icon className={`w-7 h-7 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold">{pkg.credits}</span>
                    <span className="text-sm text-muted-foreground">积分</span>
                    {pkg.bonus > 0 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        +{pkg.bonus} 赠送
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    实际到账 {pkg.credits + pkg.bonus} 积分
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          onClick={handleRecharge}
          disabled={!selectedPackage}
          className="w-full h-14 rounded-full text-base font-bold shadow-lg"
        >
          立即充值
        </Button>
      </div>
    </div>
  );
};

export default Recharge;
