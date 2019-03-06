<template>
  <div id="app">
    <layout-header/>
    <v-content>
      <v-layout align-center justify-start column>
        <v-flex xs12>
          <v-checkbox v-model="readOnly" :label="`Read : ${readOnly.toString()}`"></v-checkbox>
        </v-flex>
      </v-layout>
      <v-layout v-show="!readOnly" align-center justify-start column>
        <v-layout align-start justify-start column fill-height mt-5 mb-3 ml-5 mr-5>
          <v-flex xs12>
            <v-text-field label="Article" outline v-model="article.title"></v-text-field>
            <div class="headline">Symptom</div>
            <vue-editor ref="symptom" v-model="article.symptom" :editorOptions="editorSettings"></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Environment</div>
            <vue-editor
              ref="environment"
              v-model="article.environment"
              :editorOptions="editorSettings"
            ></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Reproducing the issues</div>
            <vue-editor
              ref="reproducing"
              v-model="article.reproducing"
              :editorOptions="editorSettings"
            ></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Cause</div>
            <vue-editor ref="cause" v-model="article.cause" :editorOptions="editorSettings"></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Root Cause</div>
            <vue-editor ref="causeRoot" v-model="article.causeRoot" :editorOptions="editorSettings"></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Solution</div>
            <vue-editor ref="solution" v-model="article.solution" :editorOptions="editorSettings"></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Related Resources</div>
            <vue-editor
              ref="resourcesRelated"
              v-model="article.resourcesRelated"
              :editorOptions="editorSettings"
            ></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn color="success" @click="redirect('/article')">บันทึก</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout v-show="readOnly" align-center justify-start column>
        <v-layout align-center justify-start column fill-height mt-5 mb-3 ml-5 mr-5>
          <v-flex xs12>
            <v-text-field label="Article" outline v-model="article.title" :readonly="true"></v-text-field>
            <div class="headline">Symptom</div>
            <vue-editor
              ref="symptom"
              v-model="article.symptom"
              :editorOptions="editorSettingsReadOnly"
            ></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height  mt-5 mb-3 ml-5 mr-5>
          <v-flex xs12>
            <div class="headline">Environment</div>
            <vue-editor
              ref="environment"
              v-model="article.environment"
              :editorOptions="editorSettingsReadOnly"
            ></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Reproducing the issues</div>
            <vue-editor
              ref="reproducing"
              v-model="article.reproducing"
              :editorOptions="editorSettingsReadOnly"
            ></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Cause</div>
            <vue-editor ref="cause" v-model="article.cause" :editorOptions="editorSettingsReadOnly"></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Root Cause</div>
            <vue-editor
              ref="causeRoot"
              v-model="article.causeRoot"
              :editorOptions="editorSettingsReadOnly"
            ></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Solution</div>
            <vue-editor
              ref="solution"
              v-model="article.solution"
              :editorOptions="editorSettingsReadOnly"
            ></vue-editor>
          </v-flex>
        </v-layout>
        <v-layout align-start justify-start column fill-height mb-3>
          <v-flex xs12>
            <div class="headline">Related Resources</div>
            <vue-editor
              ref="resourcesRelated"
              v-model="article.resourcesRelated"
              :editorOptions="editorSettingsReadOnly"
            ></vue-editor>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-content>
    <layout-footer/>

    <h1>Text</h1>
    <br>
    {{ qtext }}
    <br>
    <h1>HTML Render</h1>
    <br>
    <div v-html="content"></div>
    <br>
    <h1>Editor</h1>
    <br>
    <vue-editor ref="qeditor1" :editorOptions="editorSettingsReadOnly" v-model="content"></vue-editor>
    <vue-editor
      style="border :0px;"
      ref="qeditor1readonly"
      :editorOptions="editorSettings"
      v-model="content"
    ></vue-editor>
  </div>
</template>

 <script>
import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";

import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";

var BackgroundClass = Quill.import("attributors/class/background");
var ColorClass = Quill.import("attributors/class/color");
var SizeStyle = Quill.import("attributors/style/size");
Quill.register(SizeStyle, true);

// import { ImageResize } from "quill-image-resize-module";

// Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      article: {
        title: "",
        symptom: "",
        environment: "",
        reproducing: "",
        cause: "",
        causeRoot: "",
        solution: "",
        resourcesRelated: ""
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
        readOnly: true
      }
    };
  },
  methods: {
    focusEditor() {
      console.log(this.$refs.qeditor1.quill.getText());
      this.$refs.qeditor1.quill.focus();
    }
  },
  watch: {
    content: function() {
      this.qtext = this.$refs.qeditor1.quill.getText();
    }
  },
  components: {
    LayoutHeader,
    LayoutFooter,
    VueEditor
  }
};
</script>

<style>
.ql-editor .ql-video.ql-align-center {
  width: 800px;
  height: 460px;
}
</style>
