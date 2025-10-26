import { Camera, BarChart3, Zap, Shield, MapPin, Car, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Automatic Number Plate Recognition (ANPR)",
      description: "Advanced AI-powered camera systems using YOLO + OCR technology to automatically detect and read license plates, logging entry/exit times and automating billing processes.",
      technologies: ["YOLO", "OCR", "TensorFlow", "OpenCV"],
      benefits: ["99.8% accuracy", "Real-time processing", "Automated billing"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Data Analytics Dashboard",
      description: "Comprehensive admin dashboard with real-time metrics, occupancy rates, revenue trends, peak hour analysis, and predictive analytics for optimized parking management.",
      technologies: ["React", "D3.js", "Real-time Analytics", "AI Predictions"],
      benefits: ["Live monitoring", "Predictive insights", "Export reports"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "EV Charging Integration",
      description: "Smart EV charging slot management with real-time availability tracking, per-kWh billing, charging progress monitoring, and eco-friendly energy optimization.",
      technologies: ["IoT Sensors", "Smart Meters", "Cloud Integration"],
      benefits: ["Live slot tracking", "Smart billing", "Energy optimization"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Security & Surveillance",
      description: "AI-powered video surveillance with intelligent threat detection, intrusion alerts, overstay notifications, and suspicious activity recognition for enhanced safety.",
      technologies: ["Computer Vision", "Deep Learning", "Real-time Monitoring"],
      benefits: ["24/7 monitoring", "Instant alerts", "Incident recording"],
      color: "from-red-500 to-red-600"
    },
    {
      icon: MapPin,
      title: "Search & Reserve Slots",
      description: "Interactive map interface showing real-time slot availability with smart filters for EV charging, covered parking, vehicle type, and instant reservation system.",
      technologies: ["Interactive Maps", "Real-time Updates", "Smart Filters"],
      benefits: ["Instant booking", "Live availability", "Custom filters"],
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Car,
      title: "Vehicle Tracking",
      description: "Smart vehicle location system with interactive parking layout maps, real-time position tracking, and quick vehicle finder using license plate search.",
      technologies: ["GPS Integration", "Indoor Positioning", "AI Navigation"],
      benefits: ["Quick vehicle finder", "Visual guidance", "Time saving"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: TrendingUp,
      title: "Revenue Reports",
      description: "Detailed financial analytics with daily, weekly, and monthly revenue tracking, automated report generation, and export capabilities for comprehensive business insights.",
      technologies: ["Advanced Analytics", "Automated Reporting", "Data Visualization"],
      benefits: ["Revenue tracking", "Automated reports", "Business insights"],
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              7 Core Modules
            </Badge>
            <h1 className="mb-6">Smart Parking Features</h1>
            <p className="text-xl text-white/90">
              Comprehensive AI-powered solutions for modern parking management
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-fade-in bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="mb-4 text-2xl">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {feature.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-muted">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Key Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {feature.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="outline" className="border-primary/30">
                            ✓ {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6">Powered by Advanced Technology</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our system integrates cutting-edge AI (YOLO, TensorFlow, OCR), IoT sensors, 
              and cloud-based dashboards to deliver a seamless, efficient parking experience 
              that emphasizes sustainability, time-saving, and enhanced security.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {["AI & ML", "IoT Sensors", "Cloud Computing", "Real-time Analytics"].map((tech, idx) => (
                <div key={idx} className="p-6 bg-gradient-card rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-2">{idx + 1}</div>
                  <div className="text-sm font-medium">{tech}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
