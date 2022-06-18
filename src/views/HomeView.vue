<script setup lang="ts">
import ContactList from "@/components/ContactList.vue";
import router from "@/router";
const onClick = () => {
  router.push("/edit");
};
</script>

<template>
  <ContactList />
  <div class="add-button">
    <b-button @click="onClick">Add new contact</b-button>
  </div>
</template>

<style>
.add-button {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
}
</style>
