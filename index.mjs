import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "ysp9sse09kl0tzxj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "ib3grk3xv6qvnip1",
    password: "fn4g21gt0h5mjnx1",
    database: "xtn5f2aybvuuamte",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', async(req, res) => {
    let sql = `SELECT authorId, firstName, lastName
               FROM authors
               ORDER BY lastName`;
    const [rows] = await pool.query(sql);
    sql = `SELECT DISTINCT(category) 
           FROM quotes
           ORDER BY category`;
    const [cate] = await pool.query(sql);
    res.render('home.ejs', {rows, cate})
});
//local api to get all info for a specific author
app.get('/api/authors/:authorId', async(req, res) => {
    let authorId = req.params.authorId;
    let sql = `SELECT *
               FROM authors
               WHERE authorId = ?`
    let [param] = await pool.query(sql, authorId);
   res.send(param)
});
app.get("/searchByKeyword", async(req,res)=>{
    let keyword = req.query.keyword;

    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE quote LIKE ?`;
    let sqlParams = [`%${keyword}%`];
    const [quotes] = await pool.query(sql, sqlParams);
    res.render('result.ejs',{quotes});
})
app.get("/searchByAuthor", async(req,res)=>{
    let authorId = req.query.authorId;
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE authorId LIKE ?`;
    let sqlParams = [`%${authorId}%`];
    const [quotes] = await pool.query(sql, sqlParams);
    res.render('result.ejs',{quotes});
})
app.get("/searchByCategory", async(req,res)=>{
    let category = req.query.category;
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE category LIKE ?`;
    let sqlParams = [`%${category}%`];
    const [quotes] = await pool.query(sql, sqlParams);
    res.render('result.ejs',{quotes});
})
app.get("/searchByLikes", async(req,res)=>{
    let min = req.query.min;
    console.log(min);
    let max = req.query.max;
     console.log(max);
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE likes BETWEEN ? AND ? `;
    let sqlParams = [min , max];
    const [quotes] = await pool.query(sql, sqlParams);
    res.render('result.ejs',{quotes});
})

app.get("/dbTest", async(req, res) => {
   try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})