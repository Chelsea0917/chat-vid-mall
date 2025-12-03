import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const FloatingChatButton = () => {
  return (
    <Link
      to="/chat"
      className="fixed right-4 bottom-[88px] z-40 w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Link>
  );
};

export default FloatingChatButton;
