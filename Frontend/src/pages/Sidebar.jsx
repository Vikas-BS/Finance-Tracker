import { useNavigate } from 'react-router-dom';


const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); 
  };
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-xl font-bold text-black">Menu</h2>
        </div>
        <ul className="p-4 space-y-4 text-gray-700">
          <li className="hover:text-blue-500 cursor-pointer"
          onClick={() => handleNavigation("/home")}
          >Home</li>
          <li className="hover:text-blue-500 cursor-pointer"
          onClick={() => handleNavigation("/incomepage")}
          >Income</li>
          <li className="hover:text-blue-500 cursor-pointer"
          onClick={() => handleNavigation("/expensepage")}
          >Expense</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
