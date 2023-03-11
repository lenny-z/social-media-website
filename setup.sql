DROP TABLE IF EXISTS salted_password_hashes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(254) UNIQUE NOT NULL

    --username    VARCHAR(320)
);

CREATE TABLE salted_password_hashes (
    id                      SERIAL PRIMARY KEY,
    user_id                 INT REFERENCES users (id) ON DELETE CASCADE,
    --argon2id
    salted_password_hash    VARCHAR NOT NULL
    -- CONSTRAINT fk_user_id
    --     FOREIGN KEY(user_id)
    --         REFERENCES users(id)
);

-- REVOKE ALL ON ALL TABLES IN SCHEMA public FROM social_network_backend;
REASSIGN OWNED BY social_network_backend TO postgres;
DROP OWNED BY social_network_backend;
DROP ROLE IF EXISTS social_network_backend;
CREATE ROLE social_network_backend;
--Manually grant login and password to avoid exposing key in setup.sql to Git
-- GRANT USAGE ON SCHEMA public TO social_network_backend;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, salted_password_hashes TO social_network_backend;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO social_network_backend;