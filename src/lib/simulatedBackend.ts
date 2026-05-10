export type ParkingLot = {
  id: string;
  ownerName: string;
  name: string;
  area: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  cameras: number;
  cameraStatus: "online" | "syncing" | "offline";
  confidence: number;
  lastScan: string;
};

export type Booking = {
  id: string;
  lotId: string;
  lotName: string;
  vehicleNumber: string;
  driverName: string;
  hours: number;
  amount: number;
  status: "confirmed" | "checked-in" | "completed";
  createdAt: string;
};

export type EVChargingSlot = {
  id: number;
  status: "available" | "reserved" | "charging" | "occupied";
  power: string;
  type: string;
  location: string;
  price: number;
  progress?: number;
  timeLeft?: string;
  reservedBy?: string;
  reservationId?: string;
};

export type EVReservation = {
  id: string;
  slotId: number;
  vehicleNumber: string;
  chargerType: string;
  location: string;
  estimatedKwh: number;
  amount: number;
  status: "reserved" | "cancelled";
  createdAt: string;
};

export type ActivityLog = {
  id: string;
  type: "entry" | "exit" | "booking" | "camera" | "ev";
  vehicleNumber: string;
  location: string;
  message: string;
  time: string;
};

const STORE_KEY = "smart-parking-simulated-backend";

type SimulatedDatabase = {
  lots: ParkingLot[];
  bookings: Booking[];
  logs: ActivityLog[];
  evSlots: EVChargingSlot[];
  evReservations: EVReservation[];
};

const now = () => new Date().toISOString();

const seedEvSlots = (): EVChargingSlot[] => [
  { id: 1, status: "available", power: "50 kW", type: "Fast Charger", location: "Zone A-12", price: 12 },
  { id: 2, status: "charging", power: "22 kW", type: "Standard", location: "Zone A-14", price: 8, progress: 65, timeLeft: "45 min" },
  { id: 3, status: "available", power: "150 kW", type: "Super Charger", location: "Zone B-05", price: 18 },
  { id: 4, status: "charging", power: "50 kW", type: "Fast Charger", location: "Zone B-08", price: 12, progress: 30, timeLeft: "1.5 hrs" },
  { id: 5, status: "available", power: "22 kW", type: "Standard", location: "Zone C-21", price: 8 },
  { id: 6, status: "occupied", power: "50 kW", type: "Fast Charger", location: "Zone C-23", price: 12 },
  { id: 7, status: "available", power: "150 kW", type: "Super Charger", location: "Zone D-11", price: 18 },
  { id: 8, status: "available", power: "22 kW", type: "Standard", location: "Zone D-15", price: 8 },
];

const seedDatabase = (): SimulatedDatabase => ({
  lots: [
    {
      id: "lot-andheri-metro",
      ownerName: "Ravi Parking Yard",
      name: "Andheri Metro Open Yard",
      area: "Andheri",
      address: "Near Andheri Metro Gate 2, Mumbai",
      totalSpots: 86,
      availableSpots: 38,
      pricePerHour: 60,
      cameras: 6,
      cameraStatus: "online",
      confidence: 98,
      lastScan: now(),
    },
    {
      id: "lot-bandra-market",
      ownerName: "Seaside Spaces",
      name: "Bandra Market Basement",
      area: "Bandra",
      address: "Linking Road, Bandra West",
      totalSpots: 64,
      availableSpots: 21,
      pricePerHour: 75,
      cameras: 5,
      cameraStatus: "online",
      confidence: 96,
      lastScan: now(),
    },
    {
      id: "lot-koramangala-tech",
      ownerName: "UrbanLot Partners",
      name: "Koramangala Tech Park Lot",
      area: "Koramangala",
      address: "5th Block, Koramangala, Bengaluru",
      totalSpots: 120,
      availableSpots: 52,
      pricePerHour: 55,
      cameras: 8,
      cameraStatus: "online",
      confidence: 97,
      lastScan: now(),
    },
    {
      id: "lot-hitech-city",
      ownerName: "Metro Estate Parking",
      name: "Hitech City Surface Parking",
      area: "Hitech City",
      address: "Madhapur Main Road, Hyderabad",
      totalSpots: 140,
      availableSpots: 63,
      pricePerHour: 50,
      cameras: 9,
      cameraStatus: "syncing",
      confidence: 94,
      lastScan: now(),
    },
  ],
  bookings: [
    {
      id: "BK-24018",
      lotId: "lot-andheri-metro",
      lotName: "Andheri Metro Open Yard",
      vehicleNumber: "MH 02 DK 4812",
      driverName: "Demo User",
      hours: 2,
      amount: 120,
      status: "confirmed",
      createdAt: now(),
    },
  ],
  logs: [
    {
      id: "LOG-1001",
      type: "entry",
      vehicleNumber: "MH 04 AX 2291",
      location: "Andheri Metro Open Yard",
      message: "Camera 02 detected vehicle entry",
      time: now(),
    },
    {
      id: "LOG-1002",
      type: "camera",
      vehicleNumber: "SYSTEM",
      location: "Hitech City Surface Parking",
      message: "Camera feed synced and occupancy recalculated",
      time: now(),
    },
    {
      id: "LOG-1003",
      type: "exit",
      vehicleNumber: "KA 05 MN 7741",
      location: "Koramangala Tech Park Lot",
      message: "Exit verified, slot released",
      time: now(),
    },
  ],
  evSlots: seedEvSlots(),
  evReservations: [],
});

const normalizeDatabase = (database: Partial<SimulatedDatabase>): SimulatedDatabase => ({
  lots: database.lots ?? seedDatabase().lots,
  bookings: database.bookings ?? [],
  logs: database.logs ?? [],
  evSlots: database.evSlots ?? seedEvSlots(),
  evReservations: database.evReservations ?? [],
});

const readDatabase = (): SimulatedDatabase => {
  if (typeof window === "undefined") {
    return seedDatabase();
  }

  const stored = window.localStorage.getItem(STORE_KEY);
  if (!stored) {
    const seeded = seedDatabase();
    window.localStorage.setItem(STORE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const database = normalizeDatabase(JSON.parse(stored) as Partial<SimulatedDatabase>);
    window.localStorage.setItem(STORE_KEY, JSON.stringify(database));
    return database;
  } catch {
    const seeded = seedDatabase();
    window.localStorage.setItem(STORE_KEY, JSON.stringify(seeded));
    return seeded;
  }
};

const writeDatabase = (database: SimulatedDatabase) => {
  window.localStorage.setItem(STORE_KEY, JSON.stringify(database));
  window.dispatchEvent(new Event("smart-parking-db-updated"));
};

const bookingId = () => `BK-${Math.floor(10000 + Math.random() * 89999)}`;
const evReservationId = () => `EV-${Math.floor(10000 + Math.random() * 89999)}`;
const logId = () => `LOG-${Math.floor(1000 + Math.random() * 8999)}`;

export const simulatedBackend = {
  getLots: () => readDatabase().lots,

  searchLots: (area?: string) => {
    const lots = readDatabase().lots;
    if (!area) return lots;
    const normalizedArea = area.toLowerCase();
    const exactMatches = lots.filter((lot) => lot.area.toLowerCase() === normalizedArea);
    return exactMatches.length > 0 ? exactMatches : lots.slice(0, 3);
  },

  getBookings: () => readDatabase().bookings,

  getLogs: () => readDatabase().logs,

  getEvSlots: () => readDatabase().evSlots,

  getEvReservations: () => readDatabase().evReservations,

  createBooking: (lotId: string, vehicleNumber: string, driverName = "Demo Driver", hours = 2) => {
    const database = readDatabase();
    const lot = database.lots.find((item) => item.id === lotId);

    if (!lot || lot.availableSpots < 1) {
      throw new Error("No parking spots are available at this location.");
    }

    lot.availableSpots -= 1;
    lot.lastScan = now();

    const booking: Booking = {
      id: bookingId(),
      lotId: lot.id,
      lotName: lot.name,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      driverName,
      hours,
      amount: lot.pricePerHour * hours,
      status: "confirmed",
      createdAt: now(),
    };

    const log: ActivityLog = {
      id: logId(),
      type: "booking",
      vehicleNumber: booking.vehicleNumber,
      location: lot.name,
      message: `Reservation confirmed for ${hours} hour${hours > 1 ? "s" : ""}`,
      time: now(),
    };

    database.bookings = [booking, ...database.bookings].slice(0, 20);
    database.logs = [log, ...database.logs].slice(0, 20);
    writeDatabase(database);

    return booking;
  },

  createEvReservation: (slotId: number, vehicleNumber: string, estimatedKwh = 18) => {
    const database = readDatabase();
    const slot = database.evSlots.find((item) => item.id === slotId);

    if (!slot || slot.status !== "available") {
      throw new Error("This charging slot is not available.");
    }

    const reservation: EVReservation = {
      id: evReservationId(),
      slotId,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      chargerType: slot.type,
      location: slot.location,
      estimatedKwh,
      amount: slot.price * estimatedKwh,
      status: "reserved",
      createdAt: now(),
    };

    slot.status = "reserved";
    slot.reservedBy = reservation.vehicleNumber;
    slot.reservationId = reservation.id;

    const log: ActivityLog = {
      id: logId(),
      type: "ev",
      vehicleNumber: reservation.vehicleNumber,
      location: slot.location,
      message: `${slot.type} reserved for estimated ${estimatedKwh} kWh charge`,
      time: now(),
    };

    database.evReservations = [reservation, ...database.evReservations].slice(0, 20);
    database.logs = [log, ...database.logs].slice(0, 20);
    writeDatabase(database);

    return reservation;
  },

  cancelEvReservation: (reservationId: string) => {
    const database = readDatabase();
    const reservation = database.evReservations.find((item) => item.id === reservationId);

    if (!reservation || reservation.status === "cancelled") {
      throw new Error("Reservation is not active.");
    }

    reservation.status = "cancelled";
    const slot = database.evSlots.find((item) => item.id === reservation.slotId);
    if (slot) {
      slot.status = "available";
      delete slot.reservedBy;
      delete slot.reservationId;
    }

    database.logs = [
      {
        id: logId(),
        type: "ev",
        vehicleNumber: reservation.vehicleNumber,
        location: reservation.location,
        message: `${reservation.id} cancelled and charger released`,
        time: now(),
      },
      ...database.logs,
    ].slice(0, 20);
    writeDatabase(database);

    return reservation;
  },

  addOwnerLot: (input: {
    ownerName: string;
    lotName: string;
    area: string;
    totalSpots: number;
    cameras: number;
    pricePerHour: number;
  }) => {
    const database = readDatabase();
    const lot: ParkingLot = {
      id: `lot-${Date.now()}`,
      ownerName: input.ownerName || "New Parking Owner",
      name: input.lotName || "New Camera Connected Lot",
      area: input.area || "Demo Area",
      address: `${input.area || "Demo Area"} camera connected parking`,
      totalSpots: input.totalSpots,
      availableSpots: Math.max(1, Math.floor(input.totalSpots * 0.72)),
      pricePerHour: input.pricePerHour,
      cameras: input.cameras,
      cameraStatus: "syncing",
      confidence: 93,
      lastScan: now(),
    };

    const log: ActivityLog = {
      id: logId(),
      type: "camera",
      vehicleNumber: "SYSTEM",
      location: lot.name,
      message: `${lot.cameras} existing cameras connected for occupancy detection`,
      time: now(),
    };

    database.lots = [lot, ...database.lots];
    database.logs = [log, ...database.logs].slice(0, 20);
    writeDatabase(database);

    return lot;
  },

  getDashboardStats: () => {
    const database = readDatabase();
    const totalSpots = database.lots.reduce((sum, lot) => sum + lot.totalSpots, 0);
    const availableSpots = database.lots.reduce((sum, lot) => sum + lot.availableSpots, 0);
    const bookedSpots = totalSpots - availableSpots;
    const bookingRevenue = database.bookings.reduce((sum, booking) => sum + booking.amount, 0);
    const evRevenue = database.evReservations
      .filter((reservation) => reservation.status === "reserved")
      .reduce((sum, reservation) => sum + reservation.amount, 0);
    const revenue = bookingRevenue + evRevenue + 87330;
    const activeCameras = database.lots.reduce((sum, lot) => sum + (lot.cameraStatus !== "offline" ? lot.cameras : 0), 0);

    return {
      totalVehiclesToday: bookedSpots + 1187,
      revenueToday: revenue,
      occupancyRate: Math.round((bookedSpots / totalSpots) * 100),
      availableSpots,
      connectedLots: database.lots.length,
      activeCameras,
      ownerPayout: Math.round(revenue * 0.82),
      platformCommission: Math.round(revenue * 0.18),
      evReservations: database.evReservations.filter((reservation) => reservation.status === "reserved").length,
    };
  },

  reset: () => {
    const seeded = seedDatabase();
    writeDatabase(seeded);
    return seeded;
  },
};
