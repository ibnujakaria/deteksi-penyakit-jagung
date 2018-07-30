<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <nuxt-link class="navbar-brand" to="/">Skripsi</nuxt-link>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <li class="nav-item">
          <nuxt-link to="/data" class="nav-link">Data</nuxt-link>
        </li>

        <b-nav-item-dropdown text="K-Fold" left>
          <b-dropdown-item to="/data/k-fold/2">Data K-2</b-dropdown-item>
          <b-dropdown-item to="/data/k-fold/3">Data K-3</b-dropdown-item>
          <b-dropdown-item to="/data/k-fold/4">Data K-4</b-dropdown-item>
          <b-dropdown-item to="/data/k-fold/5">Data K-5</b-dropdown-item>
          <b-dropdown-item to="/data/k-fold/6">Data K-6</b-dropdown-item>
          <b-dropdown-item to="/data/k-fold/7">Data K-7</b-dropdown-item>
          <b-dropdown-item to="/data/k-fold/8">Data K-8</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item href="#">Hasil</b-nav-item>

        <b-nav-item-dropdown text="Testing" left>
          <b-dropdown-item to="/testing/ekstraksi-fitur">Ekstraksi Fitur</b-dropdown-item>
          <b-dropdown-item to="/testing/rgb-to-linguistic-color">RGB to Linguistic Color</b-dropdown-item>
          <b-dropdown-item to="">GLRLM</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- navbar-1.vue -->
</template>