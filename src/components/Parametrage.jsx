import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Parametrage() {
    const [parametres, setParametres] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        code: "",
        description: "",
        parent: "",
        typeParametre: "",
        valeur: ""
    });

    // Fetch parameters
    useEffect(() => {
        fetchParametres();
    }, []);

    const fetchParametres = async () => {
        try {
            const response = await fetch('http://172.16.23.147:8080/parametre/all');
            const data = await response.json();
            setParametres(data);
        } catch (error) {
            alert('Erreur lors de la récupération des paramètres');
        }
    };

    // Handle checkbox toggle
    const toggleSelection = (id) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(parametreId => parametreId !== id)
                : [...prev, id]
        );
    };

    // Open modal for add
    const handleAdd = () => {
        setIsEditing(false);
        setFormData({
            code: "",
            description: "",
            parent: "",
            typeParametre: "",
            valeur: ""
        });
        setModalOpen(true);
    };

    // Open modal for edit
    const handleEdit = () => {
        if (selectedRows.length !== 1) {
            alert("Veuillez sélectionner un seul paramètre à modifier.");
            return;
        }
        const selected = parametres.find(p => p.parametreId === selectedRows[0]);
        setFormData(selected);
        setIsEditing(true);
        setModalOpen(true);
    };

    // Delete selected
    const handleDelete = async () => {
        if (selectedRows.length === 0) {
            alert("Veuillez sélectionner au moins un paramètre à supprimer.");
            return;
        }

        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ces paramètres ?")) return;

        try {
            await Promise.all(selectedRows.map(id =>
                fetch(`http://172.16.23.147:8080/parametre/${id}`, {
                    method: "DELETE"
                })
            ));
            fetchParametres();
            setSelectedRows([]);
        } catch (error) {
            alert("Erreur lors de la suppression.");
        }
    };

    // Handle submit for both add/edit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing
            ? `http://172.16.23.147:8080/parametre/${formData.parametreId}`
            : 'http://172.16.23.147:8080/parametre/add';

        const method = isEditing ? "PUT" : "POST";

        try {
            await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            setModalOpen(false);
            fetchParametres();
            setSelectedRows([]);
        } catch (error) {
            alert("Erreur lors de l'enregistrement.");
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <>
            {/* Buttons */}
            <div className="flex space-x-6 mb-6 justify-center">
                <button onClick={handleAdd}
                    className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
                >
                    <Plus className="mr-2" /> Ajouter parametre
                </button>
                <button onClick={handleEdit}
                    className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
                >
                    <Edit className="mr-2" /> Modifier
                </button>
                <button onClick={handleDelete}
                    className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
                >
                    <Trash2 className="mr-2" /> Supprimer
                </button>
            </div>

            {/* Table */}
            <table className="table-auto w-full text-left shadow-lg border">
                <thead>
                <tr className="bg-blue-700 text-white">
                    <th className="p-3">#</th>
                    <th className="p-3">Code</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Parent</th>
                    <th className="p-3">Type parametre</th>
                    <th className="p-3">Valeur</th>
                </tr>
                </thead>
                <tbody>
                {parametres.map((parametre) => (
                    <tr key={parametre.parametreId} className="hover:bg-gray-200">
                        <td className="p-3">
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(parametre.parametreId)}
                                onChange={() => toggleSelection(parametre.parametreId)}
                            />
                        </td>
                        <td className="p-3">{parametre.code}</td>
                        <td className="p-3">{parametre.description}</td>
                        <td className="p-3">{parametre.parent}</td>
                        <td className="p-3">{parametre.typeParametre}</td>
                        <td className="p-3">{parametre.valeur}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl mb-4">{isEditing ? "Modifier" : "Ajouter"} un paramètre</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="code" value={formData.code} onChange={handleChange} placeholder="Code" className="w-full border p-2 rounded" required />
                            <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
                            <input name="parent" value={formData.parent} onChange={handleChange} placeholder="Parent" className="w-full border p-2 rounded" />
                            <input name="typeParametre" value={formData.typeParametre} onChange={handleChange} placeholder="Type de paramètre" className="w-full border p-2 rounded" required />
                            <input name="valeur" value={formData.valeur} onChange={handleChange} placeholder="Valeur" className="w-full border p-2 rounded" />
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{isEditing ? "Enregistrer" : "Ajouter"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
