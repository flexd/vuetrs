<template>
    <nav class="nav">
        <div id="nav" class="nav-center">
            <a id="back-button" class="button nav-item is-primary">
              <span class="icon is-small"><i class="fa fa-home"></i></span>
              <span>Do something</span>
            </a>
        </div>
    </nav>
</template>
<style>
nav {
  margin: 1rem 0 1rem 0;
  min-height: 2.5rem !important;
}

nav.nav {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  background: white;
  margin: 0;
  padding: .5em;
}

nav.nav a {
  margin-left: 5px;
}
</style>
