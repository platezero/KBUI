<template>
  <v-footer
    v-if="sso.empid != article.usercreate"
    height="40"
    app
    inset
    color="rgba(255, 255, 255, 0.95)"
  >
    <v-container fluid grid-list-md text-xs-center ma-0>
      <v-layout align-center justify-center row fill-height grid-list-md>
        <v-flex xs12 md4 lg3>
          <v-card-text>บทความนี้มีประโยชน์สำหรับท่านหรือไม่</v-card-text>
        </v-flex>
        <v-flex xs6 md2 lg1>
          <v-btn
            small
            block
            color="primary"
            :flat="feedback.type=='UL'"
            @click="sendFeedback('UF')"
          >
            <v-icon v-if="feedback.type=='UF'" dark>done</v-icon>มี
          </v-btn>
        </v-flex>
        <v-flex xs6 md2 lg1>
          <v-btn
            small
            block
            color="primary"
            :flat="feedback.type=='UF'"
            @click="sendFeedback('UL')"
          >
            ไม่มี
            <v-icon v-if="feedback.type=='UL'" dark>done</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="title">เหตุผล/ข้อเสนอแนะ</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md class="py-1">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-textarea
                      v-model="feedback.comment"
                      solo
                      name="suggestion"
                      label
                      value
                      placeholder="กรุณาระบุเหตุผลหรือข้อเสนอแนะ"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* กรุณาระบุเหตุผลเพื่อผู้จัดทำจะได้นำข้อเสนอแนะนี้ไปปรับปรุงคุณภาพบทความต่อไป</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submitFeedback('UL')">บันทึก</v-btn>
              <v-btn flat @click="dialog = false">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import ServiceSecurity from "@/services/ServiceSecurity";

export default {
  data() {
    return {
      article: {
        note: "",
        usercreate: ""
      },
      sso: {
        empid: ""
      },
      feedback: {
        note: "",
        type: "",
        comment: "",
        commentuser: "",
        datecreate: ""
      },
      dialog: false
    };
  },
  methods: {
    sendFeedback(feedbackType) {
      ServiceSecurity.checkLoginAndRedirect(this.$route.fullPath);

      if (feedbackType == "UL") {
        if (this.feedback.type == feedbackType) {
          this.submitFeedback(feedbackType);
        } else {
          this.dialog = true;
        }
      } else {
        this.submitFeedback(feedbackType);
      }
    },
    submitFeedback(feedbackType) {
      var self = this;
      this.setBlankFeedback();
      this.feedback.type = feedbackType;

      if (feedbackType == "UL") {
        this.dialog = false;
      }

      ServiceApi.addArticleFeedback(
        self.article.note,
        self.feedback.type,
        self.feedback.comment
      ).then(response => {
        if (response.data.data) {
          self.feedback = response.data.data;
        } else {
          this.setBlankFeedback();
        }
      });
    },
    initial(note, usercreate) {
      var self = this;
      self.article.note = note;
      self.article.usercreate = usercreate;
      ServiceApi.getArticleFeedback(note).then(response => {
        if (response.data.data) {
          self.feedback = response.data.data;
        } else {
          this.setBlankFeedback();
        }
      });

      ServiceSecurity.checkLogin()
        .then(function(response) {
          self.sso.empid = response.data.data.kbs_empid;
        })
        .catch(function(error) {
          if (callBackUrl) {
            router.push("/login?callback=" + callBackUrl);
          } else {
            router.push("/login");
          }
        })
        .finally(function() {});
    },
    setBlankFeedback() {
      this.feedback = {
        note: "",
        type: "",
        comment: "",
        commentuser: "",
        datecreate: ""
      };
    }
  }
};
</script>
