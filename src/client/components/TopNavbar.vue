<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <nuxt-link class="navbar-brand" to="/">Skripsi</nuxt-link>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <li class="nav-item">
          <nuxt-link to="/data" class="nav-link">Data</nuxt-link>
        </li>
        <b-nav-item href="#">K-Fold</b-nav-item>
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