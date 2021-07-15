<template>
  <Header />
  <main class="container">
    <div class="row">
      <router-view></router-view>
    </div>
  </main>
  <Footer />
</template>

<script>
import Header from "./components/Layout/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
