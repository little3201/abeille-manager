<template>
  <Model :isShow="isShow" @cancelAction="cancelOperation">
    <TreeCore :datas="datas" />
  </Model>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from "vue";
import Model from "/@/components/global/Model.vue";
import TreeCore from "/@/components/global/TreeCore.vue";

defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  datas: {
    type: Array,
    default: [],
  },
});

const emit = defineEmit(["treeAction"]);

const cancelOperation = () => {
  emit("treeAction", false);
};
const commitOperation = () => {};
</script>