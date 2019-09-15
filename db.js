const pg = require('pg');
const {Client} = pg;

const uuid = require('uuid');
const client = new Client('postgres://localhost/posts');

client.connect();

const ReactId = uuid.v4();
const ExpressId = uuid.v4();
const NodeId = uuid.v4();

const SQL = `
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE tags(
  id int PRIMARY KEY,
  text VARCHAR(255) UNIQUE NOT NULL,
  post_id UUID REFERENCES posts(id)
);

INSERT INTO posts(id, name) VALUES ('${ReactId}', 'React');
INSERT INTO posts(id, name) VALUES ('${NodeId}', 'Node');
INSERT INTO posts(id, name) VALUES ('${ExpressId}', 'Express');

INSERT INTO tags(id, text, post_id) VALUES (1, 'FrontEnd', '${ReactId}');
INSERT INTO tags(id, text, post_id) VALUES (2, 'Cool', '${ReactId}');
INSERT INTO tags(id, text, post_id) VALUES (3, 'Using now', '${ExpressId}');
INSERT INTO tags(id, text, post_id) VALUES (4, 'A lot of info', '${NodeId}');
INSERT INTO tags(id, text, post_id) VALUES (5, 'Helpful', '${ExpressId}');

`

const syncAndSeed = async ()=> {
  await client.query(SQL);
};

const findAllPosts = async () => {
  const response = await client.query('SELECT * FROM posts');
  return response.rows;
};

const findAllTags = async () => {
  const response = await client.query('SELECT * FROM tags');
  return response.rows
};

module.exports = {
  syncAndSeed,
  findAllPosts,
  findAllTags
}
