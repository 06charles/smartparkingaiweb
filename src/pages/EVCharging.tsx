import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Battery, Clock, IndianRupee, Leaf } from "lucide-react";
import { toast } from "sonner";
import { platformData, type EVChargingSlot, type EVReservation } from "@/lib/platformData";

const EVCharging = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [vehicleNumber, setVehicleNumber] = useState("MH 02 EV 2026");
  const [chargingSlots, setChargingSlots] = useState<EVChargingSlot[]>(() => platformData.getEvSlots());
  const [latestReservation, setLatestReservation] = useState<EVReservation | null>(
    () => platformData.getEvReservations().find((reservation) => reservation.status === "reserved") ?? null,
  );

  const refreshEvData = () => {
    setChargingSlots(platformData.getEvSlots());
    setLatestReservation(platformData.getEvReservations().find((reservation) => reservation.status === "reserved") ?? null);
  };

  useEffect(() => {
    refreshEvData();
    window.addEventListener("smart-parking-db-updated", refreshEvData);
    return () => window.removeEventListener("smart-parking-db-updated", refreshEvData);
  }, []);

  const availableCount = chargingSlots.filter((slot) => slot.status === "available").length;
  const activeCount = chargingSlots.filter((slot) => slot.status === "charging" || slot.status === "reserved").length;
  const evRevenue = platformData
    .getEvReservations()
    .filter((reservation) => reservation.status === "reserved")
    .reduce((sum, reservation) => sum + reservation.amount, 15890);

  const stats = [
    { icon: Zap, label: "Active Chargers", value: `${activeCount}/${chargingSlots.length}`, color: "from-blue-500 to-blue-600" },
    { icon: Battery, label: "Available Now", value: availableCount.toString(), color: "from-green-500 to-green-600" },
    { icon: IndianRupee, label: "EV Revenue", value: `₹${evRevenue.toLocaleString()}`, color: "from-purple-500 to-purple-600" },
    { icon: Leaf, label: "CO2 Saved", value: "842 kg", color: "from-emerald-500 to-emerald-600" },
  ];

  const getStatusColor = (status: EVChargingSlot["status"]) => {
    switch (status) {
      case "available": return "bg-success";
      case "reserved": return "bg-warning";
      case "charging": return "bg-primary";
      case "occupied": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: EVChargingSlot["status"]) => {
    switch (status) {
      case "available": return "Available";
      case "reserved": return "Reserved";
      case "charging": return "Charging";
      case "occupied": return "Occupied";
      default: return "Unknown";
    }
  };

  const reserveSlot = (slotId: number) => {
    if (!vehicleNumber.trim()) {
      toast.error("Enter a vehicle number before reserving an EV slot.");
      return;
    }

    try {
      const reservation = platformData.createEvReservation(slotId, vehicleNumber, 18);
      setLatestReservation(reservation);
      refreshEvData();
      toast.success(`${reservation.id} reserved and synced to platform database`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not reserve EV slot.");
    }
  };

  const cancelReservation = (reservationId: string) => {
    try {
      platformData.cancelEvReservation(reservationId);
      refreshEvData();
      toast.success(`${reservationId} cancelled and slot released`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not cancel reservation.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-section">
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="h-8 w-8" />
              <Badge className="bg-white/20 text-white border-white/30">EV Charging</Badge>
            </div>
            <h1 className="mb-6">Smart EV Charging Network</h1>
            <p className="text-xl text-white/90">
              Reserve EV charging slots with live availability, billing, and dashboard updates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-card lg:col-span-2">
              <h2 className="text-2xl font-bold mb-2">Reserve a Charging Slot</h2>
              <p className="text-muted-foreground mb-4">Use this vehicle number for the reservation. Available slots change to Reserved after clicking.</p>
              <div className="max-w-sm">
                <Label htmlFor="ev-vehicle">Vehicle Number</Label>
                <Input id="ev-vehicle" value={vehicleNumber} onChange={(event) => setVehicleNumber(event.target.value)} />
              </div>
            </Card>

            {latestReservation && (
              <Card className="p-6 bg-success/5 border-success/40">
                <div className="text-sm text-muted-foreground">Latest EV reservation</div>
                <h3 className="text-xl font-bold">{latestReservation.id}</h3>
                <p className="text-sm text-muted-foreground mb-3">{latestReservation.vehicleNumber} • {latestReservation.location}</p>
                <div className="text-sm font-semibold mb-4">Estimated bill: ₹{latestReservation.amount}</div>
                <Button variant="outline" size="sm" onClick={() => cancelReservation(latestReservation.id)}>
                  Cancel Reservation
                </Button>
              </Card>
            )}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Live Charging Slots</h2>
            <p className="text-muted-foreground">Real-time availability and charging status from the platform database</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chargingSlots.map((slot) => (
              <Card
                key={slot.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${selectedSlot === slot.id ? "ring-2 ring-primary shadow-glow" : ""}`}
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
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Type</span><span className="font-medium">{slot.type}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Power</span><span className="font-medium">{slot.power}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Rate</span><span className="font-medium">₹{slot.price}/kWh</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Est. total</span><span className="font-medium">₹{slot.price * 18}</span></div>
                </div>

                {slot.status === "charging" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Progress</span><span className="font-medium">{slot.progress}%</span></div>
                    <Progress value={slot.progress} className="h-2" />
                    <div className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-3 w-3" /><span>{slot.timeLeft} remaining</span></div>
                  </div>
                )}

                {slot.status === "reserved" && (
                  <div className="text-sm text-muted-foreground mb-3">
                    Reserved for {slot.reservedBy} as {slot.reservationId}
                  </div>
                )}

                {slot.status === "available" ? (
                  <Button className="w-full mt-2" size="sm" onClick={(event) => { event.stopPropagation(); reserveSlot(slot.id); }}>
                    Reserve Slot
                  </Button>
                ) : (
                  <Button className="w-full mt-2" size="sm" variant="outline" disabled>
                    Not Available
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

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
