import { AddUserModal } from "@/components/module/users/AddUserModal";
import { selectUser } from "@/features/user/userSlice";
import { useAppSelector } from "@/redux/hook";
import { Trash2 } from "lucide-react";

function Users() {
  const users = useAppSelector(selectUser);

  return (
    <>
      {/* Header with Add User Button */}
      <div className="w-10/12 flex justify-between items-center mx-auto my-5">
        <h1 className="text-xl font-semibold">Users</h1>
        <AddUserModal />
      </div>

      {/* User List */}
      <div className="w-8/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center border-2 border-green-500 shadow-md rounded-lg p-4  h-24"
            >
              <span className="text-lg font-medium">{user.name}</span>
              <button className="text-red-500 hover:text-red-700">
                <Trash2 size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
