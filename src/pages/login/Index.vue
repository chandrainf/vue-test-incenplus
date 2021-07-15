<template>
  <div class="col-12 h-100">
    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <form @submit.prevent="sendLogin()">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  v-model="username"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                />
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onUpdated, toRefs, watch } from "@vue/runtime-core";

export default {
  setup() {
    const store = useStore();
    const userForm = reactive({
      username: "",
      password: "",
    });

    setTimeout(() => {
      userForm.username = "icp";
      userForm.password = "rahasia";
    }, 1000);

    const userData = reactive(computed(() => store.state.user));
    const router = useRouter();

    if (userData.isLogin && userData.token !== "") {
      console.log("ok", { userData });
      router.push("/");
    }

    console.log("ookkk", { userForm, userData });

    const sendLogin = () => {
      const form = new FormData();
      form.append("username", userForm.username);
      form.append("password", userForm.password);
      return store.dispatch("login", form);
    };

    return { ...toRefs(userForm), sendLogin, userData };
  },
};
</script>