import { Base } from "./components/ui/BAse";
import { ThemeProvider } from "./components/ui/ThemeContext";

function App() {
  return (
    <div className="max-w-[1440px] pt-32 bg-gray-700 h-screen w-screen text-white mx-auto">
      <ThemeProvider>
        <Base />
      </ThemeProvider>
    </div>
  );
}

export default App;
