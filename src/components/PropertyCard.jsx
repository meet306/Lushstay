import { FaStar, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteProperty } from '../store/propertiesSlice';

export default function PropertyCard({ property, onSelect }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (property.owner === 'User') {
      dispatch(deleteProperty(property.id));
    }
  };

  return (
    <div
      className="relative group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={() => onSelect(property)}
    >
      <div className="relative aspect-w-16 aspect-h-9 mb-2">
        <img
          src={property.image}
          alt={property.title}
          className="rounded-xl object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
        />
        {property.owner === 'User' && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <FaTrash className="h-4 w-4 text-airbnb-red" />
          </button>
        )}
        <div className="absolute bottom-2 left-2">
          <span className="bg-white px-2 py-1 rounded-md text-xs font-medium text-gray-800">
            {property.category}
          </span>
        </div>
      </div>
      <div className="mt-2 p-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-airbnb-dark dark:text-white group-hover:text-airbnb-red transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center">
            <FaStar className="h-4 w-4 text-airbnb-red" />
            <span className="ml-1 dark:text-white">{property.rating}</span>
          </div>
        </div>
        <p className="text-airbnb-light dark:text-gray-400">{property.location}</p>
        <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{property.beds} beds</span>
          <span>•</span>
          <span>{property.baths} baths</span>
          <span>•</span>
          <span>{property.guests} guests</span>
        </div>
        <p className="mt-2 dark:text-white">
          <span className="font-semibold">${property.price}</span>
          <span className="text-airbnb-light dark:text-gray-400"> / night</span>
        </p>
      </div>
    </div>
  );
}