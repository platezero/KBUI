<template>
  <div id="app">
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
    <vue-editor ref="qeditor1" v-model="content"></vue-editor>
  </div>
</template>

 <script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
      qtext: ""
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
  }
};
</script>

<style>
.ql-editor .ql-video.ql-align-center {
  width: 800px;
  height: 460px;
}
</style>
