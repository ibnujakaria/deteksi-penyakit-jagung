<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <nuxt-link class="navbar-brand" to="/">Skripsi</nuxt-link>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Data</b-nav-item>
        <b-nav-item href="#">Disabled</b-nav-item>

        <b-nav-item-dropdown text="Testing" right>
          <nuxt-link class="dropdown-item" to="/ekstraksi-fitur">Ekstraksi Fitur</nuxt-link>
          <nuxt-link class="dropdown-item" to="">RGB to Linguistic Color</nuxt-link>
          <nuxt-link class="dropdown-item" to="">GLRLM</nuxt-link>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- navbar-1.vue -->
</template>