import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { MultiSelect } from "react-multi-select-component";
import { parametresService } from "../services/parametreService";

export default function Groupe() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [groups, setGroups] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [personnes, setPersonnes] = useState([]);
  const [directions, setDirections] = useState([]);
  const [groupToInsert, setGroupToInsert] = useState({
    groupeId: 0,
    libelle: "",
    directionFk: "",
    responsableId: "",
    membresId: [],
  });

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setGroupToInsert({
      groupeId: 0,
      libelle: "",
      directionFk: "",
      responsableId: "",
      membresId: [],
    });
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEdit = () => {
    const id = selectedRows[0];
    const group = groups.find((g) => g.groupeId === id);
    if (group) {
      setGroupToInsert({
        groupeId: group.groupeId,
        libelle: group.libelle,
        directionFk: group.directionFk,
        responsableId: group.responsableId,
        membresId: group.membresId,
      });
      setModalOpen(true);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer ces groupes ?")) {
      for (const id of selectedRows) {
        await fetch(`http://172.16.23.147:8080/groupes/${id}`, {
          method: "DELETE",
        });
      }
      await fetchGroups();
      setSelectedRows([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = groupToInsert.groupeId ? "PUT" : "POST";
    const url = groupToInsert.groupeId
      ? `http://172.16.23.147:8080/groupes/${groupToInsert.groupeId}`
      : "http://172.16.23.147:8080/groupes";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupToInsert),
      });

      if (response.ok) {
        await fetchGroups();
        closeModal();
        setSelectedRows([]);
      } else {
        const errorData = await response.json();
        console.error("Erreur :", errorData);
      }
    } catch (error) {
      console.error("Erreur requête:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupToInsert({
      ...groupToInsert,
      [name]: name === "responsableId" ? parseInt(value) : value,
    });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleMultiSelectChange = (selectedList) => {
    if (selectedList.length <= 5) {
      setGroupToInsert({
        ...groupToInsert,
        membresId: selectedList.map((item) => item.value),
      });
    }
  };

  const fetchPersonnes = async () => {
    const res = await fetch("http://172.16.23.147:8080/personnePhysique");
    const data = await res.json();
    setPersonnes(data);
  };

  const fetchDirections = async () => {
    const res = await parametresService.recupererParametresParTypeParametre(
      "TYPE DIRECTIONS",
      false
    );
    setDirections(res.data);
  };

  const fetchGroups = async () => {
    const res = await fetch("http://172.16.23.147:8080/groupes");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchPersonnes();
    fetchDirections();
    fetchGroups();
  }, []);

  return (
    <>
      {/* Buttons */}
      <div className="flex space-x-6 mb-6 justify-center">
        <button
          className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
          onClick={openModal}
        >
          <Plus size={20} /> Ajouter Compte
        </button>
        <button
          className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
          onClick={handleEdit}
          disabled={selectedRows.length !== 1}
        >
          <Edit3 size={20} /> Modifier
        </button>
        <button
          className="bg-white text-[#4A90E2] px-8 py-3 text-lg rounded-lg flex items-center hover:bg-[#4A90E2] hover:text-white border border-[#4A90E2] transition"
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
        >
          <Trash2 size={20} /> Supprimer
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex justify-center">
        <table className="min-w-full border border-gray-300 rounded-md text-center">
          <thead className="bg-gray-100">
            <tr className="bg-[#0066BC] text-white">
              <th className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(e.target.checked ? groups.map((g) => g.groupeId) : [])
                  }
                  checked={selectedRows.length === groups.length && groups.length > 0}
                />
              </th>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Direction</th>
              <th className="py-2 px-4 border-b">Responsable</th>
              <th className="py-2 px-4 border-b">Membres</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr
                key={group.groupeId}
                className={`hover:bg-blue-100 transition-all ${
                  selectedRows.includes(group.groupeId) ? "bg-blue-200" : ""
                }`}
              >
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(group.groupeId)}
                    onChange={() => handleCheckboxChange(group.groupeId)}
                  />
                </td>
                <td className="py-2 px-4 border-b">{group.libelle}</td>
                <td className="py-2 px-4 border-b">{group.directionFk}</td>
                <td className="py-2 px-4 border-b">
                  {personnes.find((p) => p.personnePhysiqueId === group.responsableId)?.nom || "-"}
                </td>
                <td className="py-2 px-4 border-b">
                  {group.membresId
                    ?.map(
                      (id) =>
                        personnes.find((p) => p.personnePhysiqueId === id)?.nom
                    )
                    .join(", ") || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <form onSubmit={handleSubmit}>
              <label>Nom:</label>
              <input
                className="w-full border p-2 rounded mb-4"
                value={groupToInsert.libelle}
                onChange={handleChange}
                name="libelle"
                required
              />

              <label>Responsable:</label>
              <select
                className="w-full border p-2 rounded mb-4"
                value={groupToInsert.responsableId}
                onChange={handleChange}
                name="responsableId"
                required
              >
                <option value="">-- Sélectionner --</option>
                {personnes.map((p) => (
                  <option key={p.personnePhysiqueId} value={p.personnePhysiqueId}>
                    {p.nom}
                  </option>
                ))}
              </select>

              <label>Membres (max 5):</label>
              <MultiSelect
                options={personnes.map((p) => ({
                  label: `${p.prenom} ${p.nom}`,
                  value: p.personnePhysiqueId,
                }))}
                value={groupToInsert.membresId.map((id) => {
                  const person = personnes.find((p) => p.personnePhysiqueId === id);
                  return {
                    label: `${person?.prenom || ""} ${person?.nom || ""}`,
                    value: id,
                  };
                })}
                onChange={handleMultiSelectChange}
                labelledBy="Sélectionner les membres"
              />

              <label className="mt-4 block">Direction:</label>
              <select
                className="w-full border p-2 rounded mb-4"
                value={groupToInsert.directionFk}
                onChange={handleChange}
                name="directionFk"
                required
              >
                <option value="">-- Sélectionner --</option>
                {directions.map((s, index) => (
                  <option key={index} value={s.code}>
                    {s.valeur}
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  type="button"
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}