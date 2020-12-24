<template>
  <div>
    <h2>Изменение вектора развития</h2>
    <form class="edit__form" @submit.prevent="submit">
      <div class="form-inner">
        <label class="title" for="name">Наименование</label>
        <input
          id="name"
          class="input__item2"
          v-model.trim="title"
          @input="setName($event.target.value)"
        />

        <div class="error" v-if="!$v.title.required">
          Поле не должно быть пустым
        </div>
        <div class="error" v-if="!$v.title.minLength">
          Наименование должно содержать минимум
          {{ $v.title.$params.minLength.min }} символа
        </div>
        <label class="title" for="color">Цвет</label>
        <input
          class="input__item1"
          v-model="state.editIdArr[0].color"
          type="color"
          id="color"
        />
        <button class="button button1" :disabled="submitStatus === 'PENDING'">
          <i class="far fa-save"></i>
          Сохранить
        </button>

        <button
          class="button button4"
          @click="onCancelClick(state.editIdArr[0].id)"
        >
          <i class="far fa-window-close"></i>
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { minLength, required } from "vuelidate/lib/validators";
export default {
  validations: {
    title: { required, minLength: minLength(4) },
  },
  name: "forma",

  data: () => {
    return {
      submitStatus: null,
    };
  },
  props: {
    state: Object,
  },
  computed: {
    title: {
      get() {
        return this.$store.state.editIdArr[0].title;
      },
      set(value) {
        this.$store.commit("updateTitle", value);
      },
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        this.$store.commit("SAVE_ITEM");
      }
    },

    setName(value) {
      this.title = value;
      this.$v.title.$touch();
    },
    updateMessage(e) {
      this.$store.commit("updateTitle", e.target.value);
    },
    onCancelClick(id) {
      this.$store.commit("CLOSE_FORM", id);
    },
    onAddClick() {
      this.$store.commit("SAVE_ITEM");
    },
  },
};
</script>

<style>
*,
*:before,
*:after {
  box-sizing: border-box;
}

.button4:hover {
  background-color: white;
  color: black;
  border: 1px solid#f13d25;
}

.button4 {
  background-color: #f13d25;
}
.title {
  font-size: 18px;
}
.error {
  color: red;
  padding-bottom: 10px;
}
.edit__form {
  position: relative;
  max-width: 850px;
  margin: 15px auto 0;
  background: rgb(175 175 175 / 58%);
  border-radius: 15px;
}
.form-inner {
  padding: 16px 18px;
}
.form-inner .input__item2 {
  display: block;
  width: 100%;
  padding: 0 20px;
  margin: 12px 0px;
  background: #e9eff6;
  line-height: 40px;
  border-width: 0;
  border-radius: 10px;
}
.form-inner input[type="color"] {
  display: block;
  width: 100%;
  height: 35px;
  padding: 0 0px;
  margin: 12px 0px;
  border: none;
  font-family: "Roboto", sans-serif;
}
h2 {
  text-align: center;
  margin-top: 15px;
  font-weight: 500;
  font-size: 24px;
  color: #03090e;
}
</style>



