import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import isAdmin from "../utils/isAdmin";
import AddEntry from "../Components/AddEntry";
import Loading from "../Components/Loading";
import { useStore } from "../store";

function Challenge() {
  const { name } = useParams();
  const store = useStore();
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    store.getChallenge(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addEntry = async (e) => {
    setShowAdd(false);
    store.refetchChallenge(name);
  };

  return (
    <div class="bg-gray-100 ">
      <main class="mb-12 max-w-6xl mx-auto sm:px-6 lg:px-20 pt-8 bg-gray-100 h-full">
        <h1 class="mb-8">
          <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
            30 days of ...
          </span>
          <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl capitalize">
            {name.split("-").join(" ")}
          </span>
        </h1>
        {store.currentPageData ? (
          <>
            <h2 className="mt-6 block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Posts
            </h2>
            <h3 className="text-center">
              Started:{" "}
              {format(new Date(store.currentPageData.date), "dd MMMM yyyy")}
            </h3>
            <h3 className="text-center">
              Ends:{" "}
              {format(
                new Date(store.currentPageData.finalDate),
                "dd MMMM yyyy"
              )}
            </h3>
            {isAdmin() ? (
              <button
                class=" mt-6 flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="button"
                onClick={() => setShowAdd(true)}
              >
                Add Entry for {format(new Date(), "dd MMMM")}
              </button>
            ) : null}
            {showAdd ? <AddEntry onSubmit={addEntry} /> : null}

            {store.currentPageData.items.length ? (
              <ul class="space-y-3 mt-10">
                {store.currentPageData.items.reverse().map((ch) => (
                  <li class="bg-white shadow overflow-hidden rounded-md px-6 py-4 ">
                    <div class="flex items-center justify-between mb-2">
                      <h6 class="text-lg leading-6 font-medium text-gray-900 capitalize">
                        {ch.name}
                      </h6>
                      <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {format(new Date(ch.date), "dd MMMM")}
                      </span>
                    </div>
                    {ch.description && <p className="mb-2">{ch.description}</p>}
                    {ch.image.length
                      ? ch.image.map((image) => (
                          <img
                            src={image}
                            className="m-auto block mb-2"
                            alt={ch.name}
                          />
                        ))
                      : null}
                    {ch.url ? (
                      <a target="_blank" rel="noreferrer" href={ch.url}>
                        {ch.url}
                      </a>
                    ) : null}
                    {ch.sandbox ? (
                      <iframe
                        src={`https://codesandbox.io/embed/${ch.sandbox}?fontsize=14&hidenavigation=1&theme=dark&view=preview`}
                        style={{
                          width: "100%",
                          height: 500,
                          border: 0,
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                        title="twitter-embed (forked)"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                      ></iframe>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <Loading />
        )}
      </main>
    </div>
  );
}

export default Challenge;
