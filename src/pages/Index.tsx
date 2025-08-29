import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Code, GitBranch, Terminal, BookOpen, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import mentorLogo1 from "@/assets/mentora-logo-1.png";

const Index = () => {
  const features = [
    {
      icon: Code,
      title: "Interactive Python Tutor",
      description: "Learn Python with personalized explanations and hands-on coding exercises",
      color: "text-blue-400"
    },
    {
      icon: GitBranch,
      title: "Git & DevOps Assistant",
      description: "Master version control, CI/CD, and deployment strategies with expert guidance",
      color: "text-green-400"
    },
    {
      icon: Terminal,
      title: "Command Line Mentor",
      description: "Navigate terminal commands and shell scripting with confidence",
      color: "text-purple-400"
    },
    {
      icon: BookOpen,
      title: "Personalized Learning",
      description: "Adaptive curriculum that adjusts to your learning pace and style",
      color: "text-orange-400"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Learners", value: "10,000+" },
    { icon: Code, label: "Coding Sessions", value: "50,000+" },
    { icon: TrendingUp, label: "Success Rate", value: "94%" }
  ];

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto">
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src={mentorLogo1} alt="Mentora" className="w-20 h-20 ai-glow rounded-full" />
              <div>
                <h1 className="text-5xl font-bold gradient-text">Mentora</h1>
                <p className="text-xl text-muted-foreground">Your AI Coding Tutor + DevOps Assistant</p>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <strong className="text-foreground">Mentora</strong> is a full-stack AI coding mentor that assists 
              developers in debugging, learning, and deploying code. Powered by OpenAI's GPT and built with 
              FastAPI, React, and Docker, Mentora simulates a personal tutor that explains concepts like Python, Git, 
              and JavaScript through a sleek, modern chat interface.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="ai-glow" asChild>
                <Link to="/chat">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/courses">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Courses
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center course-card">
                  <CardContent className="pt-6">
                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Why Choose Mentora?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience personalized coding education with AI-powered mentorship
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="course-card group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center ai-glow">
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Built with Modern Technology</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Badge className="py-3 px-6 text-base bg-blue-500/20 text-blue-400">
                Frontend: React (Vite), Tailwind CSS, shadcn/ui
              </Badge>
              <Badge className="py-3 px-6 text-base bg-green-500/20 text-green-400">
                Backend: FastAPI (Python), OpenAI GPT API
              </Badge>
              <Badge className="py-3 px-6 text-base bg-purple-500/20 text-purple-400">
                DevOps: Docker, Vercel, Railway/Render
              </Badge>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold gradient-text">Ready to Accelerate Your Learning?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of developers who are mastering coding and DevOps with Mentora's AI-powered guidance.
            </p>
            <Button size="lg" className="ai-glow" asChild>
              <Link to="/chat">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Journey Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
