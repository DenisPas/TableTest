!<template>
  <div class="size__daigram">
    <doughnut :chartData="datacollection" :options="options"></doughnut>
  </div>
</template>

<script>
import doughnut from "./Chart";

export default {
  components: {
    doughnut,
  },
  data() {
    return {
      datacollection: {
        labels: this.state.data.map((i) => i.title),
        datasets: [
          {
            data: this.state.data.map((i) => i.id),
            backgroundColor: this.state.data.map((i) => i.color),
            weight: 20,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Диаграмма векторов развития",
          fontSize: "20",
        },
        legend: false,
      },
    };
  },
  props: {
    state: Object,
  },

  watch: {
    state: {
      handler() {
        this.datacollection.labels = this.state.data.map((i) => i.title);
        this.datacollection.datasets[0].data = this.state.data.map((i) => i.id);
        this.datacollection.datasets[0].backgroundColor = this.state.data.map(
          (i) => i.color
        );
      },
      deep: true,
    },
  },

  mounted() {},
};
</script>

  <style>
.size__daigram {
  max-width: 450px;
  max-height: 450px;
  margin-top: 20px;
  margin: auto;
}
</style>

