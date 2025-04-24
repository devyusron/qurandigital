<script>
  import Router from 'svelte-spa-router';
  import Link from 'svelte-spa-router'; // Impor Link dengan kurung kurawal
  import {location} from 'svelte-spa-router'; // Impor Link dengan kurung kurawal
  import routes from './route.js';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './app.css';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';  

  const searchTerm = writable('');
  setContext('searchTerm', searchTerm);

  function handleSearchInput(event) {
    searchTerm.set(event.target.value); // Gunakan .set() untuk memperbarui store
  }
</script>

<main>
  <nav class="navbar" data-bs-theme="light">
    <div class="container-fluid" style="display: flex; justify-content: center;">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a class="navbar-brand" href="" style="font-family: 'ArabicFont';">qurandigital</a>
      {#if $location === '/'}
      <div class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Cari Surat..."
          aria-label="Search"
          on:input={handleSearchInput}
          bind:value={$searchTerm}
        />
      </div>
      {/if}
    </div>
  </nav>
  {#if $location === '/'}
  <figure style="display: flex; justify-content: center;" class="mt-2">
    <figcaption class="blockquote-footer">
      <cite title="Source Title">support by svelte.js | https://equran.id/</cite>
    </figcaption>
  </figure>
  {/if}
  <div class="container">
    <Router {routes} />
  </div>
</main>

<style>
  /* Gaya kustom untuk aplikasi Anda */
  @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400&display=swap');
</style>