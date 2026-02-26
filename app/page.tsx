import Terminal from "@/components/Terminal";

export default function Home() {
  return (
<div className="flex min-h-screen items-center justify-center bg-black p-8">
  <main className="flex h-[80vh] w-full max-w-3xl">
    <Terminal />
  </main>
</div>
  );
}
