<template>
  <div class="col">
    <h2 class="mb-3">Book Edit</h2>
    <div class="row justify-content-center">
      <form @submit.prevent="update()" class="col-md-6 mb-5">
        <div class="card rounded shadow">
          <div class="card-header">
            <router-link
              :to="{ name: 'book.index' }"
              class="btn btn-primary float-right"
              >Back
            </router-link>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="name"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="description"
              ></textarea>
            </div>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getApi, postApi } from "../../api";
export default {
  setup() {
    const book = reactive({
      id: "",
      name: "",
      description: "",
    });
    const route = useRoute();

    onMounted(() => {
      console.log("book edit");
      getApi("/books/detail", { id: route.params.id })
        .then((res) => {
          const {
            data: { name, description },
          } = res;

          book.id = route.params.id;
          book.name = name;
          book.description = description;
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          console.log("finale get book");
        });
    });

    const update = () => {
      const data = new FormData();
      data.append("id", route.params.id);
      data.append("name", book.name);
      data.append("description", book.description);
      postApi("/books/edit", data)
        .then((res) => {
          console.log("update", { res });
        })
        .catch((err) => {
          console.log("update", { err });
        })
        .finally(() => {
          console.log("update", "final");
        });
    };

    return { ...toRefs(book), update };
  },
};
</script>