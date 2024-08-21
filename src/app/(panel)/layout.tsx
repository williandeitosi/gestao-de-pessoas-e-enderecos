export default function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-12 grid-rows-12 min-h-screen">
      <header className="col-span-12 row-span-1 bg-red-700">HEADER</header>
      <aside className="col-span-1 row-span-10 bg-blue-500">{children}</aside>
      <main className="col-span-11 row-span-10 bg-yellow-200">CONTEUDO</main>
      <footer className="col-span-12 row-span-1 bg-red-700">FOOTER</footer>
    </div>
  )
}
