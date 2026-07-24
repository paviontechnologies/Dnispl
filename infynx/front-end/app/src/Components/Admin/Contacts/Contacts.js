import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Contacts.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contacts", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
  try {
    await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ status }),
    });

    fetchContacts();
  } catch (err) {
    console.log(err);
  }
};

const deleteContact = async (id) => {
  if (!window.confirm("Delete this inquiry?")) return;

  try {
    await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    });

    fetchContacts();
  } catch (err) {
    console.log(err);
  }
};

  const [search, setSearch] = useState("");
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.email.toLowerCase().includes(search.toLowerCase()) ||
    contact.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="contacts-page">
      <Sidebar />
      <div className="contacts-content">
        <h2>Customer Inquiries</h2>
        <input
          type="text"
          placeholder="Search by name, email, or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {filteredContacts.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.service}</td>
                <td>{item.status}
                   <select value={item.status} onChange={(e) => updateStatus(item._id, e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select> 
                </td>
                <td>
                  <button className="edit-btn" onClick={() => updateStatus(item._id, "In Progress")}>
                    Edit
                  </button>
                  <button className="view-btn" onClick={() => setSelectedContact(item)}>
                    View
                  </button>
                  <button className="delete-btn" onClick={() => deleteContact(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

            {selectedContact && (
                <div className="modal-overlay">
                <div className="modal-box">
                <h2>Customer Inquiry</h2>
                <p><strong>Name:</strong> {selectedContact.name}</p>
                <p><strong>Email:</strong> {selectedContact.email}</p>
                <p><strong>Phone:</strong> {selectedContact.phone}</p>
                <p><strong>Service:</strong> {selectedContact.service}</p>
                <p><strong>Message:</strong></p>
                <div className="message-box">
                {selectedContact.message}
                </div>
                <button className="close-btn" onClick={() => setSelectedContact(null)}>
                 Close
                </button>

            </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default Contacts;