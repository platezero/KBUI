<template>
  <v-app
    style="background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('./assets/bridge_2.jpg')"
  >
    <v-content>
      <v-container fluid fill-height ma-0 pa-0>
        <v-layout align-center justify-center>
          <v-flex xs12 style="background-color:#ffffff0f;">
            <v-card class="elevation-20"></v-card>
            <v-layout align-center justify-center>
              <v-flex xs10 sm7 md4>
                <v-card class="elevation-20">
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>EXAT Knowledge Based System</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        prepend-icon="person"
                        name="login"
                        label="รหัสพนักงาน/ลูกจ้าง"
                        type="text"
                        v-model="empid"
                        v-on:keyup.enter="submit"
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        prepend-icon="lock"
                        name="password"
                        label="รหัสผ่าน"
                        type="password"
                        v-model="password"
                        v-on:keyup.enter="submit"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="submit" :loading="loading">เข้าสู่ระบบ</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <modal-loading ref="loading"></modal-loading>
    <modal-alert ref="alert"></modal-alert>
  </v-app>
</template>

<script>
import ServiceSecurity from "@/services/ServiceSecurity";

export default {
  data: () => ({
    empid: "",
    password: "",
    loading: false
  }),

  methods: {
    submit() {
      var self = this;
      this.loading = true;
      var callbackUrl = this.$route.query.callback;
      ServiceSecurity.login(this.empid, this.password)
        .then(response => {
          if (callbackUrl) {
            this.$router.push(callbackUrl);
          } else {
            this.$router.push("/");
          }
        })
        .catch(error => {
          this.$refs.loading.close();
          this.$refs.alert.open("เกิดข้อผิดพลาด", error.response.data.message);
        })
        .finally(function() {
          self.loading = false;
        });
    }
  }
};
</script>