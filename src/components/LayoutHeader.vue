<template>
  <div>
    <v-toolbar
      :dark="dark"
      :color="dark?'rgba(0, 0, 0, 0.85)':'rgba(255, 255, 255, 0.95)'"
      fixed
      app
    >
      <v-btn icon @click="redirect('/')">
        <img style="width:32px;" :src="'/assets/exat_logo.png'" alt="Vuetify">
      </v-btn>
      <v-toolbar-title @click="redirect('/')" style="cursor: pointer;">
        <div v-bind:class="[dark ? 'font-weight-regular' : 'font-weight-light']">{{ toolbarTitle }}</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="redirect('/article/create')">{{ toolbarAddArticleText }}</v-btn>
      <!-- <v-btn icon large>
        <v-icon>notifications</v-icon>
      </v-btn>-->

      <v-menu v-if="isAlreadyLogin" offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>
        <v-list :dense="true">
          <template v-for="(item, index) in items">
            <v-list-tile v-if="item.action" :key="item.title" @click="redirect(item.url)">
              <v-list-tile-avatar>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="body-2">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider v-else-if="item.divider" :key="index"></v-divider>
            <v-subheader v-else-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
          </template>
        </v-list>
      </v-menu>
      <v-btn v-if="!isAlreadyLogin" flat @click="redirect('/login')">เข้าสู่ระบบ</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import ServiceSecurity from "@/services/ServiceSecurity";

export default {
  props: {
    dark: { type: Boolean, default: false }
  },
  data() {
    return {
      isAlreadyLogin: false,
      items: [
        { header: "ทั่วไป" },
        {
          action: "library_books",
          title: "บทความที่นำเสนอ",
          url: "/myarticle"
        },
        { divider: true },
        { header: "ระบบ" },
        { action: "exit_to_app", title: "ออกจากระบบ", url: "/logout" }
      ]
    };
  },
  methods: {
    redirect: function(path) {
      if (path == "/article") {
        ServiceSecurity.checkLoginAndRedirect();
      } else if (path == "/logout") {
        ServiceSecurity.logout();
      }
      this.$router.push(path);
    },
    checkLogin() {
      var self = this;
      ServiceSecurity.checkLogin()
        .then(function(response) {
          self.isAlreadyLogin = true;
        })
        .catch(function(error) {
          self.isAlreadyLogin = false;
        });
    }
  },
  mounted() {
    this.checkLogin();
  },
  computed: {
    toolbarTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "EXAT KB";
        case "sm":
          return "EXAT Knowledge Based System";
        default:
          return "EXAT Knowledge Based System";
      }
    },
    toolbarAddArticleText() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "+ บทความ";
        case "sm":
          return "+ บทความ";
        default:
          return "+ นำเสนอบทความ";
      }
    }
  }
};
</script>
