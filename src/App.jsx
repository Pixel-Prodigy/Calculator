import { Base } from "./components/ui/Base";
import { ThemeProvider } from "./components/ui/ThemeContext";

function App() {
  return (
    <div className=" pt-32 bg-gray-700 h-screen  text-white mx-auto">
      <ThemeProvider>
        <Base />
      </ThemeProvider>
    </div>
  );
}

export default App;
