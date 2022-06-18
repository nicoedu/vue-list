<script setup lang="ts">
import ContactList from "@/components/ContactList.vue";
import router from "@/router";
const onClick = () => {
  router.push("/edit");
};
</script>

<template>
  <ContactList />
  <b-button @click="onClick">Add new contact</b-button>
</template>
