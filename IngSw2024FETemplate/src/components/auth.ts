import { ref } from 'vue';

// Interfaccia per i dati dell'utente
export interface UserData {
  username: string;
  email: string;
  password: string;
  birthdate: string; 
  gender: string;
}
// Funzione per controllare se l'utente è loggato
const isLoggedIn = ref<boolean>(!!localStorage.getItem('user'));

// Funzione per loggare l'utente
export const login = (userData: UserData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  isLoggedIn.value = true;
};

//funzione per sloggare l'utente
export const logout = () => {
  localStorage.removeItem('user');
  isLoggedIn.value = false;
};

// Funzione per ottenere i dati dell'utente
export const getUser = (): UserData | null => {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
};

export const useAuth = () => {
  return {
    isLoggedIn,
    login,
    logout,
    getUser,
  };
};
