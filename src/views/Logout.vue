<template></template>
 <script>
import ServiceSecurity from "@/services/ServiceSecurity";
export default {
  beforeCreate() {
    ServiceSecurity.logout().then(response => {
      this.$router.push("/");
    });
  }
};
</script>
 
 <style>
</style>
 