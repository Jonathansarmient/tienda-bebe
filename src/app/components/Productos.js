"use client"; // Indica que es un componente cliente

import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        setProductos(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando productos...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {productos.map((producto) => (
        <div key={producto.id} className="border p-2 rounded shadow-md">
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover" />
          <h2 className="text-lg font-semibold">{producto.nombre}</h2>
          <p className="text-gray-600">${producto.precio}</p>
        </div>
      ))}
    </div>
  );
}
