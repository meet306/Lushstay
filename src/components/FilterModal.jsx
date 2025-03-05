import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/propertiesSlice';

export default function FilterModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.properties.filters);

  const handleFilterChange = (name, value) => {
    dispatch(setFilters({ [name]: value }));
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
                Filters
              </Dialog.Title>

              <div className="mt-4 space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price Range (per night)
                  </label>
                  <div className="flex items-center space-x-4 mt-2">
                    <input
                      type="number"
                      min="0"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handleFilterChange('priceRange', [
                          parseInt(e.target.value),
                          filters.priceRange[1],
                        ])
                      }
                      className="w-24 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <span className="text-gray-500 dark:text-gray-400">to</span>
                    <input
                      type="number"
                      min="0"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handleFilterChange('priceRange', [
                          filters.priceRange[0],
                          parseInt(e.target.value),
                        ])
                      }
                      className="w-24 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                {/* Beds */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Beds
                  </label>
                  <select
                    value={filters.beds || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'beds',
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-airbnb-red focus:border-airbnb-red rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}+
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Guests
                  </label>
                  <select
                    value={filters.guests || ''}
                    onChange={(e) =>
                      handleFilterChange(
                        'guests',
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-airbnb-red focus:border-airbnb-red rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Any</option>
                    {[1, 2, 4, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}+
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-airbnb-red text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-airbnb-red"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}