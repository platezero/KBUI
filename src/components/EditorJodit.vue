<template>
  <div :id="id"/>
</template>

<script>
export default {
  name: "JoditVue",
  props: {
    value: { type: String, required: true },
    id: { type: String, default: "editor" },
    buttons: { type: Array, default: null },
    extraButtons: { type: Array, default: null },
    config: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      editor: null
    };
  },
  methods: {
    getPlainText() {
      return this.editor.getEditorText();
    }
  },
  computed: {
    editorConfig() {
      const config = { ...this.config };
      if (this.buttons) {
        config.buttons = this.buttons;
        config.buttonsMD = this.buttons;
        config.buttonsSM = this.buttons;
        config.buttonsXS = this.buttons;
      }
      if (this.extraButtons) config.extraButtons = this.extraButtons;
      return config;
    }
  },
  watch: {
    value(newValue) {
      if (this.editor.value !== newValue) this.editor.value = newValue;
    }
  },
  mounted() {
    this.editor = new Jodit(`#${this.id}`, this.editorConfig);
    this.editor.value = this.value;
    this.editor.events.on("change", newValue => this.$emit("input", newValue));
  },
  beforeDestroy() {
    this.editor.destruct();
  }
};
</script>