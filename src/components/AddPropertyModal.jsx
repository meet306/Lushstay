import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { addProperty } from '../store/propertiesSlice';

export default function AddPropertyModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '0',
    image: '',
    rating: 5.0,
    beds: '1',
    baths: '1',
    guests: '2',
    category: 'all',
    amenities: ['WiFi', 'Kitchen'],
  });

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'farm', name: 'Farm' },
    { id: 'beach', name: 'Beach' },
    { id: 'lake', name: 'Lake' },
    { id: 'pools', name: 'Amazing pools' },
    { id: 'countryside', name: 'Countryside' },
    { id: 'caves', name: 'Caves' },
    { id: 'barns', name: 'Barns' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProperty({
      ...formData,
      price: parseFloat(formData.price),
      beds: parseInt(formData.beds),
      baths: parseInt(formData.baths),
      guests: parseInt(formData.guests),
    }));
    setIsOpen(false);
    setFormData({
      title: '',
      location: '',
      price: '0',
      image: '',
      rating: 5.0,
      beds: '1',
      baths: '1',
      guests: '2',
      category: 'all',
      amenities: ['WiFi', 'Kitchen'],
    });
  };

  const handleNumberChange = (e, field) => {
    const value = e.target.value;
    if (value === '' || value === '-') {
      setFormData({ ...formData, [field]: '0' });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
              >
                Add New Property
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Property Type
                    </label>
                    <select
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price per night
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.price}
                      onChange={(e) => handleNumberChange(e, 'price')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Number of Beds
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.beds}
                      onChange={(e) => handleNumberChange(e, 'beds')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Number of Baths
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.baths}
                      onChange={(e) => handleNumberChange(e, 'baths')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Maximum Guests
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.guests}
                      onChange={(e) => handleNumberChange(e, 'guests')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Image URL
                    </label>
                    <input
                      type="url"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-airbnb-red focus:ring-airbnb-red dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-airbnb-red text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-airbnb-red"
                  >
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}