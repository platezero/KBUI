<template>
  <v-app>
    <layout-header/>
    <v-content>
      <main-search-bar/>
      <v-container fluid grid-list-md px-1 m style="background-color:white;">
        <v-layout align-start row wrap justify-center>
          <v-flex xs12 md5>
            <main-article-list :header="'บทความปักหมุด'" :type="'PIN'"/>
          </v-flex>
          <!-- <v-flex xs4>
            <main-article-list :header="'Trending Article'" :type="'TREND'"/>
          </v-flex>-->
          <v-flex xs12 md5>
            <main-article-list :header="'บทความล่าสุด'" :type="'LASTED'"/>
          </v-flex>
        </v-layout>
        <!-- <main-category-list/> -->
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
import MainArticleList from "@/components/MainArticleList";

export default {
  name: "App",
  components: {
    LayoutHeader,
    LayoutFooter,
    MainSearchBar,
    MainCategoryList,
    MainArticleList
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
