<template>
  <div id="app">
    <layout-header/>
    <v-content>
      <v-container grid-list-md>
        <!-- <v-expansion-panel expand>
          <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
            <template v-slot:header>
              <div>Item</div>
            </template>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>-->
        <v-layout row wrap>
          <v-flex xs12 md3>
            <v-text-field label="โน๊ต" outline readonly v-model="article.jodit.note"></v-text-field>
          </v-flex>
          <v-flex xs12 md9>
            <v-text-field label="บทความ" outline v-model="article.jodit.title"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <div class="title text-lg-left">ปัญหา/อาการ</div>
          </v-flex>
          <v-flex xs12 v-if="readOnly">
            <div v-html="article.jodit.symtom"></div>
          </v-flex>
          <v-flex xs12 mb-2 v-if="!readOnly">
            <editor-jodit
              ref="symtom"
              :id="'symtom'"
              v-model="article.jodit.symtom"
              :value="''"
              :config="config.jodit.mode"
            ></editor-jodit>
          </v-flex>
          <v-flex xs12>
            <div class="title text-lg-left">จุดประสงค์</div>
          </v-flex>
          <v-flex xs12 mb-2>
            <editor-jodit
              ref="purpose"
              :id="'purpose'"
              v-model="article.jodit.purpose"
              :value="''"
              :config="config.jodit.mode"
            ></editor-jodit>
          </v-flex>
          <v-flex xs12>
            <div class="title text-lg-left">สภาพแวดล้อม</div>
          </v-flex>
          <v-flex xs12 mb-2>
            <editor-jodit
              ref="environment"
              :id="'environment'"
              v-model="article.jodit.environment"
              :value="''"
              :config="config.jodit.mode"
            ></editor-jodit>
          </v-flex>
          <v-flex xs12>
            <div class="title text-lg-left">วิธีการทำซ้ำ</div>
          </v-flex>
          <v-flex xs12 mb-2>
            <editor-jodit
              ref="reproducing"
              :id="'reproducing'"
              v-model="article.jodit.reproducing"
              :value="''"
              :config="config.jodit.mode"
            ></editor-jodit>
          </v-flex>
          <v-flex xs12>
            <div class="title text-lg-left">สาเหตุ</div>
          </v-flex>
          <v-flex xs12 mb-2>
            <editor-jodit
              ref="cause"
              :id="'cause'"
              v-model="article.jodit.cause"
              :value="''"
              :config="config.jodit.mode"
            ></editor-jodit>
          </v-flex>
          <v-flex xs12>
            <div class="title text-lg-left">สาเหตุเชิงลึก</div>
          </v-flex>
          <v-flex xs12 mb-2>
            <editor-jodit
              ref="causeRoot"
              :id="'causeRoot'"
              v-model="article.jodit.causeRoot"
              :value="''"
              :config="config.jodit.mode"
            ></editor-jodit>
          </v-flex>
          <v-flex xs12>
            <div class="title text-lg-left">วิธีแก้ปัญหา</div>
          </v-flex>
          <v-flex xs12 mb-2>
            <editor-jodit
              ref="solution"
              :id="'solution'"
              v-model="article.jodit.solution"
              :value="''"
              :config="config.jodit.mode"
            ></editor-jodit>
          </v-flex>
          <v-flex xs12>
            <div class="title text-lg-left">เนื้อหา/แหล่งอ้างอิง ที่เกี่ยวข้อง</div>
          </v-flex>
          <v-flex xs12 mb-2>
            <editor-jodit
              ref="resourcesRelated"
              :id="'resourcesRelated'"
              v-model="article.jodit.resourcesRelated"
              :value="''"
              :config="config.jodit.mode"
            ></editor-jodit>
          </v-flex>
          <v-layout row justify-center>
            <v-flex xs4>
              <!-- <modal-confirm ref="modalฟสำพะ" v-on:ok="confirmSaveArticle"></modal-confirm> -->
              <modal-loading ref="loading"></modal-loading>
              <modal-alert ref="alert"></modal-alert>
              <modal-confirm ref="confirm" v-on:ok="confirmSaveArticle"></modal-confirm>
              <v-btn large color="primary" dark block @click.stop="saveArticle">บันทึก</v-btn>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

 <script>
import LayoutFooterFeedback from "@/components/LayoutFooterFeedback";
// import { VueEditor, Quill } from "vue2-editor";
// import { ImageDrop } from "quill-image-drop-module";
import EditorJodit from "@/components/EditorJodit";

import ServiceApi from "@/services/ServiceApi";
import ServiceSecurity from "@/services/ServiceSecurity";

// var BackgroundClass = Quill.import("attributors/class/background");
// var ColorClass = Quill.import("attributors/class/color");
// var SizeStyle = Quill.import("attributors/style/size");
// Quill.register(SizeStyle, true);

// import { ImageResize } from "quill-image-resize-module";

// Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/imageDrop", ImageDrop);

export default {
  data() {
    return {
      config: {
        jodit: {
          mode: {
            placeholder: "กรุณาระบุเนื้อหา",
            iframe: true,
            uploader: {
              insertImageAsBase64URI: true
            }
          }
        }
      },
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
        quill: {
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
      },
      readOnly: false,
      content: "<h1>Some initial content</h1>",
      qtext: "",
      editorSettings: {
        modules: {
          imageDrop: true
        }
      },
      editorSettingsReadOnly: {
        modules: {
          toolbar: false,
          imageDrop: true
        },
        theme: "bubble",
        readOnly: true
      }
    };
  },
  // beforeRouteUpdate(to, from, next) {
  //   // this.name = to.params.name //Receive Parameter
  //   next();
  // },
  methods: {
    getPlainText() {
      alert(this.$refs.test1.getPlainText());
    },
    // focusEditor() {
    //   console.log(this.$refs.qeditor1.quill.getText());
    //   this.$refs.qeditor1.quill.focus();
    // },
    saveArticle() {
      this.$refs.confirm.open(
        "ยืนยันการบันทึกข้อมูล",
        "ตรวจสอบข้อมูลทุกครั้งก่อนการบันทึกข้อมูล"
      );
    },
    confirmSaveArticle() {
      var self = this;
      this.$refs.loading.open();
      // console.log(this.$refs.qeditor1.quill.getText());
      this.assignPlainTextJodit();
      ServiceApi.saveArticle(this.article)
        .then(response => {
          console.log(response);
          this.$refs.loading.close();
          this.$refs.alert.open("ผลลัพธ์การทำรายการ", response.data.message);
          self.article.jodit.note = response.data.data.note;
        })
        .catch(error => {
          console.log(error.response);
          this.$refs.loading.close();
          try {
            this.$refs.alert.open(
              "เกิดข้อผิดพลาด",
              error.response.data.message
            );
          } catch (e) {}
        });
    },
    assignPlainTextQuill() {
      // alert(this.article.quill.title);
      // alert(this.$refs.purpose.quill.getText());
      this.article.plain.title = this.article.quill.title;
      this.article.plain.purpose = this.$refs.purpose.quill.getText();
      this.article.plain.symtom = this.$refs.symtom.quill.getText();
      this.article.plain.environment = this.$refs.environment.quill.getText();
      this.article.plain.reproducing = this.$refs.reproducing.quill.getText();
      this.article.plain.cause = this.$refs.cause.quill.getText();
      this.article.plain.causeRoot = this.$refs.causeRoot.quill.getText();
      this.article.plain.solution = this.$refs.solution.quill.getText();
      this.article.plain.resourcesRelated = this.$refs.resourcesRelated.quill.getText();
    },
    assignPlainTextJodit() {
      // alert(this.article.quill.title);
      // alert(this.$refs.purpose.quill.getText());
      this.article.plain.note = this.article.jodit.note;
      this.article.plain.title = this.article.jodit.title;
      this.article.plain.purpose = this.$refs.purpose.getPlainText();
      this.article.plain.symtom = this.$refs.symtom.getPlainText();
      this.article.plain.environment = this.$refs.environment.getPlainText();
      this.article.plain.reproducing = this.$refs.reproducing.getPlainText();
      this.article.plain.cause = this.$refs.cause.getPlainText();
      this.article.plain.causeRoot = this.$refs.causeRoot.getPlainText();
      this.article.plain.solution = this.$refs.solution.getPlainText();
      this.article.plain.resourcesRelated = this.$refs.resourcesRelated.getPlainText();
    }
  },
  mounted() {
    if (this.$route.params.note) {
      if (this.$route.params.note == "create") {
        ServiceSecurity.checkLoginAndRedirect(this.$route.path);
      } else {
        ServiceSecurity.checkLoginAndRedirect(this.$route.path);
        var note = this.$route.params.note;
        note = note.split("P").join("");

        var mode = this.$route.params.mode;
        this.$refs.loading.open();

        ServiceApi.getArticleByNote(note)
          .then(response => {
            this.$refs.loading.close();
            this.article.jodit = response.data.data;
            ServiceApi.addArticleViews(note);
          })
          .catch(error => {
            this.$refs.loading.close();
            this.$refs.alert.open(
              "เกิดข้อผิดพลาด",
              error.response.data.message
            );
          })
          .finally(function() {});
      }
    }
  },
  watch: {
    // content: function() {
    //   this.qtext = this.$refs.qeditor1.quill.getText();
    // }
  },
  components: {
    // VueEditor,
    EditorJodit
  }
};
</script>

<style lang="css">
/* .ql-container.ql-snow {
  border: 0px solid #ccc !important;
} */

/* .jodit_container:not(.jodit_inline) .jodit_workplace {
  border: 1px solid #000;
} */

.jodit_sticky > .jodit_toolbar {
  z-index: 0;
}
</style>
