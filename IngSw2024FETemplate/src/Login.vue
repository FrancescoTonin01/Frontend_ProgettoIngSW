<template>
  <div class="login-container">
    <h2 class="login-title">{{ $t('login1') }}</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">{{ $t('username') }}</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          required 
          :placeholder="$t('usernamePlaceholder')"
        />
      </div>
      <div class="form-group">
        <label for="password">{{ $t('password') }}</label>
        <div class="password-input-container">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="password" 
            v-model="password" 
            required 
            :placeholder="$t('passwordPlaceholder')"
          />
          <button type="button" @click="togglePasswordVisibility" class="toggle-password">
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}          </button>
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="login-button">
          {{ $t('submit') }}
        </button>
      </div>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="register-link">
      {{ $t('noAccount') }} 
      <router-link to="/register">{{ $t('registerNow') }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { login } from './components/auth';

const router = useRouter();
const { t } = useI18n();

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const showPassword = ref(false);

// Funzione per loggare l'utente
const handleLogin = async () => {
  try {
    const response = await axios.post('/api/login', {
      username: username.value,
      password: password.value,
    });
    // Se il login è andato a buon fine, loggiamo l'utente e reindirizziamo alla dashboard dove modifica i dati
    if (response.data) {
      console.log(response.data);
      login(response.data);
      router.push('/dashboard');
    }
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage.value = t('login.invalidCredentials');
        } else if (error.response.status === 500) {
          errorMessage.value = t('login.serverError');
        } else {
          errorMessage.value = t('login.genericError');
        }
      } else {
        errorMessage.value = t('login.networkError');
      }
    } else {
      errorMessage.value = t('login.unknownError');
    }
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.login-form {
  width: 100%;
  max-width: 400px; /* Puoi regolare questo valore in base alle tue preferenze */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.login-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: #d32f2f;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #ffebee;
  border-radius: 4px;
}

.register-link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.register-link a {
  color: #4CAF50;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #45a049;
  text-decoration: underline;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-password {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  color: #4CAF50;
}

.toggle-password:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .login-container {
    margin: 1rem;
    padding: 1rem;
  }

  .login-title {
    font-size: 1.5rem;
  }

  .form-group input {
    padding: 0.6rem;
  }

  .login-button {
    width: 100%;
  }
}
</style>
