<template>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);

    // onMounted(() => {});
    const inc = () => store.dispatch("getUser");
    // inc();
    console.log({ count });
    return { count, inc };
  },
};
</script>