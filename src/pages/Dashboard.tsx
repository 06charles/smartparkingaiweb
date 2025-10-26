import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { TrendingUp, Users, Car, IndianRupee, Clock, Zap, Download } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { 
      icon: Car, 
      label: "Total Vehicles Today", 
      value: "1,247", 
      change: "+12%",
      trend: "up",
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: IndianRupee, 
      label: "Revenue Today", 
      value: "₹87,450", 
      change: "+8%",
      trend: "up",
      color: "from-green-500 to-green-600"
    },
    { 
      icon: Users, 
      label: "Occupancy Rate", 
      value: "73%", 
      change: "+5%",
      trend: "up",
      color: "from-purple-500 to-purple-600"
    },
    { 
      icon: Clock, 
      label: "Avg Parking Time", 
      value: "2.4 hrs", 
      change: "-10%",
      trend: "down",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const occupancyData = [
    { time: "6 AM", rate: 35 },
    { time: "9 AM", rate: 85 },
    { time: "12 PM", rate: 92 },
    { time: "3 PM", rate: 78 },
    { time: "6 PM", rate: 95 },
    { time: "9 PM", rate: 45 }
  ];

  const revenueData = [
    { day: "Mon", revenue: 65400 },
    { day: "Tue", revenue: 72100 },
    { day: "Wed", revenue: 68900 },
    { day: "Thu", revenue: 81200 },
    { day: "Fri", revenue: 89500 },
    { day: "Sat", revenue: 94300 },
    { day: "Sun", revenue: 87450 }
  ];

  const vehicleTypeData = [
    { name: "2-Wheeler", value: 45, color: "#3b82f6" },
    { name: "4-Wheeler", value: 40, color: "#10b981" },
    { name: "EV", value: 15, color: "#8b5cf6" }
  ];

  const peakHoursData = [
    { hour: "8-9 AM", vehicles: 145 },
    { hour: "9-10 AM", vehicles: 189 },
    { hour: "12-1 PM", vehicles: 167 },
    { hour: "5-6 PM", vehicles: 198 },
    { hour: "6-7 PM", vehicles: 176 }
  ];

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Header */}
      <section className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="text-white/80">Real-time parking management insights</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Zap className="h-4 w-4 mr-2" />
                Live Mode
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
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
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant={stat.trend === "up" ? "default" : "secondary"} className="bg-muted">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="occupancy" className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 gap-2">
              <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="occupancy" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Occupancy Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={occupancyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Vehicle Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={vehicleTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {vehicleTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Weekly Revenue</h3>
                  <Badge className="bg-success text-success-foreground">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% vs last week
                  </Badge>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                      formatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Peak Hours Analysis</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={peakHoursData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="hour" type="category" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Bar dataKey="vehicles" fill="hsl(var(--accent))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
