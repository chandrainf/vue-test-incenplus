<template>
  <div class="col-6 mx-auto">
    <h3 class="mb-4">Detail</h3>
    <div class="card shadow mb-5">
      <div class="card-header">
        {{ book.name }}
        <router-link class="btn btn-sm btn-info" :to="{ name: 'book.index' }"
          >back</router-link
        >
      </div>
      <div class="card-body">
        <div><strong>Author : </strong>{{ book.author }}</div>
        <div><strong>Description:</strong><br />{{ book.description }}</div>
        <div><strong>ID : </strong>{{ book.id }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  onMounted() {
    console.log("on mounted");
  },
  setup() {
    const store = useStore();
    let book = computed(() => store.state.books.book);
    const fetSingle = (id) => store.dispatch("getBook", id);
    const route = useRoute();
    onMounted(() => {
      fetSingle(route.params.id);
      
    });

    return { book };
  },
};
</script>