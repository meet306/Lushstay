import { useState } from 'react';
import { FaStar, FaWifi, FaParking, FaSwimmingPool, FaHome } from 'react-icons/fa';
import PaymentModal from './PaymentModal';

export default function PropertyDetails({ property, onClose }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [showPayment, setShowPayment] = useState(false);

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights * property.price;
  };

  const total = calculateTotal();
  const serviceFee = Math.round(total * 0.12);
  const finalTotal = total + serviceFee;

  const handleReserve = () => {
    if (!startDate || !endDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    // Here you would typically save the booking to your backend
    console.log('Booking completed:', {
      property,
      startDate,
      endDate,
      guests,
      total: finalTotal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full p-6 shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {property.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{property.location}</p>
                <div className="flex items-center mt-2">
                  <FaStar className="text-airbnb-red" />
                  <span className="ml-1 text-gray-700 dark:text-gray-300">
                    {property.rating}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Property Details
                </h3>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <div className="text-gray-600 dark:text-gray-300">
                    {property.beds} beds
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {property.baths} baths
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {property.guests} guests
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Amenities
                </h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      {amenity === 'WiFi' && <FaWifi className="mr-2" />}
                      {amenity === 'Free parking' && <FaParking className="mr-2" />}
                      {amenity === 'Pool' && <FaSwimmingPool className="mr-2" />}
                      {!['WiFi', 'Free parking', 'Pool'].includes(amenity) && (
                        <FaHome className="mr-2" />
                      )}
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Reserve your stay
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {[...Array(property.guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i !== 0 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t dark:border-gray-600 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      ${property.price} × {calculateTotal() / property.price || 0} nights
                    </span>
                    <span className="text-gray-900 dark:text-white">${total}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Service fee
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ${serviceFee}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold mt-4 pt-4 border-t dark:border-gray-600">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">
                      ${finalTotal}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleReserve}
                  className="w-full bg-airbnb-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={showPayment}
        setIsOpen={setShowPayment}
        total={finalTotal}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}