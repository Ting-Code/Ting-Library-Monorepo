export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-20">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">SSR App</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Next.js minimal starter is ready. Build your pages under <code>app/</code>.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Tip: add your first feature route in <code>app/</code> and shared server utilities in
          <code> lib/</code>.
        </p>
      </section>
    </main>
  )
}
