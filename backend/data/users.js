import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },

  {
    name: "Jonn Doe",
    email: "jonn@email.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },

  {
    name: "Jane Doe",
    email: "admin@email.com",
    password: jane.hashSync("12345", 10),
    isAdmin: false,
  },
];

export default users;
