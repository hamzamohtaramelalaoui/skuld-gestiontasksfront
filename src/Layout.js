import { Outlet } from "react-router-dom";
import Sidebar from "./components/Navigation";
import Navbar from "./components/Navbar";

const Layout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar fixée à gauche */}
            <Sidebar />

            {/* Contenu principal */}
            <div className="flex flex-col flex-1">
                {/* Navbar fixée en haut */}
                <Navbar />

                {/* Ajout d'un padding-top pour éviter que le contenu touche la Navbar */}
                <div className="p-6 flex-1 mt-14 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
