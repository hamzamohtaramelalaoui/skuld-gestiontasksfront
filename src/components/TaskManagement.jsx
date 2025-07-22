import React, { useState } from "react";
import { Plus } from "lucide-react";

function Accordion({ tasks, onTaskClick, setTasks, onStatusChange, selectedGroup }) {
  const [open, setOpen] = useState(null);

  const handleToggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  // Filter tasks by selectedGroup if it exists
  const filteredTasks = selectedGroup ? tasks.filter(task => task.groupe === selectedGroup) : tasks;

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">
          {selectedGroup ? `Tâches du groupe: ${selectedGroup}` : "Mes Tâches"}
        </h2>
        <hr className="flex-grow border-gray-400 dark:border-gray-600 ml-4" />
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
          onClick={() => handleToggle(1)}
        >
          <span className="font-semibold text-gray-700 dark:text-gray-200">Tâches à faire</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${open === 1 ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        {open === 1 && (
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-4 gap-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white">{task.titre}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.libelle}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Statut: {task.status}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      className="text-red-500 dark:text-red-400 text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
                      onClick={() => deleteTask(task.id)}
                    >
                      Supprimer
                    </button>
                    <button
                      className="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
                      onClick={() => onStatusChange(task)}
                    >
                      Changer état
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
          onClick={() => handleToggle(2)}
        >
          <span className="font-semibold text-gray-700 dark:text-gray-200">Tâches en cours</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${open === 2 ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        {open === 2 && (
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-4 gap-4">
              {filteredTasks
                .filter((task) => task.status === "En cours")
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white">{task.titre}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.libelle}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Statut: {task.status}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        className="text-red-500 dark:text-red-400 text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
                        onClick={() => deleteTask(task.id)}
                      >
                        Supprimer
                      </button>
                      <button
                        className="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
                        onClick={() => onStatusChange(task)}
                      >
                        Changer état
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
          onClick={() => handleToggle(3)}
        >
          <span className="font-semibold text-gray-700 dark:text-gray-200">Tâches en attente de validation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${open === 3 ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        {open === 3 && (
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-4 gap-4">
              {filteredTasks
                .filter((task) => task.status === "En attente de validation")
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white">{task.titre}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.libelle}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Statut: {task.status}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        className="text-red-500 dark:text-red-400 text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
                        onClick={() => deleteTask(task.id)}
                      >
                        Supprimer
                      </button>
                      <button
                        className="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
                        onClick={() => onStatusChange(task)}
                      >
                        Changer état
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div
          className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
          onClick={() => handleToggle(4)}
        >
          <span className="font-semibold text-gray-700 dark:text-gray-200">Tâches validée</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${open === 4 ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        {open === 4 && (
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-4 gap-4">
              {filteredTasks
                .filter((task) => task.status === "Validée")
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white">{task.titre}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.libelle}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Statut: {task.status}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        className="text-red-500 dark:text-red-400 text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
                        onClick={() => deleteTask(task.id)}
                      >
                        Supprimer
                      </button>
                      <button
                        className="text-blue-500 dark:text-blue-400 text-sm hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
                        onClick={() => onStatusChange(task)}
                      >
                        Changer état
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GroupeSelector({ tasks, selectedGroup, setSelectedGroup }) {
  const uniqueGroups = [...new Set(tasks.map((task) => task.groupe))];

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Filtrer par groupe</h2>
        <hr className="flex-grow border-gray-400 dark:border-gray-600 ml-4" />
      </div>

      <div className="mb-6">
        <label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Choisir un groupe</label>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
        >
          <option value="">Tous les groupes</option>
          {uniqueGroups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState([
    { id: 1, titre: "Task 1", libelle: "Description de la tâche 1", status: "En cours", groupe: "groupe 1" },
    { id: 2, titre: "Task 2", libelle: "Description de la tâche 2", status: "En attente de validation", groupe: "groupe 2" },
    { id: 3, titre: "Task 3", libelle: "Description de la tâche 3", status: "En cours", groupe: "groupe 1" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [titre, setTitre] = useState("");
  const [libelle, setLibelle] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreation, setDateCreation] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [assigneTo, setAssigneTo] = useState("");
  const [typeTache, setTypeTache] = useState("");
  const [groupe, setGroupe] = useState("");
  const [etat, setEtat] = useState("En cours");
  const [selectedGroup, setSelectedGroup] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setIsStatusModalOpen(false);
    setCurrentTask(null);
    setTitre("");
    setLibelle("");
    setDescription("");
    setDateCreation("");
    setDateFin("");
    setCreatedBy("");
    setAssigneTo("");
    setTypeTache("");
    setGroupe("");
    setEtat("En cours");
  };

  const openStatusModal = (task) => {
    setCurrentTask(task);
    setEtat(task.status);
    setIsStatusModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsStatusModalOpen(false);
    setCurrentTask(null);
  };

  const handleTaskClick = (task) => {
    setCurrentTask(task);
    setTitre(task.titre);
    setLibelle(task.libelle);
    setDescription(task.description || "");
    setDateCreation(task.dateCreation || "");
    setDateFin(task.dateFin || "");
    setCreatedBy(task.createdBy || "");
    setAssigneTo(task.assigneTo || "");
    setTypeTache(task.typeTache || "");
    setGroupe(task.groupe || "");
    setEtat(task.status || "En cours");
    setIsModalOpen(true);
  };

  const handleAddOrUpdateTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: currentTask ? currentTask.id : tasks.length + 1,
      titre,
      libelle,
      status: currentTask ? etat : "En cours",
      groupe,
      description,
      dateCreation,
      dateFin,
      createdBy,
      assigneTo,
      typeTache,
    };

    if (currentTask) {
      setTasks(tasks.map((task) => (task.id === currentTask.id ? newTask : task)));
    } else {
      setTasks([...tasks, newTask]);
    }

    closeModal();
  };

  const handleStatusChange = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...currentTask,
      status: etat
    };
    setTasks(tasks.map((task) => (task.id === currentTask.id ? updatedTask : task)));
    closeModal();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <button
            className="bg-white dark:bg-gray-800 text-[#4A90E2] dark:text-blue-400 px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white border border-[#4A90E2] dark:border-blue-400 transition"
            onClick={openModal}
          >
            <Plus size={20} /> Ajouter une tâche
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex justify-center items-center">
          <form className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-2xl" onSubmit={handleAddOrUpdateTask}>
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              {currentTask ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titre</label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Libellé</label>
              <input
                type="text"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date création</label>
                <input
                  type="date"
                  value={dateCreation}
                  onChange={(e) => setDateCreation(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date fin</label>
                <input
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Créé par</label>
                <select
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Sélectionner un créateur</option>
                  <option value="user1">Utilisateur 1</option>
                  <option value="user2">Utilisateur 2</option>
                  <option value="user3">Utilisateur 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigné à</label>
                <select
                  value={assigneTo}
                  onChange={(e) => setAssigneTo(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Sélectionner un membre</option>
                  <option value="option1">membre 1</option>
                  <option value="option2">membre 2</option>
                  <option value="option3">membre 3</option>
                </select>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Groupe</label>
                <select
                  value={groupe}
                  onChange={(e) => setGroupe(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Sélectionner un groupe</option>
                  <option value="groupe 1">groupe 1</option>
                  <option value="groupe 2">groupe 2</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-md"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {currentTask ? "Mettre à jour" : "Ajouter la tâche"}
              </button>
            </div>
          </form>
        </div>
      )}

      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex justify-center items-center">
          <form className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-96" onSubmit={handleStatusChange}>
            <h2 className="text-xl font-bold mb-4 dark:text-white">Changer l'état de la tâche</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nouvel état</label>
              <select
                value={etat}
                onChange={(e) => setEtat(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="En cours">En cours</option>
                <option value="En attente de validation">En attente de validation</option>
                <option value="Validée">Validée</option>
              </select>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-md"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirmer
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-8">
        <Accordion
          tasks={tasks}
          setTasks={setTasks}
          onTaskClick={handleTaskClick}
          onStatusChange={openStatusModal}
        />

        <GroupeSelector
          tasks={tasks}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />

        <Accordion
          tasks={tasks}
          setTasks={setTasks}
          onTaskClick={handleTaskClick}
          onStatusChange={openStatusModal}
          selectedGroup={selectedGroup}
        />
      </div>
    </div>
  );
}