import { FaHome, FaSwimmingPool, FaUmbrellaBeach, FaTree, FaWarehouse } from 'react-icons/fa';
import { GiFarmTractor, GiIsland, GiMountainCave } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../store/propertiesSlice';

export default function CategoryNav() {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.properties.activeCategory);

  const categories = [
    { id: 'all', name: 'All', icon: FaHome },
    { id: 'farm', name: 'Farms', icon: GiFarmTractor },
    { id: 'beach', name: 'Beach', icon: FaUmbrellaBeach },
    { id: 'lake', name: 'Lake', icon: GiIsland },
    { id: 'pools', name: 'Amazing pools', icon: FaSwimmingPool },
    { id: 'countryside', name: 'Countryside', icon: FaTree },
    { id: 'caves', name: 'Caves', icon: GiMountainCave },
    { id: 'barns', name: 'Barns', icon: FaWarehouse },
  ];

  return (
    <div className="border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => dispatch(setCategory(category.id))}
                className={`flex flex-col items-center min-w-[80px] pt-3 pb-2 border-b-2 transition-colors ${
                  activeCategory === category.id
                    ? 'border-airbnb-red text-airbnb-red'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}