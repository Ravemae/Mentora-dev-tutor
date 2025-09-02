import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquarePlus, 
  Search, 
  BookOpen, 
  Settings, 
  User,
  Home,
  GraduationCap,
  Code
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import mentorLogo1 from "@/assets/mentora-logo.png";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // Fetch Logged-in user data + avatar
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setEmail(data.user.email);
        if (data.user.user_metadata?.avatar_url) {
          setAvatarUrl(data.user.user_metadata.avatar_url);
        }
      }
    };
    fetchUser();
  }, []);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: MessageSquarePlus, label: "New Chat", path: "/chat" },
    { icon: BookOpen, label: "Explore Courses", path: "/courses" },
    { icon: Code, label: "Code Assistant", path: "/code-help" },
    { icon: GraduationCap, label: "My Learning", path: "/learning" },
  ];

  const recentChats = [
    "Python Functions Explained",
    "Git Commands Tutorial", 
    "Docker Container Setup",
    "React Components Guide"
  ];

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <img src={mentorLogo1} alt="Mentora" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold gradient-text">Mentora</h1>
            <p className="text-sm text-muted-foreground">AI Coding Tutor</p>
          </div>
        </div>
        
        <Button 
          className="w-full justify-start gap-2 ai-glow" 
          variant="default"
          asChild
        >
          <Link to="/chat">
            <MessageSquarePlus className="w-4 h-4" />
            New Chat
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              asChild
            >
              <Link to={item.path}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <Separator />

      {/* Recent Chats */}
      <div className="flex-1 p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Chats</h3>
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {recentChats.map((chat, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left h-auto p-2 text-sm"
                asChild
              >
                <Link to={`/chat/${index + 1}`}>
                  <div className="truncate">{chat}</div>
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-3">
        {/* Avatar & User Info*/}
        <div className="flex items-center gap-3 mb-3">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-primary shadow-sm" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">👤</div>
          )}
          <div className="text-sm">
            <p className="font-medium">{email || "Guest"}</p>
            <Link to="/profile" className="text-xs text-muted-foreground hover:text-primary">
              View Profile
            </Link>
          </div>
        </div>

        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link to="/settings">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link to="/profile">
            <User className="w-4 h-4" />
            Profile
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;