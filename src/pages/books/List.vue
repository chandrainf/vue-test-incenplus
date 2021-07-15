<template>
  <div class="col">
    <div class="card rounded shadow">
      <div class="card-header">
        Book List

        <router-link
          :to="{ name: 'book.create' }"
          class="btn btn-primary float-right"
          >Add
        </router-link>
      </div>
      <div class="card-body">
       
        <p v-show="bookLists.loading">Loading....</p>
        <table class="table" v-show="!bookLists.loading">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Author</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, i) in bookLists.data" :key="book.id">
              <td>{{ i + 1 }}</td>
              <td>{{ book.name }}</td>
              <td>{{ book.description }}</td>
              <td>{{ book.createdBy.fullname }}</td>
              <td>
                <div class="btn-group">
                  <router-link
                    :to="{ name: 'book.edit', params: { id: book.id } }"
                    class="btn btn-sm btn-success"
                  >
                    edit
                  </router-link>
                  <router-link
                    :to="{ name: 'book.detail', params: { id: book.id } }"
                    class="btn btn-sm btn-info"
                  >
                    detail
                  </router-link>
                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref, toRefs } from "vue";

export default {
  name: "book.list",
  setup() {
    // let hardtoke = "3b18bd0194ad9aff857c5af867427cad9d1d2ae3c4d8f00d57ed8e77";
    let books = ref([]);
    const bookLists = computed(() => store.state.books);
    const fetchBook = () => store.dispatch("getData");
    const store = useStore();
    onMounted(() => {
      // if (bookLists.data.length == 0)
      fetchBook();

      //wthout vuex
      // getApi("/books")
      //   .then((res) => {
      //     // console.log({ res });
      //     books.value = res.data.books;
      //   })
      //   .catch((err) => {
      //     console.log({ err });
      //   })
      //   .finally(() => {
      //     console.log("done");
      //   });
    });

    console.log({ bookLists });

    return { books, bookLists };
  },
};
</script>