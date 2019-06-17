<template>
  <v-dialog v-model="getIsShowLoading" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        กรุณารอสักครู่ ...
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getIsShowLoading"])
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>