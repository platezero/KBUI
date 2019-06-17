<template>
  <div id="app">
    <layout-header/>
    <v-content>
      <v-container grid-list-md>
        <v-layout align-center justify-center wrap>
          <v-flex xs11 sm10 md9>
            <v-breadcrumbs :items="breadcrumbs">
              <template v-slot:divider>
                <v-icon>chevron_right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-flex>
          <v-flex xs11 sm10 md9>
            <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="index+'-label'" class="subheading">{{ header }}</v-subheader>

              <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

              <v-list-tile
                v-else
                :key="item.title+'-'+index"
                avatar
                @click="$router.push('/article/'+item.note)"
                class="ma-3"
              >
                <v-list-tile-avatar>
                  <img
                    :src="item.avatar"
                    alt="Image not found"
                    onerror="this.onerror=null;this.src='https://image.flaticon.com/icons/svg/1256/1256650.svg';"
                  >
                </v-list-tile-avatar>

                <v-list-tile-content @click="$router.push('/article/'+item.note)">
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <layout-footer/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ServiceApi from "@/services/ServiceApi";
import ServiceUtil from "@/services/ServiceUtil";
export default {
  data() {
    return {
      items: [],
      query: "",
      breadcrumbs: [
        {
          text: "หน้าหลัก",
          disabled: false,
          href: "/"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["showLoading", "hideLoading"])
  },
  mounted() {
    var self = this;
    this.query =
      this.$route.params.query == null ||
      !this.$route.params.query ||
      this.$route.params.query == "all"
        ? ""
        : this.$route.params.query;

    this.breadcrumbs.push({
      text: "ผลการค้นหา",
      disabled: true
    });
    this.breadcrumbs.push({
      text:
        '"' +
        (this.query == null || this.query == "" || this.query == "all"
          ? "ทั้งหมด"
          : this.query) +
        '"',
      disabled: true
    });

    self.showLoading();

    ServiceApi.listArticleByQuery(this.query)
      .then(response => {
        response.data.data.forEach((element, i) => {
          var title = element.title;
          var usercCreateId = element.usercreate.split(":")[0].trim();
          var usercCreateName = element.usercreate.split(":")[1].trim();

          var note = String(element.note);
          var note = note.replace("P", "");
          var avatarUrl = ServiceUtil.getAvatarUrl(usercCreateId);
          var views = element.views;

          this.items.push({
            note: note,
            avatar: avatarUrl,
            title: title,
            subtitle:
              "<span class='text--primary'>Note : " +
              note +
              "</span> &mdash; " +
              usercCreateName,
            views: views
          });
          this.items.push({ divider: true, inset: true });
        });
      })
      .catch(error => {})
      .finally(() => {
        self.hideLoading();
      });
  }
};
</script>
