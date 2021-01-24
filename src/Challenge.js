import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import isAdmin from "./utils/isAdmin";
import AddEntry from "./Components/AddEntry";

function Challenge() {
  const { name } = useParams();
  const [data, setData] = useState();
  const [showAdd, setShowAdd] = useState(false);

  const getInitial = async () => {
    const rsp = await fetch(process.env.REACT_APP_API + name).then((d) =>
      d.json()
    );

    setData(rsp[0]);
  };
  useEffect(() => {
    getInitial();
  }, []);

  const addEntry = async (e) => {
    setShowAdd(false);
    getInitial();
  };

  if (!data) return "Loading";

  const todayExists = data.items.find((item) => {
    if (
      new Date().getMonth() === new Date(item.date).getMonth() &&
      new Date().getDay() === new Date(item.date).getDay()
    ) {
      return false;
    }

    return false;
  });

  return (
    <main class="mb-12 max-w-6xl mx-auto sm:px-6 lg:px-20 pt-8 bg-gray-100 h-full">
      <h1 class="mb-8">
        <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
          30 days of ...
        </span>
        <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl capitalize">
          {name.split("-").join(" ")}
        </span>
      </h1>

      <h2 className="mt-6 block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
        Posts
      </h2>
      <h3 className="text-center">
        Started: {format(new Date(data.date), "dd MMMM yyyy")}
      </h3>
      <h3 className="text-center">
        Ends: {format(new Date(data.finalDate), "dd MMMM yyyy")}
      </h3>
      {!todayExists && isAdmin() ? (
        <button
          class=" mt-6 flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
          onClick={() => setShowAdd(true)}
        >
          Add Entry for {format(new Date(), "dd MMMM")}
        </button>
      ) : null}
      {showAdd ? <AddEntry onSubmit={addEntry} data={data} /> : null}

      {data.items.length ? (
        <ul class="space-y-3 mt-10">
          {data.items.reverse().map((ch) => (
            <li class="bg-white shadow overflow-hidden rounded-md px-6 py-4 capitalize">
              <div class="flex items-center justify-between mb-2">
                <h6 class="text-lg leading-6 font-medium text-gray-900">
                  {ch.name}
                </h6>
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {format(new Date(ch.date), "dd MMMM")}
                </span>
              </div>
              {ch.description && <p className="mb-2">{ch.description}</p>}
              {ch.image.map((image) => (
                <img src={image} alt={ch.name} />
              ))}
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}

export default Challenge;
