import dynamic from "next/dynamic";

// Carga `Productos.js` de forma dinámica sin SSR
const Productos = dynamic(() => import("./components/Productos"), { ssr: false });

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tienda de Bebés</h1>
      <Productos /> {/* Se renderiza solo en el cliente */}
    </div>
  );
}
