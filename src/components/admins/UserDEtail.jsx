const UserDetail = () => {
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text */}
                <h1 className="text-xl text-violet-300 font-bold">All User</h1>
            </div>

            {/* table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse sm:border-separate text-violet-400">
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md text-slate-700 bg-slate-100 font-bold">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold text-slate-700 bg-slate-100">Location Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        <tr className="text-violet-300">
                            <td className="h-12 px-6 text-md text-slate-500">
                                1.
                            </td>
                            <td className="h-12 px-6 text-md text-slate-500 first-letter:uppercase">
                                {'name'}
                            </td>
                            <td className="h-12 px-6 text-md text-green-500 cursor-pointer">
                                Edit
                            </td>
                            <td className="h-12 px-6 text-md text-red-500 cursor-pointer">
                                Delete
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetail;
