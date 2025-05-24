<template>
  <div class="p-8 space-y-6">
    <!-- Profile Settings -->
    <div class="card-section">
      <h2 class="section-title">Profile Settings</h2>
      <div class="space-y-4">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" v-model="name" type="text" placeholder="Enter your name" class="input" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" class="input" />
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input id="phone" v-model="phone" type="text" placeholder="Enter your phone number" class="input" />
        </div>
      </div>
      <button class="button mt-4" @click="updateProfile">Update Profile Settings</button>
    </div>

    <!-- Notification Settings -->
    <div class="card-section">
      <h2 class="section-title">Notification Settings</h2>
      <div class="form-group-row">
        <label for="emailNotifications">Receive Email Notifications</label>
        <input id="emailNotifications" type="checkbox" v-model="emailNotifications" class="checkbox" />
      </div>
      <div class="form-group-row">
        <label for="smsNotifications">Receive SMS Notifications</label>
        <input id="smsNotifications" type="checkbox" v-model="smsNotifications" class="checkbox" />
      </div>
    </div>

    <!-- Change Password -->
    <div class="card-section">
      <h2 class="section-title">Change Password</h2>
      <div class="space-y-4">
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input id="newPassword" v-model="newPassword" type="password" placeholder="Enter new password" class="input" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm password" class="input" />
        </div>
      </div>
      <button class="button mt-4" @click="changePassword">Change Password</button>
    </div>

    <!-- Preferences -->
    <div class="card-section">
      <h2 class="section-title text-[#ac0e28]">Preferences</h2>
      <div class="form-group">
        <label for="language">Language</label>
        <select id="language" v-model="language" class="input">
          <option value="english">English</option>
          <option value="chinese">Chinese</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const emailNotifications = ref(false)
const smsNotifications = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const language = ref('english')

onMounted(() => {
  console.log('Settings Dashboard Loaded Successfully')
})

const updateProfile = () => {
  alert('Profile updated successfully!')
}

const changePassword = () => {
  if (newPassword.value === confirmPassword.value) {
    alert('Password changed successfully!')
  } else {
    alert('Passwords do not match.')
  }
}
</script>

<style scoped>
/* Glassmorphism Card */
.card-section {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 1rem;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Section Title */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
}

/* Labels */
label {
  color: #e0e0e0;
  font-weight: 500;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Inputs & Select */
.input {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 0.5rem;
  outline: none;
  width: 100%;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input:focus {
  border-color: #ac0e28;
  box-shadow: 0 0 0 3px rgba(172, 14, 40, 0.4);
}

/* Checkbox */
.checkbox {
  width: 20px;
  height: 20px;
  accent-color: #ac0e28;
}

/* Button */
.button {
  background-color: #ac0e28;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
  background-color: #930c23;
  transform: scale(1.02);
}
</style>
