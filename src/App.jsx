import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import PropertyCard from './components/PropertyCard';
import AddPropertyModal from './components/AddPropertyModal';
import PropertyDetails from './components/PropertyDetails';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { useSelector } from 'react-redux';

function Properties() {
  const { properties, searchTerm, filters, activeCategory } = useSelector((state) => state.properties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      property.price >= filters.priceRange[0] &&
      property.price <= filters.priceRange[1];

    const matchesBeds = !filters.beds || property.beds >= filters.beds;
    const matchesGuests = !filters.guests || property.guests >= filters.guests;
    const matchesCategory = activeCategory === 'all' || property.category === activeCategory;

    return matchesSearch && matchesPrice && matchesBeds && matchesGuests && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="pt-20">
        <CategoryNav />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-airbnb-dark dark:text-white">
            Places to stay
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-airbnb-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Add Property
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={setSelectedProperty}
            />
          ))}
        </div>

        <AddPropertyModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        {selectedProperty && (
          <PropertyDetails
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Properties />
    </Provider>
  );
}

export default App;