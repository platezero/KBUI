<template>
  <v-footer height="50" app inset style="background-color:#f2f2f2;">
    <v-container fluid grid-list-md text-xs-center ma-0>
      <v-layout align-start justify-center row fill-height grid-list-md>
        <v-flex xs12 md4 lg3>
          <v-card-text>บทความนี้มีประโยชน์สำหรับท่านหรือไม่</v-card-text>
        </v-flex>
        <v-flex xs6 md2 lg1>
          <v-btn block color="primary" :flat="type=='UL'" @click="sendFeedback('UF')">
            มี
            <v-icon v-if="type=='UF'" right dark>done</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 md2 lg1>
          <v-btn block color="primary" :flat="type=='UF'" @click="sendFeedback('UL')">
            ไม่มี
            <v-icon v-if="type=='UL'" right dark>done</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import ServiceSecurity from "@/services/ServiceSecurity";

export default {
  props: {
    note: { type: String, required: true },
    type: { type: String, default: "", required: false }
  },
  data() {
    return {};
  },
  methods: {
    sendFeedback(feedback) {
      ServiceSecurity.checkLoginAndRedirect(this.$route.path);
    }
  }
};
</script>
