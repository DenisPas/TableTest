!<template>
  <div :class="{ active: active }">
    <input
      v-on:keyup.enter="onSearch"
      v-model="searchValue"
      class="search"
      placeholder="Поиск"
      type="text"
    />
    <button @click="deleteSearch">Очистить поиск</button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      searchValue: "",
    };
  },
  props: {
    active: {
      type: Boolean,
    },
  },

  watch: {
    searchValue: function () {
      this.$emit("onSearch", {
        searchValue: this.searchValue,
      });
    },
  },
  methods: {
    deleteSearch() {
      this.searchValue = "";
    },
  },
};
</script>

<style>
.search {
  display: block;
  width: 100%;
  padding: 0 20px;
  margin: 12px 0px;
  background: #e9eff6;
  line-height: 40px;
  border-width: 0;
  border-radius: 10px;
}
.active {
  display: none;
}
</style>