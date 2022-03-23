import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Kadsha',
        email: 'kads@example.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Sharuha',
        email: 'sharu@example.com',
        password: bcrypt.hashSync('123456', 10),
       
    },

    {
        name: 'Renuja',
        email: 'renuja@example.com',
        password: bcrypt.hashSync('123456', 10),
       
    }

]
export default users 