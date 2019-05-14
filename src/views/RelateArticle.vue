<template>
  <v-layout align-end justify-start column fill-height>
    <v-flex xs1 pa-0 ma-0>
      <v-btn
        pa-0
        ma-0
        round
        color="success"
        @click="isShow ? isShow = false : isShow = true"
        style="right: -24px;"
      >{{ isShow ? 'X' : '&copy;KM NOTE' }}&nbsp;&nbsp;&nbsp;</v-btn>
    </v-flex>
    <v-flex xs12 v-if="isShow">
      <v-card>
        <!-- {{ $route.params.kmnote }} -->
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

            <v-list-tile v-else :key="item.title" avatar @click="openUrl(item.url)">
              <v-list-tile-avatar>
                <img :src="item.avatar">
                <!-- <div class="display-1">{{ index }}.</div> -->
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";

export default {
  data() {
    return {
      isShow: false,
      items: [
        { header: "หัวข้อที่เกี่ยวข้อง" }
        // {
        //   avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //   title: "1. ไม่สามารถบันทึกรับชำระได้",
        //   subtitle: "- ภูมิภัทร สุขภิมนตรี",
        //   url: "https://www.w3schools.com"
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        //   title: "2. วิธีใช้งาน Quick Assistant",
        //   subtitle: "- บัณฑิต พุทธศรี"
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        //   title: "3. วิธีติดตั้ง SAP GUI Connection",
        //   subtitle: "- ขรินทร์ธร บุญทัน"
        // }
      ]
    };
  },
  methods: {
    openUrl: function(url) {
      window.open(url, "_blank");
    }
  },
  mounted() {
    var note = this.$route.params.note;
    ServiceApi.listArticleByNote(note).then(response => {
      var runningNo = 0;
      response.data.data.forEach(element => {
        runningNo += 1;
        var empid = element.usercreate.split(" : ")[0];
        var note = element.note;
        var title = runningNo + ". " + element.title;
        var userCreate = element.usercreate.split(" : ")[1];
        var avatarUrl =
          "http://172.20.1.58/SecurityManager/images/employees/" +
          empid.substr(1, 2) +
          "/" +
          empid +
          ".jpg";
        var BASE_URL = process.env.VUE_APP_API_KB_ENDPOINT;
        var url = BASE_URL + "/#/article/" + note;

        this.items.push({
          note: note,
          avatar: avatarUrl,
          title: title,
          subtitle: "@" + userCreate,
          url: url
        });
      });
    });
  }
};
</script>