import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Activity, Star } from "lucide-react";

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Popular", 
    "Python", 
    "JavaScript", 
    "Git & DevOps", 
    "Web Development", 
    "Data Science",
    "Machine Learning"
  ];

  const courses = [
    {
      id: 1,
      title: "Python Foundations",
      description: "Master Python basics with hands-on coding exercises and real-world examples",
      members: 1247,
      interactions: "25.3k",
      difficulty: "Beginner",
      color: "bg-blue-500",
      topics: ["Variables", "Functions", "Loops", "Data Types"]
    },
    {
      id: 2,
      title: "Git & Version Control Mastery",
      description: "Learn Git commands, branching strategies, and collaborative development workflows",
      members: 892,
      interactions: "18.7k",
      difficulty: "Intermediate", 
      color: "bg-orange-500",
      topics: ["Git Basics", "Branching", "Merging", "GitHub"]
    },
    {
      id: 3,
      title: "Docker Containerization",
      description: "Build, deploy, and manage applications using Docker containers and orchestration",
      members: 634,
      interactions: "14.2k",
      difficulty: "Advanced",
      color: "bg-cyan-500",
      topics: ["Containers", "Images", "Docker Compose", "Kubernetes"]
    },
    {
      id: 4,
      title: "JavaScript Essentials",
      description: "Modern JavaScript programming from basics to advanced concepts and frameworks",
      members: 1156,
      interactions: "22.8k", 
      difficulty: "Beginner",
      color: "bg-yellow-500",
      topics: ["ES6+", "DOM", "Async/Await", "APIs"]
    },
    {
      id: 5,
      title: "React Development",
      description: "Build interactive user interfaces with React, hooks, and modern patterns",
      members: 987,
      interactions: "19.4k",
      difficulty: "Intermediate",
      color: "bg-green-500",
      topics: ["Components", "Hooks", "State", "Routing"]
    },
    {
      id: 6,
      title: "DevOps Fundamentals", 
      description: "CI/CD pipelines, infrastructure as code, and deployment automation strategies",
      members: 756,
      interactions: "16.1k",
      difficulty: "Advanced",
      color: "bg-purple-500",
      topics: ["CI/CD", "AWS", "Terraform", "Monitoring"]
    }
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400";
      case "Advanced": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-text">
            mentora helps you acquire new skills, train, or study extraordinarily fast
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search topics, skills, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              Join Mentora
            </Button>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="Popular" className="w-full">
          <TabsList className="grid w-full grid-cols-7 lg:w-fit lg:grid-cols-none lg:flex">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Popular" className="space-y-6 mt-8">
            <h2 className="text-2xl font-semibold">Popular Courses</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="course-card group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-lg ${course.color} flex items-center justify-center`}>
                        <Star className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                        <CardDescription className="mt-2 text-sm">
                          {course.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.members} Members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        <span>{course.interactions} Interactions</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                        Start Learning →
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {course.topics.slice(0, 3).map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {course.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{course.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents would be similar */}
          {categories.slice(1).map((category) => (
            <TabsContent key={category} value={category} className="space-y-6 mt-8">
              <h2 className="text-2xl font-semibold">{category} Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.slice(0, 3).map((course) => (
                  <Card key={course.id} className="course-card group cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-lg ${course.color} flex items-center justify-center`}>
                          <Star className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                          <CardDescription className="mt-2 text-sm">
                            {course.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.members} Members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          <span>{course.interactions} Interactions</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                          Start Learning →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CoursesPage;
