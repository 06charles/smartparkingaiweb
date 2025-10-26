import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BarChart3, DollarSign, Zap } from "lucide-react";

const Technology = () => {
  const [selectedHour, setSelectedHour] = useState(12);

  // Mock data for charts
  const demandData = [
    { hour: 0, demand: 10 },
    { hour: 3, demand: 5 },
    { hour: 6, demand: 30 },
    { hour: 9, demand: 85 },
    { hour: 12, demand: 90 },
    { hour: 15, demand: 70 },
    { hour: 18, demand: 95 },
    { hour: 21, demand: 60 },
    { hour: 24, demand: 15 },
  ];

  const occupancyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    occupancy: Math.floor(Math.random() * 40) + 60,
  }));

  const pricingData = [
    { time: "Off-Peak", price: 2, color: "bg-success" },
    { time: "Regular", price: 5, color: "bg-primary" },
    { time: "Peak", price: 10, color: "bg-destructive" },
  ];

  const features = [
    {
      icon: Brain,
      title: "Machine Learning Predictions",
      description: "Advanced algorithms analyze historical data to predict parking demand with 90% accuracy",
      metrics: ["90% prediction accuracy", "Real-time updates", "7-day forecasting"],
    },
    {
      icon: BarChart3,
      title: "Occupancy Analytics",
      description: "Monitor parking utilization patterns and optimize space allocation",
      metrics: ["Live occupancy tracking", "Trend analysis", "Capacity optimization"],
    },
    {
      icon: DollarSign,
      title: "Dynamic Pricing",
      description: "AI-driven pricing adjusts rates based on demand, time, and location",
      metrics: ["30% revenue increase", "Fair pricing model", "Demand balancing"],
    },
    {
      icon: Zap,
      title: "Smart Routing",
      description: "Guide drivers to available spots using intelligent pathfinding algorithms",
      metrics: ["20 min average time saved", "Reduced fuel consumption", "Lower emissions"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">AI-Powered Technology</h1>
            <p className="text-xl md:text-2xl text-white/90">
              Explore the cutting-edge artificial intelligence and machine learning that powers our smart parking solutions
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4">Core Technologies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI capabilities that make smart parking possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 bg-gradient-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.metrics.map((metric, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Simulations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="mb-4">AI Simulations & Analytics</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive demonstrations of our AI algorithms in action
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="demand" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
                <TabsTrigger value="demand">Demand Prediction</TabsTrigger>
                <TabsTrigger value="occupancy">Occupancy Trends</TabsTrigger>
                <TabsTrigger value="pricing">Dynamic Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="demand" className="animate-fade-in">
                <Card className="p-8 bg-gradient-card">
                  <h3 className="mb-6">Parking Demand Throughout the Day</h3>
                  <div className="space-y-4">
                    {demandData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{data.hour}:00</span>
                          <span className="text-muted-foreground">{data.demand}% Demand</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${data.demand}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">
                    AI predicts peak demand hours allowing for better resource allocation and pricing strategies
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="occupancy" className="animate-fade-in">
                <Card className="p-8 bg-gradient-card">
                  <h3 className="mb-6">Real-Time Occupancy Monitoring</h3>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2 mb-6">
                    {occupancyData.map((data) => {
                      const getColor = () => {
                        if (data.occupancy > 85) return "bg-destructive";
                        if (data.occupancy > 60) return "bg-warning";
                        return "bg-success";
                      };
                      return (
                        <div
                          key={data.hour}
                          className={`aspect-square ${getColor()} rounded-lg flex items-center justify-center text-white text-xs font-semibold hover:scale-110 transition-transform cursor-pointer`}
                          title={`${data.hour}:00 - ${data.occupancy}% occupied`}
                          onClick={() => setSelectedHour(data.hour)}
                        >
                          {data.hour}
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">
                      Selected: {selectedHour}:00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Occupancy: {occupancyData[selectedHour]?.occupancy}% | Status:{" "}
                      {occupancyData[selectedHour]?.occupancy > 85
                        ? "High"
                        : occupancyData[selectedHour]?.occupancy > 60
                        ? "Moderate"
                        : "Low"}
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="animate-fade-in">
                <Card className="p-8 bg-gradient-card">
                  <h3 className="mb-6">AI-Driven Dynamic Pricing Model</h3>
                  <div className="space-y-6">
                    {pricingData.map((tier, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-lg">{tier.time}</div>
                            <div className="text-sm text-muted-foreground">
                              {tier.time === "Off-Peak" && "12 AM - 6 AM"}
                              {tier.time === "Regular" && "6 AM - 5 PM, 8 PM - 12 AM"}
                              {tier.time === "Peak" && "5 PM - 8 PM"}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            ₹{tier.price * 80}/hr
                          </div>
                        </div>
                        <div className={`h-4 ${tier.color} rounded-full`}></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm">
                      <strong>How it works:</strong> AI analyzes real-time demand, historical patterns, 
                      events, and weather to automatically adjust pricing. This balances demand, 
                      maximizes revenue, and ensures fair pricing for all users.
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-card">
              <h2 className="mb-6">How Our AI Works</h2>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Data Collection</h3>
                  <p>
                    Our system continuously collects data from sensors, cameras, mobile apps, and historical records 
                    to build a comprehensive understanding of parking patterns.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Machine Learning Models</h3>
                  <p>
                    Advanced neural networks process millions of data points to identify patterns, predict demand, 
                    and optimize pricing. Our models continuously learn and improve from new data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Optimization</h3>
                  <p>
                    Algorithms make split-second decisions to route drivers, adjust prices, and allocate resources 
                    based on current conditions and predicted trends.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Integration & Scalability</h3>
                  <p>
                    Our cloud-based infrastructure seamlessly integrates with existing parking systems and scales 
                    from small lots to city-wide networks without performance degradation.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
