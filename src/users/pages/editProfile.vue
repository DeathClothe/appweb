<template>
  <NewComponent :edit-profile="editProfile" :logout="logout" :profile="profile"/>
</template>

<script>
import {useProfileStore} from "@/users/services/profile.store.js";
import NewComponent from "@/users/pages/NewComponent.vue";

export default {
  components: {NewComponent},
  computed: {
    profile() {
      return this.profileStore.profile;
    }
  },
  setup() {
    const profileStore = useProfileStore();
    return { profileStore };
  },
  methods: {
    editProfile() {
      this.$router.push("/edit-profile");
    },

    logout: function () {
      this.profileStore.clearProfile();
      this.$router.push("/login");
    }
  },
  created() {
    // Asegúrate de cargar el perfil si está en localStorage
    this.profileStore.initialize();
  }


};
</script>

<style scoped>
.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}


.logout-btn {
  background-color: #e4738f;
  color: white;
}
.profile-card{
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-details h3 {
  color: #333;
  margin-bottom: 10px;
}
</style>
