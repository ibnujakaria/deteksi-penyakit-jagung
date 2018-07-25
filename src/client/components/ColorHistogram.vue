<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['color'],
  computed: {
    data () {
      let labels = []
      let dataset = { label: 'Color Histogram', data: [], backgroundColor: [] }

      for (let label in this.color) {
        labels.push(label)
        dataset.data.push(this.color[label])
        dataset.backgroundColor.push(label)
      }

      return { labels, datasets: [ dataset ] }
    },
    options () {
      return {
        legend: {
          display: false
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>