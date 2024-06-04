const express = require('express');
const app = express();
const crypto = require('crypto');

//const postgres = require('postgres');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'reise-japan-pg.internal',
  database: 'postgres',
  password: '8fcRy5C8GG9JjL5',
  port: 5432,
})

//const sql = postgres('postgres://postgres:8fcRy5C8GG9JjL5@reise-japan-pg.flycast:5432/postgres') 

app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.get('/checkin', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/checkin', (req, res) => {
    console.log('GET /api/checkin')
    // TODO: Implement checkin API
    getCheckins().then(checkins => {
        //const foo = checkins.rows.map(checkin => {
        //    return {lat: checkin.lat, longitude: checkin.lon, timestamp: checkin.timestamp}
        //})
        res.status(200).json(checkins.rows)
    })
});

app.post('/api/checkin', (req, res) => {
    console.log('POST /api/checkin')
    console.log(req.body)
    createCheckin(req.body).then(checkin => {
        console.log(checkin.rows)
    res.status(200).json(checkin.rows[0]);
    })
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/' + req.url);
});


async function getCheckins() {
    const checkins = await pool.query(`select lat, lon, timestamp from public.checkin ORDER BY timestamp DESC`)
    return checkins
}

async function createCheckin(ci) {
    console.log(ci)
    const uuid = crypto.randomUUID().toString()
    console.log(`
    INSERT INTO public.checkin (id, user_id, lat, lon, timestamp)
    VALUES ('${uuid}', 1, ${ci.lat}, ${ci.lon}, '${new Date().toISOString()}')
    `)
    const newCheckin = await pool.query(`
    INSERT INTO public.checkin (id, user_id, lat, lon, timestamp)
    VALUES ('${uuid}', 1, ${ci.lat}, ${ci.lon}, '${new Date().toISOString()}')
    RETURNING lat, lon, timestamp
    `)
    return newCheckin
}


async function init() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS public.checkin (
        id UUID PRIMARY KEY,
        user_id INT,
        lat FLOAT,
        lon FLOAT,
        timestamp TIMESTAMP
    );
    `)
    
}
init();
app.listen(3000, () => {
    console.log(`Express server running at http://localhost:${3030}/`);
  });


  //What does this mean?: 