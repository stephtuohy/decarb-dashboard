"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchUsers } from "../../services/api";
import Loader from "../core/Loader";
import ErrorModal from "../core/ErrorModal";

const UserTable = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers || []);
  const [loading, setLoading] = useState(!initialUsers);
  const [error, setError] = useState(null);

  const closeError = () => {
    setError(null);
  };

  useEffect(() => {
    if (!initialUsers) {
      const cachedUsers = localStorage.getItem("users-list");

      if (cachedUsers) {
        // console.log("cached");
        setUsers(JSON.parse(cachedUsers));
        setLoading(false);
      } else {
        fetchUsers()
          .then((data) => {
            // console.log("data", data);
            setUsers(data);
            localStorage.setItem("users-list", JSON.stringify(data));
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }
    }
  }, [initialUsers]);

  if (loading) return <Loader />;
  if (error) return <ErrorModal message={error} onClose={closeError} />;

  return (
    <div className="p-4 w-full">
      <table>
        <thead>
          <th>Users</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link href={`/user/${user.id}`}>{user.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
