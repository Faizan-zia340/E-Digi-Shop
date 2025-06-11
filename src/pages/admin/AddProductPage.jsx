import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList = [
  { name: "fashion" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
  { name: "home" },
  { name: "books" },
];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
  });

  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.productImageUrl === "" ||
      product.category === "" ||
      product.description === ""
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");

      await addDoc(productRef, {
        ...product,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });

      toast.success("Product added successfully");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Add product failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="login_Form bg-purple-50 px-8 py-6 border border-purple-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-violet-500">
            Add Product
          </h2>
        </div>

        {/* Title */}
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
            placeholder="Product Title"
            className="bg-purple-50 border text-violet-500 border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple-300"
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            placeholder="Product Price"
            className="bg-purple-50 border text-violet-500 border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple-300"
          />
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <input
            type="text"
            name="productImageUrl"
            value={product.productImageUrl}
            onChange={(e) =>
              setProduct({ ...product, productImageUrl: e.target.value })
            }
            placeholder="Product Image Url"
            className="bg-purple-50 border text-violet-500 border-purple-200 px-2 py-2 w-96 rounded-md outline-none placeholder-purple-300"
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full px-1 py-2 text-violet-500 bg-purple-50 border border-purple-200 rounded-md outline-none"
          >
            <option disabled value="">
              Select Product Category
            </option>
            {categoryList.map((value, index) => (
              <option key={index} value={value.name}>
                {value.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            name="description"
            placeholder="Product Description"
            rows="5"
            className="w-full px-2 py-1 text-violet-500 bg-purple-50 border border-purple-200 rounded-md outline-none placeholder-purple-300"
          />
        </div>

        {/* Button */}
        <div className="mb-3">
          <button
            onClick={addProductFunction}
            type="button"
            className="bg-violet-500 hover:bg-purple-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
