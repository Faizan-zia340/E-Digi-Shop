// import toast from "react-hot-toast";
// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import myContext from "../../context/myContext";
// import Loader from "../loader/Loader";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { doc } from "firebase/firestore";
// import { deleteDoc } from "firebase/firestore";




// const ProductDetail = () => {
//     const context = useContext(myContext);
//     const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
//     // console.log(getAllProduct)

//     // navigate 
//     const navigate = useNavigate();

//     // Delete product 
//     const deleteProduct = async (id) => {
//         setLoading(true)
//         try {
//             await deleteDoc(doc(fireDB, 'products', id))
//             toast.success('Product Deleted successfully')
//             getAllProductFunction();
//             setLoading(false)
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }
//     }

//     return (
//         <div>
//             <div className="py-5 flex justify-between items-center">
//                 {/* text  */}
//                 <h1 className=" text-xl text-violet-300 font-bold">All Product</h1>
//                 {/* Add Product Button  */}
//                 <Link to={'/addproduct'}>
//                     <button className="px-5 py-2 bg-purple-50 border border-purple-100 rounded-lg">Add Product</button>
//                 </Link>
//             </div>
//     {/* Loading  */}
//     <div className="flex justify-center relative top-20">
//                 {loading && <Loader />}
//             </div>

//             {/* table  */}
//             <div className="w-full overflow-x-auto mb-5">
//                 <table className="w-full text-left border border-collapse sm:border-separate border-purple-100 text-purple-400" >
//                     <tbody>
//                         <tr>
//                             <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
//                             <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
//                             <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100">Title</th>
//                             <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100">Price</th>
//                             <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100">Category</th>
//                             <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100">Date</th>
//                             <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100">Action</th>
//                             <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100">Action</th>
//                         </tr>
                        
//                         {getAllProduct.map((item, index) => {
//                             const { id,title, price, category, date, productImageUrl } = item
//                             return (
//                                 <tr key={id} className="text-purple-300">
//                                     <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
//                                         {index + 1}.
//                                     </td>
//                                     <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
//                                         <div className="flex justify-center">
//                                             <img className="w-20 " src={productImageUrl} alt="" />
//                                         </div>
//                                     </td>
//                             <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-purple-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
//                                 {title}
//                             </td>
//                             <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-purple-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
//                                 {price}
//                             </td>
//                             <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-purple-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
//                                 {category}
//                             </td>
//                             <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-purple-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
//                                 {date}
//                             </td>
//                             <td onClick={()=> navigate(`/updateproduct/${id}`)}  className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-purple-100 stroke-slate-500  text-green-500 cursor-pointer ">
//                                 Edit
//                             </td>
//                             <td onClick={()=> deleteProduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-purple-100 stroke-slate-500  text-red-500 cursor-pointer ">
//                                 Delete
//                             </td>
//                         </tr>
//                              )
//                             })}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default ProductDetail;
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
    <div className="min-h-screen py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // 👈 goes back to previous page (Dashboard)
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-100 text-violet-700 font-medium hover:bg-violet-200 transition"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold text-violet-700">All Products</h1>

        {/* Add Product Button */}
        <Link to="/addproduct">
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow hover:shadow-lg hover:scale-105 transition">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center my-10">
          <Loader />
        </div>
      )}

      {/* Product Table Card */}
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
