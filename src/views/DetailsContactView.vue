<template>
  <h1>Contact details</h1>
  <img
    :src="currentContact?.picture"
    alt="Profile picture"
    width="320"
    height="320"
    class="profile-picture"
  />

  <p><span class="bold">Name: </span>{{ currentContact?.name }}</p>
  <p><span class="bold">Contact: </span>{{ currentContact?.contact }}</p>
  <p><span class="bold">Email: </span>{{ currentContact?.email }}</p>
</template>

<script setup lang="ts">
import type { Contact } from "@/models/contact";
import { ref, onMounted, type Ref } from "vue";
import router from "@/router";
import ContactService from "@/services/ContactService";
import { useRoute } from "vue-router";

const route = useRoute();
onMounted(() => {
  if (route.params.id) {
    currentContact.value = ContactService.get(Number(route.params.id));
  }
});
const currentContact: Ref<Contact | undefined> = ref(undefined);
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.profile-picture {
  margin: 20px;
  display: flex;
}
</style>
