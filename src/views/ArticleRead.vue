<template>
  <div id="app">
    <layout-header/>
    <v-content>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md3>
            <v-text-field label="โน๊ต" outline readonly v-model="article.jodit.note"></v-text-field>
          </v-flex>
          <v-flex xs10 md8>
            <v-text-field label="บทความ" outline v-model="article.jodit.title"></v-text-field>
          </v-flex>
          <v-flex xs2 md1>
            <router-link :to="'/article/'+article.jodit.note+'/edit'">
              <v-btn dark small fab color="primary">
                <v-icon dark>edit</v-icon>
              </v-btn>
            </router-link>
          </v-flex>
          <v-flex xs12 v-if="article.jodit.symtom.trim()!= ''">
            <div class="title text-lg-left mb-2">ปัญหา/อาการ</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <div v-html="article.jodit.symtom" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 v-if="article.jodit.purpose.trim()!= ''">
            <div class="title text-lg-left mb-2">จุดประสงค์</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <div v-html="article.jodit.purpose" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 v-if="article.jodit.environment.trim()!= ''">
            <div class="title text-lg-left mb-2">สภาพแวดล้อม</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <div v-html="article.jodit.environment" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 v-if="article.jodit.reproducing.trim()!= ''">
            <div class="title text-lg-left mb-2">การทำซ้ำ</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <div v-html="article.jodit.reproducing" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 v-if="article.jodit.cause.trim()!= ''">
            <div class="title text-lg-left mb-2">สาเหตุ</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <div v-html="article.jodit.cause" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 v-if="article.jodit.causeRoot.trim()!= ''">
            <div class="title text-lg-left mb-2">สาเหตุเชิงลึก</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <div v-html="article.jodit.causeRoot" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 v-if="article.jodit.solution.trim()!= ''">
            <div class="title text-lg-left mb-2">วิธีแก้ปัญหา</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <div v-html="article.jodit.solution" class="mb-2"></div>
          </v-flex>
          <v-flex xs12 v-if="article.jodit.resourcesRelated.trim()!= ''">
            <div class="title text-lg-left mb-2">เนื้อหา/แหล่งอ้างอิง ที่เกี่ยวข้อง</div>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12>
            <div v-html="article.jodit.resourcesRelated"></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <layout-footer-feedback/>
    <modal-loading ref="loading"></modal-loading>
    <modal-alert ref="alert"></modal-alert>
  </div>
</template>

 <script>
import ServiceApi from "@/services/ServiceApi";
import ServiceSecurity from "@/services/ServiceSecurity";
import LayoutFooterFeedback from "@/components/LayoutFooterFeedback";

export default {
  data() {
    return {
      article: {
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
    var note = this.$route.params.note;
    var refs = this.$refs;
    note = note.split("P").join("");

    var mode = this.$route.params.mode;
    refs.loading.open();

    ServiceApi.getArticleByNote(note)
      .then(response => {
        this.article.jodit = response.data.data;
        ServiceApi.addArticleViews(note);
      })
      .catch(error => {
        refs.alert.open("เกิดข้อผิดพลาด", error.response.data.message);
      })
      .finally(function() {
        refs.loading.close();
      });
  },
  watch: {},
  components: { LayoutFooterFeedback }
};
</script>

<style>
</style>
