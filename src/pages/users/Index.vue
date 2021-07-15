<template>
  <div class="col-12">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card shadow mb-5">
          <div class="card-header">About Me</div>
          <div class="card-body">
            <div><strong>Name:</strong> {{ me.fullname || "-" }}</div>
            <div><strong>Username:</strong> {{ me.username || "-" }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { getApi } from "../../api";
export default {
  setup() {
    const me = ref({});

    onMounted(() => {
      getApi("/users/me")
        .then((res) => {
          console.log({ res });
          me.value = res.data;
        })
        .catch((err) => console.log({ err }))
        .finally(() => {
          console.log("final ");
        });
    });

    return { me };
  },
};
</script>