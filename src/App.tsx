import { Suspense, useRef } from "react";
import { Route, Routes } from "react-router";
import Homepage from "./components/pages/homepage/homepage";
import { Header } from "./components/ui/header/header";
import { HEADER_LINKS as headerLinks } from "./utils/constants";
import { usePageScroll } from "./hooks/usePageScroll";
import Footer from "./components/layout/footer/footer";
import SinglePostPage from "./components/pages/single-post-page/singlePostPage";

function App() {
  const mainRef = useRef<HTMLElement>(null);
  usePageScroll(mainRef);

  return (
    <>
      <Header />
      <main ref={mainRef}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {headerLinks.map((link) => (
              <Route
                key={link.path}
                path={link.path}
                element={<link.component />}
              />
            ))}
            <Route path="/events/:slug" element={<SinglePostPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
