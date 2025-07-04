import React from "react";

interface User {
  _id: string;
  username: string;
}

interface Props {
  users: User[];
  activeUserId: string;
  onSelect: (userId: string) => void;
}

const UserList: React.FC<Props> = ({ users, activeUserId, onSelect }) => {
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <button
          key={user._id}
          onClick={() => onSelect(user._id)}
          className={`w-full text-left px-4 py-2 rounded-lg transition ${
            activeUserId === user._id
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          {user.username}
        </button>
      ))}
    </div>
  );
};

export default UserList;
