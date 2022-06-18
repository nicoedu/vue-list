<template>
  <h1>{{ title }}</h1>
  <b-form @submit.stop.prevent="onSubmit" novalidate>
    <b-form-group id="input-group-1" label="Name:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.name"
        placeholder="Enter name"
        :state="validateForm.name"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="validateForm.name">
        The name must be at least 6 characters long.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group id="input-group-2" label="Contact:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.contact"
        type="tel"
        placeholder="Enter contact"
        :state="validateForm.contact"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="validateForm.contact">
        The contact info must be an 9 digits number.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group id="input-group-3" label="Email address:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="form.email"
        type="email"
        placeholder="Enter email"
        :state="validateForm.email"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="validateForm.email">
        Insert a valid email
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="input-group-4"
      label="Select picture:"
      label-for="input-4"
    >
      <input
        id="input-4"
        type="file"
        @input="uploadImage($event.target as HTMLInputElement)"
      />
      <b-form-invalid-feedback :state="validateForm.picture">
        Insert a valid image
      </b-form-invalid-feedback>
    </b-form-group>

    <b-alert
      variant="danger"
      class="text-center error"
      :show="formErrorInfo.length > 0"
      dismissible
    >
      {{ formErrorInfo }}
    </b-alert>
    <div class="buttons">
      <b-button type="submit" variant="dark">Submit</b-button>
      <b-button @click="returnToList()" variant="danger">Cancel</b-button>
    </div>
  </b-form>
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
    currentEditId = Number(route.params.id);
    const currentContact = ContactService.get(Number(route.params.id));
    if (currentContact) {
      delete currentContact.id;
      form.value = {
        ...currentContact,
        contact: String(currentContact.contact),
      };
    }
    title.value = "Edit contact";
    editMode.value = true;
  }
});
let currentEditId = 0;
const title = ref("Add contact");
const formErrorInfo = ref("");
const editMode = ref(false);
const processingImage = ref(false);
const form = ref({
  name: "",
  email: "",
  contact: "",
  picture: "",
});

const uploadImage = (eventTarget: HTMLInputElement | null) => {
  processingImage.value = true;
  const reader = new FileReader();
  if (eventTarget && eventTarget.files && eventTarget.files.length > 0)
    reader.readAsDataURL(eventTarget.files[0]);
  reader.onload = () => {
    form.value.picture = String(reader.result);
    processingImage.value = false;
  };
};

const validateForm: Ref<{ [key: string]: null | boolean }> = ref({
  name: null,
  email: null,
  contact: null,
  picture: null,
});

const returnToList = () => {
  router.push({ path: "/#/" });
}

const createContact = () => {
  const result = ContactService.create({
    id: -1,
    ...form.value,
    contact: Number(form.value.contact),
  });
  if (result.success) {
    formErrorInfo.value = "";
    router.push({ path: "/#/" });
  } else {
    formErrorInfo.value = result.data || "Error while trying to create contact";
  }
};

const editContact = () => {
  const result = ContactService.update({
    id: currentEditId,
    ...form.value,
    contact: Number(form.value.contact),
  });
  console.log(result);
  if (result.success) {
    formErrorInfo.value = "";
    router.push({ path: "/#/" });
  } else {
    formErrorInfo.value = result.data || "Error while trying to create contact";
  }
};

const validateFields = () => {
  let response = true;
  if (form.value.name.length <= 5) {
    validateForm.value.name = false;
    response = false;
  } else {
    validateForm.value.name = true;
  }
  if (!form.value.contact.match(/^\d{9}$/)) {
    validateForm.value.contact = false;
    response = false;
  } else {
    validateForm.value.contact = true;
  }
  if (!form.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    validateForm.value.email = false;
    response = false;
  } else {
    validateForm.value.email = true;
  }
  if (form.value.picture.length === 0) {
    validateForm.value.picture = false;
    response = false;
  } else {
    validateForm.value.picture = true;
  }
  return response;
};

const onSubmit = () => {
  if (processingImage.value) {
    formErrorInfo.value = "Wait for the image to be processed";
  }
  if (!validateFields()) {
    return;
  }
  editMode.value ? editContact() : createContact();
};
</script>

<style>
.buttons {
  display: flex;
  min-width: 150px;
  max-width: 200px;
  justify-content: space-around;
}
</style>
