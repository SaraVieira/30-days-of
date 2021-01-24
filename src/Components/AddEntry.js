import { useState } from "react";

const AddEntry = ({ onSubmit, data }) => {
  const [form, setFrom] = useState({ name: "", description: "" });
  const [url, setUrl] = useState([]);

  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "nikkitaftw",
      uploadPreset: "30days",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        setUrl((url) => [...url, result.info.url]);
      }
    }
  );

  const addEntry = async (e) => {
    e.preventDefault();
    const newItem = {
      ...data,
      items: [
        ...data.items,
        { ...form, image: url, date: new Date().toString() },
      ],
    };
    await fetch(`${process.env.REACT_APP_API}${data.name}/${data._id}`, {
      headers: {
        "content-type": "application/json",
      },
      method: "put",
      body: JSON.stringify(newItem),
    }).then((rsp) => rsp.json());
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
      {url.length ? (
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
  );
};

export default AddEntry;
