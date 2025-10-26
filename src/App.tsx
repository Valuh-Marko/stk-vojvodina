import { Suspense } from "react";
import { Route, Routes } from "react-router";
import Homepage from "./components/pages/homepage/homepage";
import { Header } from "./components/ui/header/header";
import { HEADER_LINKS as headerLinks } from "./utils/constants";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {headerLinks.map((link) => (
          <Route
            key={link.path}
            path={link.path}
            element={<link.component />}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
