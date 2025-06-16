import Login from "./components/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-hidden">
      <h1 className="text-4xl font-bold mb-8">Welcome to we connect site</h1>
      <Login />
    </main>
  );
}
