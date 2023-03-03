import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/user";
import Center from "../components/center";
import { auth } from "../lib/firebase";
import { routes } from "../routes";

export default function Login() {
  const user = useAtomValue(userAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(routes.home.href);
    }
  }, [user]);

  async function handleLoginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  }

  return (
    <Center>
      <button
        onClick={handleLoginWithGoogle}
        className="bg-sky-700 px-8 py-2 rounded-md shadow-md font-bold hover:bg-sky-600 transition-colors"
      >
        Continue with Google
      </button>
    </Center>
  );
}
