<template>
  <div>
    <h2>Создание вектора развития</h2>
    <form class="edit__form" @submit.prevent="submit(name)">
      <div class="form-inner">
        <label class="title">Наименование</label>
        <input
          class="input__item2"
          placeholder="Введите название"
          v-model.trim="name"
          @input="setName($event.target.value)"
        />
        <div class="error" v-if="!$v.name.required">
          Поле не должно быть пустым
        </div>
        <div class="error" v-if="!$v.name.minLength">
          Наименование должно содержать минимум
          {{ $v.name.$params.minLength.min }} символа
        </div>
        <label class="title" for="color">Цвет</label>
        <input
          class="input__item1"
          v-model="state.colorValue"
          type="color"
          id="color"
        />
        <button class="button button1" :disabled="submitStatus === 'PENDING'">
          <i class="far fa-save"></i>
          Сохранить
        </button>

        <button class="button button4" @click="onCancelClick">
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
  name: "forma",
  validations: {
    name: { required, minLength: minLength(4) },
  },
  data: () => {
    return {
      name: "",
      submitStatus: null,
    };
  },
  props: {
    state: Object,
  },

  methods: {
    submit(name) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log(this.submitStatus);
      } else {
        this.submitStatus = "PENDING";
        this.$store.commit("ADD_ITEM", name);
        console.log(this.submitStatus);
      }
    },

    setName(value) {
      this.name = value;
      this.$v.name.$touch();
    },
    onCancelClick() {
      this.$store.commit("CLOSE_ADD_FORM");
    },
    onAddClick(name) {
      this.$store.commit("ADD_ITEM", name);
    },
  },
};
</script>

<style>
</style>