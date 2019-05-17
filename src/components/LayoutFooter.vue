<template>
  <v-footer v-if="toolbarAddArticleText" color="#00000033" app inset>
    <span class="white--text ml-3">&copy; EXAT Knowledge Based 2019 - ฝสท.</span>
  </v-footer>
</template>

<script>
export default {
  computed: {
    toolbarAddArticleText() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    }
  }
};
</script>
