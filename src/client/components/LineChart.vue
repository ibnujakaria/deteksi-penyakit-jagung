<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['labels', 'datasets'],
  computed: {
    data () {
      let labels = this.labels
      let datasets = this.datasets

      return { labels, datasets }
    },
    options () {
      return {
        legend: {
          display: true
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>