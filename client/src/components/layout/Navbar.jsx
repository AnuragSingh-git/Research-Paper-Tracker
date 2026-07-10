import useAuth from "../../hooks/useAuth";

import { CircleUserRound } from "lucide-react";

export default function Navbar() {

  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <div>

        <h2 className="text-xl font-semibold">

          Welcome,

          <span className="text-indigo-600">

            {" "}
            {user?.name}

          </span>

        </h2>

      </div>

      <div className="flex items-center gap-3">

        <CircleUserRound
          size={36}
          className="text-slate-600"
        />

      </div>

    </header>
  );
}