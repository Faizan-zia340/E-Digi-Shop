import toast from "react-hot-toast";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { fireDB, doc, deleteDoc } from "../../firebase/FirebaseConfig";
import { ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
  const navigate = useNavigate();

  // 🗑 Delete Product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("✅ Product deleted successfully!");
      getAllProductFunction();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 px-6 py-8">
      {/* ======= Header Section ======= */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* 🔙 Back Button */}
        <button
        onClick={() => setActiveTab("overview")}
        className="text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1 transition-all"
      >
        ← Back
      </button>

        <h1 className="text-2xl font-bold text-violet-700 text-center">
          Product Management
        </h1>

        {/* ➕ Add Product Button */}
        <Link to="/addproduct">
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow hover:scale-105 transition-transform">
            + Add Product
          </button>
        </Link>
      </div>

      {/* ======= Loader ======= */}
      {loading && (
        <div className="flex justify-center my-10">
          <Loader />
        </div>
      )}

      {/* ======= Product Table ======= */}
      <div className="bg-white rounded-2xl shadow-lg border border-violet-100 p-5 overflow-x-auto">
        <table className="w-full border-collapse text-sm text-left">
          <thead>
            <tr className="bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 font-semibold">
              <th className="py-3 px-4 border-b border-violet-200">#</th>
              <th className="py-3 px-4 border-b border-violet-200">Image</th>
              <th className="py-3 px-4 border-b border-violet-200">Title</th>
              <th className="py-3 px-4 border-b border-violet-200">Price</th>
              <th className="py-3 px-4 border-b border-violet-200">Category</th>
              <th className="py-3 px-4 border-b border-violet-200">Date</th>
              <th className="py-3 px-4 border-b border-violet-200 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {getAllProduct.map((item, index) => {
              const { id, title, price, category, date, productImageUrl } = item;
              return (
                <tr
                  key={id}
                  className="border-b border-violet-50 hover:bg-violet-50/40 transition"
                >
                  <td className="py-3 px-4 text-gray-700">{index + 1}</td>

                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <img
                        src={productImageUrl}
                        alt={title}
                        className="w-16 h-16 object-cover rounded-lg border border-violet-100"
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4 text-gray-700 font-medium capitalize">
                    {title}
                  </td>

                  <td className="py-3 px-4 text-violet-600 font-semibold">
                    ${price}
                  </td>

                  <td className="py-3 px-4 text-gray-600 capitalize">
                    {category}
                  </td>

                  <td className="py-3 px-4 text-gray-500 text-sm">{date}</td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => navigate(`/updateproduct/${id}`)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {getAllProduct.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-6">
            No products found. Try adding one!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
