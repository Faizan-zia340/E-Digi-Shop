import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const context = useContext(myContext);
 const { getAllOrder, deleteProduct } = context;

  return (
    <div>
      <div className="py-5">
        <h1 className="text-xl text-purple-300 font-bold">All Orders</h1>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border border-collapse sm:border-separate border-purple-100 text-purple-400">
          <tbody>
            <tr>
              {[
                "S.No.", "Order Id", "Image", "Title", "Category",
                "Price", "Quantity", "Total Price", "Status", "Name",
                "Address", "Pincode", "Phone Number", "Email", "Date", "Action"
              ].map((heading, idx) => (
                <th key={idx} className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-purple-100 text-slate-700 bg-slate-100">
                  {heading}
                </th>
              ))}
            </tr>

            {getAllOrder.map((order, orderIndex) =>
              order.cartItems.map((item, itemIndex) => {
                const { id, productImageUrl, title, category, price, quantity } = item;
                return (
                  <tr key={`${orderIndex}-${itemIndex}`} className="text-purple-300">
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-purple-100 text-slate-500">{itemIndex + 1}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500">{id}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500">
                      <img src={productImageUrl} alt="img" className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500 capitalize">{title}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500 capitalize">{category}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500">₹{price}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500">{quantity}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500">₹{price * quantity}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-green-600">{order.status}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500 capitalize">{order.addressInfo.name}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500 capitalize">{order.addressInfo.address}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-100 text-slate-500">{order.addressInfo.pincode}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500">{order.addressInfo.mobileNumber}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500">{order.email}</td>
                    <td className="h-12 px-6 text-md border-t border-l border-purple-100 text-slate-500">{order.date}</td>
                    <td onClick={()=> deleteProduct(order.id)}
                      className="h-12 px-6 text-md border-t border-l border-purple-100 text-red-500 cursor-pointer"
                     
                    >
                      Delete
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
