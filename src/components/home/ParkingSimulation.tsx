import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface ParkingSpot {
  id: number;
  status: "available" | "occupied" | "reserved";
}

const ParkingSimulation = () => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [stats, setStats] = useState({ available: 0, occupied: 0, reserved: 0 });

  // Initialize parking spots
  useEffect(() => {
    const initialSpots: ParkingSpot[] = Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      status: Math.random() > 0.5 ? "available" : "occupied",
    }));
    setSpots(initialSpots);
  }, []);

  // Update stats when spots change
  useEffect(() => {
    const available = spots.filter((s) => s.status === "available").length;
    const occupied = spots.filter((s) => s.status === "occupied").length;
    const reserved = spots.filter((s) => s.status === "reserved").length;
    setStats({ available, occupied, reserved });
  }, [spots]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSpots((prev) => {
        const newSpots = [...prev];
        const randomIndex = Math.floor(Math.random() * newSpots.length);
        const statuses: Array<"available" | "occupied" | "reserved"> = [
          "available",
          "occupied",
          "reserved",
        ];
        newSpots[randomIndex].status =
          statuses[Math.floor(Math.random() * statuses.length)];
        return newSpots;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSpotColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success hover:bg-success/80";
      case "occupied":
        return "bg-destructive hover:bg-destructive/80";
      case "reserved":
        return "bg-warning hover:bg-warning/80";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-3xl font-bold text-success">{stats.available}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-success rounded-full"></div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Occupied</p>
              <p className="text-3xl font-bold text-destructive">{stats.occupied}</p>
            </div>
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-destructive rounded-full"></div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Reserved</p>
              <p className="text-3xl font-bold text-warning">{stats.reserved}</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-warning rounded-full"></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Parking Grid */}
      <Card className="p-6 bg-gradient-card">
        <h3 className="text-xl font-semibold mb-4">Live Parking Lot Status</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className={`aspect-square rounded-lg ${getSpotColor(
                spot.status
              )} flex items-center justify-center text-white font-semibold text-xs md:text-sm transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg`}
              title={`Spot ${spot.id}: ${spot.status}`}
            >
              {spot.id}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning rounded"></div>
            <span>Reserved</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ParkingSimulation;
