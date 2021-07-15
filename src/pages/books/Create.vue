<template>
  <div class="col">
    <div class="row justify-content-center">
      <div class="alert alert-success" v-show="message !== null" role="alert">
        {{ message }}
      </div>
      <form @submit.prevent="sendBook()" class="col-md-4">
        <div class="card shadow mb-5">
          <div class="card-header">Insert New Book</div>
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
import { reactive, toRefs, ref } from "@vue/reactivity";
import { postApi } from "../../api";
export default {
  name: "bookCreate",
  setup() {
    const book = reactive({
      name: "",
      description: "",
    });
    const message = ref(null);

    setTimeout(() => {
      message.value = "ok";
    }, 2000);
    const sendBook = () => {
      const data = new FormData();
      data.append("name", book.name);
      data.append("description", book.description);
      postApi("/books/insert", data)
        .then((res) => {
          console.log({ res });
          book.name = "";
          book.description = "";
          message.value = res.description;
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
        });
    };

    console.log({ message });

    return { ...toRefs(book), sendBook, message };
  },
};
</script>