<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <v-subheader
        v-if="item.header"
        :key="index+'-label'"
        class="subheading"
        style="color: rgba(0,0,0,0.70); background-color: #f3f3f3;"
      >{{ header }}</v-subheader>

      <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

      <v-list-tile v-else :key="item.title+'-'+index" avatar @click>
        <v-list-tile-avatar>
          <img :src="item.avatar">
        </v-list-tile-avatar>

        <v-list-tile-content @click="redirect('/article/'+item.note)">
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";

export default {
  props: {
    header: { type: String, required: true },
    type: { type: String, required: true }
  },
  data() {
    return {
      items: [
        { header: this.header }
        // {
        //   avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        //   title: "Brunch this weekend?",
        //   subtitle:
        //     "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        //   title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        //   subtitle:
        //     "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        //   title: "Oui oui",
        //   subtitle:
        //     "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        // }
      ]
    };
  },
  methods: {
    redirect: function(path) {
      if (path == "/article") {
        ServiceSecurity.checkLoginAndRedirect();
      } else if (path == "/logout") {
        ServiceSecurity.logout();
      }
      this.$router.push(path);
    }
  },
  mounted() {
    var loadFunction = response => {
      response.data.data.forEach((element, i) => {
        var title = element.title;
        var usercCreateId = element.usercreate.split(":")[0].trim();
        var usercCreateName = element.usercreate.split(":")[1].trim();

        var note = element.note;
        var avatarUrl =
          "http://172.20.1.58/SecurityManager/images/employees/" +
          usercCreateId.substr(1, 2) +
          "/" +
          usercCreateId +
          ".jpg";

        this.items.push({
          note: note,
          avatar: avatarUrl,
          title: title.replace("P", ""),
          subtitle:
            "<span class='text--primary'>KB Note : " +
            note +
            "</span> &mdash; " +
            usercCreateName
        });
        this.items.push({ divider: true, inset: true });
      });
    };
    if (this.type == "PIN") {
      ServiceApi.listArticlePin(5).then(response => {
        loadFunction(response);
      });
    } else if (this.type == "LASTED") {
      ServiceApi.listArticleLasted(5).then(response => {
        loadFunction(response);
      });
    }
  }
};
</script>

