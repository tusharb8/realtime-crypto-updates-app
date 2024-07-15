import { StoreProvider } from "./StoreProvider";
import HomePage from "./components/Home/HomePage";

export default function Home() {

  return (
    <StoreProvider>
      <main className="h-full w-full bg-gradient-to-r from-blue-400">
        <HomePage/>
      </main>
    </StoreProvider>
  );
}
