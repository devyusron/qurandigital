// @ts-ignore
import Home from './pages/SuratList.svelte';
// @ts-ignore
import SuratDetail from './pages/SuratDetail.svelte'; 

const routes = {
  '/': Home,
  '/surat/:id': SuratDetail,
};

export default routes;