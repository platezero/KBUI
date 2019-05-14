<template>
  <v-layout v-if="modalState" row justify-center>
    <v-dialog v-model="modalState" max-width="400">
      <v-card>
        <v-card-title class="title">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>{{ description }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="handleConfirmButton">ตกลง</v-btn>
          <v-btn flat @click="handleCancelButton">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      title: "",
      description: "",
      reference: null,
      modalState: false
    };
  },
  methods: {
    open() {
      this.modalState = true;
    },
    open(title, description) {
      this.modalState = true;
      this.title = title;
      this.description = description;
    },
    open(title, description, reference) {
      this.modalState = true;
      this.title = title;
      this.description = description;
      this.reference = reference;
    },
    close() {
      this.modalState = false;
    },
    handleCloseButton() {
      this.modalState = false;
    },
    handleCancelButton() {
      this.$emit("cancel", null);
      this.handleCloseButton();
    },
    handleConfirmButton() {
      this.$emit("ok", this.reference);
      this.handleCloseButton();
    }
  }
};
</script>

<style>
</style>
