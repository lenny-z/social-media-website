DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS salted_password_hashes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(254) UNIQUE NOT NULL
);

CREATE TABLE salted_password_hashes (
    id                      SERIAL PRIMARY KEY,
    user_id                 INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    -- argon2id digest
    salted_password_hash    VARCHAR NOT NULL
);

CREATE TABLE posts (
    id      	SERIAL PRIMARY KEY,
    user_id 	INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	parent		INT REFERENCES posts (id) ON DELETE CASCADE,
    post    	VARCHAR(40000) NOT NULL,
	time_posted	TIMESTAMPTZ NOT NULL
);

REASSIGN OWNED BY social_network_backend TO postgres;
DROP OWNED BY social_network_backend;
DROP ROLE IF EXISTS social_network_backend;
CREATE ROLE social_network_backend;

-- To avoid exposing key to Git, manually enter:
-- ALTER ROLE social_network_backend LOGIN PASSWORD '<password>';

GRANT SELECT, INSERT, UPDATE, DELETE ON users, salted_password_hashes, posts
	TO social_network_backend;

GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO social_network_backend;
GRANT USAGE, SELECT ON SEQUENCE salted_password_hashes_id_seq TO social_network_backend;
GRANT USAGE, SELECT ON SEQUENCE posts_id_seq TO social_network_backend;