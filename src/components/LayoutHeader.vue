<template>
  <v-toolbar color="black" dark fixed app>
    <v-btn icon @click="redirect('/')">
      <img style="width:32px;" src="@/assets/exat_logo.png" alt="Vuetify">
    </v-btn>
    <v-toolbar-title @click="redirect('/')">EXAT Knowledge Based System</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="success" @click="redirect('/article')">+ สร้างบทความ</v-btn>
    <v-btn icon large>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-icon>account_circle</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    redirect: function(path) {
      this.$router.push(path);
    }
  }
};
</script>
