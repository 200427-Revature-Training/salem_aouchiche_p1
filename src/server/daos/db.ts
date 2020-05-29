import { Pool } from 'pg';

//const log = bunyan.createLogger({name: "Project_P1"});
export const db = new Pool({
    database: 'postgres',
    host:process.env.NODE_APP_URL,
    port: 5432,
    user:process.env.NODE_PROJECT_ROLE,
    password:process.env.NODE_APP_PASS
});

//console.log(JSON.stringify(db)); 

db.on('connect', (client) => {
    client.query(`SET search_path TO my_schema, project1`);
});