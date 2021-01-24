import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AddChallengeForm from "./Components/AddChallengeForm";
import isAdmin from "./utils/isAdmin";

function App() {
  const [addChallenge, setAddChallenge] = useState(false);
  const [challenges, setChallenges] = useState([]);

  const getInitial = async () => {
    const rsp = await fetch("https://legitbackend.wtf/challenges").then((d) =>
      d.json()
    );

    setChallenges(rsp);
  };
  useEffect(() => {
    getInitial();
  }, []);

  return (
    <main class="max-w-6xl mx-auto sm:px-6 lg:px-20 pt-8 bg-gray-100 h-full">
      <h1 class="mb-8">
        <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
          30 days of ...
        </span>
      </h1>
      {challenges.length ? (
        <ul class="space-y-3">
          {challenges.map((ch) => (
            <Link to={"/challenges/" + ch.name}>
              <li class="bg-white shadow overflow-hidden rounded-md px-6 py-4 capitalize flex justify-between items-center mb-3">
                {ch.name.split("-").join(" ")}

                <div>
                  <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-indigo-600">
                    Started on {format(new Date(ch.date), "dd MMMM")}
                  </span>
                  <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {ch.items.length} entr{ch.items.length === 1 ? "y" : "ies"}
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
      {isAdmin() && (
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
  );
}

export default App;
