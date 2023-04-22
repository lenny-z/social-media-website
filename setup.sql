DROP VIEW IF EXISTS posts_view;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS salted_password_hashes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    email       VARCHAR(254) UNIQUE NOT NULL,
	username	VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE salted_password_hashes (
    id                      BIGSERIAL PRIMARY KEY,
    user_id                 BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    salted_password_hash    VARCHAR NOT NULL -- argon2id digest
);

CREATE TABLE posts (
    id      	BIGSERIAL PRIMARY KEY,
    poster_id 	BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	parent_id	BIGINT REFERENCES posts (id) ON DELETE CASCADE,
    body    	VARCHAR(40000) NOT NULL,
	time_posted	TIMESTAMPTZ NOT NULL
);

CREATE VIEW posts_view AS
	SELECT posts.id AS id, poster_id, username AS poster_username,
		parent_id, time_posted, body FROM users INNER JOIN posts
		ON users.id = poster_id;

CREATE TABLE follows (
	id			BIGSERIAL PRIMARY KEY,
	follower_id	BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	followed_id	BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	UNIQUE (follower_id, followed_id)
);

REASSIGN OWNED BY social_network_backend TO postgres;
DROP OWNED BY social_network_backend;
DROP ROLE IF EXISTS social_network_backend;
CREATE ROLE social_network_backend;

-- To avoid exposing key to Git, manually enter:
-- ALTER ROLE social_network_backend LOGIN PASSWORD '<password>';

GRANT SELECT, INSERT, UPDATE, DELETE ON users, salted_password_hashes, posts,
	follows TO social_network_backend;

GRANT SELECT ON posts_view TO social_network_backend;

-- GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO social_network_backend;
-- GRANT USAGE, SELECT ON SEQUENCE salted_password_hashes_id_seq TO
-- 	social_network_backend;

-- GRANT USAGE, SELECT ON SEQUENCE posts_id_seq TO social_network_backend;
-- GRANT USAGE, SELECT ON SEQUENCE follows_id_seq TO social_network_backend;

GRANT USAGE, SELECT ON SEQUENCE users_id_seq, salted_password_hashes_id_seq,
	posts_id_seq, follows_id_seq TO social_network_backend;