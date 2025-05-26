// พิมพ์คำสั่งใน terminal เพื่อสร้างไฟล์ index.js
// touch index.js
// หรือถ้าใช้ Windows ให้ใช้คำสั่ง
// echo.> index.js
// พิมพ์ npm init -y เพื่อสร้างไฟล์ package.json
// ติดตั้ง express และ mysql2 ด้วยคำสั่ง
// npm install express mysql2 หรือ npm i express mysql2

const express = require('express'); // นำเข้า Express เพื่อสร้างเว็บเซิร์ฟเวอร์
const mysql = require('mysql2'); // นำเข้า MySQL2 เพื่อเชื่อมต่อกับฐานข้อมูล MySQL

const app = express(); // สร้างแอปพลิเคชัน Express เพื่อใช้งานเว็บเซิร์ฟเวอร์
const port = 3000; // กำหนดพอร์ตที่เซิร์ฟเวอร์จะฟัง

// ต้องการใช้ข้อมูลเป็นรูปแบบ json >> Use JSON data format
app.use(express.json());

// Create a MySQL connection >> สร้างการเชื่อมต่อ MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '**********', // ใส่รหัสผ่าน MySQL ของคุณที่นี่
    database: 'mysql_nodejs'
});

// Connect to the MySQL database >> เชื่อมต่อกับฐานข้อมูล MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database Successfully!');
});

// สร้าง API สำหรับการเพิ่มข้อมูล
app.post('/api/insert', (req, res) => { // เข้าถึงค่าจาก request body 
    const {firstname, lastname} = req.body; // ดึงข้อมูล firstName และ lastName จาก body ของคำขอ ส่วน id จะเเป็น auto increment

    const query = "INSERT INTO users (firstname, lastname) VALUES (?, ?)"; // สร้างคำสั่ง SQL สำหรับการเพิ่มข้อมูล
    connection.query(query, [firstname, lastname], (err, results) => { // รันคำสั่ง SQL
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        // เมื่อการเพิ่มข้อมูลสำเร็จ จะส่ง response กลับไปยังผู้ใช้
        res.status(201).json({ message: 'Data inserted successfully', id: results.insertId }); // ส่งผลลัพธ์กลับไปยังผู้ใช้
    });
});

// ส่งตัวแปร port ไปยังเซิร์ฟเวอร์ Express เพื่อเริ่มต้นการฟังคำขอ
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // แสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน
});

// จากนั้นพิมพ์ใน terminal >> node index.js
// เปิด Postman และเลือกเมธอด POST
// ตั้งค่า URL เป็น http://localhost:3000/api/insert
// ในแท็บ Body เลือก raw และตั้งค่าเป็น JSON
// ใส่ข้อมูล JSON เช่น
// {
//     "firstname": "John",
//     "lastname": "Doe"
// }
// กด Send เพื่อส่งคำขอไปยังเซิร์ฟเวอร์
// ถ้าทุกอย่างทำงานถูกต้อง คุณจะได้รับการตอบกลับที่บอกว่าข้อมูลถูกเพิ่มสำเร็จ
// และคุณสามารถตรวจสอบฐานข้อมูล MySQL เพื่อดูว่าข้อมูลถูกเพิ่มเข้ามาหรือไม่

// วิธีเชื่อม git
// git init
// git add .
// git commit -m "Initial commit"
// git branch -M main
// git remote add origin https://github.com/Piinfany/Node.JS-My-SQL
// git push -u origin main or  git push -u origin main --force    