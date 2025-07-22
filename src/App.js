import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // Import du contexte

import Login from "./components/login";
import Settings from "./components/Settings";
import Tasks from "./components/dashboard";
import Layout from "./Layout";
import Accounts from "./components/AccountsManagement";
import TaskManagement from "./components/TaskManagement";
import Parametrage from "./components/Parametrage";
import Groupe from "./components/Groupe";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Tasks />} />
          <Route path="/groups" element={<Groupe />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/TaskManagement" element={<TaskManagement/>}/>
          <Route path="/Parametrage" element={<Parametrage/>}/>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
