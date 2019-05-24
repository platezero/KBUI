<template>
  <v-app>
    <v-container fluid fill-height ma-0 pa-0>
      <v-layout align-space-around justify-start>
        <v-flex xs12 sm8 md6 lg4 style="background-color:#ffffff;">
          <v-layout align-center justify-center row fill-height>
            <v-flex xs10>
              <div class="headline">Welcome to</div>
              <div class="display-1 mb-4">EXAT Knowledge Base</div>
              <div class="subheading mb-3">Log in with your EXAT Back office credentials.</div>
              <v-text-field
                name="login"
                label="Employee ID"
                type="text"
                v-model="empid"
                v-on:keyup.enter="submit"
              ></v-text-field>
              <v-text-field
                id="password"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                v-on:keyup.enter="submit"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn color="primary" block @click="submit" :loading="loading">Log in</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          sm4
          md6
          lg8
          class="myfade"
          :style="'background-size: cover;background-repeat: no-repeat;background-position: center center;'+getBackgroundImageStyle"
        ></v-flex>
      </v-layout>
    </v-container>
    <!-- <v-content>
      <v-container fluid fill-height ma-0 pa-0>
        <v-layout align-center justify-center>
          <v-flex xs12 style="background-color:#ffffff0f;">
            <v-card class="elevation-20"></v-card>
            <v-layout align-center justify-center>
              <v-flex xs10 sm7 md4 lg3>
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
    </v-content>-->

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
  },
  computed: {
    getBackgroundImageStyle() {
      return (
        "background-image: url('./assets/image_background/" +
        (Math.floor(Math.random() * 18) + 1) +
        ".jpg')"
      );
    }
  }
};
</script>

<style scoped>
.myfade {
  animation: fadein 2s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
