<script>
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router'; // Jika Anda menggunakan svelte-spa-router
  import { getContext } from 'svelte'; // Untuk mengakses store konteks

  const searchTerm = getContext('searchTerm');

  let all_surat = [];
  let loading = true;
  let error = null;
  let filteredSurat = [];

  async function getAllSurat() {
    try {
      const response = await fetch('https://equran.id/api/v2/surat');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      all_surat = data.data;
      loading = false;
    } catch (err) {
      error = err;
      loading = false;
      console.error("Gagal mengambil data surat:", err);
    }
  }

  /**
   * @param {any} nomor
   */
  function detailSurat(nomor) {
    // Asumsi Anda menggunakan svelte-spa-router untuk navigasi
    push(`/surat/${nomor}`);
  }

  onMount(getAllSurat);

  $: if (all_surat && searchTerm) {
    const lowerSearchTerm = $searchTerm.toLowerCase();
    filteredSurat = all_surat.filter(surat =>
      surat.namaLatin.toLowerCase().includes(lowerSearchTerm) ||
      surat.nama.toLowerCase().includes(lowerSearchTerm) ||
      surat.arti.toLowerCase().includes(lowerSearchTerm) ||
      surat.nomor.toString().includes(lowerSearchTerm) ||
      surat.tempatTurun.toLowerCase().includes(lowerSearchTerm)
    );
  } else {
    filteredSurat = all_surat;
  }
</script>

<div class="container-fluid">
  {#if loading}
    <p class="text-center">Memuat daftar surat...</p>
  {:else if error}
    <p class="text-danger text-center">Terjadi kesalahan saat memuat data: {error.message}</p>
  {:else}
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-6 g-3 my-1">
      {#each filteredSurat as surat}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="col">
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="card" on:click={() => detailSurat(surat.nomor)} style="cursor: pointer;">
            <div class="card-body">
              <h5 class="card-title">{surat.namaLatin} ({surat.arti})</h5>
              <h3 class="text-end" style="font-family: 'Amiri', serif;">{surat.nama}</h3>
              <p class="card-text">
                <span class="small text-muted">
                  Surat ke : {surat.nomor} ({surat.tempatTurun})
                </span>
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
    {#if filteredSurat.length === 0 && !loading && !error && $searchTerm}
      <p class="text-center mt-3">Tidak ada surat yang ditemukan dengan kata kunci "{$searchTerm}".</p>
    {/if}
  {/if}
</div>

<style>
  /* Anda mungkin perlu mengimpor Bootstrap CSS di file utama Anda (app.css atau layout) */
  /* Atau menggunakan CDN link di index.html */

  /* Contoh untuk menambahkan font Amiri (pastikan font sudah terinstal atau di-load) */
  @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400&display=swap');

  .card {
    transition: transform 0.3s ease-in-out;
  }

  .card:hover {
    transform: scale(1.05);
  }
</style>