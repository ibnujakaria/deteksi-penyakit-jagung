<template>
  <div class="container mt-3">
    <h1>Detail</h1>
    <div class="row mt-3">
      <div class="col-md-3">
        <div class="form-group">
          <select v-model="attr" class="form-control">
            <option value="color">Color</option>
            <option value="texture">Texture</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <h3 class="mb-3">Tertinggi</h3>
      <table class="table table-bordered">
        <thead style="text-align: center;">
          <tr>
            <th rowspan="2" style="vertical-align: middle">K-Fold</th>
            <th colspan="2">Hasil Prediksi</th>
            <th rowspan="2" style="vertical-align: middle">Akurasi</th>
          </tr>
          <tr>
            <th>Jumlah Benar</th>
            <th>Jumlah Salah</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(row, fold) of perFold" :key="fold">
            <td>{{ fold + 2 }}</td>
            <td>{{ row.correct }}</td>
            <td>{{ row.incorrect }}</td>
            <td>{{ row.accuracy.toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4">
      <h3 class="mb-3">Detail</h3>
      <table class="table table-bordered">
        <thead style="text-align: center;">
          <tr>
            <th rowspan="2" style="vertical-align: middle">Tetangga</th>
            <th colspan="2">Hasil Prediksi</th>
            <th rowspan="2" style="vertical-align: middle">Akurasi</th>
          </tr>
          <tr>
            <th>Jumlah Benar</th>
            <th>Jumlah Salah</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(row, fold) of foldTertinggi" :key="fold">
            <td>{{ fold + 1 }}</td>
            <td>{{ row.correct }}</td>
            <td>{{ row.incorrect }}</td>
            <td>{{ row.accuracy.toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4">
      <h3 class="mb-3">Matrix</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>{{ matrix.attr }}</th>
            <th>Bercak Daun</th>
            <th>Hawar Daun</th>
            <th>Karat Daun</th>
            <th>Sehat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bercak Daun</td>
            <td><strong>{{ matrix.matrix.details['bercak-daun']['bercak-daun'] }}</strong></td>
            <td>{{ matrix.matrix.details['bercak-daun']['hawar-daun'] }}</td>
            <td>{{ matrix.matrix.details['bercak-daun']['karat-daun'] }}</td>
            <td>{{ matrix.matrix.details['bercak-daun']['sehat'] }}</td>
          </tr>
          <tr>
            <td>Hawar Daun</td>
            <td>{{ matrix.matrix.details['hawar-daun']['bercak-daun'] }}</td>
            <td><strong>{{ matrix.matrix.details['hawar-daun']['hawar-daun'] }}</strong></td>
            <td>{{ matrix.matrix.details['hawar-daun']['karat-daun'] }}</td>
            <td>{{ matrix.matrix.details['hawar-daun']['sehat'] }}</td>
          </tr>
          <tr>
            <td>Karat Daun</td>
            <td>{{ matrix.matrix.details['karat-daun']['bercak-daun'] }}</td>
            <td>{{ matrix.matrix.details['karat-daun']['hawar-daun'] }}</td>
            <td><strong>{{ matrix.matrix.details['karat-daun']['karat-daun'] }}</strong></td>
            <td>{{ matrix.matrix.details['karat-daun']['sehat'] }}</td>
          </tr>
          <tr>
            <td>Sehat</td>
            <td>{{ matrix.matrix.details['sehat']['bercak-daun'] }}</td>
            <td>{{ matrix.matrix.details['sehat']['hawar-daun'] }}</td>
            <td>{{ matrix.matrix.details['sehat']['karat-daun'] }}</td>
            <td><strong>{{ matrix.matrix.details['sehat']['sehat'] }}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    let { data } = await app.$axios('results')

    return { result: data }
  },
  data: () => ({
    result: null,
    attr: 'color'
  }),
  computed: {
    perFold () {
      let data = this.result[this.attr].knn
      let perFold = []

      for (let i = 2; i <= 10; i++) {
        let label = (i < 10 ? '0' : '') + i;
        let fold = data[`fold-${label}`]
        perFold.push(fold[fold.overview.bestAttr])
      }

      return perFold
    },
    foldTertinggi () {
      let bestFoldAttr = this.result[this.attr].knn.overview.bestAttr
      let bestFoldInRaw = this.result[this.attr].knn[bestFoldAttr]
      let bestFold = []

      for (let i = 1; i <= 20; i++) {
        bestFold.push(bestFoldInRaw[`neighbour-${i}`])
      }
      return bestFold
    },
    matrix () {
      let bestFoldAttr = this.result[this.attr].knn.overview.bestAttr
      let bestFoldInRaw = this.result[this.attr].knn[bestFoldAttr]
      let bestNeighbourInRaw = bestFoldInRaw[bestFoldInRaw.overview.bestAttr]

      return { attr: bestFoldInRaw.overview.bestAttr, matrix: bestNeighbourInRaw }
    }
  }
}
</script>

<style>

</style>
