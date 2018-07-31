<template>
  <div class="container mt-5">
    <h1>Hasil</h1>
    <hr>
    <div class="row">
      <div class="col-md-5">
        <line-chart :labels="kFoldLabels" :datasets="featureDatasetOverview('knn')"></line-chart>
      </div>
      <div class="col-md-7">
        <h3 class="mb-4">Perbandingan Setiap Feature dengan metode KNN</h3>
        <p>
          Dari grafik tersebut bisa ditarik kesimpulan bahwasanya secara umum penggunaan <strong class="brown">dua fitur lebih baik dari pada hanya satu fitur saja.</strong>
        </p>
        <p>
          Serta klasifikasi dengan menggunakan <strong class="brown">fitur tekstur</strong> memberikan hasil yang <strong class="brown">lebih bagus</strong> dari pada <strong class="brown">fitur warna</strong>.
        </p>
        <p>
          Hasil akurasi tertinggi berada pada partial k-4, k-6 dan k-7 <strong class="brown">dengan nilai 78.9%</strong>
        </p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-5">
        <line-chart :labels="kFoldLabels" :datasets="featureDatasetOverview('ed-classifier')"></line-chart>
      </div>
      <div class="col-md-7">
        <h3 class="mb-4">Perbandingan Setiap Feature dengan metode Euclidean Classifier</h3>
        <p>
          Dari grafik tersebut bisa ditarik kesimpulan bahwasanya secara umum penggunaan <strong class="brown">fitur tekstur lebih baik dari pada hanya satu fitur saja</strong>.
        </p>
        <p>
          Hanya saja hasil klasifikasi tertinggi dari metode ED Classifier <strong class="brown">hanya 42% saja</strong> di mana jauh lebih rendah dari pada metode KNN.
        </p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-5">
        <h3 class="md-4">Nilai Ketetanggaan KNN</h3>
        <p>
          Pada grafik di samping menunjukkan tingkat akurasi klasifikasi ditinjau dari jumlah nilai ketetanggaannya.
        </p>
        <p>
          Hampir pada semua k-fold <strong class="brown">nilai ketanggaan k = 2 selalu paling tinggi</strong>.
        </p>
      </div>
      <div class="col-md-7">
        <line-chart :labels="labelsForKnn" :datasets="dataSetsForKnn"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '~/components/LineChart'

export default {
  async asyncData ({ app }) {
    let { data } = await app.$axios('results')

    return { result: data }
  },
  data: () => ({
    result: null,
    colors: [
      'brown', 'violet', 'orange', 'teal', 'black', 'green', 'yellow', 'grey'
    ]
  }),
  computed: {
    kFoldLabels () {
      let labels = []

      if (this.result) {
        for (let label in this.result.color.knn) {
          if (label !== 'overview') {
            labels.push(label)
          }
        }
      }

      return labels
    },
    labelsForKnn () {
      let labels = []

      let i = 1
      if (this.result) {
        let maxNeighbors = 0

        for (let label in this.result.all.knn) {
          if (label !== 'overview') {
            if (Object.values(this.result.all.knn[label]).length > maxNeighbors) {
              maxNeighbors = Object.values(this.result.all.knn[label]).length
            }
          }
        }

        for (let i = 1; i < maxNeighbors; i++) {
          labels.push(`neighbour ${i}`)
        }
      }

      return labels
    },
    dataSetsForKnn () {
      let datasets = []

      if (this.result) {
        let i = 0
        for (let kFold in this.result.all.knn) {
          if (kFold !== 'overview') {
            let set = {
              label: kFold,
              borderColor: this.colors[i++ % this.colors.length],
              backgroundColor: 'transparent',
              data: []
            }

            for (let label in this.result.all.knn[kFold]) {
              if (label !== 'overview') {
                set.data.push(this.result.all.knn[kFold][label].accuracy)
              }
            }

            while (set.data.length < this.labelsForKnn.length) {
              set.data.push(set.data[set.data.length - 1])
            }

            datasets.push(set)
          }
        }
      }

      return datasets
    }
  },
  methods: {
    featureDatasetOverview (classifier) {
      let datasets = []

      if (this.result) {
        let iColor = 0

        for (let feature in this.result) {
          if (feature !== 'overview') {
            let set = {
              label: feature,
              borderColor: this.colors[iColor++],
              backgroundColor: 'transparent',
              data: []
            }

            if (classifier === 'knn') {
              for (let kFold in this.result[feature][classifier]) {
                if (kFold !== 'overview') {
                  set.data.push(this.result[feature][classifier][kFold].overview.bestAccuracy)
                }
              }
            } else {
              for (let kFold in this.result[feature][classifier]) {
                if (kFold !== 'overview') {
                  set.data.push(this.result[feature][classifier][kFold].accuracy)
                }
              }
            }

            datasets.push(set)
          }
        }
      }

      return datasets
    }
  },
  components: { LineChart }
}
</script>