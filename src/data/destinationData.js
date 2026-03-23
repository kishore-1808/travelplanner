// Destination data with categories, budget ranges (INR per person), and metadata
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
  { name: 'Goa', category: 'beach', state: 'Goa', budgetRange: { min: 5000, max: 25000 }, bestSeason: 'Oct - Mar', description: 'India\'s party capital with stunning beaches, nightlife, and Portuguese heritage.' },
  { name: 'Pondicherry', category: 'beach', state: 'Tamil Nadu', budgetRange: { min: 4000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'French colonial charm with serene beaches and Auroville.' },
  { name: 'Andaman Islands', category: 'beach', state: 'Andaman & Nicobar', budgetRange: { min: 15000, max: 45000 }, bestSeason: 'Nov - May', description: 'Crystal-clear waters, coral reefs, and pristine white-sand beaches.' },
  { name: 'Kovalam', category: 'beach', state: 'Kerala', budgetRange: { min: 4000, max: 15000 }, bestSeason: 'Sep - Mar', description: 'Crescent-shaped beaches with lighthouse views and Ayurvedic retreats.' },
  { name: 'Varkala', category: 'beach', state: 'Kerala', budgetRange: { min: 3500, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Dramatic cliffs overlooking the Arabian Sea with natural springs.' },
  { name: 'Gokarna', category: 'beach', state: 'Karnataka', budgetRange: { min: 3000, max: 10000 }, bestSeason: 'Oct - Mar', description: 'Peaceful alternative to Goa with hidden beaches and temple town vibes.' },
  { name: 'Lakshadweep', category: 'beach', state: 'Lakshadweep', budgetRange: { min: 20000, max: 60000 }, bestSeason: 'Oct - May', description: 'Exotic coral islands with turquoise lagoons and water sports.' },
  { name: 'Tarkarli', category: 'beach', state: 'Maharashtra', budgetRange: { min: 3000, max: 10000 }, bestSeason: 'Oct - May', description: 'Pristine beaches with scuba diving and Sindhudurg Fort nearby.' },
  { name: 'Alibaug', category: 'beach', state: 'Maharashtra', budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Weekend getaway near Mumbai with historic forts and clean beaches.' },

  // ===== HILL STATION =====
  { name: 'Munnar', category: 'hill_station', state: 'Kerala', budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Sep - Mar', description: 'Rolling tea plantations, misty hills, and Eravikulam National Park.' },
  { name: 'Ooty', category: 'hill_station', state: 'Tamil Nadu', budgetRange: { min: 4000, max: 15000 }, bestSeason: 'Oct - Jun', description: 'Queen of Hill Stations with botanical gardens and toy train rides.' },
  { name: 'Shimla', category: 'hill_station', state: 'Himachal Pradesh', budgetRange: { min: 5000, max: 20000 }, bestSeason: 'Mar - Jun', description: 'Colonial charm on the Mall Road with panoramic Himalayan views.' },
  { name: 'Manali', category: 'hill_station', state: 'Himachal Pradesh', budgetRange: { min: 5000, max: 22000 }, bestSeason: 'Oct - Jun', description: 'Adventure hub with snow-capped peaks, Rohtang Pass, and river rafting.' },
  { name: 'Darjeeling', category: 'hill_station', state: 'West Bengal', budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Mar - May', description: 'Famous for tea gardens, Tiger Hill sunrise, and Kanchenjunga views.' },
  { name: 'Kodaikanal', category: 'hill_station', state: 'Tamil Nadu', budgetRange: { min: 4000, max: 14000 }, bestSeason: 'Oct - Jun', description: 'Princess of Hill Stations with star-shaped lake and pine forests.' },
  { name: 'Mussoorie', category: 'hill_station', state: 'Uttarakhand', budgetRange: { min: 4000, max: 16000 }, bestSeason: 'Mar - Jun', description: 'Queen of the Hills with Kempty Falls and Gun Hill views.' },
  { name: 'Nainital', category: 'hill_station', state: 'Uttarakhand', budgetRange: { min: 4000, max: 15000 }, bestSeason: 'Mar - Jun', description: 'Lake city nestled in the Kumaon hills with boating and trekking.' },
  { name: 'Coorg', category: 'hill_station', state: 'Karnataka', budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'Scotland of India with coffee plantations and Abbey Falls.' },

  // ===== CITY =====
  { name: 'Delhi', category: 'city', state: 'Delhi', budgetRange: { min: 5000, max: 25000 }, bestSeason: 'Oct - Mar', description: 'Capital city blending Mughal heritage, street food, and modern attractions.' },
  { name: 'Mumbai', category: 'city', state: 'Maharashtra', budgetRange: { min: 6000, max: 30000 }, bestSeason: 'Nov - Feb', description: 'City of dreams with Bollywood, Gateway of India, and vibrant nightlife.' },
  { name: 'Bangalore', category: 'city', state: 'Karnataka', budgetRange: { min: 5000, max: 22000 }, bestSeason: 'Oct - Feb', description: 'Silicon Valley of India with gardens, pubs, and pleasant weather.' },
  { name: 'Jaipur', category: 'city', state: 'Rajasthan', budgetRange: { min: 4000, max: 20000 }, bestSeason: 'Oct - Mar', description: 'Pink City with majestic forts, palaces, and colorful bazaars.' },
  { name: 'Hyderabad', category: 'city', state: 'Telangana', budgetRange: { min: 4000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'City of Nizams with Charminar, biryani, and Ramoji Film City.' },
  { name: 'Kolkata', category: 'city', state: 'West Bengal', budgetRange: { min: 4000, max: 16000 }, bestSeason: 'Oct - Mar', description: 'City of Joy with Victoria Memorial, Howrah Bridge, and cultural heritage.' },
  { name: 'Udaipur', category: 'city', state: 'Rajasthan', budgetRange: { min: 5000, max: 20000 }, bestSeason: 'Oct - Mar', description: 'City of Lakes with romantic palaces and Aravalli hills backdrop.' },
  { name: 'Mysore', category: 'city', state: 'Karnataka', budgetRange: { min: 3500, max: 14000 }, bestSeason: 'Oct - Feb', description: 'Royal city with illuminated palace, Chamundi Hills, and silk sarees.' },

  // ===== DESERT =====
  { name: 'Jaisalmer', category: 'desert', state: 'Rajasthan', budgetRange: { min: 5000, max: 20000 }, bestSeason: 'Oct - Mar', description: 'Golden City with sand dunes, camel safaris, and Jaisalmer Fort.' },
  { name: 'Jodhpur', category: 'desert', state: 'Rajasthan', budgetRange: { min: 4000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'Blue City with Mehrangarh Fort and bustling old city markets.' },
  { name: 'Bikaner', category: 'desert', state: 'Rajasthan', budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Camel country with Junagarh Fort and famous Bikaneri snacks.' },
  { name: 'Rann of Kutch', category: 'desert', state: 'Gujarat', budgetRange: { min: 6000, max: 22000 }, bestSeason: 'Nov - Feb', description: 'Vast white salt desert that transforms under full moonlight.' },
  { name: 'Pushkar', category: 'desert', state: 'Rajasthan', budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Holy lake town famous for Brahma Temple and annual camel fair.' },

  // ===== WILDLIFE & NATURE =====
  { name: 'Jim Corbett', category: 'wildlife', state: 'Uttarakhand', budgetRange: { min: 6000, max: 25000 }, bestSeason: 'Nov - Jun', description: 'India\'s oldest national park, famous for Bengal tiger sightings.' },
  { name: 'Ranthambore', category: 'wildlife', state: 'Rajasthan', budgetRange: { min: 7000, max: 28000 }, bestSeason: 'Oct - Jun', description: 'World-famous tiger reserve with ancient fort ruins inside the park.' },
  { name: 'Kaziranga', category: 'wildlife', state: 'Assam', budgetRange: { min: 6000, max: 22000 }, bestSeason: 'Nov - Apr', description: 'UNESCO site home to two-thirds of the world\'s one-horned rhinos.' },
  { name: 'Wayanad', category: 'wildlife', state: 'Kerala', budgetRange: { min: 4000, max: 15000 }, bestSeason: 'Oct - May', description: 'Misty hills with ancient caves, waterfalls, and wildlife sanctuary.' },
  { name: 'Periyar', category: 'wildlife', state: 'Kerala', budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Sep - May', description: 'Tiger reserve with lake boat safaris and bamboo rafting.' },
  { name: 'Sundarbans', category: 'wildlife', state: 'West Bengal', budgetRange: { min: 5000, max: 18000 }, bestSeason: 'Oct - Mar', description: 'World\'s largest mangrove forest, home to the Royal Bengal Tiger.' },
  { name: 'Bandipur', category: 'wildlife', state: 'Karnataka', budgetRange: { min: 4000, max: 16000 }, bestSeason: 'Oct - May', description: 'Part of the Nilgiri Biosphere with elephants, tigers, and deer.' },

  // ===== HERITAGE & TEMPLE =====
  { name: 'Varanasi', category: 'heritage', state: 'Uttar Pradesh', budgetRange: { min: 3000, max: 14000 }, bestSeason: 'Oct - Mar', description: 'World\'s oldest living city with sacred ghats and Ganga Aarti.' },
  { name: 'Hampi', category: 'heritage', state: 'Karnataka', budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Feb', description: 'UNESCO ruins of Vijayanagara Empire with boulder-strewn landscape.' },
  { name: 'Khajuraho', category: 'heritage', state: 'Madhya Pradesh', budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'UNESCO temples with exquisite medieval sculptures and architecture.' },
  { name: 'Madurai', category: 'heritage', state: 'Tamil Nadu', budgetRange: { min: 3000, max: 10000 }, bestSeason: 'Oct - Mar', description: 'Temple city with the magnificent Meenakshi Amman Temple.' },
  { name: 'Puri', category: 'heritage', state: 'Odisha', budgetRange: { min: 3000, max: 12000 }, bestSeason: 'Oct - Mar', description: 'Sacred Jagannath Temple and famous Rath Yatra festival.' },
  { name: 'Amritsar', category: 'heritage', state: 'Punjab', budgetRange: { min: 3000, max: 14000 }, bestSeason: 'Oct - Mar', description: 'Golden Temple, Wagah Border ceremony, and legendary Punjabi cuisine.' },
  { name: 'Mahabalipuram', category: 'heritage', state: 'Tamil Nadu', budgetRange: { min: 3000, max: 10000 }, bestSeason: 'Nov - Feb', description: 'UNESCO shore temples and ancient rock-cut monuments by the sea.' },
  { name: 'Ajanta & Ellora', category: 'heritage', state: 'Maharashtra', budgetRange: { min: 3500, max: 14000 }, bestSeason: 'Oct - Mar', description: 'UNESCO rock-cut caves with stunning Buddhist, Hindu, and Jain art.' },

  // ===== ADVENTURE =====
  { name: 'Ladakh', category: 'adventure', state: 'Jammu & Kashmir', budgetRange: { min: 15000, max: 50000 }, bestSeason: 'Jun - Sep', description: 'Land of high passes with Pangong Lake, monasteries, and road trips.' },
  { name: 'Rishikesh', category: 'adventure', state: 'Uttarakhand', budgetRange: { min: 4000, max: 16000 }, bestSeason: 'Sep - May', description: 'Adventure capital with river rafting, bungee jumping, and yoga.' },
  { name: 'Spiti Valley', category: 'adventure', state: 'Himachal Pradesh', budgetRange: { min: 12000, max: 35000 }, bestSeason: 'Jun - Sep', description: 'Cold desert with ancient monasteries, Key Monastery, and Chandratal Lake.' },
  { name: 'Auli', category: 'adventure', state: 'Uttarakhand', budgetRange: { min: 6000, max: 20000 }, bestSeason: 'Nov - Mar', description: 'Skiing destination with panoramic views of Nanda Devi peak.' },
  { name: 'Meghalaya', category: 'adventure', state: 'Meghalaya', budgetRange: { min: 8000, max: 25000 }, bestSeason: 'Oct - May', description: 'Living root bridges, caves, crystal-clear rivers, and lush green hills.' },
  { name: 'Zanskar Valley', category: 'adventure', state: 'Jammu & Kashmir', budgetRange: { min: 15000, max: 45000 }, bestSeason: 'Jun - Sep', description: 'Remote valley with frozen river treks and dramatic mountain scenery.' },
  { name: 'Tirthan Valley', category: 'adventure', state: 'Himachal Pradesh', budgetRange: { min: 5000, max: 15000 }, bestSeason: 'Mar - Jun', description: 'Offbeat Himalayan gem with trout fishing, trekking, and Great Himalayan National Park.' },
];

export { DESTINATION_CATEGORIES, DESTINATIONS };
