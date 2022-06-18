<template>
  <ConfirmModal
    @confirm="(value) => onModalClose(value)"
    :modalActive="modalActive"
  />
  <b-card
    :title="props.contact.name"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="mb-2 text-white bg-dark"
  >
    <b-card-text>
      <div class="wrapper">
        <div>
          <div class="contact-info">
            <span class="bold">Phone: </span> {{ props.contact.contact }}
          </div>
          <div class="contact-info">
            <span class="bold">Email: </span> {{ props.contact.email }}
          </div>
        </div>
        <div class="menu-container">
          <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <img :src="optionIconSrc" alt="options" class="menu-icon" />
            </template>
            <b-dropdown-item :href="`/edit/${props.contact.id}`"
              >Edit</b-dropdown-item
            >
            <b-dropdown-item @click="deleteContact(props.contact.id)"
              >Delete</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </b-card-text>

    <b-button :href="`/edit/${props.contact.id}`" variant="secondary"
      >Details</b-button
    >
  </b-card>
</template>

<script setup lang="ts">
import type { Contact } from "@/models/contact";
import optionIconSrc from "@/assets/menu.svg";
import ContactService from "@/services/ContactService";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { ref } from "vue";

const props = defineProps<{
  contact: Contact;
}>();

const modalActive = ref(false);

const onModalClose = (value: boolean) => {
  toggleModal();
  if (value) {
    props.contact.id && ContactService.delete(props.contact.id);
  }
};

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const deleteContact = (id: number | undefined) => {
  toggleModal();
};
</script>

<style>
.wrapper {
  display: flex;
}
.contact-info {
}

.menu-container {
  flex-grow: 1;
  display: flex;
  justify-content: right;
}

.menu-icon {
  color: white;
  width: 1rem;
  height: 1.5rem;
}
</style>
