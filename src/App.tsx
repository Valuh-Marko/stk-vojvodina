import { Suspense } from "react";
import { Route, Routes } from "react-router";
import Homepage from "./components/pages/homepage/homepage";
import { Header } from "./components/ui/header/header";
import { HEADER_LINKS as headerLinks } from "./utils/constants";
import Footer from "./components/layout/footer/footer";
import SinglePostPage from "./components/pages/single-post-page/singlePostPage";

function App() {
  return (
    <>
      <Header />
      <main>
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
