


import { useNavigate } from "react-router";

const category = [
  { id: 1, image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png', name: 'Fashion' },
  { id: 2, image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png', name: 'Shirt' },
  { id: 3, image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png', name: 'Jacket' },
  { id: 4, image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png', name: 'Mobile' },
  { id: 5, image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png', name: 'Laptop' },
  { id: 6, image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png', name: 'Shoes' },
  { id: 7, image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png', name: 'Home' },
  { id: 8, image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png', name: 'Books' }
];

const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center bg-white-100 py-4">
      <div className="flex gap-4 overflow-x-scroll hide-scroll-bar px-4 lg:justify-between w-full lg:w-11/12">
        {category.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 flex flex-col items-center bg-white shadow-md rounded-md border border-gray-200 p-4 w-24 h-36 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-violet-400 cursor-pointer"
            onClick={() => navigate(`/category/${item.name.toLowerCase()}`)}
          >
            <div className="bg-violet-500 rounded-full w-16 h-16 flex items-center justify-center hover:bg-violet-400 transition-all">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-center text-xs font-medium text-gray-700 capitalize">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default CategoryCards;
