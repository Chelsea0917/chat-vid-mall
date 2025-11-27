import { Link, useLocation } from "react-router-dom";
import { Home, Video, MessageCircle, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "商城" },
    { path: "/videos", icon: Video, label: "视频" },
    { path: "/chat", icon: MessageCircle, label: "聊天", isCenter: true },
    { path: "/messages", icon: Heart, label: "社交" },
    { path: "/profile", icon: User, label: "我" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 pb-safe">
      <div className="max-w-screen-xl mx-auto px-2 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          if (item.isCenter) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-16 h-20 bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform relative"
                  style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
                >
                  {/* Eyes */}
                  <div className="absolute top-6 left-4 w-2 h-2 bg-white rounded-full" />
                  <div className="absolute top-6 right-4 w-2 h-2 bg-white rounded-full" />
                  {/* Mouth */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-3 border-b-2 border-white rounded-b-full" />
                </div>
              </Link>
            );
          }
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center min-w-[64px] py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "text-primary")} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
