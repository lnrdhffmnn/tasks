import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import { userAtom } from "../atoms/user";
import Center from "../components/center";
import { db } from "../lib/firebase";
import { routes } from "../routes";

export default function Settings() {
  const user = useAtomValue(userAtom);

  async function handleDeleteUserAccount() {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);

    await deleteDoc(userDocRef);
    await deleteUser(user);
  }

  return (
    <Center>
      <div className="flex items-center justify-center gap-4">
        <img
          src={user?.photoURL!}
          alt={user?.displayName!}
          width={75}
          height={75}
          className="rounded-full shadow-md"
        />
        <div>
          <p className="font-bold text-xl">{user?.displayName}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {user?.email}
          </p>
        </div>
      </div>
      <button
        onClick={handleDeleteUserAccount}
        className="px-8 py-2 bg-red-500 dark:bg-red-600 text-white font-bold rounded-md shadow-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors mt-8"
      >
        Delete account
      </button>
      <Link
        to={routes.home.href}
        className="text-sky-500 hover:underline font-bold mt-8"
      >
        {routes.home.label}
      </Link>
      <Link
        to={routes.logout.href}
        className="text-sky-500 hover:underline font-bold"
      >
        {routes.logout.label}
      </Link>
    </Center>
  );
}
