export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
      
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-xl">Tienda de Bebés</h1>
        </header>
        <main className="flex-1 p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2025 Tienda de Bebés
        </footer>
        
      </body>
    </html>
  );
}
