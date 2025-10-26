import { ArrowRight, Camera, BarChart3, Zap, Shield, MapPin, Car, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ANPRDemo from "@/components/home/ANPRDemo";

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "ANPR System",
      description: "AI-powered automatic number plate recognition with 99.8% accuracy",
      link: "/features"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time insights and comprehensive parking metrics",
      link: "/dashboard"
    },
    {
      icon: Zap,
      title: "EV Charging",
      description: "Smart EV charging network with live slot tracking",
      link: "/ev-charging"
    },
    {
      icon: Shield,
      title: "Security & Surveillance",
      description: "24/7 AI-powered monitoring and threat detection",
      link: "/security"
    },
    {
      icon: MapPin,
      title: "Smart Booking",
      description: "Interactive maps with real-time slot availability",
      link: "/solutions"
    },
    {
      icon: Car,
      title: "Vehicle Tracking",
      description: "Find your vehicle instantly with our smart locator",
      link: "/features"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-sm">
              Smart Parking Powered by AI & IoT
            </Badge>
            <h1 className="mb-6">
              The Future of Urban Parking Management
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Revolutionary AI-powered solutions that transform parking infrastructure with 
              intelligent automation, real-time analytics, and seamless user experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg group">
                  Try Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/solutions">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Book Slot
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive smart parking solution with 7 integrated modules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card
                    className="p-8 bg-gradient-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in cursor-pointer h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ANPR Demo Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4">Automatic Number Plate Recognition</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our AI-powered ANPR system with real-time detection and automated processing
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ANPRDemo />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Ready to Transform Your City?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join the smart parking revolution and create a more efficient, sustainable urban future
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
