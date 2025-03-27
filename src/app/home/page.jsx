"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      setProductos(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProductos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tienda de Bebés</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border p-2 rounded shadow-md">
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <p className="text-gray-600">${producto.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
