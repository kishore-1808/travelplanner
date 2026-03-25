// Destination data with categories, budget ranges (INR per person), coordinates, and metadata
// Budget ranges are approximate estimates for a 3-5 day trip per person

const DESTINATION_CATEGORIES = [
  { id: 'beach', label: '🏖️ Beach', color: '#0EA5E9' },
  { id: 'hill_station', label: '🏔️ Hill Station', color: '#22C55E' },
  { id: 'city', label: '🏙️ City', color: '#8B5CF6' },
  { id: 'desert', label: '🏜️ Desert', color: '#F97316' },
  { id: 'wildlife', label: '🌿 Wildlife & Nature', color: '#14B8A6' },
  { id: 'heritage', label: '🛕 Heritage & Temple', color: '#EAB308' },
  { id: 'adventure', label: '🏔️ Adventure', color: '#EF4444' },
];

const DESTINATIONS = [
  // ===== BEACH =====
  { name: 'Goa', category: 'beach', state: 'Goa', coordinates: { lat: 15.2993, lng: 74.124 }, budgetRange: { min: 5000, max: 25000 }, bestSeason: 'Oct - Mar', description: 'India\'s party capital with stunning beaches, nightlife, and Portuguese heritage.' },
  { name: 'Pondicherry', category: 'beach', state: 'Tamil Nadu', coordinates: { lat: 11.9416, lng: 79.8083 }, budgetRange: { min: 4000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'French colonial charm with serene beaches and Auroville.' },
  { name: 'Andaman Islands', category: 'beach', state: 'Andaman & Nicobar', coordinates: { lat: 11.7401, lng: 92.6586 }, budgetRange: { min: 15000, max: 45000 }, bestSeason: 'Nov - May', description: 'Crystal-clear waters, coral reefs, and pristine white-sand beaches.' },
  { name: 'Kovalam', category: 'beach', state: 'Kerala', coordinates: { lat: 8.4004, lng: 76.9787 }, budgetRange: { min: 4000, max: 15000 }, bestSeason: 'Sep - Mar', description: 'Crescent-shaped beaches with lighthouse views and Ayurvedic retreats.' },
  { name: 'Varkala', category: 'beach', state: 'Kerala', coordinates: { lat: 8.7379, lng: 76.7163 }, budgetRange: { min: 3500, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Dramatic cliffs overlooking the Arabian Sea with natural springs.' },
  { name: 'Gokarna', category: 'beach', state: 'Karnataka', coordinates: { lat: 14.5479, lng: 74.3188 }, budgetRange: { min: 3000, max: 10000 }, bestSeason: 'Oct - Mar', description: 'Peaceful alternative to Goa with hidden beaches and temple town vibes.' },
  { name: 'Lakshadweep', category: 'beach', state: 'Lakshadweep', coordinates: { lat: 10.5667, lng: 72.6417 }, budgetRange: { min: 20000, max: 60000 }, bestSeason: 'Oct - May', description: 'Exotic coral islands with turquoise lagoons and water sports.' },
  { name: 'Tarkarli', category: 'beach', state: 'Maharashtra', coordinates: { lat: 16.0167, lng: 73.4667 }, budgetRange: { min: 3000, max: 10000 }, bestSeason: 'Oct - May', description: 'Pristine beaches with scuba diving and Sindhudurg Fort nearby.' },
  { name: 'Alibaug', category: 'beach', state: 'Maharashtra', coordinates: { lat: 18.6414, lng: 72.8722 }, budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Weekend getaway near Mumbai with historic forts and clean beaches.' },

  // ===== HILL STATION =====
  { name: 'Munnar', category: 'hill_station', state: 'Kerala', coordinates: { lat: 10.0889, lng: 77.0595 }, budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Sep - Mar', description: 'Rolling tea plantations, misty hills, and Eravikulam National Park.' },
  { name: 'Ooty', category: 'hill_station', state: 'Tamil Nadu', coordinates: { lat: 11.4102, lng: 76.6950 }, budgetRange: { min: 4000, max: 15000 }, bestSeason: 'Oct - Jun', description: 'Queen of Hill Stations with botanical gardens and toy train rides.' },
  { name: 'Shimla', category: 'hill_station', state: 'Himachal Pradesh', coordinates: { lat: 31.1048, lng: 77.1734 }, budgetRange: { min: 5000, max: 20000 }, bestSeason: 'Mar - Jun', description: 'Colonial charm on the Mall Road with panoramic Himalayan views.' },
  { name: 'Manali', category: 'hill_station', state: 'Himachal Pradesh', coordinates: { lat: 32.2396, lng: 77.1887 }, budgetRange: { min: 5000, max: 22000 }, bestSeason: 'Oct - Jun', description: 'Adventure hub with snow-capped peaks, Rohtang Pass, and river rafting.' },
  { name: 'Darjeeling', category: 'hill_station', state: 'West Bengal', coordinates: { lat: 27.0410, lng: 88.2663 }, budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Mar - May', description: 'Famous for tea gardens, Tiger Hill sunrise, and Kanchenjunga views.' },
  { name: 'Kodaikanal', category: 'hill_station', state: 'Tamil Nadu', coordinates: { lat: 10.2381, lng: 77.4892 }, budgetRange: { min: 4000, max: 14000 }, bestSeason: 'Oct - Jun', description: 'Princess of Hill Stations with star-shaped lake and pine forests.' },
  { name: 'Mussoorie', category: 'hill_station', state: 'Uttarakhand', coordinates: { lat: 30.4598, lng: 78.0644 }, budgetRange: { min: 4000, max: 16000 }, bestSeason: 'Mar - Jun', description: 'Queen of the Hills with Kempty Falls and Gun Hill views.' },
  { name: 'Nainital', category: 'hill_station', state: 'Uttarakhand', coordinates: { lat: 29.3803, lng: 79.4636 }, budgetRange: { min: 4000, max: 15000 }, bestSeason: 'Mar - Jun', description: 'Lake city nestled in the Kumaon hills with boating and trekking.' },
  { name: 'Coorg', category: 'hill_station', state: 'Karnataka', coordinates: { lat: 12.3375, lng: 75.8069 }, budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'Scotland of India with coffee plantations and Abbey Falls.' },

  // ===== CITY =====
  { name: 'Delhi', category: 'city', state: 'Delhi', coordinates: { lat: 28.6139, lng: 77.2090 }, budgetRange: { min: 5000, max: 25000 }, bestSeason: 'Oct - Mar', description: 'Capital city blending Mughal heritage, street food, and modern attractions.' },
  { name: 'Mumbai', category: 'city', state: 'Maharashtra', coordinates: { lat: 19.0760, lng: 72.8777 }, budgetRange: { min: 6000, max: 30000 }, bestSeason: 'Nov - Feb', description: 'City of dreams with Bollywood, Gateway of India, and vibrant nightlife.' },
  { name: 'Bangalore', category: 'city', state: 'Karnataka', coordinates: { lat: 12.9716, lng: 77.5946 }, budgetRange: { min: 5000, max: 22000 }, bestSeason: 'Oct - Feb', description: 'Silicon Valley of India with gardens, pubs, and pleasant weather.' },
  { name: 'Jaipur', category: 'city', state: 'Rajasthan', coordinates: { lat: 26.9124, lng: 75.7873 }, budgetRange: { min: 4000, max: 20000 }, bestSeason: 'Oct - Mar', description: 'Pink City with majestic forts, palaces, and colorful bazaars.' },
  { name: 'Hyderabad', category: 'city', state: 'Telangana', coordinates: { lat: 17.3850, lng: 78.4867 }, budgetRange: { min: 4000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'City of Nizams with Charminar, biryani, and Ramoji Film City.' },
  { name: 'Kolkata', category: 'city', state: 'West Bengal', coordinates: { lat: 22.5726, lng: 88.3639 }, budgetRange: { min: 4000, max: 16000 }, bestSeason: 'Oct - Mar', description: 'City of Joy with Victoria Memorial, Howrah Bridge, and cultural heritage.' },
  { name: 'Udaipur', category: 'city', state: 'Rajasthan', coordinates: { lat: 24.5854, lng: 73.7125 }, budgetRange: { min: 5000, max: 20000 }, bestSeason: 'Oct - Mar', description: 'City of Lakes with romantic palaces and Aravalli hills backdrop.' },
  { name: 'Mysore', category: 'city', state: 'Karnataka', coordinates: { lat: 12.2958, lng: 76.6394 }, budgetRange: { min: 3500, max: 14000 }, bestSeason: 'Oct - Feb', description: 'Royal city with illuminated palace, Chamundi Hills, and silk sarees.' },

  // ===== DESERT =====
  { name: 'Jaisalmer', category: 'desert', state: 'Rajasthan', coordinates: { lat: 26.9157, lng: 70.9083 }, budgetRange: { min: 5000, max: 20000 }, bestSeason: 'Oct - Mar', description: 'Golden City with sand dunes, camel safaris, and Jaisalmer Fort.' },
  { name: 'Jodhpur', category: 'desert', state: 'Rajasthan', coordinates: { lat: 26.2389, lng: 73.0243 }, budgetRange: { min: 4000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'Blue City with Mehrangarh Fort and bustling old city markets.' },
  { name: 'Bikaner', category: 'desert', state: 'Rajasthan', coordinates: { lat: 28.0229, lng: 73.3119 }, budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Camel country with Junagarh Fort and famous Bikaneri snacks.' },
  { name: 'Rann of Kutch', category: 'desert', state: 'Gujarat', coordinates: { lat: 23.7337, lng: 69.8597 }, budgetRange: { min: 6000, max: 22000 }, bestSeason: 'Nov - Feb', description: 'Vast white salt desert that transforms under full moonlight.' },
  { name: 'Pushkar', category: 'desert', state: 'Rajasthan', coordinates: { lat: 26.4900, lng: 74.5513 }, budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Holy lake town famous for Brahma Temple and annual camel fair.' },

  // ===== WILDLIFE & NATURE =====
  { name: 'Jim Corbett', category: 'wildlife', state: 'Uttarakhand', coordinates: { lat: 29.5300, lng: 78.7747 }, budgetRange: { min: 6000, max: 25000 }, bestSeason: 'Nov - Jun', description: 'India\'s oldest national park, famous for Bengal tiger sightings.' },
  { name: 'Ranthambore', category: 'wildlife', state: 'Rajasthan', coordinates: { lat: 26.0173, lng: 76.5026 }, budgetRange: { min: 7000, max: 28000 }, bestSeason: 'Oct - Jun', description: 'World-famous tiger reserve with ancient fort ruins inside the park.' },
  { name: 'Kaziranga', category: 'wildlife', state: 'Assam', coordinates: { lat: 26.5775, lng: 93.1711 }, budgetRange: { min: 6000, max: 22000 }, bestSeason: 'Nov - Apr', description: 'UNESCO site home to two-thirds of the world\'s one-horned rhinos.' },
  { name: 'Wayanad', category: 'wildlife', state: 'Kerala', coordinates: { lat: 11.6854, lng: 76.1320 }, budgetRange: { min: 4000, max: 15000 }, bestSeason: 'Oct - May', description: 'Misty hills with ancient caves, waterfalls, and wildlife sanctuary.' },
  { name: 'Periyar', category: 'wildlife', state: 'Kerala', coordinates: { lat: 9.4681, lng: 77.2410 }, budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Sep - May', description: 'Tiger reserve with lake boat safaris and bamboo rafting.' },
  { name: 'Sundarbans', category: 'wildlife', state: 'West Bengal', coordinates: { lat: 21.9497, lng: 89.1833 }, budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'World\'s largest mangrove forest, home to the Royal Bengal Tiger.' },
  { name: 'Bandipur', category: 'wildlife', state: 'Karnataka', coordinates: { lat: 11.6689, lng: 76.6337 }, budgetRange: { min: 4000, max: 16000 }, bestSeason: 'Oct - May', description: 'Part of the Nilgiri Biosphere with elephants, tigers, and deer.' },

  // ===== HERITAGE & TEMPLE =====
  { name: 'Varanasi', category: 'heritage', state: 'Uttar Pradesh', coordinates: { lat: 25.3176, lng: 83.0064 }, budgetRange: { min: 3000, max: 14000 }, bestSeason: 'Oct - Mar', description: 'World\'s oldest living city with sacred ghats and Ganga Aarti.' },
  { name: 'Hampi', category: 'heritage', state: 'Karnataka', coordinates: { lat: 15.3350, lng: 76.4600 }, budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Feb', description: 'UNESCO ruins of Vijayanagara Empire with boulder-strewn landscape.' },
  { name: 'Khajuraho', category: 'heritage', state: 'Madhya Pradesh', coordinates: { lat: 24.8318, lng: 79.9199 }, budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'UNESCO temples with exquisite medieval sculptures and architecture.' },
  { name: 'Madurai', category: 'heritage', state: 'Tamil Nadu', coordinates: { lat: 9.9252, lng: 78.1198 }, budgetRange: { min: 3000, max: 10000 }, bestSeason: 'Oct - Mar', description: 'Temple city with the magnificent Meenakshi Amman Temple.' },
  { name: 'Puri', category: 'heritage', state: 'Odisha', coordinates: { lat: 19.8135, lng: 85.8312 }, budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Sacred Jagannath Temple and famous Rath Yatra festival.' },
  { name: 'Amritsar', category: 'heritage', state: 'Punjab', coordinates: { lat: 31.6340, lng: 74.8723 }, budgetRange: { min: 3000, max: 14000 }, bestSeason: 'Oct - Mar', description: 'Golden Temple, Wagah Border ceremony, and legendary Punjabi cuisine.' },
  { name: 'Mahabalipuram', category: 'heritage', state: 'Tamil Nadu', coordinates: { lat: 12.6172, lng: 80.1927 }, budgetRange: { min: 3000, max: 10000 }, bestSeason: 'Nov - Feb', description: 'UNESCO shore temples and ancient rock-cut monuments by the sea.' },
  { name: 'Ajanta & Ellora', category: 'heritage', state: 'Maharashtra', coordinates: { lat: 20.5519, lng: 75.7033 }, budgetRange: { min: 3500, max: 14000 }, bestSeason: 'Oct - Mar', description: 'UNESCO rock-cut caves with stunning Buddhist, Hindu, and Jain art.' },

  // ===== ADVENTURE =====
  { name: 'Ladakh', category: 'adventure', state: 'Jammu & Kashmir', coordinates: { lat: 34.1526, lng: 77.5771 }, budgetRange: { min: 15000, max: 50000 }, bestSeason: 'Jun - Sep', description: 'Land of high passes with Pangong Lake, monasteries, and road trips.' },
  { name: 'Rishikesh', category: 'adventure', state: 'Uttarakhand', coordinates: { lat: 30.0869, lng: 78.2676 }, budgetRange: { min: 4000, max: 16000 }, bestSeason: 'Sep - May', description: 'Adventure capital with river rafting, bungee jumping, and yoga.' },
  { name: 'Spiti Valley', category: 'adventure', state: 'Himachal Pradesh', coordinates: { lat: 32.2464, lng: 78.0349 }, budgetRange: { min: 12000, max: 35000 }, bestSeason: 'Jun - Sep', description: 'Cold desert with ancient monasteries, Key Monastery, and Chandratal Lake.' },
  { name: 'Auli', category: 'adventure', state: 'Uttarakhand', coordinates: { lat: 30.5281, lng: 79.5672 }, budgetRange: { min: 6000, max: 20000 }, bestSeason: 'Nov - Mar', description: 'Skiing destination with panoramic views of Nanda Devi peak.' },
  { name: 'Meghalaya', category: 'adventure', state: 'Meghalaya', coordinates: { lat: 25.4670, lng: 91.3662 }, budgetRange: { min: 8000, max: 25000 }, bestSeason: 'Oct - May', description: 'Living root bridges, caves, crystal-clear rivers, and lush green hills.' },
  { name: 'Zanskar Valley', category: 'adventure', state: 'Jammu & Kashmir', coordinates: { lat: 33.5000, lng: 77.0000 }, budgetRange: { min: 15000, max: 45000 }, bestSeason: 'Jun - Sep', description: 'Remote valley with frozen river treks and dramatic mountain scenery.' },
  { name: 'Tirthan Valley', category: 'adventure', state: 'Himachal Pradesh', coordinates: { lat: 31.6380, lng: 77.4470 }, budgetRange: { min: 5000, max: 15000 }, bestSeason: 'Mar - Jun', description: 'Offbeat Himalayan gem with trout fishing, trekking, and Great Himalayan National Park.' },
];

export { DESTINATION_CATEGORIES, DESTINATIONS };
