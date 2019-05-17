<template>
  <div id="app">
    <layout-header/>
    <v-content>
      <v-container grid-list-md>
        <v-data-table
          :headers="headers"
          :items="dataitems"
          :pagination.sync="config.datatable.pagination"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.index+1 }}</td>
            <td class="text-xs-center" style="cursor: pointer;">
              <router-link tag="td" :to="'/article/'+props.item.note+'/edit'">{{ props.item.note }}</router-link>
            </td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-center">{{ props.item.views }}</td>
            <td class="text-xs-center">
              <v-icon small>thumb_up</v-icon>
              {{ props.item.commentuseful }} |
              <v-icon small>thumb_down</v-icon>
              {{ props.item.commentuseless }}
            </td>
            <td class="text-xs-center">{{ props.item.datecreate }}</td>
            <td class="text-xs-center">{{ props.item.dateupdate }}</td>
            <td class="text-xs-center justify-center">
              <router-link style="text-decoration: none;" :to="'/article/'+props.item.note+'/edit'">
                <v-icon small>edit</v-icon>
              </router-link>~
              <v-icon small @click="openConfirmDialog('DELETE',props.item)">delete</v-icon>
            </td>
          </template>
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">ไม่พบข้อมูลบทความที่ได้ประกาศไว้</v-alert>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
    <layout-footer/>
    <modal-alert ref="alert"></modal-alert>
    <modal-loading ref="loading"></modal-loading>
    <modal-confirm ref="confirm" v-on:ok="confirmDeleteArticle"></modal-confirm>
  </div>
</template>

 <script>
import ServiceApi from "@/services/ServiceApi";
import ServiceSecurity from "@/services/ServiceSecurity";
export default {
  components: {},
  data() {
    return {
      config: {
        datatable: {
          pagination: {
            rowsPerPage: -1 // -1 for All",
          }
        }
      },
      headers: [
        {
          text: "ลำดับที่",
          align: "center",
          sortable: false,
          class: "body-2 black--text text--darken-2"
        },
        {
          text: "KM Note",
          align: "center",
          sortable: false,
          class: "body-2 black--text text--darken-2"
        },
        {
          text: "หัวข้อ",
          align: "center",
          sortable: false,
          width: "400",
          class: "body-2 black--text text--darken-2"
        },
        {
          text: "จำนวนผู้รับชม",
          align: "center",
          sortable: false,
          class: "body-2 black--text text--darken-2"
        },
        {
          text: "ความคิดเห็นเชิงบวก/ลบ",
          align: "center",
          sortable: false,
          class: "body-2 black--text text--darken-2"
        },
        {
          text: "วันที่นำเสนอ",
          align: "center",
          sortable: false,
          class: "body-2 black--text text--darken-2"
        },
        {
          text: "วันที่ปรับปรุง",
          align: "center",
          sortable: false,
          class: "body-2 black--text text--darken-2"
        },
        {
          text: "แก้ไข/ลบ",
          align: "center",
          sortable: false,
          class: "body-2 black--text text--darken-2"
        }
      ],
      dataitems: [{}]
    };
  },
  methods: {
    deleteItem(item) {},
    openConfirmDialog(type, item) {
      if (type == "DELETE") {
        this.$refs.confirm.open(
          "ยืนยันการลบข้อมูล",
          "KM Note เลขที่ " + item.note + " : " + item.title,
          item.note
        );
      }
    },
    loadArticleList() {
      this.$refs.loading.open();
      ServiceApi.listArticleByEmpId(this.$cookie.get("kbs_empid"))
        .then(response => {
          this.$refs.loading.close();
          this.dataitems = response.data.data;
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
    confirmDeleteArticle(reference) {
      ServiceApi.deleteArticleByNote(reference)
        .then(response => {
          this.loadArticleList();
        })
        .catch(error => {
          try {
            this.$refs.alert.open(
              "เกิดข้อผิดพลาด",
              error.response.data.message
            );
          } catch (e) {}
        });
    }
  },
  mounted() {
    this.loadArticleList();
  },
  beforeCreate() {
    ServiceSecurity.checkLoginAndRedirect(this.$route.path);
  },
  watch: {},
  components: {}
};
</script>

<style lang="css">
</style>
