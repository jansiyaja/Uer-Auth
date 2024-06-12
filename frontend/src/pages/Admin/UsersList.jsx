import React, { useState, useEffect } from 'react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useGetUsersMutation, useDeleteUserMutation } from '../../slices/admin/adminApiSlice';
import EditUser from './EditUser';
import AddUser from './AddUser';
import AdminHeader from '../../Components/AdminHeader';

import adminBackground from '../../Images/adminbackground.jpg';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [userCount, setUserCount] = useState(users?.length || 0);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState(null);

  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [deleteUser, { isDeleting }] = useDeleteUserMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await getUsers();
        setUsers(usersData.data);
      } catch (error) {
        // Handle error
      }
    }
    fetchData();
  }, [userCount, showAddUser, selectedEditUser, showEditUser]);

  useEffect(() => {
    let searchedUsers = filterUser(search, users);
    setFilteredUsers(searchedUsers);
  }, [search, users]);

  const filterUser = (text, usersList) => {
    if (text === '') {
      return usersList;
    } else {
      const filtered = usersList.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
      );
      return filtered;
    }
  };

  const handleAddUserClick = () => {
    setShowAddUser(true);
  };

  const handleCloseAddUser = () => {
    setShowAddUser(false);
  };

  const handleEditUserClick = (user) => {
    setSelectedEditUser(user);
    setShowEditUser(true);
  };

  const handleCloseEditUser = () => {
    setShowEditUser(false);
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      iconColor: '#3F51B5',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3F51B5',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteUser({ userId });
          if (res) {
            setUserCount((prev) => prev - 1);
            toast.success('User deleted successfully');
            const storedUser = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUser && storedUser._id === userId) {
              localStorage.removeItem('userInfo');
            }
          }
        } catch (error) {
          toast.error(error?.data?.message || error.message);
        }
      }
    });
  };

  return (
    <>
      <AdminHeader />
      <div className="relative w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover z-0"
          src={adminBackground}
          alt="Background"
        />
        <div className="container mx-auto mt-3 mb-4 relative p-20 ">
          <div className="flex justify-center">
            <div className="w-full lg:w-9/12 mt-4 lg:mt-0">
             
              <div className="flex mb-3">
                <input
                  type="text"
                  className="form-control flex-grow p-2 border border-slate-300 rounded-l"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn bg-orange-300 text-white px-4 rounded"
                  type="button"
                  onClick={handleAddUserClick}
                >
                  Add New User
                </button>
              </div>
              {showAddUser && <AddUser onClose={handleCloseAddUser} />}
              {showEditUser && <EditUser userData={selectedEditUser} onClose={handleCloseEditUser} />}
              <div className="user-dashboard-info-box  bg-white/50 text-gray-700 p-4 shadow-sm">
                {isLoading || isDeleting ? (
                  <div className="flex justify-center items-center"></div>
                ) : (
                  <table className="table w-full text-black">
                    <thead>
                      <tr>
                        <th className="py-2 px-4">Profile</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                         <tr key={index} className="" >
                          <td className="flex items-center py-3 px-4">
                            <img className="w-10 h-10 rounded-full mr-2" src={user.profileImage} alt="" />
                            <div>
                              <h5 className="mb-0">{user.name}</h5>
                            </div>
                          </td>
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-23px-4">{user.email}</td>
                          <td className="text-right py-2 px-4">
                            <button
                              className="btn btn-sm btn-info mx-2"
                              title="Edit"
                              onClick={() => handleEditUserClick(user)}
                            >
                              <CiEdit/>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              title="Delete"
                              onClick={() => handleDeleteUser(user._id)}
                            >
                              <CiTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
