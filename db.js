const pg = require('pg');
const {Client} = pg;

const uuid = require('uuid');
const client = new Client('postgres://localhost/posts');

client.connect();

const SQL = `
DROP TABLE IF EXISTS posts
DROP TABLE IF EXISTS tags

CREATE TABLE tags
`
