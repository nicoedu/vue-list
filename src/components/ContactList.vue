<script setup lang="ts">
import ContactService from "@/services/ContactService";
import ContactCard from "./ContactCard.vue";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import type { Contact } from "@/models/contact";


const data: Ref<Contact[]> = ref([]);

onMounted(() => {
  data.value = ContactService.getAll();
});
</script>

<template>
  <div class="wrapper">
    <div class="item" v-for="item in data" :key="item.id">
      <ContactCard :contact="item" />
    </div>
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
.wrapper {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 0 32%;
  height: 320px;
  margin-bottom: 2%;
}

@media (max-width: 699px) {
  .wrapper {
    justify-content: space-around;
  }
  .item {
    flex: 0 42%;
    height: 320px;
    margin-bottom: 2%;
  }
}
</style>
