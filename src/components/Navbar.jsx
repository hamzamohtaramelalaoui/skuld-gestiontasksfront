import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { User, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
    const { darkMode } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`h-14 px-6 flex items-center justify-end fixed right-0 top-0 w-[calc(100%-16rem)] z-10 
            ${darkMode ? "bg-gray-900 text-white border-b border-white" : "bg-[#0066BC] text-white border-b border-transparent"}`}
        >
            {/* Menu utilisateur avec avatar et menu déroulant */}
            <div className="relative">
                <button 
                    className="flex items-center space-x-2 focus:outline-none" 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <User size={20} />
                    <span className="font-semibold">Tom Cook</span>
                    <ChevronDown size={18} />
                </button>

                {/* Menu déroulant */}
                {menuOpen && (
                    <div className={`absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded-lg shadow-lg py-2 
                        ${darkMode ? "bg-gray-800 text-white shadow-gray-700" : "bg-white text-gray-900 shadow-md"}`}
                    >
                        <button 
                            className="w-full text-left px-4 py-2 text-red-600 font-semibold flex items-center space-x-2 
                            hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-300"
                        >
                            <LogOut size={18} />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
