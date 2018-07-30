<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <nuxt-link class="navbar-brand" to="/">Skripsi</nuxt-link>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <li class="nav-item">
          <nuxt-link to="/data" class="nav-link">Data</nuxt-link>
        </li>

        <b-nav-item-dropdown text="K-Fold" right>
          <nuxt-link class="dropdown-item" to="/data/k-fold/2">Data K-2</nuxt-link>
          <nuxt-link class="dropdown-item" to="/data/k-fold/3">Data K-3</nuxt-link>
          <nuxt-link class="dropdown-item" to="/data/k-fold/4">Data K-4</nuxt-link>
          <nuxt-link class="dropdown-item" to="/data/k-fold/5">Data K-5</nuxt-link>
          <nuxt-link class="dropdown-item" to="/data/k-fold/6">Data K-6</nuxt-link>
          <nuxt-link class="dropdown-item" to="/data/k-fold/7">Data K-7</nuxt-link>
          <nuxt-link class="dropdown-item" to="/data/k-fold/8">Data K-8</nuxt-link>
        </b-nav-item-dropdown>

        <b-nav-item href="#">Hasil</b-nav-item>

        <b-nav-item-dropdown text="Testing" right>
          <nuxt-link class="dropdown-item" to="/testing/ekstraksi-fitur">Ekstraksi Fitur</nuxt-link>
          <nuxt-link class="dropdown-item" to="/testing/rgb-to-linguistic-color">RGB to Linguistic Color</nuxt-link>
          <nuxt-link class="dropdown-item" to="">GLRLM</nuxt-link>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- navbar-1.vue -->
</template>