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
      <input id="input-4" type="file" />
    </b-form-group>

    <b-alert
      variant="dark"
      class="text-center error"
      v-show="formErrorInfo.length > 0"
      dismissible
    >
      {{ formErrorInfo }}
    </b-alert>
    <b-button type="submit" variant="dark">Submit</b-button>
    <b-button type="reset" variant="danger">Cancelar</b-button>
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
      form.value = currentContact;
    }
    title.value = "Edit contact";
    editMode.value = true;
  }
});
let currentEditId = 0;
const title = ref("Add contact");
const formErrorInfo = ref("");
const editMode = ref(false);
const form = ref({
  name: "",
  email: "",
  contact: "",
  picture: "",
});

const validateForm: Ref<{ [key: string]: null | boolean }> = ref({
  name: null,
  email: null,
  contact: null,
  picture: null,
});

const createContact = () => {
  const result = ContactService.create({
    id: -1,
    ...form.value,
    contact: Number(form.value.contact),
  });
  if (result.success) {
    formErrorInfo.value = "";
    router.push("/");
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
  if (result.success) {
    formErrorInfo.value = "";
    router.push("/");
  } else {
    formErrorInfo.value = result.data || "Error while trying to create contact";
  }
};

const validateFields = () => {
  let response = true;
  if (form.value.name.length <= 5) {
    validateForm.value.name = false;
    response = false;
  }else{
    validateForm.value.name = true;
  }
  console.log(form.value.contact.match(/^\d{9}$/))
  if (!form.value.contact.match(/^\d{9}$/)) {
    validateForm.value.contact = false;
    response = false;
  } else {
    validateForm.value.contact = true;
  }
  if (!form.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    validateForm.value.email = false;
    response = false;
  }else{
    validateForm.value.email = true;
  }
  return response;
};

const onSubmit = (event) => {
  console.log(form.value)
  console.log(form.value.contact.length)
  event.preventDefault();
  if (!validateFields()) {
    return;
  }
  editMode.value ? editContact() : createContact();
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
