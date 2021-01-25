import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AddChallengeForm from "../Components/AddChallengeForm";
import Loading from "../Components/Loading";
import isAdmin from "../utils/isAdmin";
import { useStore } from "../store";

function App() {
  const [addChallenge, setAddChallenge] = useState(false);
  const store = useStore();
  useEffect(() => {
    store.getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class="bg-gray-100 ">
      <main class="max-w-6xl mx-auto sm:px-6 lg:px-20 pt-8 h-full">
        <h1 class="mb-8">
          <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
            30 days of ...
          </span>
        </h1>
        {!store.data ? (
          <Loading />
        ) : store.data.length ? (
          <ul class="space-y-3">
            {store.data.map((ch) => (
              <Link to={"/challenges/" + ch.name}>
                <li class="bg-white shadow overflow-hidden rounded-md px-6 py-4  flex justify-between items-center mb-3">
                  <span class="capitalize">
                    {" "}
                    {ch.name.split("-").join(" ")}
                  </span>
                  <div>
                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-indigo-600">
                      Started on {format(new Date(ch.date), "dd MMMM")}
                    </span>
                    <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {ch.items.length} Entr
                      {ch.items.length === 1 ? "y" : "ies"}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <h2 className="text-center text-gray-800">
            You have no challenges, start one
          </h2>
        )}
        {isAdmin() && store.data && (
          <button
            onClick={() => setAddChallenge(true)}
            type="button"
            class="m-auto mt-6 flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add new challenge
          </button>
        )}
        {addChallenge ? <AddChallengeForm /> : null}
      </main>
    </div>
  );
}

export default App;
