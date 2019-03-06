<template>
  <v-app>
    <layout-header/>
    <v-content>
      <main-search-bar/>
      <v-container fluid style="background-color:white;">
        <main-category-list/>
        <main-trending-article-list/>
      </v-container>
    </v-content>
    <layout-footer/>
<!--<router-view></router-view>-->
  </v-app>
</template>

<script>
import LayoutHeader from "@/components/LayoutHeader";
import LayoutFooter from "@/components/LayoutFooter";
import MainSearchBar from "@/components/MainSearchBar";
import MainCategoryList from "@/components/MainCategoryList";
import MainTrendingArticleList from "@/components/MainTrendingArticleList";

export default {
  name: "App",
  components: {
    LayoutHeader,
    LayoutFooter,
    MainSearchBar,
    MainCategoryList,
    MainTrendingArticleList
  },
  data() {
    return {
      items: [
        { header: "Tredning Topics" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ]
      //
    };
  }
};
</script>
