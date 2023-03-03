import { AnimatePresence } from "framer-motion";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import BackToTop from "./components/back-to-top";
import { Outlet } from "react-router-dom";
import { userAtom } from "./atoms/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

export default function App() {
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setUser(user));

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", backToTopListener);

    return () => {
      document.removeEventListener("scroll", backToTopListener);
    };
  }, []);

  function backToTopListener() {
    setBackToTopVisible(scrollY > 200);
  }

  return (
    <div className="min-w-full min-h-screen px-6 py-10 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white flex">
      <div className="flex-grow md:max-w-[800px] mx-auto flex flex-col gap-8 relative bg-inherit">
        <Outlet />
      </div>
      <AnimatePresence>{backToTopVisible && <BackToTop />}</AnimatePresence>
    </div>
  );
}
