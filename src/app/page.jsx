"use client"

import Productos from "@/components/Productos";


export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tienda de Bebés</h1>
      <Productos /> {/* Se renderiza solo en el cliente */}
    </div>
  );
}
