<template>
  <tr>
    <td>
      {{ row_data.id }}
    </td>
    <td>{{ row_data.title }}</td>
    <td>
      <div
        class="color__size"
        :style="{ backgroundColor: row_data.color }"
      ></div>
    </td>
    <td>
      <button class="button button1" @click="onEditClick(row_data.id)">
        <i class="fas fa-pencil-alt"></i>
        Изменить
      </button>
      <button class="button button2" @click="onDeleteClick(row_data.id)">
        <i class="fa fa-times" aria-hidden="true"></i>
        Удалить
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "v-table-row",
  components: {},
  data: () => {
    return {};
  },
  props: {
    row_data: Object,
  },

  methods: {
    onDeleteClick(id) {
      this.$store.commit("DELETE_ITEM", id);
    },
    onEditClick(id) {
      this.$store.commit("EDIT_ITEM", id);
    },
  },
};
</script>

<style>
.button {
  outline: none;
  margin: 3px;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  border-radius: 7px;
  font-size: 16px;
  padding: 4px 40px;
  color: white;
}

.button1:hover {
  background-color: white;
  border: 1px solid #6fd372;
  color: black;
}

.button2:hover {
  background-color: white;
  color: black;
  border: 1px solid #f78b4d;
}
.button1 {
  border: 1px solid #6fd372;
  background-color: #6fd372;
}
.button2 {
  border: 1px solid #f78b4d;
  background-color: #f78b4d;
}
.color__size {
  margin: 0 auto;
  width: 30px;
  height: 30px;
}
.row {
  flex-basis: 25%;
  padding-left: 10px;
}
.row {
  flex-basis: 25%;
  padding-left: 10px;
}
.v-table-row {
  display: flex;
  justify-content: space-around;
}
</style>