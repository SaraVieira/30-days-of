import { useEffect, useState } from "react";
import urlify from "urlify";
import { parse, addMonths, format } from "date-fns";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

function Challenge() {
  const { name } = useParams();
  const [data, setData] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setFrom] = useState({ name: "", description: "" });
  const [url, setUrl] = useState();

  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "nikkitaftw",
      uploadPreset: "30days",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        setUrl(result.info.url);
      }
    }
  );

  const getInitial = async () => {
    const rsp = await fetch(
      "https://legitbackend.wtf/challenges/" + name
    ).then((d) => d.json());

    setData(rsp[0]);
  };
  useEffect(() => {
    getInitial();
  }, []);

  const addEntry = async (e) => {
    e.preventDefault();
    const newItem = {
      ...data,
      items: data.items.concat({
        ...form,
        image: url,
      }),
    };
    await fetch(
      `https://legitbackend.wtf/challenges/${data.name}/${data._id}`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "put",
        body: JSON.stringify(newItem),
      }
    ).then((rsp) => rsp.json());
    setShowAdd(false);
    getInitial();
  };

  if (!data) return "Loading";

  const todayExists = data.items.find((item) => {
    if (
      new Date().getMonth() === new Date(item.date).getMonth() &&
      new Date().getDay() === new Date(item.date).getDay()
    ) {
      return true;
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
      {!todayExists ? (
        <button
          class="inline-flex items-center px-3 py-2 border mt-4 border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
          onClick={() => setShowAdd(true)}
        >
          Add Entry for {format(new Date(), "dd MMMM")}
        </button>
      ) : null}
      {showAdd ? (
        <form class="mt-4" onSubmit={addEntry}>
          <div class="mb-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div class="mt-1">
              <input
                value={form.name}
                onChange={(e) =>
                  setFrom((form) => ({
                    ...form,
                    name: e.target.value,
                  }))
                }
                required
                type="text"
                name="name"
                id="name"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div class="mb-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea
                value={form.description}
                onChange={(e) =>
                  setFrom((form) => ({
                    ...form,
                    description: e.target.value,
                  }))
                }
                name="name"
                id="name"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          {url ? (
            "File Uploaded"
          ) : (
            <button
              type="button"
              onClick={() => myWidget.open()}
              class="cloudinary-button"
            >
              Upload files
            </button>
          )}
          <button
            type="submit"
            class="flex items-center px-3 py-2 border mt-4 border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Entry
          </button>
        </form>
      ) : null}

      {data.items.length ? (
        <ul class="space-y-3 mt-10">
          {data.items.map((ch) => (
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
              <img src={ch.image} alt={ch.name} />
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}

export default Challenge;
