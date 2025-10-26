import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Battery, Clock, IndianRupee, Leaf, TrendingUp } from "lucide-react";

const EVCharging = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const chargingSlots = [
    { id: 1, status: "available", power: "50 kW", type: "Fast Charger", location: "Zone A-12", price: 12 },
    { id: 2, status: "charging", power: "22 kW", type: "Standard", location: "Zone A-14", price: 8, progress: 65, timeLeft: "45 min" },
    { id: 3, status: "available", power: "150 kW", type: "Super Charger", location: "Zone B-05", price: 18 },
    { id: 4, status: "charging", power: "50 kW", type: "Fast Charger", location: "Zone B-08", price: 12, progress: 30, timeLeft: "1.5 hrs" },
    { id: 5, status: "available", power: "22 kW", type: "Standard", location: "Zone C-21", price: 8 },
    { id: 6, status: "occupied", power: "50 kW", type: "Fast Charger", location: "Zone C-23", price: 12 },
    { id: 7, status: "available", power: "150 kW", type: "Super Charger", location: "Zone D-11", price: 18 },
    { id: 8, status: "available", power: "22 kW", type: "Standard", location: "Zone D-15", price: 8 },
  ];

  const stats = [
    { icon: Zap, label: "Active Chargers", value: "24/32", color: "from-blue-500 to-blue-600" },
    { icon: Battery, label: "Total kWh Today", value: "1,247", color: "from-green-500 to-green-600" },
    { icon: IndianRupee, label: "Revenue", value: "₹15,890", color: "from-purple-500 to-purple-600" },
    { icon: Leaf, label: "CO₂ Saved", value: "842 kg", color: "from-emerald-500 to-emerald-600" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-success";
      case "charging": return "bg-primary";
      case "occupied": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "Available";
      case "charging": return "Charging";
      case "occupied": return "Occupied";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="h-8 w-8" />
              <Badge className="bg-white/20 text-white border-white/30">EV Charging</Badge>
            </div>
            <h1 className="mb-6">Smart EV Charging Network</h1>
            <p className="text-xl text-white/90">
              Intelligent charging slot management with real-time monitoring and eco-friendly solutions
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-glow transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Charging Slots */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Live Charging Slots</h2>
            <p className="text-muted-foreground">Real-time availability and charging status</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chargingSlots.map((slot) => (
              <Card
                key={slot.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  selectedSlot === slot.id ? "ring-2 ring-primary shadow-glow" : ""
                }`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${getStatusColor(slot.status)} rounded-lg flex items-center justify-center`}>
                    <Battery className="h-5 w-5 text-white" />
                  </div>
                  <Badge variant="outline">{getStatusText(slot.status)}</Badge>
                </div>

                <h3 className="text-lg font-semibold mb-1">Slot #{slot.id}</h3>
                <p className="text-sm text-muted-foreground mb-3">{slot.location}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{slot.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Power</span>
                    <span className="font-medium">{slot.power}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">₹{slot.price}/kWh</span>
                  </div>
                </div>

                {slot.status === "charging" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{slot.progress}%</span>
                    </div>
                    <Progress value={slot.progress} className="h-2" />
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{slot.timeLeft} remaining</span>
                    </div>
                  </div>
                )}

                {slot.status === "available" && (
                  <Button className="w-full mt-2" size="sm">
                    Reserve Slot
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our EV Charging?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Monitoring</h3>
                <p className="text-muted-foreground">Real-time tracking of charging progress and slot availability</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Billing</h3>
                <p className="text-muted-foreground">Pay per kWh consumed with transparent pricing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-muted-foreground">Contribute to reducing carbon emissions and sustainable future</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EVCharging;
