<script setup lang="ts">
import ContactService from "@/services/ContactService";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
interface Contact {
  id: number;
  name: string;
  contact: number;
  email: string;
  picture: string;
}

const data: Ref<Contact[]> = ref([]);

onMounted(() => {
  data.value = ContactService.getAll();
});

const onClick = () => {
  ContactService.create({
    id: 1,
    name: "João",
    contact: 99999999,
    email: "teste@a.a",
    picture: "base",
  });
};
</script>

<template>
  <div class="wrapper">
    <div v-for="item in data" :key="item.id">
      <p>{{ item.name }}</p>
    </div>
    <button @click="onClick">Add</button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
