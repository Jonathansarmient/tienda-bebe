"use client";
import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Guardar producto en Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !precio || !imagen) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }
    try {
      await addDoc(collection(db, "productos"), {
        nombre,
        precio: Number(precio),
        imagen,
      });
      setMensaje("Producto agregado exitosamente");
      setNombre("");
      setPrecio("");
      setImagen("");
    } catch (error) {
      setMensaje("Error al agregar producto");
      console.error("Error al agregar producto:", error);
    }
  };

  // Cerrar sesión del administrador
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!usuario) return <p className="text-center text-gray-600">Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded mb-4" onClick={handleLogout}>
        Cerrar Sesión
      </button>
      {mensaje && <p className="text-green-500">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Nombre del producto"
          className="border p-2"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          className="border p-2"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de Imagen"
          className="border p-2"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded">Guardar Producto</button>
      </form>
    </div>
  );
}
