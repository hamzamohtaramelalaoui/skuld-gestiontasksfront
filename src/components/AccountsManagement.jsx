import { useState, useEffect } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { accountService } from "../services/accountService";
import {parametresService} from "../services/parametreService";

export default function AccountsManagement() {
  const [selectedLines, setSelectedLines] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [professionType, setProfessionType] = useState([]);
  const [userType, setUserType] = useState([]);
  const [sexeType, setSexeType] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "",
    prenom: "",
    nom: "",
    profession: "",
    sexe: ""
  });

  useEffect(() => {
    const fetchSelectData = async () => {
      try {
        const [professionResponse, userTypeResponse, sexeTypeResponse] = await Promise.all([
          parametresService.recupererParametresParTypeParametre("TYPE PROFESSION", false),
          parametresService.recupererParametresParTypeParametre("TYPE COMPTE", false),
          parametresService.recupererParametresParTypeParametre("SEXE", false),
        ]);

        setProfessionType(professionResponse.data);
        setUserType(userTypeResponse.data);
        setSexeType(sexeTypeResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchSelectData();
  }, []);



  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await accountService.recupererComptes();
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleLineSelect = (username) => {
    setSelectedLines(prev =>
      prev.includes(username)
        ? prev.filter(u => u !== username)
        : [...prev, username]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedLines(checked ? users.map(user => user.username) : []);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = "Username required";
    if (!formData.password) errors.password = "Password required";
    if (!formData.userType) errors.userType = "User type required";
    if (!formData.prenom.trim()) errors.prenom = "First name required";
    if (!formData.nom.trim()) errors.nom = "Last name required";
    if (!formData.profession) errors.profession = "Profession required";
    if (!formData.sexe) errors.sexe = "Gender required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAjouterClick = () => {
    setEditUser(null);
    setFormData({
      username: "",
      password: "",
      userType: "",
      prenom: "",
      nom: "",
      profession: "",
      sexe: ""
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEditerClick = () => {
    const userToEdit = users.find((user) => user.username === selectedLines[0]);
    if (!userToEdit) return;

    setEditUser(userToEdit);
    setFormData({
      username: userToEdit.username,
      password: userToEdit.password,
      userType: userToEdit.userType,
      prenom: userToEdit.prenom,
      nom: userToEdit.nom,
      profession: userToEdit.profession,
      sexe: userToEdit.sexe
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteClick = async () => {
    if (selectedLines.length === 0) return;

    try {
      const userToDelete = users.find(user => user.username === selectedLines[0]);
      if (!userToDelete) return;

      await accountService.supprimerComptes(userToDelete.personnePhysiqueId);

      const response = await accountService.recupererComptes();
      setUsers(response.data);
      setSelectedLines([]);
      setSuccess("Account deleted successfully!");
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete account");
      setSuccess(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (editUser) {
        await accountService.modifierComptes({
          ...formData,
          personnePhysiqueId: editUser.personnePhysiqueId
        });
        setSuccess("Account updated successfully!");
      } else {
        await accountService.creerComptes(formData);
        setSuccess("Account created successfully!");
      }

      const response = await accountService.recupererComptes();
      setUsers(response.data);
      setIsModalOpen(false);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save account");
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      userType: "",
      prenom: "",
      nom: "",
      profession: "",
      sexe: ""
    });
    setFormErrors({});
    setIsModalOpen(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error && !isModalOpen) return <div className="p-8">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-8 p-8">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="flex space-x-6 mb-6 justify-center">
        <button
          className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
          onClick={handleAjouterClick}
        >
          <Plus size={20} /> Ajouter Compte
        </button>
        <button
          className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
          onClick={handleEditerClick}
          disabled={selectedLines.length !== 1}
        >
          <Edit3 size={20} /> Modifier
        </button>
        <button
          className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
          onClick={handleDeleteClick}
          disabled={selectedLines.length === 0}
        >
          <Trash2 size={20} /> Supprimer
        </button>
      </div>

      <table className="table-auto w-full text-left shadow-lg border-separate border-spacing-0">
        <thead>
          <tr className="bg-[#0066BC] text-white">
            <th>
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={users.length > 0 && selectedLines.length === users.length}
                className="ml-2"
              />
            </th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Type d'utilisateur</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Prénom</th>
            <th className="px-4 py-2">Profession</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.username}
              className={`${selectedLines.includes(user.username) ? "bg-[#3388D1]" : ""} hover:bg-[#3388D1] transition duration-300`}
            >
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedLines.includes(user.username)}
                  onChange={() => handleLineSelect(user.username)}
                  onClick={(e) => e.stopPropagation()}
                  className="ml-2"
                />
              </td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.userType}</td>
              <td className="px-4 py-2">{user.nom}</td>
              <td className="px-4 py-2">{user.prenom}</td>
              <td className="px-4 py-2">{user.profession}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <div>
              <h2 className="text-xl font-semibold mb-4">{editUser ? "Modifier utilisateur" : "Ajouter utilisateur"}</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none ${formErrors.username ? "border-red-500" : "focus:border-[#1e96fc]"}`}
                    required
                    disabled={!!editUser}
                  />
                  {formErrors.username && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none ${formErrors.password ? "border-red-500" : "focus:border-[#1e96fc]"}`}
                    required
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                  )}
                </div>

                <div className="mb-3">
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none ${formErrors.userType ? "border-red-500" : "focus:border-[#1e96fc]"}`}
                    required
                  >
                    <option value="">Sélectionner le type d'utilisateur</option>
                    {userType.map((type, index) => (
                        <option key={index} value={type.code}>{type.valeur}</option>
                    ))}
                  </select>
                  {formErrors.userType && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.userType}</p>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none ${formErrors.prenom ? "border-red-500" : "focus:border-[#1e96fc]"}`}
                    required
                  />
                  {formErrors.prenom && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.prenom}</p>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none ${formErrors.nom ? "border-red-500" : "focus:border-[#1e96fc]"}`}
                    required
                  />
                  {formErrors.nom && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.nom}</p>
                  )}
                </div>

                <div className="mb-3">
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none ${formErrors.profession ? "border-red-500" : "focus:border-[#1e96fc]"}`}
                    required
                  >
                    <option value="">Sélectionner la profession</option>
                    {professionType.map((type, index) => (
                        <option key={index} value={type.code}>{type.valeur}</option>
                    ))}

                  </select>
                  {formErrors.profession && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.profession}</p>
                  )}
                </div>

                <div className="mb-3">
                  <select
                    name="sexe"
                    value={formData.sexe}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded focus:outline-none ${formErrors.sexe ? "border-red-500" : "focus:border-[#1e96fc]"}`}
                    required
                  >
                    <option value="">Sélectionner sexe</option>
                    {sexeType.map((type, index) => (
                        <option key={index} value={type.code}>{type.valeur}</option>
                    ))}
                  </select>
                  {formErrors.sexe && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.sexe}</p>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-[#1e96fc] text-white px-6 py-3 rounded hover:bg-[#187bcd]"
                    disabled={isSubmitting}
                  >
                    {editUser ? "Mettre à jour" : "Soumettre"}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-gray-400 text-white px-6 py-3 rounded hover:bg-gray-500"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
