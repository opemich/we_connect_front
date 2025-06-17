import Login from "./components/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-10 overflow-hidden">
      <h1 className="text-4xl font-bold mb-3 md:mb-8">Welcome to <br className="block md:hidden" /> <span className="text-blue-500"><i>we connect</i></span></h1>
      <Login />
    </main>
  );
}
