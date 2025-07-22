import axios from 'axios';

const API_BASE_URL = 'http://172.16.23.147:8080/comptes';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const accountService = {
  // Get all accounts
  recupererComptes() {
    return api.get('');
  },

  // Create new account
  creerComptes(accountData) {
    return api.post('', accountData);
  },

  // Update account
  modifierComptes(accountData) {
    return api.put(`/${accountData.personnePhysiqueId}`, accountData);
  },

  // Delete account (soft delete)
  supprimerComptes(id) {
    return api.put(`/supprimer/${id}`);
  },
};