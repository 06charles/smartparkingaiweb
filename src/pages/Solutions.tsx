import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, DollarSign, Navigation, Send, Zap, Battery, IndianRupee, Leaf } from "lucide-react";
import { toast } from "sonner";

const Solutions = () => {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [parkingResults, setParkingResults] = useState<Array<any>>([]);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    { role: "bot", text: "Hello! I'm your Smart Parking Assistant. How can I help you today?" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [selectedChargingSlot, setSelectedChargingSlot] = useState<number | null>(null);

  const chargingSlots = [
    { id: 1, status: "available", power: "50 kW", type: "Fast Charger", location: "Zone A-12", price: 12 },
    { id: 2, status: "charging", power: "22 kW", type: "Standard", location: "Zone A-14", price: 8, progress: 65, timeLeft: "45 min" },
    { id: 3, status: "available", power: "150 kW", type: "Super Charger", location: "Zone B-05", price: 18 },
    { id: 4, status: "charging", power: "50 kW", type: "Fast Charger", location: "Zone B-08", price: 12, progress: 30, timeLeft: "1.5 hrs" },
    { id: 5, status: "available", power: "22 kW", type: "Standard", location: "Zone C-21", price: 8 },
    { id: 6, status: "occupied", power: "50 kW", type: "Fast Charger", location: "Zone C-23", price: 12 },
  ];

  const countries = ["India"];
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
  ];
  const districts: Record<string, string[]> = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat", "Ziro"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Rajnandgaon"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Haryana": ["Gurugram", "Faridabad", "Panchkula", "Ambala", "Karnal"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    "Karnataka": ["Bengaluru Urban", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Thane", "Nashik", "Nagpur"],
    "Manipur": ["Imphal West", "Imphal East", "Thoubal", "Bishnupur"],
    "Meghalaya": ["East Khasi Hills", "West Garo Hills", "Ri Bhoi"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Puri"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    "Sikkim": ["East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
    "Tripura": ["West Tripura", "South Tripura", "North Tripura", "Dhalai"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
    "Delhi": ["Central Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi"],
  };
  const areas: Record<string, Record<string, string[]>> = {
    "Andhra Pradesh": {
      "Visakhapatnam": ["MVP Colony", "Dwaraka Nagar", "Madhurawada", "Rushikonda"],
      "Vijayawada": ["MG Road", "Benz Circle", "Governorpet", "Patamata"],
      "Guntur": ["Brodipet", "Kothapet", "Arundelpet", "Lakshmipuram"],
      "Nellore": ["Pogathota", "Dargamitta", "Vedayapalem", "Magunta Layout"],
      "Tirupati": ["Renigunta Road", "AIR Bypass", "Tilak Road", "Kapila Theertham Road"],
    },
    "Arunachal Pradesh": {
      "Itanagar": ["Naharlagun", "Bank Tinali", "Ganga Market", "Chandernagar"],
      "Tawang": ["Old Market", "Monastery Road", "PTSO Market", "Nehru Market"],
      "Pasighat": ["Central Market", "Siang Complex", "Mebo Road", "Lower Market"],
      "Ziro": ["Hapoli", "Old Ziro", "Hong Village", "Hari Village"],
    },
    "Assam": {
      "Guwahati": ["Fancy Bazar", "Pan Bazar", "Paltan Bazar", "Ganeshguri", "Six Mile"],
      "Dibrugarh": ["Chowkidingee", "Graham Bazar", "Thana Charali", "HS Road"],
      "Silchar": ["Central Road", "Nazirpatty", "Premtala", "Link Road"],
      "Jorhat": ["AT Road", "Gar Ali", "Khalihamari", "Tarajan"],
      "Tezpur": ["Bihaguri", "Mahabhairab", "Mission Chariali", "Dekargaon"],
    },
    "Bihar": {
      "Patna": ["Boring Road", "Fraser Road", "Kankarbagh", "Raja Bazar", "Patliputra"],
      "Gaya": ["Ramshila Road", "Station Road", "Collectorate Road", "Swarajpuri"],
      "Bhagalpur": ["Adam's Tower", "Nathnagar", "Tatarpur", "Bhikhanpur Dighi"],
      "Muzaffarpur": ["Motijheel", "Station Road", "Juran Chapra", "Saraiyaganj"],
      "Darbhanga": ["Laheriasarai", "Station Road", "Donar", "Mirjapur"],
    },
    "Chhattisgarh": {
      "Raipur": ["Civil Lines", "Pandri", "Shankar Nagar", "Telibandha"],
      "Bilaspur": ["Link Road", "Vyapar Vihar", "Rajkishore Nagar", "Nehru Nagar"],
      "Durg": ["Bhilai Steel Plant", "Nehru Nagar", "Civic Center", "Supela"],
      "Korba": ["Power House", "City Center", "Transport Nagar", "Balco Nagar"],
      "Rajnandgaon": ["Station Road", "Civil Lines", "Mill Area", "District Hospital Area"],
    },
    "Goa": {
      "North Goa": ["Panaji", "Mapusa", "Calangute", "Baga", "Candolim"],
      "South Goa": ["Margao", "Colva", "Palolem", "Vasco", "Benaulim"],
    },
    "Gujarat": {
      "Ahmedabad": ["CG Road", "Satellite", "Navrangpura", "SG Highway", "Vastrapur"],
      "Surat": ["Adajan", "Vesu", "Athwa", "Pal", "Piplod"],
      "Vadodara": ["Alkapuri", "Manjalpur", "Sayajigunj", "Akota", "Gotri"],
      "Rajkot": ["Kalawad Road", "University Road", "Raiya Road", "150 Feet Ring Road"],
      "Bhavnagar": ["Waghawadi Road", "Kumbharwada", "Nilambagh", "Takhteshwar"],
    },
    "Haryana": {
      "Gurugram": ["Cyber City", "Golf Course Road", "Sohna Road", "MG Road", "DLF Phase 1"],
      "Faridabad": ["Sector 15", "Sector 16", "NIT", "Old Faridabad", "Railway Road"],
      "Panchkula": ["Sector 5", "Sector 8", "Sector 20", "MDC Sector 5"],
      "Ambala": ["Ambala Cantt", "Ambala City", "Sadar Bazar", "Nicholson Road"],
      "Karnal": ["Sector 13", "Old City", "GT Road", "Kunjpura Road"],
    },
    "Himachal Pradesh": {
      "Shimla": ["Mall Road", "Lakkar Bazar", "Lower Bazar", "Sanjauli"],
      "Dharamshala": ["McLeod Ganj", "Kotwali Bazar", "Lower Dharamshala", "Dharamkot"],
      "Solan": ["Mall Road", "Rajgarh Road", "Chambaghat", "Barog"],
      "Mandi": ["Indira Market", "Seri Bazar", "Jail Road", "BhuttoNath Market"],
      "Kullu": ["Akhara Bazar", "Sultanpur", "Raison", "Bhuntar"],
    },
    "Jharkhand": {
      "Ranchi": ["Main Road", "Lalpur", "Hinoo", "Kanke Road", "Harmu"],
      "Jamshedpur": ["Bistupur", "Sakchi", "Kadma", "Sonari", "Mango"],
      "Dhanbad": ["Bank More", "Saraidhela", "Hirapur", "Bartand"],
      "Bokaro": ["Sector 4", "City Center", "Chas", "Sector 1"],
      "Hazaribagh": ["Canary Hill", "Main Road", "Gandhi Maidan", "Chouparan"],
    },
    "Karnataka": {
      "Bengaluru Urban": ["MG Road", "Koramangala", "Whitefield", "Indiranagar", "Electronic City"],
      "Mysuru": ["Saraswathipuram", "Vijayanagar", "Kuvempunagar", "Jayalakshmipuram"],
      "Mangaluru": ["Hampankatta", "Balmatta", "Kadri", "Bejai"],
      "Hubballi": ["Vidyanagar", "Gokul Road", "Unkal", "Keshwapur"],
      "Belagavi": ["Tilakwadi", "Khanapur Road", "Club Road", "Angol"],
    },
    "Kerala": {
      "Thiruvananthapuram": ["MG Road", "Statue", "Vellayambalam", "Kowdiar"],
      "Kochi": ["Marine Drive", "MG Road", "Broadway", "Kakkanad", "Edappally"],
      "Kozhikode": ["SM Street", "Mavoor Road", "Beach Road", "Kannur Road"],
      "Thrissur": ["Round", "Swaraj Round", "Palace Road", "East Fort"],
      "Kollam": ["Chinnakada", "KSRTC Stand", "Thangassery", "Asramam"],
    },
    "Madhya Pradesh": {
      "Indore": ["Vijay Nagar", "MG Road", "Palasia", "Rajwada", "Sarafa Bazar"],
      "Bhopal": ["MP Nagar", "New Market", "Arera Colony", "Bittan Market"],
      "Jabalpur": ["Napier Town", "Russell Chowk", "Ganj Bazar", "Civil Lines"],
      "Gwalior": ["Jayendraganj", "Lashkar", "Thatipur", "City Center"],
      "Ujjain": ["Freeganj", "Mahakal Road", "Dussehra Maidan", "Station Road"],
    },
    "Maharashtra": {
      "Mumbai": ["Andheri", "Bandra", "Churchgate", "Borivali", "Dadar"],
      "Pune": ["Koregaon Park", "Hinjewadi", "Kothrud", "Viman Nagar", "FC Road"],
      "Thane": ["Ghodbunder Road", "Majiwada", "Kolshet Road", "Pokhran Road"],
      "Nashik": ["College Road", "Gangapur Road", "Panchavati", "Satpur"],
      "Nagpur": ["Sitabuldi", "Dharampeth", "Sadar", "Civil Lines"],
    },
    "Manipur": {
      "Imphal West": ["Paona Bazar", "Thangal Bazar", "Lamphelpat", "Keishampat"],
      "Imphal East": ["Singjamei", "Porompat", "Khurai", "Heingang"],
      "Thoubal": ["Thoubal Bazar", "Lilong", "Wangjing", "Yairipok"],
      "Bishnupur": ["Bishnupur Town", "Moirang", "Nambol", "Thanga"],
    },
    "Meghalaya": {
      "East Khasi Hills": ["Police Bazar", "Laitumkhrah", "Bara Bazar", "Jaiaw"],
      "West Garo Hills": ["Tura", "Dakopgre", "Hawakhana", "Ringrey"],
      "Ri Bhoi": ["Nongpoh", "Byrnihat", "Umling", "Umsning"],
    },
    "Mizoram": {
      "Aizawl": ["Bara Bazar", "Zarkawt", "Chanmari", "Kulikawn"],
      "Lunglei": ["Bazar Veng", "Serkawn", "Chanmari West", "Venglai"],
      "Champhai": ["Zotlang", "Vengthar", "Vengthlang", "Electric Veng"],
      "Serchhip": ["Chhiahtlang", "IT Park Area", "Chaltlang", "Kanan"],
    },
    "Nagaland": {
      "Kohima": ["High School Junction", "PR Hill", "Razhü Point", "New Minister Hill"],
      "Dimapur": ["Duncan Bosti", "Circular Road", "Burma Camp", "Bank Colony"],
      "Mokokchung": ["Town Centre", "Alichen", "Kumlong", "Sangtemla"],
      "Tuensang": ["Town Centre", "Old NST Road", "Longkhim", "Longsachung"],
    },
    "Odisha": {
      "Bhubaneswar": ["Bapuji Nagar", "Kharavel Nagar", "Saheed Nagar", "Rasulgarh"],
      "Cuttack": ["Badambadi", "Buxi Bazar", "Ranihat", "Link Road"],
      "Rourkela": ["Civil Township", "Panposh Road", "Udit Nagar", "Sector 19"],
      "Berhampur": ["Gandhi Nagar", "Bada Bazar", "Ankuli", "Kamapalli"],
      "Puri": ["Grand Road", "Sea Beach", "Station Road", "Swargadwar"],
    },
    "Punjab": {
      "Ludhiana": ["Ferozepur Road", "Civil Lines", "Model Town", "Pakhowal Road"],
      "Amritsar": ["Lawrence Road", "Hall Bazar", "Ranjit Avenue", "Majitha Road"],
      "Jalandhar": ["Model Town", "Civil Lines", "Urban Estate", "Nakodar Road"],
      "Patiala": ["Mall Road", "Leela Bhawan", "Baradari Garden", "Tripuri"],
      "Bathinda": ["Mall Road", "Railway Station Road", "Dhobi Bazar", "Civil Lines"],
    },
    "Rajasthan": {
      "Jaipur": ["MI Road", "C-Scheme", "Mansarovar", "Vaishali Nagar", "Malviya Nagar"],
      "Jodhpur": ["Sardarpura", "Shastri Nagar", "Ratanada", "Paota"],
      "Udaipur": ["City Palace Area", "Fateh Sagar", "Hiran Magri", "Sukhadia Circle"],
      "Kota": ["Dadabari", "Kota Junction", "Gumanpura", "Aerodrome Circle"],
      "Ajmer": ["Vaishali Nagar", "Jaipur Road", "Pushkar Road", "Nasirabad Road"],
    },
    "Sikkim": {
      "East Sikkim": ["MG Marg", "Lal Bazar", "Deorali", "Tadong"],
      "West Sikkim": ["Geyzing", "Pelling", "Jorethang", "Nayabazar"],
      "North Sikkim": ["Mangan", "Chungthang", "Lachen", "Lachung"],
      "South Sikkim": ["Namchi", "Ravangla", "Damthang", "Jorethang"],
    },
    "Tamil Nadu": {
      "Chennai": ["T Nagar", "Anna Nagar", "Velachery", "Adyar", "Mylapore"],
      "Coimbatore": ["RS Puram", "Gandhipuram", "Peelamedu", "Saibaba Colony"],
      "Madurai": ["Anna Nagar", "K Pudur", "Goripalayam", "Thirunagar"],
      "Tiruchirappalli": ["Thillai Nagar", "Srirangam", "Cantonment", "K K Nagar"],
      "Salem": ["Cherry Road", "Fairlands", "Ammapet", "Five Roads"],
    },
    "Telangana": {
      "Hyderabad": ["Banjara Hills", "Jubilee Hills", "Hitech City", "Madhapur", "Kukatpally"],
      "Warangal": ["Hanamkonda", "Kazipet", "Station Road", "Balasamudram"],
      "Nizamabad": ["Clock Tower", "CBS Road", "Armoor Road", "MG Road"],
      "Khammam": ["Wyra Road", "NTR Chowk", "Ravindra Nagar", "Balaji Nagar"],
      "Karimnagar": ["Bhagathnagar", "Mankammathota", "Station Road", "Rajeev Chowk"],
    },
    "Tripura": {
      "West Tripura": ["Agartala", "Khumulwng", "Teliamura", "Jirania"],
      "South Tripura": ["Udaipur", "Belonia", "Sabroom", "Rajnagar"],
      "North Tripura": ["Dharmanagar", "Kailashahar", "Panisagar", "Pecharthal"],
      "Dhalai": ["Ambassa", "Kamalpur", "Chawmanu", "Manu"],
    },
    "Uttar Pradesh": {
      "Lucknow": ["Hazratganj", "Gomti Nagar", "Alambagh", "Chowk", "Aashiana"],
      "Kanpur": ["Mall Road", "Civil Lines", "Kidwai Nagar", "Swaroop Nagar"],
      "Ghaziabad": ["Vaishali", "Indirapuram", "Vasundhara", "Raj Nagar"],
      "Agra": ["Taj Ganj", "Sadar Bazar", "Sikandra", "Dayalbagh"],
      "Varanasi": ["Godowlia", "Cantonment", "Lanka", "Sigra", "Bhelupur"],
    },
    "Uttarakhand": {
      "Dehradun": ["Rajpur Road", "Paltan Bazar", "Saharanpur Road", "Clock Tower"],
      "Haridwar": ["Har ki Pauri", "Jwalapur", "BHEL Ranipur", "Kankhal"],
      "Roorkee": ["Civil Lines", "Malviya Chowk", "Ganesh Market", "Solani Road"],
      "Haldwani": ["Banbhoolpura", "Nainital Road", "Bareilly Road", "Rampur Road"],
      "Rishikesh": ["Laxman Jhula", "Ram Jhula", "Tapovan", "Muni Ki Reti"],
    },
    "West Bengal": {
      "Kolkata": ["Park Street", "Salt Lake", "Ballygunge", "New Town", "Gariahat"],
      "Howrah": ["Howrah Station Area", "Shibpur", "Santragachi", "Liluah"],
      "Durgapur": ["City Center", "Steel Township", "Bidhan Nagar", "Benachity"],
      "Siliguri": ["Hill Cart Road", "Matigara", "Pradhan Nagar", "Sevoke Road"],
      "Asansol": ["Sen Raleigh Road", "Burnpur", "Raniganj", "Kulti"],
    },
    "Delhi": {
      "Central Delhi": ["Connaught Place", "Karol Bagh", "Paharganj", "Chandni Chowk"],
      "North Delhi": ["Civil Lines", "Model Town", "Rohini", "Pitampura"],
      "South Delhi": ["Saket", "Hauz Khas", "Greater Kailash", "Lajpat Nagar"],
      "West Delhi": ["Dwarka", "Janakpuri", "Rajouri Garden", "Tilak Nagar"],
      "East Delhi": ["Preet Vihar", "Laxmi Nagar", "Mayur Vihar", "Karkardooma"],
    },
  };

  type ParkingSpot = { name: string; distance: string; available: number; price: string };
  const parkingData: Record<string, Record<string, Record<string, Array<ParkingSpot>>>> = {
    "Maharashtra": {
      "Mumbai": {
        "Andheri": [
          { name: "Andheri Metro Parking", distance: "0.2 km", available: 38, price: "₹60/hr" },
          { name: "SEEPZ Complex Lot", distance: "0.8 km", available: 92, price: "₹50/hr" },
          { name: "DN Nagar Street Parking", distance: "1.2 km", available: 15, price: "₹40/hr" },
        ],
        "Bandra": [
          { name: "Bandra Fort Parking", distance: "0.3 km", available: 28, price: "₹80/hr" },
          { name: "Linking Road Mall Parking", distance: "0.5 km", available: 45, price: "₹70/hr" },
          { name: "Bandra Station Parking", distance: "1.0 km", available: 67, price: "₹50/hr" },
        ],
        "Churchgate": [
          { name: "Marine Drive Parking", distance: "0.3 km", available: 52, price: "₹90/hr" },
          { name: "Nariman Point Plaza", distance: "0.6 km", available: 78, price: "₹100/hr" },
          { name: "Churchgate Station", distance: "0.2 km", available: 34, price: "₹85/hr" },
        ],
        "Borivali": [
          { name: "Borivali Station Parking", distance: "0.4 km", available: 95, price: "₹35/hr" },
          { name: "Growel's Mall Parking", distance: "0.7 km", available: 120, price: "₹40/hr" },
          { name: "IC Colony Street Lot", distance: "1.1 km", available: 68, price: "₹30/hr" },
        ],
      },
      "Pune": {
        "Koregaon Park": [
          { name: "Osho Garden Parking", distance: "0.5 km", available: 45, price: "₹50/hr" },
          { name: "North Main Road Lot", distance: "0.8 km", available: 62, price: "₹45/hr" },
          { name: "Lane 6 Parking Plaza", distance: "1.2 km", available: 38, price: "₹40/hr" },
        ],
        "Hinjewadi": [
          { name: "Rajiv Gandhi Infotech Park", distance: "0.3 km", available: 155, price: "₹30/hr" },
          { name: "Phase 1 IT Park Lot", distance: "0.9 km", available: 98, price: "₹25/hr" },
          { name: "Hinjewadi Main Road", distance: "1.3 km", available: 112, price: "₹35/hr" },
        ],
        "Kothrud": [
          { name: "Karve Road Parking", distance: "0.4 km", available: 58, price: "₹40/hr" },
          { name: "Kothrud Depot Lot", distance: "0.7 km", available: 72, price: "₹35/hr" },
          { name: "DP Road Plaza", distance: "1.0 km", available: 48, price: "₹45/hr" },
        ],
        "Viman Nagar": [
          { name: "Phoenix Market City Parking", distance: "0.5 km", available: 145, price: "₹50/hr" },
          { name: "Viman Nagar IT Hub", distance: "0.9 km", available: 88, price: "₹40/hr" },
          { name: "Lohegaon Road Lot", distance: "1.4 km", available: 95, price: "₹35/hr" },
        ],
      },
      "Thane": {
        "Ghodbunder Road": [
          { name: "Thane Station Parking", distance: "0.3 km", available: 72, price: "₹30/hr" },
          { name: "Viviana Mall Parking", distance: "1.5 km", available: 120, price: "₹40/hr" },
          { name: "Ghodbunder Road Lot", distance: "2.0 km", available: 95, price: "₹25/hr" },
        ],
        "Majiwada": [
          { name: "Majiwada Junction Parking", distance: "0.4 km", available: 64, price: "₹35/hr" },
          { name: "Eastern Express Highway Lot", distance: "0.8 km", available: 82, price: "₹30/hr" },
          { name: "Manpada Circle Plaza", distance: "1.2 km", available: 55, price: "₹40/hr" },
        ],
        "Kolshet Road": [
          { name: "Kolshet Metro Parking", distance: "0.5 km", available: 78, price: "₹35/hr" },
          { name: "Kapurbawdi Junction", distance: "0.9 km", available: 92, price: "₹30/hr" },
          { name: "Anand Nagar Lot", distance: "1.3 km", available: 68, price: "₹25/hr" },
        ],
        "Pokhran Road": [
          { name: "Pokhran Road No 2", distance: "0.6 km", available: 86, price: "₹30/hr" },
          { name: "Vartak Nagar Plaza", distance: "1.0 km", available: 72, price: "₹35/hr" },
          { name: "Thane West Lot", distance: "1.5 km", available: 94, price: "₹28/hr" },
        ],
      },
      "Nashik": {
        "College Road": [
          { name: "College Road Central", distance: "0.3 km", available: 45, price: "₹25/hr" },
          { name: "Sharanpur Road Junction", distance: "0.7 km", available: 58, price: "₹20/hr" },
          { name: "MG Road Parking", distance: "1.1 km", available: 62, price: "₹30/hr" },
        ],
        "Gangapur Road": [
          { name: "Gangapur Road Plaza", distance: "0.5 km", available: 75, price: "₹25/hr" },
          { name: "Pathardi Phata Lot", distance: "0.9 km", available: 82, price: "₹20/hr" },
          { name: "Cinemax Parking", distance: "1.3 km", available: 98, price: "₹30/hr" },
        ],
        "Panchavati": [
          { name: "Panchavati Karanja Parking", distance: "0.4 km", available: 52, price: "₹20/hr" },
          { name: "Ram Kund Street Lot", distance: "0.8 km", available: 38, price: "₹25/hr" },
          { name: "CBS Road Plaza", distance: "1.2 km", available: 68, price: "₹22/hr" },
        ],
        "Satpur": [
          { name: "Satpur MIDC Parking", distance: "0.6 km", available: 112, price: "₹18/hr" },
          { name: "Industrial Estate Lot", distance: "1.0 km", available: 145, price: "₹15/hr" },
          { name: "Ambad Link Road", distance: "1.5 km", available: 95, price: "₹20/hr" },
        ],
      },
    },
    "Karnataka": {
      "Bengaluru Urban": {
        "MG Road": [
          { name: "Brigade Road Parking", distance: "0.2 km", available: 32, price: "₹70/hr" },
          { name: "Trinity Metro Parking", distance: "0.5 km", available: 58, price: "₹60/hr" },
          { name: "Church Street Lot", distance: "0.7 km", available: 24, price: "₹80/hr" },
        ],
        "Koramangala": [
          { name: "Forum Mall Parking", distance: "0.4 km", available: 95, price: "₹50/hr" },
          { name: "Koramangala 5th Block", distance: "0.6 km", available: 47, price: "₹45/hr" },
          { name: "Sony World Junction", distance: "1.0 km", available: 68, price: "₹40/hr" },
        ],
        "Whitefield": [
          { name: "Phoenix Marketcity Parking", distance: "0.8 km", available: 145, price: "₹40/hr" },
          { name: "ITPL Main Gate Lot", distance: "1.2 km", available: 92, price: "₹30/hr" },
          { name: "Whitefield Station", distance: "1.5 km", available: 78, price: "₹35/hr" },
        ],
        "Indiranagar": [
          { name: "CMH Road Parking", distance: "0.3 km", available: 36, price: "₹60/hr" },
          { name: "100 Feet Road Lot", distance: "0.7 km", available: 52, price: "₹55/hr" },
          { name: "Double Road Plaza", distance: "0.9 km", available: 41, price: "₹50/hr" },
        ],
        "Electronic City": [
          { name: "Infosys Campus Parking", distance: "0.5 km", available: 125, price: "₹25/hr" },
          { name: "Electronic City Metro", distance: "0.8 km", available: 88, price: "₹30/hr" },
          { name: "Tech Park Lot B", distance: "1.3 km", available: 105, price: "₹20/hr" },
        ],
      },
      "Mysuru": {
        "Saraswathipuram": [
          { name: "Saraswathipuram Circle", distance: "0.4 km", available: 45, price: "₹30/hr" },
          { name: "Mysore Palace Parking", distance: "0.8 km", available: 88, price: "₹40/hr" },
          { name: "Chamaraja Circle Lot", distance: "1.2 km", available: 62, price: "₹25/hr" },
        ],
        "Vijayanagar": [
          { name: "Vijayanagar Bus Stand", distance: "0.3 km", available: 58, price: "₹25/hr" },
          { name: "Ring Road Parking", distance: "0.7 km", available: 72, price: "₹30/hr" },
          { name: "Hinkal Tirth Lot", distance: "1.1 km", available: 48, price: "₹20/hr" },
        ],
        "Kuvempunagar": [
          { name: "Kuvempunagar Circle", distance: "0.5 km", available: 52, price: "₹28/hr" },
          { name: "Bogadi Road Plaza", distance: "0.9 km", available: 68, price: "₹25/hr" },
          { name: "Ring Road Junction", distance: "1.3 km", available: 78, price: "₹22/hr" },
        ],
        "Jayalakshmipuram": [
          { name: "Jayalakshmipuram Market", distance: "0.4 km", available: 42, price: "₹25/hr" },
          { name: "JLB Road Parking", distance: "0.8 km", available: 55, price: "₹30/hr" },
          { name: "Bannimantap Lot", distance: "1.2 km", available: 64, price: "₹22/hr" },
        ],
      },
      "Mangaluru": {
        "Hampankatta": [
          { name: "Hampankatta Circle", distance: "0.2 km", available: 38, price: "₹35/hr" },
          { name: "City Center Mall", distance: "0.5 km", available: 72, price: "₹40/hr" },
          { name: "Lalbagh Road Lot", distance: "0.9 km", available: 52, price: "₹30/hr" },
        ],
        "Balmatta": [
          { name: "Balmatta Road Parking", distance: "0.3 km", available: 45, price: "₹30/hr" },
          { name: "Kankanady Junction", distance: "0.7 km", available: 58, price: "₹35/hr" },
          { name: "State Bank Plaza", distance: "1.0 km", available: 62, price: "₹28/hr" },
        ],
        "Kadri": [
          { name: "Kadri Temple Parking", distance: "0.4 km", available: 48, price: "₹25/hr" },
          { name: "Kadri Park Lot", distance: "0.8 km", available: 65, price: "₹30/hr" },
          { name: "Nanthoor Circle", distance: "1.2 km", available: 72, price: "₹22/hr" },
        ],
        "Bejai": [
          { name: "Bejai Museum Parking", distance: "0.5 km", available: 55, price: "₹28/hr" },
          { name: "KS Rao Road Lot", distance: "0.9 km", available: 68, price: "₹25/hr" },
          { name: "Pumpwell Circle", distance: "1.3 km", available: 82, price: "₹30/hr" },
        ],
      },
      "Hubballi": {
        "Vidyanagar": [
          { name: "BVB College Parking", distance: "0.3 km", available: 52, price: "₹20/hr" },
          { name: "Vidyanagar Circle", distance: "0.7 km", available: 68, price: "₹25/hr" },
          { name: "KLE Hospital Lot", distance: "1.0 km", available: 78, price: "₹22/hr" },
        ],
        "Gokul Road": [
          { name: "Gokul Road Market", distance: "0.4 km", available: 42, price: "₹25/hr" },
          { name: "Old Bus Stand Parking", distance: "0.8 km", available: 55, price: "₹20/hr" },
          { name: "Lamington Road Lot", distance: "1.2 km", available: 62, price: "₹18/hr" },
        ],
        "Unkal": [
          { name: "Unkal Lake Parking", distance: "0.5 km", available: 85, price: "₹15/hr" },
          { name: "Unkal Cross Plaza", distance: "0.9 km", available: 72, price: "₹20/hr" },
          { name: "KIMS Hospital Lot", distance: "1.3 km", available: 95, price: "₹18/hr" },
        ],
        "Keshwapur": [
          { name: "Keshwapur Circle", distance: "0.6 km", available: 58, price: "₹18/hr" },
          { name: "BRTS Station Parking", distance: "1.0 km", available: 75, price: "₹20/hr" },
          { name: "Toll Naka Lot", distance: "1.5 km", available: 92, price: "₹15/hr" },
        ],
      },
    },
    "Delhi": {
      "Central Delhi": {
        "Connaught Place": [
          { name: "Palika Bazaar Parking", distance: "0.2 km", available: 42, price: "₹90/hr" },
          { name: "Rajiv Chowk Metro", distance: "0.4 km", available: 68, price: "₹80/hr" },
          { name: "Inner Circle Lot", distance: "0.6 km", available: 33, price: "₹100/hr" },
        ],
        "Karol Bagh": [
          { name: "Karol Bagh Metro Parking", distance: "0.3 km", available: 55, price: "₹50/hr" },
          { name: "Ajmal Khan Road Lot", distance: "0.7 km", available: 38, price: "₹45/hr" },
          { name: "Pusa Road Parking", distance: "1.0 km", available: 72, price: "₹40/hr" },
        ],
        "Paharganj": [
          { name: "Main Bazaar Parking", distance: "0.2 km", available: 28, price: "₹60/hr" },
          { name: "Ram Nagar Plaza", distance: "0.6 km", available: 45, price: "₹55/hr" },
          { name: "New Delhi Station", distance: "0.9 km", available: 88, price: "₹50/hr" },
        ],
        "Chandni Chowk": [
          { name: "Chandni Chowk Metro", distance: "0.3 km", available: 35, price: "₹70/hr" },
          { name: "Red Fort Parking", distance: "0.7 km", available: 62, price: "₹80/hr" },
          { name: "Jama Masjid Lot", distance: "1.0 km", available: 48, price: "₹60/hr" },
        ],
      },
      "North Delhi": {
        "Civil Lines": [
          { name: "Civil Lines Circle", distance: "0.4 km", available: 52, price: "₹45/hr" },
          { name: "Mall Road Parking", distance: "0.8 km", available: 68, price: "₹50/hr" },
          { name: "GTB Nagar Metro", distance: "1.2 km", available: 82, price: "₹40/hr" },
        ],
        "Model Town": [
          { name: "Model Town Metro", distance: "0.3 km", available: 58, price: "₹40/hr" },
          { name: "Azadpur Plaza", distance: "0.7 km", available: 72, price: "₹35/hr" },
          { name: "GT Karnal Road Lot", distance: "1.1 km", available: 95, price: "₹30/hr" },
        ],
        "Rohini": [
          { name: "Rohini Sector 7 Parking", distance: "0.3 km", available: 64, price: "₹35/hr" },
          { name: "Unity One Mall", distance: "0.8 km", available: 102, price: "₹40/hr" },
          { name: "Rohini East Metro", distance: "1.4 km", available: 87, price: "₹30/hr" },
        ],
        "Pitampura": [
          { name: "Pitampura Metro", distance: "0.4 km", available: 75, price: "₹35/hr" },
          { name: "Netaji Subhash Place", distance: "0.8 km", available: 92, price: "₹40/hr" },
          { name: "Prashant Vihar Lot", distance: "1.2 km", available: 68, price: "₹30/hr" },
        ],
      },
      "South Delhi": {
        "Saket": [
          { name: "Select Citywalk Parking", distance: "0.4 km", available: 135, price: "₹60/hr" },
          { name: "Saket Metro Parking", distance: "0.6 km", available: 76, price: "₹50/hr" },
          { name: "DLF Avenue Lot", distance: "1.1 km", available: 94, price: "₹55/hr" },
        ],
        "Hauz Khas": [
          { name: "Hauz Khas Village", distance: "0.3 km", available: 42, price: "₹70/hr" },
          { name: "Hauz Khas Metro", distance: "0.6 km", available: 58, price: "₹60/hr" },
          { name: "Green Park Plaza", distance: "1.0 km", available: 72, price: "₹55/hr" },
        ],
        "Greater Kailash": [
          { name: "GK M Block Market", distance: "0.2 km", available: 35, price: "₹80/hr" },
          { name: "GK1 Main Market", distance: "0.5 km", available: 48, price: "₹75/hr" },
          { name: "Nehru Place Metro", distance: "0.9 km", available: 95, price: "₹50/hr" },
        ],
        "Lajpat Nagar": [
          { name: "Lajpat Nagar Metro", distance: "0.3 km", available: 62, price: "₹50/hr" },
          { name: "Central Market Parking", distance: "0.6 km", available: 45, price: "₹60/hr" },
          { name: "Ring Road Plaza", distance: "1.0 km", available: 78, price: "₹45/hr" },
        ],
      },
      "West Delhi": {
        "Dwarka": [
          { name: "Sector 21 Metro Parking", distance: "0.5 km", available: 98, price: "₹30/hr" },
          { name: "City Center Mall", distance: "0.9 km", available: 115, price: "₹35/hr" },
          { name: "Dwarka Sector 9", distance: "1.2 km", available: 82, price: "₹25/hr" },
        ],
        "Janakpuri": [
          { name: "Janakpuri West Metro", distance: "0.4 km", available: 72, price: "₹35/hr" },
          { name: "District Centre", distance: "0.8 km", available: 88, price: "₹40/hr" },
          { name: "Janakpuri East Lot", distance: "1.2 km", available: 95, price: "₹30/hr" },
        ],
        "Rajouri Garden": [
          { name: "Rajouri Garden Metro", distance: "0.3 km", available: 58, price: "₹45/hr" },
          { name: "TDI Mall Parking", distance: "0.7 km", available: 102, price: "₹50/hr" },
          { name: "Ramesh Nagar Plaza", distance: "1.1 km", available: 75, price: "₹40/hr" },
        ],
        "Tilak Nagar": [
          { name: "Tilak Nagar Metro", distance: "0.4 km", available: 68, price: "₹35/hr" },
          { name: "Subhash Nagar Plaza", distance: "0.8 km", available: 82, price: "₹40/hr" },
          { name: "West Patel Nagar Lot", distance: "1.3 km", available: 92, price: "₹30/hr" },
        ],
      },
    },
    "Tamil Nadu": {
      "Chennai": {
        "T Nagar": [
          { name: "Ranganathan Street Parking", distance: "0.2 km", available: 28, price: "₹60/hr" },
          { name: "Pondy Bazaar Lot", distance: "0.5 km", available: 35, price: "₹70/hr" },
          { name: "Panagal Park Parking", distance: "0.8 km", available: 52, price: "₹50/hr" },
        ],
        "Anna Nagar": [
          { name: "Anna Nagar Tower Parking", distance: "0.4 km", available: 48, price: "₹45/hr" },
          { name: "Shanthi Colony Lot", distance: "0.7 km", available: 62, price: "₹40/hr" },
          { name: "Round Tana Plaza", distance: "1.0 km", available: 75, price: "₹35/hr" },
        ],
        "Velachery": [
          { name: "Phoenix Marketcity Parking", distance: "0.6 km", available: 125, price: "₹40/hr" },
          { name: "Velachery Bus Stand", distance: "0.9 km", available: 58, price: "₹30/hr" },
          { name: "Vijaya Nagar Lot", distance: "1.2 km", available: 82, price: "₹35/hr" },
        ],
        "Adyar": [
          { name: "Adyar Depot Parking", distance: "0.3 km", available: 44, price: "₹50/hr" },
          { name: "Lattice Bridge Lot", distance: "0.6 km", available: 38, price: "₹55/hr" },
          { name: "Kotturpuram Parking", distance: "1.1 km", available: 66, price: "₹45/hr" },
        ],
        "Mylapore": [
          { name: "Kapaleeshwarar Temple Parking", distance: "0.2 km", available: 32, price: "₹40/hr" },
          { name: "Luz Corner Lot", distance: "0.5 km", available: 26, price: "₹50/hr" },
          { name: "Mylapore MRTS Parking", distance: "0.9 km", available: 54, price: "₹35/hr" },
        ],
      },
      "Coimbatore": {
        "RS Puram": [
          { name: "RS Puram Main Road", distance: "0.3 km", available: 42, price: "₹40/hr" },
          { name: "DB Road Parking", distance: "0.7 km", available: 55, price: "₹35/hr" },
          { name: "Puliakulam Junction", distance: "1.0 km", available: 68, price: "₹30/hr" },
        ],
        "Gandhipuram": [
          { name: "Gandhipuram Bus Stand", distance: "0.2 km", available: 88, price: "₹30/hr" },
          { name: "Brookefields Mall", distance: "0.6 km", available: 115, price: "₹40/hr" },
          { name: "Cross Cut Road Lot", distance: "0.9 km", available: 72, price: "₹25/hr" },
        ],
        "Peelamedu": [
          { name: "Avinashi Road Parking", distance: "0.4 km", available: 62, price: "₹30/hr" },
          { name: "Hopes College Junction", distance: "0.8 km", available: 78, price: "₹35/hr" },
          { name: "Peelamedu Plaza", distance: "1.2 km", available: 85, price: "₹28/hr" },
        ],
        "Saibaba Colony": [
          { name: "Saibaba Temple Parking", distance: "0.3 km", available: 48, price: "₹35/hr" },
          { name: "Trichy Road Junction", distance: "0.7 km", available: 65, price: "₹30/hr" },
          { name: "Lakshmi Mills Lot", distance: "1.1 km", available: 92, price: "₹25/hr" },
        ],
      },
      "Madurai": {
        "Anna Nagar": [
          { name: "Anna Nagar Circle", distance: "0.4 km", available: 52, price: "₹30/hr" },
          { name: "Bypass Road Parking", distance: "0.8 km", available: 68, price: "₹25/hr" },
          { name: "Theni Road Plaza", distance: "1.2 km", available: 75, price: "₹22/hr" },
        ],
        "K Pudur": [
          { name: "K Pudur Junction", distance: "0.3 km", available: 45, price: "₹28/hr" },
          { name: "Madurai Kamaraj University", distance: "0.7 km", available: 82, price: "₹20/hr" },
          { name: "Bypass Road Lot", distance: "1.0 km", available: 95, price: "₹25/hr" },
        ],
        "Goripalayam": [
          { name: "Goripalayam Market", distance: "0.2 km", available: 38, price: "₹25/hr" },
          { name: "Periyar Bus Stand", distance: "0.6 km", available: 72, price: "₹30/hr" },
          { name: "Railway Junction Parking", distance: "0.9 km", available: 58, price: "₹22/hr" },
        ],
        "Thirunagar": [
          { name: "Thirunagar 4th Stop", distance: "0.4 km", available: 55, price: "₹22/hr" },
          { name: "Palanganatham Road", distance: "0.8 km", available: 68, price: "₹25/hr" },
          { name: "Simmakkal Plaza", distance: "1.2 km", available: 78, price: "₹20/hr" },
        ],
      },
      "Tiruchirappalli": {
        "Thillai Nagar": [
          { name: "Thillai Nagar Main Road", distance: "0.3 km", available: 48, price: "₹28/hr" },
          { name: "BHEl Township Parking", distance: "0.7 km", available: 95, price: "₹20/hr" },
          { name: "Puthur Junction", distance: "1.0 km", available: 72, price: "₹25/hr" },
        ],
        "Srirangam": [
          { name: "Srirangam Temple Parking", distance: "0.2 km", available: 85, price: "₹20/hr" },
          { name: "Chathiram Bus Stand", distance: "0.6 km", available: 62, price: "₹25/hr" },
          { name: "Collector Office Lot", distance: "0.9 km", available: 52, price: "₹22/hr" },
        ],
        "Cantonment": [
          { name: "Cantonment Plaza", distance: "0.4 km", available: 58, price: "₹25/hr" },
          { name: "Junction Main Road", distance: "0.8 km", available: 75, price: "₹30/hr" },
          { name: "Central Bus Stand", distance: "1.2 km", available: 105, price: "₹22/hr" },
        ],
        "K K Nagar": [
          { name: "K K Nagar Bus Stop", distance: "0.3 km", available: 48, price: "₹20/hr" },
          { name: "E&F Block Market", distance: "0.7 km", available: 62, price: "₹25/hr" },
          { name: "Salai Road Parking", distance: "1.1 km", available: 78, price: "₹18/hr" },
        ],
      },
    },
    "Gujarat": {
      "Ahmedabad": {
        "CG Road": [
          { name: "CG Road Central Parking", distance: "0.3 km", available: 45, price: "₹50/hr" },
          { name: "Mithakhali Circle Lot", distance: "0.6 km", available: 58, price: "₹45/hr" },
          { name: "Navrangpura Junction", distance: "0.9 km", available: 72, price: "₹40/hr" },
        ],
        "Satellite": [
          { name: "Himalaya Mall Parking", distance: "0.5 km", available: 92, price: "₹35/hr" },
          { name: "Jodhpur Cross Roads", distance: "0.8 km", available: 66, price: "₹40/hr" },
          { name: "Satellite BRTS Parking", distance: "1.2 km", available: 78, price: "₹30/hr" },
        ],
        "Navrangpura": [
          { name: "Law Garden Parking", distance: "0.3 km", available: 52, price: "₹45/hr" },
          { name: "Gujarat University Gate", distance: "0.7 km", available: 88, price: "₹35/hr" },
          { name: "Sola Bridge Plaza", distance: "1.1 km", available: 95, price: "₹40/hr" },
        ],
        "SG Highway": [
          { name: "SG Highway Mall", distance: "0.6 km", available: 125, price: "₹40/hr" },
          { name: "Prahlad Nagar Junction", distance: "1.0 km", available: 102, price: "₹35/hr" },
          { name: "Science City Road", distance: "1.5 km", available: 115, price: "₹30/hr" },
        ],
        "Vastrapur": [
          { name: "Vastrapur Lake Parking", distance: "0.4 km", available: 68, price: "₹35/hr" },
          { name: "Iskon Circle Plaza", distance: "0.8 km", available: 82, price: "₹40/hr" },
          { name: "Drive In Road Lot", distance: "1.2 km", available: 95, price: "₹30/hr" },
        ],
      },
      "Surat": {
        "Adajan": [
          { name: "Adajan Patiya Circle", distance: "0.3 km", available: 58, price: "₹35/hr" },
          { name: "VR Mall Parking", distance: "0.7 km", available: 125, price: "₹40/hr" },
          { name: "Pal Road Junction", distance: "1.0 km", available: 78, price: "₹30/hr" },
        ],
        "Vesu": [
          { name: "Vesu Main Road", distance: "0.4 km", available: 72, price: "₹35/hr" },
          { name: "LP Savani Circle", distance: "0.8 km", available: 95, price: "₹40/hr" },
          { name: "Canal Road Plaza", distance: "1.2 km", available: 88, price: "₹30/hr" },
        ],
        "Athwa": [
          { name: "Athwa Gate Parking", distance: "0.3 km", available: 48, price: "₹30/hr" },
          { name: "Citylight Road Lot", distance: "0.7 km", available: 62, price: "₹35/hr" },
          { name: "Dumas Road Plaza", distance: "1.1 km", available: 85, price: "₹28/hr" },
        ],
        "Pal": [
          { name: "Pal GIDC Parking", distance: "0.5 km", available: 105, price: "₹25/hr" },
          { name: "Udhana Darwaja", distance: "0.9 km", available: 78, price: "₹30/hr" },
          { name: "Magdalla Road Lot", distance: "1.3 km", available: 92, price: "₹22/hr" },
        ],
      },
      "Vadodara": {
        "Alkapuri": [
          { name: "Alkapuri Main Road", distance: "0.3 km", available: 52, price: "₹40/hr" },
          { name: "Inorbit Mall Parking", distance: "0.7 km", available: 115, price: "₹45/hr" },
          { name: "RC Dutt Road Plaza", distance: "1.0 km", available: 68, price: "₹35/hr" },
        ],
        "Manjalpur": [
          { name: "Manjalpur Circle", distance: "0.4 km", available: 62, price: "₹30/hr" },
          { name: "Makarpura Road Lot", distance: "0.8 km", available: 85, price: "₹35/hr" },
          { name: "Gorwa Plaza", distance: "1.2 km", available: 95, price: "₹28/hr" },
        ],
        "Sayajigunj": [
          { name: "Sayajigunj Market", distance: "0.3 km", available: 45, price: "₹35/hr" },
          { name: "Raopura Junction", distance: "0.7 km", available: 58, price: "₹40/hr" },
          { name: "Mandvi Circle Lot", distance: "1.0 km", available: 72, price: "₹30/hr" },
        ],
        "Akota": [
          { name: "Akota Stadium Parking", distance: "0.5 km", available: 78, price: "₹30/hr" },
          { name: "VIP Road Plaza", distance: "0.9 km", available: 92, price: "₹35/hr" },
          { name: "Sama Road Lot", distance: "1.3 km", available: 105, price: "₹25/hr" },
        ],
      },
      "Rajkot": {
        "Kalawad Road": [
          { name: "Kalawad Road Junction", distance: "0.4 km", available: 68, price: "₹35/hr" },
          { name: "Crystal Mall Parking", distance: "0.8 km", available: 102, price: "₹40/hr" },
          { name: "Nana Mava Circle", distance: "1.2 km", available: 82, price: "₹30/hr" },
        ],
        "University Road": [
          { name: "Saurashtra University", distance: "0.3 km", available: 88, price: "₹25/hr" },
          { name: "Rajkumar College Road", distance: "0.7 km", available: 72, price: "₹30/hr" },
          { name: "Yagnik Road Plaza", distance: "1.0 km", available: 65, price: "₹35/hr" },
        ],
        "Raiya Road": [
          { name: "Raiya Road Circle", distance: "0.5 km", available: 75, price: "₹30/hr" },
          { name: "GIDC Estate Parking", distance: "0.9 km", available: 115, price: "₹25/hr" },
          { name: "Metoda Road Lot", distance: "1.3 km", available: 95, price: "₹22/hr" },
        ],
        "150 Feet Ring Road": [
          { name: "Ring Road Junction", distance: "0.6 km", available: 88, price: "₹35/hr" },
          { name: "Mavdi Circle Plaza", distance: "1.0 km", available: 102, price: "₹30/hr" },
          { name: "Aji Dam Road Lot", distance: "1.5 km", available: 125, price: "₹25/hr" },
        ],
      },
    },
    "Rajasthan": {
      "Jaipur": {
        "MI Road": [
          { name: "MI Road Central Parking", distance: "0.2 km", available: 42, price: "₹50/hr" },
          { name: "Panch Batti Circle", distance: "0.6 km", available: 58, price: "₹45/hr" },
          { name: "Ajmeri Gate Plaza", distance: "0.9 km", available: 72, price: "₹40/hr" },
        ],
        "C-Scheme": [
          { name: "C-Scheme Circle", distance: "0.3 km", available: 52, price: "₹45/hr" },
          { name: "Ashok Marg Parking", distance: "0.7 km", available: 68, price: "₹40/hr" },
          { name: "Jhalana Doongri Lot", distance: "1.0 km", available: 82, price: "₹35/hr" },
        ],
        "Mansarovar": [
          { name: "Mansarovar Metro", distance: "0.4 km", available: 95, price: "₹30/hr" },
          { name: "JLN Marg Plaza", distance: "0.8 km", available: 112, price: "₹35/hr" },
          { name: "Shipra Path Lot", distance: "1.2 km", available: 88, price: "₹28/hr" },
        ],
        "Vaishali Nagar": [
          { name: "Vaishali Circle", distance: "0.3 km", available: 72, price: "₹35/hr" },
          { name: "Ajmer Road Junction", distance: "0.7 km", available: 102, price: "₹30/hr" },
          { name: "Durgapura Plaza", distance: "1.1 km", available: 85, price: "₹32/hr" },
        ],
        "Malviya Nagar": [
          { name: "Malviya Nagar Central", distance: "0.2 km", available: 48, price: "₹30/hr" },
          { name: "JLN Marg Parking", distance: "0.7 km", available: 62, price: "₹35/hr" },
          { name: "Malviya Nagar Metro", distance: "1.0 km", available: 85, price: "₹25/hr" },
        ],
      },
      "Jodhpur": {
        "Sardarpura": [
          { name: "Sardarpura Circle", distance: "0.3 km", available: 52, price: "₹30/hr" },
          { name: "High Court Road", distance: "0.7 km", available: 68, price: "₹35/hr" },
          { name: "Residency Road Lot", distance: "1.0 km", available: 78, price: "₹28/hr" },
        ],
        "Shastri Nagar": [
          { name: "Shastri Circle", distance: "0.4 km", available: 62, price: "₹28/hr" },
          { name: "Ratanada Plaza", distance: "0.8 km", available: 85, price: "₹30/hr" },
          { name: "Airport Road Lot", distance: "1.2 km", available: 95, price: "₹25/hr" },
        ],
        "Ratanada": [
          { name: "Ratanada Main Road", distance: "0.3 km", available: 48, price: "₹30/hr" },
          { name: "Chopasni Road Junction", distance: "0.7 km", available: 72, price: "₹25/hr" },
          { name: "Station Road Parking", distance: "1.1 km", available: 88, price: "₹22/hr" },
        ],
        "Paota": [
          { name: "Paota Circle", distance: "0.5 km", available: 58, price: "₹25/hr" },
          { name: "Basni Road Plaza", distance: "0.9 km", available: 75, price: "₹28/hr" },
          { name: "Industrial Area Lot", distance: "1.3 km", available: 105, price: "₹20/hr" },
        ],
      },
      "Udaipur": {
        "City Palace Area": [
          { name: "City Palace Parking", distance: "0.2 km", available: 42, price: "₹60/hr" },
          { name: "Lake Pichola View", distance: "0.5 km", available: 58, price: "₹70/hr" },
          { name: "Jagdish Temple Lot", distance: "0.8 km", available: 35, price: "₹50/hr" },
        ],
        "Fateh Sagar": [
          { name: "Fateh Sagar Lake Parking", distance: "0.3 km", available: 75, price: "₹40/hr" },
          { name: "Moti Magri Plaza", distance: "0.7 km", available: 92, price: "₹35/hr" },
          { name: "Rani Road Lot", distance: "1.0 km", available: 68, price: "₹30/hr" },
        ],
        "Hiran Magri": [
          { name: "Hiran Magri Circle", distance: "0.4 km", available: 62, price: "₹30/hr" },
          { name: "Celebration Mall", distance: "0.8 km", available: 115, price: "₹40/hr" },
          { name: "Sector 4 Plaza", distance: "1.2 km", available: 88, price: "₹28/hr" },
        ],
        "Sukhadia Circle": [
          { name: "Sukhadia Circle Parking", distance: "0.2 km", available: 48, price: "₹45/hr" },
          { name: "Panchwati Circle", distance: "0.6 km", available: 72, price: "₹40/hr" },
          { name: "Durga Nursery Road", distance: "0.9 km", available: 85, price: "₹35/hr" },
        ],
      },
      "Kota": {
        "Dadabari": [
          { name: "Dadabari Circle", distance: "0.3 km", available: 52, price: "₹28/hr" },
          { name: "Talwandi Road", distance: "0.7 km", available: 68, price: "₹25/hr" },
          { name: "Industrial Area Lot", distance: "1.0 km", available: 95, price: "₹20/hr" },
        ],
        "Kota Junction": [
          { name: "Railway Station Parking", distance: "0.2 km", available: 88, price: "₹30/hr" },
          { name: "Nayapura Circle", distance: "0.6 km", available: 72, price: "₹28/hr" },
          { name: "Civil Lines Plaza", distance: "0.9 km", available: 62, price: "₹25/hr" },
        ],
        "Gumanpura": [
          { name: "Gumanpura Chouraha", distance: "0.4 km", available: 58, price: "₹25/hr" },
          { name: "Mahavir Nagar Lot", distance: "0.8 km", available: 78, price: "₹22/hr" },
          { name: "Rawatbhata Road", distance: "1.2 km", available: 102, price: "₹20/hr" },
        ],
        "Aerodrome Circle": [
          { name: "Aerodrome Plaza", distance: "0.5 km", available: 75, price: "₹28/hr" },
          { name: "Vigyan Nagar Junction", distance: "0.9 km", available: 92, price: "₹25/hr" },
          { name: "Kota Stone Road", distance: "1.3 km", available: 115, price: "₹22/hr" },
        ],
      },
    },
  };

  useEffect(() => {
    if (selectedState && selectedDistrict && selectedArea) {
      const results = parkingData[selectedState]?.[selectedDistrict]?.[selectedArea] || [];
      setParkingResults(results);
    } else {
      setParkingResults([]);
    }
  }, [selectedState, selectedDistrict, selectedArea]);

  const handleFindParking = () => {
    if (!selectedState || !selectedDistrict || !selectedArea) {
      toast.error("Please select state, district, and area");
      return;
    }
    toast.success(`Finding parking in ${selectedArea}, ${selectedDistrict}, ${selectedState}...`);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    setChatMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const msg = userMessage.toLowerCase();
      
      if (msg.includes("downtown") || msg.includes("near") || msg.includes("andheri") || msg.includes("bandra")) {
        response = "I found 3 available parking spots nearby. The closest is Andheri Metro Parking, 0.2 km away with 38 spots available at ₹60/hr. Would you like directions?";
      } else if (msg.includes("price") || msg.includes("cheap") || msg.includes("affordable")) {
        response = "The most affordable option is at ₹20/hr in Electronic City Tech Park, with 105 spots currently available. It's 1.3 km from your location.";
      } else if (msg.includes("available") || msg.includes("spot")) {
        response = "Yes! I'm showing 285 total available spots in your area. The largest availability is at Phoenix Marketcity with 145 open spaces.";
      } else {
        response = "I can help you find parking! Try asking me about parking near a specific location, available spots, or pricing information in Indian cities.";
      }

      setChatMessages((prev) => [...prev, { role: "bot", text: response }]);
    }, 1000);

    setUserMessage("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">Smart Parking Solutions</h1>
            <p className="text-xl md:text-2xl text-white/90">
              Experience the future of parking with AI-powered tools and intelligent assistants
            </p>
          </div>
        </div>
      </section>

      {/* Parking Finder */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="mb-4">AI Parking Finder</h2>
              <p className="text-lg text-muted-foreground">
                Find the perfect parking spot based on location, availability, and price
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Search Form */}
              <Card className="p-6 bg-gradient-card lg:col-span-1 h-fit">
                <h3 className="text-lg font-semibold mb-4">Search Criteria</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="country" className="text-muted-foreground">Country</Label>
                    <Select value={selectedCountry} disabled>
                      <SelectTrigger id="country" className="bg-muted text-muted-foreground cursor-not-allowed">
                        <SelectValue placeholder="Choose a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="state">Select State</Label>
                    <Select value={selectedState} onValueChange={(value) => {
                      setSelectedState(value);
                      setSelectedDistrict("");
                      setSelectedArea("");
                    }}>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Choose a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                     <Label htmlFor="district">Select District</Label>
                    <Select
                      value={selectedDistrict}
                      onValueChange={(value) => {
                        setSelectedDistrict(value);
                        setSelectedArea("");
                      }}
                      disabled={!selectedState}
                    >
                      <SelectTrigger id="district" className={!selectedState ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}>
                        <SelectValue placeholder="Choose a district" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedState &&
                          districts[selectedState]?.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                     <Label htmlFor="area">Select Area</Label>
                    <Select
                      value={selectedArea}
                      onValueChange={setSelectedArea}
                      disabled={!selectedDistrict}
                    >
                      <SelectTrigger id="area" className={!selectedDistrict ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}>
                        <SelectValue placeholder="Choose an area" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedState && selectedDistrict &&
                          areas[selectedState]?.[selectedDistrict]?.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleFindParking}
                    disabled={!selectedState || !selectedDistrict || !selectedArea}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Find Parking
                  </Button>
                </div>
              </Card>

              {/* Results */}
              <div className="lg:col-span-2 space-y-4">
                {parkingResults.length > 0 ? (
                  parkingResults.map((result, index) => (
                    <Card
                      key={index}
                      className="p-6 bg-gradient-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <h3 className="text-lg font-semibold">{result.name}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{result.distance}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-success" />
                              <span>{result.available} spots</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-warning" />
                              <span>{result.price}</span>
                            </div>
                          </div>
                        </div>
                        <Button>Get Directions</Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 bg-gradient-card text-center">
                    <h3 className="text-lg font-semibold mb-4">Real-time Parking Management</h3>
                    <p className="text-muted-foreground">
                      Select a state, district, and area to view available parking spots with live updates
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Pricing Demo */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="mb-4">Dynamic Pricing in Action</h2>
              <p className="text-lg text-muted-foreground">
                See how AI adjusts pricing based on real-time demand
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { time: "6:00 AM", demand: "Low", price: "₹20/hr", color: "success" },
                { time: "12:00 PM", demand: "Medium", price: "₹50/hr", color: "warning" },
                { time: "6:00 PM", demand: "High", price: "₹100/hr", color: "destructive" },
              ].map((slot, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Clock className={`h-12 w-12 mx-auto mb-4 text-${slot.color}`} />
                  <h3 className="text-2xl font-bold mb-2">{slot.time}</h3>
                  <div className="text-sm text-muted-foreground mb-2">Demand: {slot.demand}</div>
                  <div className={`text-3xl font-bold text-${slot.color}`}>{slot.price}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <section className="py-16 md:py-24 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="mb-4">Smart Parking Assistant</h2>
              <p className="text-lg text-muted-foreground">
                Ask questions and get instant AI-powered parking recommendations
              </p>
            </div>

            <Card className="p-6 bg-gradient-card">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-background/50 rounded-lg">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about parking availability, pricing, or locations..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Suggested Questions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["Where can I park near Andheri?", "What's the cheapest option?", "Show available spots"].map(
                  (suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUserMessage(suggestion);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                    >
                      {suggestion}
                    </Button>
                  )
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* EV Charging Integration */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4">
                <Zap className="h-8 w-8 text-primary" />
                <Badge className="bg-primary/10 text-primary border-primary/20">EV Charging</Badge>
              </div>
              <h2 className="mb-4">Smart EV Charging Network</h2>
              <p className="text-lg text-muted-foreground">
                Find and reserve EV charging slots with real-time monitoring
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {chargingSlots.map((slot) => (
                <Card
                  key={slot.id}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                    selectedChargingSlot === slot.id ? "ring-2 ring-primary shadow-glow" : ""
                  }`}
                  onClick={() => setSelectedChargingSlot(slot.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 ${
                      slot.status === "available" ? "bg-success" :
                      slot.status === "charging" ? "bg-primary" :
                      "bg-muted"
                    } rounded-lg flex items-center justify-center`}>
                      <Battery className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline">{slot.status === "available" ? "Available" : slot.status === "charging" ? "Charging" : "Occupied"}</Badge>
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

                  {slot.status === "charging" && slot.progress && (
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

            {/* Benefits */}
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

export default Solutions;
