import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Zoheb Ahmed',
    email: 'zohebcool1542@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isSeller: true,
    isAdmin: true,
  },
  {
    name: 'Jane Doe',
    email: 'Jane@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isSeller: true,
  },
  {
    name: 'John Doe',
    email: 'JohnDoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
