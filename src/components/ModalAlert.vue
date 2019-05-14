<template>
  <v-dialog v-model="dialog" width="400">
    <v-card>
      <!-- <v-card-title class="headline grey lighten-2" primary-title>{{ title }}</v-card-title> -->
      <v-card-title class="title">{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="dialog = false">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      dialog: false
    };
  },
  methods: {
    open(title, description) {
      this.title = title;
      this.description = description;
      this.dialog = true;
    }
  }
};
</script>