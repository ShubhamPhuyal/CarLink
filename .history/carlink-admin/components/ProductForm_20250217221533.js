import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  useEffect(() => {
    console.log("Assigned properties updated:", assignedProperties);
    if (assignedProperties) {
      setProductProperties({ ...assignedProperties });
    }
  }, [assignedProperties]);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    console.log("Saving product with data:", data);
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => [...oldImages, ...res.data.links]);
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName, value) {
    console.log("Setting product property:", propName, "to value:", value);
    setProductProperties((prev) => ({
      ...prev,
      [propName]: value,
    }));
  }

  useEffect(() => {
    if (categories.length > 0 && category) {
      let catInfo = categories.find(({ _id }) => _id === category);
      let allProperties = catInfo ? [...catInfo.properties] : [];

      while (catInfo?.parent?._id) {
        const parentCat = categories.find(({ _id }) => _id === catInfo.parent._id);
        if (parentCat) {
          allProperties.push(...parentCat.properties);
        }
        catInfo = parentCat;
      }

      setProductProperties((prevProps) =>
        allProperties.reduce(
          (acc, prop) => ({
            ...acc,
            [prop.name]: prevProps[prop.name] || "",
          }),
          {}
        )
      );
    }
  }, [category, categories]);

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {categories.length > 0 &&
        category &&
        categories
          .find(({ _id }) => _id === category)
          ?.properties?.map((p) => (
            <div key={p.name}>
              <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
              <div>
                <select
                  value={productProperties[p.name] || ""}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                >
                  <option value="">Select {p.name}</option>
                  {p.values.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
              >
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add image</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>

      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
