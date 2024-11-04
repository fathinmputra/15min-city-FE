// components/Main.js
import React from 'react';
import Layout from './Layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Map = dynamic(() => import('./Map'), { ssr: false });
const KesehatanMap = dynamic(() => import('./KesehatanMap'), { ssr: false });
const PendidikanMap = dynamic(() => import('./PendidikanMap'), { ssr: false });
const PerdaganganMap = dynamic(() => import('./PerdaganganMap'), { ssr: false });
const PerkantoranMap = dynamic(() => import('./PerkantoranMap'), { ssr: false });
const TempatHiburanMap = dynamic(() => import('./TempatHiburanMap'), { ssr: false });
const TempatIbadahMap = dynamic(() => import('./TempatIbadahMap'), { ssr: false });
const HalteMap = dynamic(() => import('./HalteMap'), { ssr: false });
const SearchMap = dynamic(() => import('./SearchMap'), { ssr: false });
const KulinerMap = dynamic(() => import('./KulinerMap'), { ssr: false });

const Main = ({ title, category }) => {
  const router = useRouter();
  let MapComponent;

  switch (category) {
    case 'kesehatan':
      MapComponent = KesehatanMap;
      break;
    case 'pendidikan':
      MapComponent = PendidikanMap;
      break;
    case 'perdagangan':
      MapComponent = PerdaganganMap;
      break;
    case 'perkantoran':
      MapComponent = PerkantoranMap;
      break;
    case 'tempathiburan':
      MapComponent = TempatHiburanMap;
      break;
    case 'tempatibadah':
      MapComponent = TempatIbadahMap;
      break;
    case 'halte':
      MapComponent = HalteMap;
      break;
    case 'searchresult':
      MapComponent = SearchMap;
      break;
    case 'kuliner':
      MapComponent = KulinerMap;
      break;
    default:
      MapComponent = Map;
  }

  const { lat, lon } = router.query;

  return (
    <Layout pageTitle={title}>
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="relative z-10 w-full h-full">
            {MapComponent && <MapComponent lat={lat} lon={lon} style={{ width: '100%', height: '100%' }} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Main;
