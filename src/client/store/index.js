export const state = () => ({
  imageLabels: []
})

export const mutations = {
  SET_IMAGE_LABELS (state, imageLabels) {
    state.imageLabels = imageLabels
  }
}

export const actions = {
  async getAllData ({ commit }) {
    let { data } = await this.$axios.get('data/all')

    commit('SET_IMAGE_LABELS', data.data)
  }
}