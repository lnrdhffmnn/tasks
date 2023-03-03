import { signOut } from "firebase/auth";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../atoms/user";
import Center from "../components/center";
import Loading from "../components/loading";
import { auth } from "../lib/firebase";
import { routes } from "../routes";

export default function Logout() {
  const user = useAtomValue(userAtom);

  const navigate = useNavigate();

  useEffect(() => {
    signOutUser();
  }, [user]);

  async function signOutUser() {
    await signOut(auth);
    navigate(routes.login.href);
  }

  return (
    <Center>
      <Loading />
    </Center>
  );
}
