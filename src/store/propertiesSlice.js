import { createSlice } from '@reduxjs/toolkit';

// Clear localStorage to ensure new properties are loaded
localStorage.removeItem('properties');

const defaultProperties = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 850,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    rating: 4.9,
    beds: 4,
    baths: 3,
    guests: 8,
    category: "beach",
    owner: "Host",
    amenities: ["WiFi", "Pool", "Kitchen", "Beach access", "Free parking"]
  },
  {
    id: 2,
    title: "Rustic Farm Cottage",
    location: "Vermont Countryside",
    price: 195,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    rating: 4.7,
    beds: 2,
    baths: 1,
    guests: 4,
    category: "farm",
    owner: "Host",
    amenities: ["WiFi", "Kitchen", "Farm tours", "Free parking"]
  },
  {
    id: 3,
    title: "Lakeside Retreat",
    location: "Lake Tahoe, Nevada",
    price: 450,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    rating: 4.8,
    beds: 3,
    baths: 2,
    guests: 6,
    category: "lake",
    owner: "Host",
    amenities: ["WiFi", "Lake access", "Kitchen", "Free parking", "Boat dock"]
  },
  {
    id: 4,
    title: "Modern Pool Villa",
    location: "Palm Springs, California",
    price: 550,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    rating: 4.9,
    beds: 4,
    baths: 3,
    guests: 8,
    category: "pools",
    owner: "Host",
    amenities: ["WiFi", "Infinity pool", "Kitchen", "Free parking", "Hot tub"]
  },
  {
    id: 5,
    title: "Countryside Manor",
    location: "Cotswolds, UK",
    price: 380,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    rating: 4.7,
    beds: 5,
    baths: 3,
    guests: 10,
    category: "countryside",
    owner: "Host",
    amenities: ["WiFi", "Garden", "Kitchen", "Free parking"]
  },
  {
    id: 6,
    title: "Cave Suite Experience",
    location: "Cappadocia, Turkey",
    price: 280,
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
    rating: 4.8,
    beds: 1,
    baths: 1,
    guests: 2,
    category: "caves",
    owner: "Host",
    amenities: ["WiFi", "Unique experience", "Kitchen", "Free parking"]
  },
  {
    id: 7,
    title: "Converted Historic Barn",
    location: "Yorkshire Dales, UK",
    price: 220,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
    rating: 4.6,
    beds: 2,
    baths: 2,
    guests: 4,
    category: "barns",
    owner: "Host",
    amenities: ["WiFi", "Historic features", "Kitchen", "Free parking"]
  },
  {
    id: 8,
    title: "Oceanfront Paradise",
    location: "Maui, Hawaii",
    price: 920,
    image: "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d",
    rating: 4.9,
    beds: 3,
    baths: 2,
    guests: 6,
    category: "beach",
    owner: "Host",
    amenities: ["WiFi", "Private beach", "Kitchen", "Pool", "Free parking"]
  },
  {
    id: 9,
    title: "Organic Farm Stay",
    location: "Tuscany, Italy",
    price: 175,
    image: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5",
    rating: 4.7,
    beds: 1,
    baths: 1,
    guests: 2,
    category: "farm",
    owner: "Host",
    amenities: ["WiFi", "Farm experience", "Kitchen", "Free parking"]
  },
  {
    id: 10,
    title: "Mountain Lake Cabin",
    location: "Banff, Canada",
    price: 340,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    rating: 4.8,
    beds: 2,
    baths: 1,
    guests: 4,
    category: "lake",
    owner: "Host",
    amenities: ["WiFi", "Lake view", "Kitchen", "Free parking"]
  },
  {
    id: 11,
    title: "Luxury Pool House",
    location: "Miami, Florida",
    price: 780,
    image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4",
    rating: 4.9,
    beds: 5,
    baths: 4,
    guests: 10,
    category: "pools",
    owner: "Host",
    amenities: ["WiFi", "Heated pool", "Kitchen", "Free parking", "Gym"]
  },
  {
    id: 12,
    title: "English Country Cottage",
    location: "Peak District, UK",
    price: 260,
    image: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089",
    rating: 4.7,
    beds: 3,
    baths: 2,
    guests: 6,
    category: "countryside",
    owner: "Host",
    amenities: ["WiFi", "Garden", "Kitchen", "Free parking"]
  },
  {
    id: 13,
    title: "Ancient Cave Dwelling",
    location: "Matera, Italy",
    price: 320,
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
    rating: 4.8,
    beds: 2,
    baths: 1,
    guests: 4,
    category: "caves",
    owner: "Host",
    amenities: ["WiFi", "Historic experience", "Kitchen", "Free parking"]
  },
  {
    id: 14,
    title: "Modern Barn Loft",
    location: "Hudson Valley, NY",
    price: 295,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
    rating: 4.8,
    beds: 2,
    baths: 2,
    guests: 4,
    category: "barns",
    owner: "Host",
    amenities: ["WiFi", "Modern design", "Kitchen", "Free parking"]
  },
  {
    id: 15,
    title: "Tropical Beach Villa",
    location: "Bali, Indonesia",
    price: 420,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
    rating: 4.9,
    beds: 3,
    baths: 2,
    guests: 6,
    category: "beach",
    owner: "Host",
    amenities: ["WiFi", "Private beach", "Pool", "Kitchen", "Free parking"]
  },
  {
    id: 16,
    title: "Vineyard Farm Estate",
    location: "Napa Valley, California",
    price: 890,
    image: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5",
    rating: 4.9,
    beds: 4,
    baths: 3,
    guests: 8,
    category: "farm",
    owner: "Host",
    amenities: ["WiFi", "Wine tasting", "Pool", "Kitchen", "Free parking"]
  },
  {
    id: 17,
    title: "Serene Lake House",
    location: "Lake Como, Italy",
    price: 750,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    rating: 4.8,
    beds: 3,
    baths: 2,
    guests: 6,
    category: "lake",
    owner: "Host",
    amenities: ["WiFi", "Lake access", "Kitchen", "Free parking", "Boat dock"]
  },
  {
    id: 18,
    title: "Desert Pool Oasis",
    location: "Dubai, UAE",
    price: 1200,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    rating: 5.0,
    beds: 6,
    baths: 5,
    guests: 12,
    category: "pools",
    owner: "Host",
    amenities: ["WiFi", "Infinity pool", "Kitchen", "Free parking", "Desert views"]
  },
  {
    id: 19,
    title: "Highland Retreat",
    location: "Scottish Highlands",
    price: 280,
    image: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089",
    rating: 4.7,
    beds: 2,
    baths: 1,
    guests: 4,
    category: "countryside",
    owner: "Host",
    amenities: ["WiFi", "Mountain views", "Kitchen", "Free parking"]
  },
  {
    id: 20,
    title: "Luxury Cave Resort",
    location: "Santorini, Greece",
    price: 680,
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
    rating: 4.9,
    beds: 2,
    baths: 2,
    guests: 4,
    category: "caves",
    owner: "Host",
    amenities: ["WiFi", "Private pool", "Kitchen", "Free parking", "Caldera views"]
  }
];

// Only use saved properties if they exist, otherwise use default properties
const savedProperties = localStorage.getItem('properties');
const initialProperties = savedProperties ? JSON.parse(savedProperties) : defaultProperties;

const initialState = {
  properties: initialProperties,
  searchTerm: '',
  activeCategory: 'all',
  filters: {
    priceRange: [0, 1500],
    beds: null,
    guests: null,
    propertyType: 'all',
    amenities: [],
  },
  darkMode: false,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    addProperty: (state, action) => {
      const newProperty = {
        id: Date.now(),
        owner: 'User',
        beds: 1,
        baths: 1,
        guests: 2,
        amenities: [],
        description: '',
        category: 'all',
        ...action.payload,
      };
      state.properties.push(newProperty);
      localStorage.setItem('properties', JSON.stringify(state.properties));
    },
    deleteProperty: (state, action) => {
      state.properties = state.properties.filter(
        property => !(property.id === action.payload && property.owner === 'User')
      );
      localStorage.setItem('properties', JSON.stringify(state.properties));
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  addProperty,
  deleteProperty,
  setSearchTerm,
  setCategory,
  setFilters,
  toggleDarkMode,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;