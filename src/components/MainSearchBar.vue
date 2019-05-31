<template>
  <v-container
    fluid
    style="height: 300px; background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url('/assets/image_background/19.jpg')"
  >
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8 px-4 pt-4 pb-0 style="background: rgba(255,255,255,0.9);">
        <v-flex xs12 class="display-1">Search for Answers</v-flex>
        <v-flex
          xs12
          sm8
          class="body-2 font-weight-light"
          pa-1
        >Welcome to the EXAT Support Portal. Search for KM Notes, EXAT Knowledge Base Articles.</v-flex>
        <v-flex xs12 pt-3 pb-3>
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            cache-items
            flat
            hide-no-data
            hide-details
            label="Enter keywords or KM Note"
            solo
          >
            <v-btn color="info" slot="append" class="hidden-xs-only">Search</v-btn>
          </v-autocomplete>
          <!-- <v-text-field solo placeholder="Enter keywords or KM Note">
            <v-btn color="info" slot="append" class="hidden-xs-only">Search</v-btn>
          </v-text-field>-->
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";

export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    select(val) {
      var note = val.split("-")[0].trim();
      this.$router.push("/article/" + note);
    }
  },
  methods: {
    querySelections(q) {
      this.loading = true;
      var self = this;

      ServiceApi.listArticleByQuery(q)
        .then(response => {
          response.data.data.forEach(element => {
            self.items.push(element.note.replace("P", "") + " - " + element.title);
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
.theme--light.v-list .v-list__tile__mask {
  color: red;
  background-color: transparent;
}
</style>
