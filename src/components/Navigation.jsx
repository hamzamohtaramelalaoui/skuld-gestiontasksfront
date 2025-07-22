import { Home, Users, ClipboardList, Settings, FolderCog, ShieldUser } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import LogoLight from '../assets/image/logo3.png';
import LogoDark from '../assets/image/logodark.png';

const Sidebar = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`w-64 h-screen p-4 flex flex-col justify-between transition-all border
            ${darkMode ? "bg-gray-900 text-white border-white" : "bg-[#0066BC] text-white border-transparent"}`}>

            {/* Logo */}
            <div>
                <div className="flex items-center space-x-2 mb-6">
                    <img src={darkMode ? LogoDark : LogoLight} alt="Logo" className="w-90 h-auto" />
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    <NavItem to="/dashboard" icon={<Home size={20} />} label="Dashboard" darkMode={darkMode} />
                    <NavItem to="/groups" icon={<Users size={20} />} label="Gestion des Groupes" darkMode={darkMode} />
                    <NavItem to="/accounts" icon={<ShieldUser size={20} />} label="Gestion des Comptes" darkMode={darkMode} />
                    <NavItem to="/taskManagement" icon={<ClipboardList size={20} />} label="Gestion des Tâches" darkMode={darkMode} />
                    <NavItem to="/Parametrage" icon={<FolderCog size={20} />} label="Parametrage" darkMode={darkMode} />
                    <NavItem to="/settings" icon={<Settings size={20} />} label="Paramètres" darkMode={darkMode} />
                </nav>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label, darkMode }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-300
            ${isActive ? (darkMode ? "bg-white text-gray-900 shadow-md" : "bg-white text-[#0066BC] shadow-md") : "hover:bg-blue-500 dark:hover:bg-gray-700"}`}
        >
            <div className="flex items-center space-x-2">
                {icon}
                <span>{label}</span>
            </div>
        </Link>
    );
};

export default Sidebar;
