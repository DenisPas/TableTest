!<template>
  <div id="root">
    <div class="container">
      <h1>Векторы развития</h1>
      <div class="button__item">
        <button class="diagram" @click="diagramView">
          <i class="fas fa-chart-pie"></i>
          Просмотр диаграммы
        </button>
        <button class="vector" @click="AddNewItem">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Создать новый вектор развития
        </button>
      </div>

      <diagram v-if="DATA.isDiagramView" :state="DATA" />

      <search @onSearch="search" :active="DATA.active" />
      <my-table :text_data="DATA" :active="DATA.active" />
      <forma v-if="DATA.isFormOpen" :state="DATA" />
      <forma-add v-if="DATA.isFormAddOpen" :state="DATA" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MyTable from "./components/table/myTable.vue";
import forma from "./components/forma";
import formaAdd from "./components/formaAdd";
import Diagram from "./components/diagram.vue";
import search from "./components/search.vue";

export default {
  name: "app",

  components: { MyTable, forma, formaAdd, Diagram, search },
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters(["DATA"]),
  },
  methods: {
    search(data) {
      this.$store.commit("SEARCH", data.searchValue);
    },

    AddNewItem() {
      this.$store.commit("ADD_NEW_ITEM");
    },
    diagramView() {
      this.$store.commit("DIAGRAM_VIEW");
    },
  },
  mounted() {
    this.$store.commit("SET_DATA");
  },
};
</script>

<style>
* {
  font-family: "Roboto", sans-serif;
}

.vector {
  outline: none;
  margin: 3px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  border-radius: 7px;
  font-size: 16px;
  padding: 4px 40px;
  color: white;
  background-color: #6fd372;
}
.diagram {
  outline: none;
  margin: 3px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  border-radius: 7px;
  font-size: 16px;
  padding: 4px 40px;
  color: white;
  background-color: #60a1df;
}
.diagram:hover {
  background-color: #196ebd;
  cursor: pointer;
}
.vector:hover {
  background-color: #30aa34;
  cursor: pointer;
}
h1 {
  padding-bottom: 10px;
}
.button__item {
  display: flex;
  justify-content: space-between;
}
.container {
  max-width: 1170px;
  margin: 30px auto;
  padding: 0 15px;
}
</style>