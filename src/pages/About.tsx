import { Target, Eye, Leaf, Users, Award, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const timeline = [
    {
      year: "Past",
      title: "Traditional Parking",
      description: "Manual management, paper tickets, long search times, high emissions",
    },
    {
      year: "Present",
      title: "Digital Transition",
      description: "Basic sensors, mobile payments, limited optimization",
    },
    {
      year: "Future",
      title: "AI-Powered Parking",
      description: "Predictive algorithms, dynamic pricing, full automation, zero emissions",
    },
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Reducing carbon emissions through optimized parking patterns",
      metric: "30% reduction in emissions",
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Seamless experience for drivers and city planners",
      metric: "95% user satisfaction",
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Cutting-edge AI and machine learning technologies",
      metric: "10+ AI models deployed",
    },
    {
      icon: TrendingUp,
      title: "Efficiency",
      description: "Maximizing parking utilization and revenue",
      metric: "40% increased efficiency",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">About Smart Parking AI</h1>
            <p className="text-xl md:text-2xl text-white/90">
              We're on a mission to revolutionize urban mobility through intelligent parking solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-gradient-card animate-fade-in">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To transform urban parking through artificial intelligence, making cities more efficient, 
                sustainable, and livable. We believe smart parking is a cornerstone of smart cities, 
                reducing congestion, emissions, and frustration for millions of drivers worldwide.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Eye className="h-7 w-7 text-secondary" />
              </div>
              <h2 className="mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                A future where finding parking is effortless, pricing is fair and dynamic, and every 
                parking space contributes to a greener planet. We envision cities where AI-powered 
                parking systems seamlessly integrate with autonomous vehicles and smart infrastructure.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4">The Evolution of Parking</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From manual systems to AI-powered intelligence
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-destructive via-warning to-success hidden md:block"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-4 animate-fade-in`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left"}`}>
                      <Card className="p-6 bg-gradient-card inline-block">
                        <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </Card>
                    </div>
                    <div className={`w-12 h-12 bg-primary rounded-full border-4 border-background shadow-lg flex items-center justify-center z-10 flex-shrink-0 ${index % 2 === 0 ? "" : "md:order-1"}`}>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className={`flex-1 ${index % 2 === 0 ? "" : "md:order-3"}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that drive our innovation and impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{value.description}</p>
                  <div className="text-sm font-semibold text-primary">{value.metric}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4">Our Impact</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Creating measurable change in urban environments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "10M+", label: "Parking Sessions" },
              { number: "50+", label: "Cities Served" },
              { number: "40%", label: "Congestion Reduced" },
              { number: "30%", label: "Emissions Cut" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
