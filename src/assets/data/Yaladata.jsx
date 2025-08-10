/**
 * Yala National Park Wildlife Data Configuration
 * 
 * This file contains all wildlife data, images, and content that can be
 * easily modified without touching the main component code.
 */

// Import local images
import leopardImg from '/src/assets/images/map/leopard.webp';
import leopardHeroImg from '/src/assets/images/map/leopard-hero.webp';
import elephantImg from '/src/assets/images/map/elephant.webp';
import elephantHeroImg from '/src/assets/images/map/elephant-hero.webp';
import slothBearImg from '/src/assets/images/map/sloth-bear.webp';
import slothBearHeroImg from '/src/assets/images/map/sloth-bear-hero.webp';
import peacockImg from '/src/assets/images/map/peacock.webp';
import peacockHeroImg from '/src/assets/images/map/peacock-hero.webp';
import spottedDeerImg from '/src/assets/images/map/spotted-deer.webp';
import spottedDeerHeroImg from '/src/assets/images/map/spotted-deer-hero.webp';
import paintedStorkImg from '/src/assets/images/map/painted-stork.png';
import paintedStorkHeroImg from '/src/assets/images/map/painted-stork-hero.webp';
import yalaMapImg from '/src/assets/images/map/yala-map.png';
import yalaMapFallbackImg from '/src/assets/images/map/yala-map-fallback.webp';

// Main safari camping content
export const safariCampingContent = {
 //title: "Mobile Safari Camping in Yala – Wild, Simple, Unforgettable",
  description: "Experience Yala like never before with mobile safari camping—where the wild meets comfort. Sleep in walk-in tents with cozy beds, surrounded by nature, not walls. Hear elephants pass by, watch leopards at dawn, and fall asleep to the sounds of the jungle.",
  extendedDescription: "Each night, your camp moves with you—set up fresh in a new scenic spot, complete with campfire meals, bucket showers, and ice-cold drinks at sunset. It's an authentic safari adventure, stripped down to what matters most: nature, simplicity, and the thrill of the wild.",
  features: [
    {
      icon: "tent",
      title: "Mobile Camping",
      description: "Camp moves to new scenic locations each night"
    },
    {
      icon: "bed",
      title: "Comfort in Wild",
      description: "Walk-in tents with cozy beds and proper amenities"
    },
    {
      icon: "campfire",
      title: "Authentic Experience",
      description: "Campfire meals, bucket showers, sunset drinks"
    }
  ]
};

// Wildlife data with all details
export const wildlifeData = [
  {
    id: 'leopard',
    name: 'Leopard',
    scientificName: 'Panthera pardus kotiya',
    type: 'Big Cat',
    rarity: 'Endemic',
    position: { x: 25, y: 35 },
    image: leopardImg,
    heroImage: leopardHeroImg,
    description: 'Yala National Park boasts the highest leopard density in the world, making it the premier destination for leopard photography and wildlife observation.',
    campingExperience: 'Wake up to leopard tracks around your tent and witness these magnificent cats during early morning game drives from your mobile camp.',
    detailedInfo: {
      population: '40-50',
      bestTime: 'Early morning (6:00-9:00 AM) and late afternoon (3:00-6:00 PM)',
      bestSeason: 'February to July (Dry Season)',
      behavior: 'Solitary, territorial, excellent climbers and swimmers',
      territory: 'Each leopard maintains 2-8 km² territory',
      diet: 'Spotted deer, wild boar, langur monkeys, peacocks',
      lifespan: '12-15 years in wild',
      conservation: 'Vulnerable - Protected under Sri Lankan law'
    },
    hotspots: [
      'Block 1 - Patanangala area',
      'Yala West (Ruhuna) - Main roads',
      'Sithulpawwa Rock Temple vicinity',
      'Buttawa area near lagoons'
    ],
    photographyTips: [
      'Use telephoto lens (400mm+) for safety',
      'Golden hour lighting provides best shots',
      'Focus on eyes for compelling portraits',
      'Capture behavior - hunting, resting, climbing'
    ],
    safariTips: [
      'Mobile camps positioned near leopard territories',
      'Early morning departure from camp for best sightings',
      'Silent approach essential for close encounters',
      'Camp locations chosen based on recent leopard activity'
    ],
    rating: 4.9,
    sightingChance: '85%'
  },
  {
    id: 'elephant',
    name: 'Elephant',
    scientificName: 'Elephas maximus',
    type: 'Megafauna',
    rarity: 'Endangered',
    position: { x: 70, y: 25 },
    image: elephantImg,
    heroImage: elephantHeroImg,
    description: 'Yala hosts over 350 majestic Asian elephants, offering incredible opportunities to observe family herds and massive tuskers in their natural habitat.',
    campingExperience: 'Fall asleep to the sounds of elephant herds passing near your camp and wake up to fresh elephant tracks. Mobile camping allows you to follow elephant migration routes.',
    detailedInfo: {
      population: '350+ individuals',
      bestTime: 'Early morning (6:00-8:00 AM) near water sources',
      bestSeason: 'April to September (Dry season - gather at water holes)',
      behavior: 'Highly social, live in matriarchal herds, excellent memory',
      territory: 'Range across entire park, seasonal migration patterns',
      diet: 'Grasses, fruits, bark, leaves - consume 150kg daily',
      lifespan: '60-70 years',
      conservation: 'Endangered - Human-elephant conflict major threat'
    },
    hotspots: [
      'Buttawa Tank - Morning gatherings',
      'Menik Ganga riverbank',
      'Patrol Bungalow area',
      'Hambantota-Kataragama road'
    ],
    photographyTips: [
      'Photograph family interactions and behaviors',
      'Capture mud bathing and water activities',
      'Use wide-angle for herd compositions',
      'Maintain 25m safety distance always'
    ],
    safariTips: [
      'Camps positioned near water sources during dry season',
      'Evening setup allows for elephant watching at sunset',
      'Safe distance maintained from all camp locations',
      'Expert guides track elephant movements for camp positioning'
    ],
    rating: 4.8,
    sightingChance: '95%'
  },
  {
    id: 'sloth-bear',
    name: 'Bear',
    scientificName: 'Melursus ursinus',
    type: 'Bear',
    rarity: 'Vulnerable',
    position: { x: 45, y: 60 },
    image: slothBearImg,
    heroImage: slothBearHeroImg,
    description: 'The shaggy-coated sloth bears of Yala are a photographer\'s dream, known for their distinctive appearance and fascinating foraging behaviors.',
    campingExperience: 'Experience the thrill of hearing sloth bears foraging near your camp at night. Morning drives from mobile camps offer unique bear watching opportunities in their natural habitat.',
    detailedInfo: {
      population: '60+ individuals',
      bestTime: 'Early morning (6:00-9:00 AM) foraging for termites',
      bestSeason: 'March to July (Fruiting season)',
      behavior: 'Nocturnal/crepuscular, excellent climbers, protective mothers',
      territory: 'Large home ranges, overlap with other bears',
      diet: 'Termites, ants, honey, fruits, palm shoots',
      lifespan: '20-25 years',
      conservation: 'Vulnerable - Habitat loss primary threat'
    },
    hotspots: [
      'Block 1 - Dense forest areas',
      'Kumbukkan Oya area',
      'Gonagala area',
      'Near ancient ruins with termite mounds'
    ],
    photographyTips: [
      'Photograph unique feeding behaviors',
      'Capture mother-cub interactions',
      'Use faster shutter for active subjects',
      'Document distinctive facial features'
    ],
    safariTips: [
      'Forest camps positioned for early morning bear activity',
      'Quiet camp setup essential to avoid disturbing bears',
      'Night sounds of foraging bears common near camps',
      'Termite mound areas are prime camping locations'
    ],
    rating: 4.6,
    sightingChance: '60%'
  },
  {
    id: 'peacock',
    name: 'Brids',
    scientificName: 'Pavo cristatus',
    type: 'Bird',
    rarity: 'Common',
    position: { x: 75, y: 45 },
    image: peacockImg,
    heroImage: peacockHeroImg,
    description: 'Yala\'s abundant peafowl population creates spectacular photography opportunities, especially during mating displays and dawn chorus.',
    campingExperience: 'Wake up to the magnificent calls of peacocks at dawn and enjoy their spectacular mating displays right from your camp. These beautiful birds often visit camp areas, providing incredible close-up photography opportunities.',
    detailedInfo: {
      population: '2000+ individuals',
      bestTime: 'Dawn (5:30-7:00 AM) for calls and displays',
      bestSeason: 'April to June (Mating season for full displays)',
      behavior: 'Ground-dwelling, roost in trees, polygamous mating',
      territory: 'Open grasslands, forest edges, near water',
      diet: 'Seeds, insects, small reptiles, flowers',
      lifespan: '15-20 years',
      conservation: 'Least Concern - Stable population'
    },
    hotspots: [
      'Palatupana area grasslands',
      'Kumana Bird Sanctuary border',
      'Open areas near lagoons',
      'Archaeological sites clearings'
    ],
    photographyTips: [
      'Capture full tail displays during breeding',
      'Photograph in-flight moments',
      'Document colorful plumage details',
      'Include habitat context in compositions'
    ],
    safariTips: [
      'Camps in open areas attract peacock visits',
      'Dawn chorus creates magical camp atmosphere',
      'Peacocks often curious about camp activities',
      'Excellent subjects for camp-based photography'
    ],
    rating: 4.7,
    sightingChance: '100%'
  },
  {
    id: 'spotted-deer',
    name: 'Deer',
    scientificName: 'Axis axis',
    type: 'Ungulate',
    rarity: 'Abundant',
    position: { x: 55, y: 30 },
    image: spottedDeerImg,
    heroImage: spottedDeerHeroImg,
    description: 'The graceful spotted deer serve as primary prey for leopards and provide excellent wildlife photography subjects throughout Yala.',
    campingExperience: 'Spotted deer frequently graze near camp sites, especially during early morning and evening. Their alert behavior often signals the presence of predators, adding excitement to your camping experience.',
    detailedInfo: {
      population: '15,000+ individuals',
      bestTime: 'Morning (6:00-9:00 AM) in open grasslands',
      bestSeason: 'Year-round sightings, rutting season October-January',
      behavior: 'Gregarious, form large herds, alert to predators',
      territory: 'Grasslands, forest clearings, near water sources',
      diet: 'Grasses, leaves, fruits, bark',
      lifespan: '12-15 years',
      conservation: 'Least Concern - Abundant population'
    },
    hotspots: [
      'All grassland areas',
      'Yala West main roads',
      'Tank bunds and clearings',
      'Forest edge habitats'
    ],
    photographyTips: [
      'Capture alert poses and interactions',
      'Photograph stag competitions during rut',
      'Document mother-fawn relationships',
      'Include predator-prey dynamics'
    ],
    safariTips: [
      'Deer herds indicate good camping locations',
      'Their alarm calls alert to predator presence',
      'Often graze peacefully near camps',
      'Excellent for teaching wildlife behavior from camp'
    ],
    rating: 4.5,
    sightingChance: '100%'
  },
  {
    id: 'painted-stork',
    name: 'Painted Stork',
    scientificName: 'Mycteria leucocephala',
    type: 'Water Bird',
    rarity: 'Resident',
    position: { x: 35, y: 75 },
    image: paintedStorkImg,
    heroImage: paintedStorkHeroImg,
    description: 'These magnificent large water birds create stunning reflections and fishing action shots in Yala\'s numerous lagoons and tanks.',
    campingExperience: 'Camps positioned near lagoons offer spectacular sunrise and sunset views of painted storks. Watch these graceful birds fishing while enjoying your morning coffee or evening sundowners at camp.',
    detailedInfo: {
      population: '500+ individuals',
      bestTime: 'Early morning (6:00-8:00 AM) feeding in shallow water',
      bestSeason: 'November to March (Migration season)',
      behavior: 'Colonial nesting, tactile feeding, soaring flight',
      territory: 'Lagoons, tanks, shallow wetlands',
      diet: 'Fish, frogs, crustaceans, aquatic insects',
      lifespan: '20-25 years',
      conservation: 'Near Threatened - Wetland habitat loss'
    },
    hotspots: [
      'Bundala Lagoon system',
      'Palatupana Lagoon',
      'Buttawa Tank',
      'Menik Ganga wetlands'
    ],
    photographyTips: [
      'Capture feeding behaviors and techniques',
      'Photograph flight patterns and formations',
      'Include reflection shots in calm water',
      'Document colonial roosting sites'
    ],
    safariTips: [
      'Waterside camps offer excellent stork viewing',
      'Morning mist over lagoons creates magical atmosphere',
      'Best sunset photography opportunities from camp',
      'Colonial roosting sites visible from certain camp locations'
    ],
    rating: 4.4,
    sightingChance: '80%'
  }
];

// Map configuration
export const mapConfig = {
  imageUrl: yalaMapImg,
  fallbackImageUrl: yalaMapFallbackImg,
  altText: "Yala National Park satellite map showing wildlife habitats and mobile camping territories"
};

// Park statistics for the bottom section
export const parkStatistics = [
  {
    icon: "award",
    title: "World's Highest Leopard Density",
    description: "Yala Block 1 has the highest density of leopards in the world, offering unparalleled opportunities for leopard photography and observation."
  },
  {
    icon: "users",
    title: "Diverse Ecosystem",
    description: "Home to 44 mammal species and 215 bird species, including endemic Sri Lankan species found nowhere else on Earth."
  },
  {
    icon: "shield",
    title: "Conservation Success",
    description: "Established in 1938, Yala has been instrumental in conserving Sri Lanka's wildlife and serves as a model for sustainable eco-tourism."
  }
];

// Rarity color mapping
export const rarityColors = {
  'Endemic': 'bg-red-500 text-white',
  'Endangered': 'bg-orange-500 text-white',
  'Vulnerable': 'bg-yellow-500 text-white',
  'Common': 'bg-green-500 text-white',
  'Abundant': 'bg-blue-500 text-white',
  'Resident': 'bg-purple-500 text-white'
};

// Legend data
export const legendData = [
  { rarity: 'Endemic', percentage: '85%' },
  { rarity: 'Endangered', percentage: '95%' },
  { rarity: 'Vulnerable', percentage: '60%' },
  { rarity: 'Common', percentage: '100%' },
  { rarity: 'Abundant', percentage: '100%' },
  { rarity: 'Resident', percentage: '80%' }
];

// Safari tips and information
export const safariInfo = {
  bestTimes: [
    { label: "Best Time", value: "6-9 AM", icon: "sunrise" },
    { label: "Park Access", value: "Block 1", icon: "navigation" }
  ],
  campingFeatures: [
    "Mobile camps that move to new scenic locations",
    "Walk-in tents with comfortable beds",
    "Campfire meals and authentic bush dining",
    "Bucket showers and eco-friendly facilities",
    "Sunset drinks and stargazing opportunities",
    "Expert wildlife guides and trackers"
  ]
};