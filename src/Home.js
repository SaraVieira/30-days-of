import { useEffect, useState } from "react";
import urlify from "urlify";
import { addMonths } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

var clean = urlify.create({
  addEToUmlauts: true,
  szToSs: true,
  spaces: "-",
  nonPrintable: "-",
  trim: true,
});

const toDateInputValue = () => {
  var local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

function App() {
  let navigate = useNavigate();
  const [addChallenge, setAddChallenge] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [data, setData] = useState({
    name: "",
    date: toDateInputValue(),
  });

  const getInitial = async () => {
    const rsp = await fetch("https://legitbackend.wtf/challenges").then((d) =>
      d.json()
    );

    setChallenges(rsp);
  };
  useEffect(() => {
    getInitial();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const name = clean(data.name.toLowerCase());
    const challenge = {
      name,
      date: new Date(data.date),
      finalDate: addMonths(new Date(data.date), 1),
      items: [],
    };

    await fetch("https://legitbackend.wtf/challenges/" + name, {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify(challenge),
    }).then((rsp) => rsp.json());

    navigate("/challenges/" + name);
  };

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
            <li class="bg-white shadow overflow-hidden rounded-md px-6 py-4 capitalize">
              <Link to={"/challenges/" + ch.name}>
                {ch.name.split("-").join(" ")}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <button
        onClick={() => setAddChallenge(true)}
        type="button"
        class=" mt-6 flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add new challenge
      </button>
      {addChallenge ? (
        <form class="mt-6" onSubmit={submit}>
          <div class="mb-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Challenge Name
            </label>
            <div class="mt-1">
              <input
                value={data.name}
                onChange={(e) =>
                  setData((data) => ({
                    ...data,
                    name: e.target.value,
                  }))
                }
                required
                type="text"
                name="name"
                id="name"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="3D Modelling"
              />
            </div>
          </div>
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <div class="mt-1">
              <input
                required
                value={data.date}
                onChange={(e) =>
                  setData((data) => ({
                    ...data,
                    date: e.target.value,
                  }))
                }
                type="date"
                name="date"
                id="date"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <button
            class="inline-flex items-center px-3 py-2 border mt-4 border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Create
          </button>
        </form>
      ) : null}
    </main>
  );
}

export default App;
