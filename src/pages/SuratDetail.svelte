<script>
  import { onMount } from 'svelte';
  import { location, params } from 'svelte-spa-router';

  let surat = null;
  let loading = false; // Set initial loading ke false
  let error = null;
  let suratId = null;

  $: {
    loading = true;
    error = null;
    surat = null;
    if ($params && $params.id) {
      suratId = $params.id;
      getDetailSurat(suratId);
    } else {
      loading = false; // Jika tidak ada ID, set loading ke false
    }
  }

  /**
   * @param {string} id
   */
  async function getDetailSurat(id) {
    try {
      const response = await fetch(`https://equran.id/api/v2/surat/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      surat = data.data;
      loading = false;
    } catch (err) {
      error = err;
      loading = false;
      console.error("Gagal mengambil detail surat:", err);
    }
  }

  // Tidak perlu onMount lagi jika logika ada di blok reaktif
</script>

<div class="container mt-4">
  {#if loading}
    <p class="text-center">Memuat detail surat...</p>
  {:else if error}
    <p class="text-danger text-center">Terjadi kesalahan saat memuat detail surat: {error.message}</p>
  {:else if surat}
    <div class="card">
      <div class="card-header bg-light">
        <h2 class="text-center" style="font-family: 'Amiri', serif;">{surat.nama} ({surat.namaLatin})</h2>
        <p class="text-center text-muted">
          Surat ke: {surat.nomor} ({surat.tempatTurun}), Jumlah ayat: {surat.jumlahAyat}
        </p>
        <figure>
          <figcaption class="blockquote-footer">
            <cite title="Source Title">{surat.deskripsi}</cite>
          </figcaption>
        </figure>
        {#if surat.audioFull && Object.keys(surat.audioFull).length > 0}
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 mt-1">
    {#each Object.entries(surat.audioFull) as [key, audioUrl]}
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <i class="bi bi-music-note"></i>
              {key} :&nbsp;
              <i class="bi bi-music-player">&nbsp;{audioUrl.substring(43)}</i>
              <audio controls style="width: 100%;">
                <source src={audioUrl} type="audio/mpeg">
              </audio>
            </li>
          </ul>
        </div>
      </div>
    {/each}
  </div>
{/if}
      </div>
      <div class="card-body">
        {#each surat.ayat as ayat}
          <div class="mb-3">
            <p class="small text-muted" style="font-family: 'Amiri', serif; font-size: 1em; line-height: 2;">ayat {ayat.nomorAyat}</p>
            <p class="text-end" style="font-family: 'Amiri', serif; font-size: 1.5em; line-height: 2;">{ayat.teksArab}</p>
            <p class="text-start text-muted">{ayat.teksLatin}</p>
            <p class="text-start">{ayat.teksIndonesia}</p>
            <hr class="my-4">
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  /* ... */
</style>