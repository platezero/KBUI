<template>
  <div id="app">
    <layout-header/>
    <v-content>
      <v-container grid-list-md>
        <v-layout align-start justify-center row fill-height wrap>
          <v-flex class="mt-3 mb-3" xs12 md9>
            <div class="display-1">{{ article.jodit.title }}</div>
          </v-flex>
          <v-flex v-if="this.article.jodit.usercreate" class="mb-5" xs12 md9>
            <v-layout align-center justify-start row fill-height>
              <v-avatar class="mr-2 ml-2">
                <img
                  :src="article.avatarUrl"
                  alt="Image not found"
                  onerror="this.onerror=null;this.src='https://image.flaticon.com/icons/svg/1256/1256650.svg';"
                >
              </v-avatar>
              <v-flex xs11>
                <v-layout align-start justify-center column fill-height>
                  <v-flex xs6 mb-0 pb-0>
                    <div
                      class="font-weight-medium body-2"
                    >{{ article.jodit.usercreate | splitempname }}</div>
                  </v-flex>
                  <v-flex xs6 mt-0 pt-0>
                    <div class="grey--text text--darken-2">
                      {{ article.jodit.datecreate }} &nbsp; - &nbsp;
                      <!-- {{ [ '15/05/2019', "DD/MM/YYYY" ] | moment("from", "now") }}&nbsp; - &nbsp; -->
                      <v-icon small alt="จำนวนคนดู">visibility</v-icon>
                      {{ article.jodit.views }}
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 md9 mb-3 v-if="article.jodit.symtom.trim()!= ''">
            <div class="title text-lg-left mb-2">ปัญหา/อาการ</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 md9 mb-3 class="mb-4" v-if="article.jodit.symtom.trim()!= ''">
            <div v-html="article.jodit.symtom"></div>
          </v-flex>
          <v-flex xs12 md9 mb-3 v-if="article.jodit.purpose.trim()!= ''">
            <div class="title text-lg-left mb-2">จุดประสงค์</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 md9 mb-3 class="mb-4" v-if="article.jodit.purpose.trim()!= ''">
            <div v-html="article.jodit.purpose" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 md9 mb-3 v-if="article.jodit.environment.trim()!= ''">
            <div class="title text-lg-left mb-2">สภาพแวดล้อม</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 md9 mb-3 class="mb-4" v-if="article.jodit.environment.trim()!= ''">
            <div v-html="article.jodit.environment" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 md9 mb-3 v-if="article.jodit.reproducing.trim()!= ''">
            <div class="title text-lg-left mb-2">การทำซ้ำ</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 md9 mb-3 class="mb-4" v-if="article.jodit.reproducing.trim()!= ''">
            <div v-html="article.jodit.reproducing" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 md9 mb-3 v-if="article.jodit.cause.trim()!= ''">
            <div class="title text-lg-left mb-2">สาเหตุ</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 md9 mb-3 class="mb-4" v-if="article.jodit.cause.trim()!= ''">
            <div v-html="article.jodit.cause" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 md9 mb-3 v-if="article.jodit.causeRoot.trim()!= ''">
            <div class="title text-lg-left mb-2">สาเหตุเชิงลึก</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 md9 mb-3 class="mb-4" v-if="article.jodit.causeRoot.trim()!= ''">
            <div v-html="article.jodit.causeRoot" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 md9 mb-3 v-if="article.jodit.solution.trim()!= ''">
            <div class="title text-lg-left mb-2">วิธีแก้ปัญหา</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 md9 mb-3 class="mb-4" v-if="article.jodit.solution.trim()!= ''">
            <div v-html="article.jodit.solution" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 md9 v-if="article.jodit.resourcesRelated.trim()!= ''">
            <div class="title text-lg-left mb-2">เนื้อหา/แหล่งอ้างอิง ที่เกี่ยวข้อง</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 md9 v-if="article.jodit.resourcesRelated.trim()!= ''">
            <div v-html="article.jodit.resourcesRelated"></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <layout-footer-feedback ref="feedback"/>
    <modal-loading ref="loading"></modal-loading>
    <modal-alert ref="alert"></modal-alert>
  </div>
</template>

 <script>
import ServiceApi from "@/services/ServiceApi";
import ServiceUtil from "@/services/ServiceUtil";
import ServiceSecurity from "@/services/ServiceSecurity";
import LayoutFooterFeedback from "@/components/LayoutFooterFeedback";

export default {
  data() {
    return {
      article: {
        avatarUrl: "",
        plain: {
          note: "",
          title: "",
          purpose: "",
          symtom: "",
          environment: "",
          reproducing: "",
          cause: "",
          causeRoot: "",
          solution: "",
          resourcesRelated: ""
        },
        jodit: {
          note: "",
          title: "",
          purpose: "",
          symtom: "",
          environment: "",
          reproducing: "",
          cause: "",
          causeRoot: "",
          solution: "",
          resourcesRelated: ""
        }
      }
    };
  },
  methods: {},
  mounted() {
    var self = this;
    var note = this.$route.params.note;
    var refs = this.$refs;
    note = note.split("P").join("");

    var mode = this.$route.params.mode;
    refs.loading.open();

    ServiceApi.getArticleByNote(note)
      .then(response => {
        self.article.jodit = response.data.data;
        ServiceApi.addArticleViews(note);
        refs.feedback.initial(
          note,
          self.article.jodit.usercreate.split(" : ")[0]
        );
        self.article.avatarUrl = ServiceUtil.getAvatarUrl(
          self.article.jodit.usercreate.split(" : ")[0]
        );
      })
      .catch(error => {
        refs.alert.open("เกิดข้อผิดพลาด", error.response.data.message);
      })
      .finally(function() {
        refs.loading.close();
      });
  },
  watch: {},
  components: { LayoutFooterFeedback },
  computed: {},
  filters: {
    splitempid: function(value) {
      return value.split(" : ")[0];
    },
    splitempname: function(value) {
      return value.split(" : ")[1];
    }
  }
};
</script>

<style lang="css">
/* ป้องกัน Toolbar เลื่อนขึ้นไปทับเมนู */
.jodit_sticky > .jodit_toolbar {
  z-index: 0;
}
</style>
