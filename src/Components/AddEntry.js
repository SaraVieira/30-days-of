import { useState } from "react";
import { useStore } from "../store";

const AddEntry = ({ onSubmit }) => {
  const [form, setFrom] = useState({
    name: "",
    description: "",
    url: "",
    image: [],
    sandbox: "",
  });
  const [showSandbox, setShowSandbox] = useState(false);
  const store = useStore();
  const [showUrl, setShowUrl] = useState(false);

  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "nikkitaftw",
      uploadPreset: "30days",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        setFrom((form) => ({
          ...form,
          image: [...form.image, result.info.url],
        }));
      }
    }
  );

  const addEntry = async (e) => {
    e.preventDefault();
    await store.addEntry(form);
    onSubmit();
  };

  return (
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
      {form.image.length ? (
        "File Uploaded"
      ) : (
        <span class="relative z-0 inline-flex shadow-sm rounded-md">
          <button
            onClick={() => myWidget.open()}
            type="button"
            class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Image
          </button>
          <button
            onClick={() => setShowUrl((url) => !url)}
            type="button"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            URL
          </button>
          <button
            onClick={() => setShowSandbox((sandbox) => !sandbox)}
            type="button"
            class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            Sandbox ID
          </button>
        </span>
      )}
      {showSandbox ? (
        <div class="mb-2">
          <label for="sandbox" class="block text-sm font-medium text-gray-700">
            Sandbox ID
          </label>
          <div class="mt-1">
            <input
              value={form.sandbox}
              onChange={(e) =>
                setFrom((form) => ({
                  ...form,
                  sandbox: e.target.value,
                }))
              }
              required
              type="text"
              name="sandbox"
              id="sandbox"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      ) : null}
      {showUrl ? (
        <div class="mb-2">
          <label for="url" class="block text-sm font-medium text-gray-700">
            URL
          </label>
          <div class="mt-1">
            <input
              value={form.url}
              onChange={(e) =>
                setFrom((form) => ({
                  ...form,
                  url: e.target.value,
                }))
              }
              required
              type="text"
              name="url"
              id="url"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      ) : null}
      <button
        type="submit"
        class="flex items-center px-3 py-2 border mt-4 border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Entry
      </button>
    </form>
  );
};

export default AddEntry;
