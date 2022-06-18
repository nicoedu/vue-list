<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <p>Are you sure you want to delete this contact?</p>
          <div class="buttons">
            <b-button @click="close" type="button" variant="secondary"
              >Cancel</b-button
            >
            <b-button @click="confirm" type="button" variant="danger"
              >Confirm</b-button
            >
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
const emit = defineEmits(["confirm"]);
const close = () => {
  emit("confirm", false);
};
const props = defineProps<{
  modalActive: boolean;
}>();
const confirm = () => {
  emit("confirm", true);
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(20, 20, 20, 0.6);
  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 64px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .buttons {
      min-width: 30%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
