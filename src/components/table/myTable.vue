<template v-slot:default>
  <div :class="{ active: active }">
    <table>
      <thead>
        <tr>
          <th @click="sortByNumber" class="text-left">
            Номер<i class="fa fa-sort" aria-hidden="true"></i>
          </th>
          <th @click="sortByName" class="text-left">
            Наименование<i class="fa fa-sort" aria-hidden="true"></i>
          </th>
          <th class="text-left" @click="sortByColor">
            Цвет<i class="fa fa-sort" aria-hidden="true"></i>
          </th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <v-table-row
          v-for="row in paginationData"
          :key="row.id"
          :row_data="row"
        />
      </tbody>
    </table>
    <div class="v-table__pagination">
      <div
        class="page"
        v-for="page in pages"
        :key="page"
        @click="pageClick(page)"
        :class="{ page__selected: page === pageNumber }"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
import vTableRow from "./v-table-row";
export default {
  name: "v-table",
  components: {
    vTableRow,
  },
  props: {
    text_data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    active: {
      type: Boolean,
    },
  },
  data() {
    return {
      textPerPage: 10,
      pageNumber: 1,
      isReversed: true,
      isReversed2: false,
      isReversed3: false,
    };
  },
  watch: {
    text_data: {
      handler() {
        if (this.pageNumber !== 1 && this.text_data.searchValue) {
          this.pageNumber = 1;
        }
      },
      deep: true,
    },
  },
  computed: {
    pages() {
      let pages = this.text_data.data.filter((a) => {
        return a.title
          .toLowerCase()
          .includes(this.text_data.searchValue.toLowerCase().trim());
      });
      return Math.ceil(pages.length / 10);
    },

    paginationData() {
      let w = this.text_data.data.filter((a) => {
        return a.title
          .toLowerCase()
          .includes(this.text_data.searchValue.toLowerCase().trim());
      });
      let from = (this.pageNumber - 1) * this.textPerPage;
      let to = from + this.textPerPage;
      return w.slice(from, to);
    },
  },

  methods: {
    pageClick(page) {
      this.pageNumber = page;
    },
    sortByName() {
      if (!this.isReversed3) {
        this.text_data.data.sort((a, b) => a.title.localeCompare(b.title));
        this.isReversed3 = !this.isReversed3;
      } else {
        this.text_data.data.sort((a, b) => b.title.localeCompare(a.title));
        this.isReversed3 = !this.isReversed3;
      }
    },
    sortByNumber() {
      if (this.isReversed) {
        this.text_data.data.sort((a, b) => b.id - a.id);
        this.isReversed = !this.isReversed;
      } else {
        this.text_data.data.sort((a, b) => a.id - b.id);
        this.isReversed = !this.isReversed;
      }
    },
    sortByColor() {
      if (!this.isReversed2) {
        this.text_data.data.sort((a, b) => a.color.localeCompare(b.color));
        this.isReversed2 = !this.isReversed2;
      } else {
        this.text_data.data.sort((a, b) => b.color.localeCompare(a.color));
        this.isReversed2 = !this.isReversed2;
      }
    },
  },
};
</script>

<style>
i {
  padding: 5px;
}
th {
  height: 40px;
  text-align: left;
}
th:first-child {
  text-align: center;
}
th:nth-child(3) {
  text-align: center;
}
tr:nth-child(2n) {
  background: #f0f0f0;
}
td:first-child {
  width: 120px;
  text-align: center;
}
td:nth-child(2) {
  width: 550px;
  text-align: left;
}
td:nth-child(3) {
  width: 80px;
}
td {
  height: 42px;
  text-align: center;
}
tr:first-child {
  border-top: 1px solid grey;
}
table {
  box-sizing: border-box;
  border-spacing: 10px 20px;
  border-collapse: collapse;
  border: 1px solid grey;
  border-radius: 10px;
  width: 1138px;
  margin: 15px 0px;
}
.v-table__pagination {
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.page {
  margin: 0 4px;
  padding: 8px;
  border: solid 1px gray;
}

.page:hover {
  background-color: gray;
  border: solid 1px gray;
  cursor: pointer;
}
.page__selected {
  border: solid 1px #6fd372;
  background-color: #6fd372;
  cursor: pointer;
  color: white;
}
.active {
  display: none;
}
</style>


