import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Camera, AlertTriangle, Eye, Activity, CheckCircle2 } from "lucide-react";

const Security = () => {
  const [liveView, setLiveView] = useState(1);

  const cameras = [
    { id: 1, location: "Entry Gate A", status: "active", alerts: 0, zone: "entrance", videoUrl: "https://www.youtube.com/embed/U7HRKjlXK-Y?autoplay=1&mute=1&loop=1&playlist=U7HRKjlXK-Y&controls=0&showinfo=0&rel=0" },
    { id: 2, location: "Parking Zone Main", status: "active", alerts: 2, zone: "parking", videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&loop=1&playlist=jfKfPfyJRdk&controls=0&showinfo=0&rel=0" },
    { id: 3, location: "Exit Gate B", status: "active", alerts: 0, zone: "exit", videoUrl: "" },
    { id: 4, location: "Parking Zone 2", status: "active", alerts: 0, zone: "parking", videoUrl: "" },
    { id: 5, location: "EV Charging Area", status: "active", alerts: 1, zone: "charging", videoUrl: "" },
    { id: 6, location: "Admin Building", status: "maintenance", alerts: 0, zone: "admin", videoUrl: "" },
  ];

  const alerts = [
    { id: 1, type: "intrusion", location: "Parking Zone 1", time: "2 min ago", severity: "high", status: "active" },
    { id: 2, type: "overstay", location: "Slot B-24", time: "15 min ago", severity: "medium", status: "active" },
    { id: 3, type: "suspicious", location: "EV Charging Area", time: "1 hour ago", severity: "low", status: "resolved" },
    { id: 4, type: "intrusion", location: "Parking Zone 1", time: "2 hours ago", severity: "high", status: "resolved" },
  ];

  const features = [
    {
      icon: Camera,
      title: "24/7 Live Monitoring",
      description: "Continuous surveillance with AI-powered detection across all parking zones",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: AlertTriangle,
      title: "Instant Alerts",
      description: "Real-time notifications for intrusions, overstays, and suspicious activities",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Eye,
      title: "AI Detection",
      description: "Advanced computer vision for automated threat recognition and analysis",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Activity,
      title: "Incident Recording",
      description: "Automatic recording and archiving of all security events for review",
      color: "from-green-500 to-green-600"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "intrusion": return "🚨";
      case "overstay": return "⏰";
      case "suspicious": return "👁️";
      default: return "⚠️";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8" />
              <Badge className="bg-white/20 text-white border-white/30">Security System</Badge>
            </div>
            <h1 className="mb-6">AI-Powered Surveillance</h1>
            <p className="text-xl text-white/90">
              Advanced security monitoring with intelligent threat detection and real-time alerts
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-glow transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="live" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 gap-2">
              <TabsTrigger value="live">Live Feed</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="cameras">Cameras</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Camera {liveView}</h3>
                    <Badge className="bg-success text-success-foreground">
                      <Activity className="h-3 w-3 mr-1 animate-pulse" />
                      Live
                    </Badge>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    {cameras.find(c => c.id === liveView)?.videoUrl ? (
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={cameras.find(c => c.id === liveView)?.videoUrl}
                        title={`Camera ${liveView} Feed`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                        <div className="relative z-10 text-center">
                          <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Live CCTV Feed Placeholder</p>
                          <p className="text-sm text-muted-foreground mt-2">AI Detection: Active</p>
                        </div>
                        {/* Detection Boxes Simulation */}
                        <div className="absolute top-12 left-12 w-32 h-32 border-2 border-primary rounded animate-pulse">
                          <div className="absolute -top-6 left-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            Vehicle: 98%
                          </div>
                        </div>
                        <div className="absolute bottom-20 right-16 w-24 h-40 border-2 border-success rounded animate-pulse">
                          <div className="absolute -top-6 left-0 bg-success text-success-foreground text-xs px-2 py-1 rounded">
                            Person: 95%
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Detections</h3>
                  <div className="space-y-4">
                    {[
                      { type: "Vehicle Entry", time: "Just now", color: "primary" },
                      { type: "Person Detected", time: "2 min ago", color: "success" },
                      { type: "Motion Alert", time: "5 min ago", color: "warning" },
                      { type: "Vehicle Exit", time: "8 min ago", color: "primary" },
                      { type: "All Clear", time: "10 min ago", color: "success" },
                    ].map((detection, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className={`w-2 h-2 rounded-full bg-${detection.color}`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{detection.type}</p>
                          <p className="text-xs text-muted-foreground">{detection.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Security Alerts</h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium capitalize">{alert.type} Alert</h4>
                            <Badge variant={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.location} • {alert.time}</p>
                        </div>
                      </div>
                      {alert.status === "resolved" ? (
                        <Badge variant="outline" className="border-success text-success">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Resolved
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="cameras" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cameras.map((camera) => (
                  <Card 
                    key={camera.id} 
                    className={`p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                      liveView === camera.id ? "ring-2 ring-primary shadow-glow" : ""
                    }`}
                    onClick={() => setLiveView(camera.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                      <Badge 
                        variant={camera.status === "active" ? "default" : "secondary"}
                        className={camera.status === "active" ? "bg-success" : ""}
                      >
                        {camera.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">Camera {camera.id}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{camera.location}</p>
                    {camera.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {camera.alerts} Active Alert{camera.alerts > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Advanced AI Technology</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Our security system uses state-of-the-art computer vision and deep learning algorithms 
              to provide intelligent threat detection and automated monitoring.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Computer Vision", "Deep Learning", "Real-time Analysis"].map((tech, idx) => (
                <div key={idx} className="p-6 bg-gradient-card rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-2">{idx + 1}</div>
                  <div className="font-medium">{tech}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;
