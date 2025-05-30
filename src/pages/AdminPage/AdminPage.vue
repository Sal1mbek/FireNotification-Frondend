<template>
  <div style="font-family: 'Inter', sans-serif" class="h-full w-full bg-white flex flex-col pl-[52px] lg:pl-[72px] md:pr-[52px] pt-10">
    <div class="container mx-auto md:px-5 px-2">
      <div class="text-center mb-8 flex justify-between">
        <h1 class="text-3xl font-bold text-gray-800">Admin Page</h1>
      </div>
    </div>
    <div class="overflow-x-auto p-4">
      <table class="min-w-full border border-gray-200 shadow-sm rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Photo</th>
            <th class="px-4 py-2 text-left">Username</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2 text-left">Phone</th>
            <th class="px-4 py-2 text-left">Role</th>
            <th class="px-4 py-2 text-left">Change Role</th>
            <th class="px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0">
            <td class="px-4 py-6 text-center text-gray-500" colspan="7">
              No users found.
            </td>
          </tr>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">
              <img
                v-if="user.photo"
                :src="`data:image/jpeg;base64,${user.photo}`"
                alt="User Photo"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div
                v-else
                class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500"
              >
                N/A
              </div>
            </td>
            <td class="px-4 py-2">{{ user.username }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.phoneNumber }}</td>
            <td class="px-4 py-2 capitalize">{{ user.roles }}</td>
            <td class="px-4 py-2">
              <select v-model="user.newRole" class="border rounded px-2 py-1 text-sm mr-2">
                <option disabled value="">Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              <button
                @click="()=> user.newRole !== user.roles && changeRole(user.id, user.newRole)"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Change
              </button>
            </td>
            <td class="px-4 py-2">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="success" class="text-green-600 mt-4">{{ success }}</div>
      <div v-if="error" class="text-red-600 mt-4">{{ error }}</div>
    </div>
  </div>
</template>
<script>
import { changeUserRole, getAllUsers } from '@/services/adminService';

export default {
  name: "AdminPage",
  data() {
    return {
      users: [],
      error: '',
      success: ''
    };
  },
  methods: {
    async changeRole(userId, role) {
      if (!role) {
        this.error = "Please select a role";
        return;
      }

      try {
        const res = await changeUserRole(userId, role);
        if (res) {
          this.success = "User role successfully changed";
          this.error = '';
          this.loadUsers();
        } else {
          this.error = "Error changing role";
        }
      } catch (err) {
        this.error = err?.message || "Error changing role";
      }
    },
    async loadUsers() {
      const res = await getAllUsers();
      this.users = res.map(user => ({ ...user, newRole: '' }));
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>
