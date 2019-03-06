<template>
  <div>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import ServiceJwt from "@/services/ServiceJwt";
import ServiceApi from "@/services/ServiceApi";
export default {
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  mounted: function() {
    console.log(ServiceApi().get("/wordwise/entries?limit=1&headword=" + "ba"));
    alert(this.$route.query.username + " - " + this.$route.query.password);

    console.log(
      ServiceJwt.verify(
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJMb2dpbiIsImlzcyI6IlBodW1pcGF0IiwiYXVkIjoiMTU1MDA2Mjg3NSIsImV4cCI6MjUzMzc0MTY5NDQwfQ.4vY9xiv2bvrqq1yZoJ0XE4LNn4PgxOIV8NiqnY-GqLc"
      )
    );
  },
  components: {
    HelloWorld
  }
};
</script>
