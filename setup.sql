DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_hash_salts;

CREATE TABLE users (
    id      SERIAL PRIMARY KEY,
    email   VARCHAR(320)
);

CREATE TABLE password_hash_salts (
    id                  SERIAL PRIMARY KEY,
    user_id             INT NOT NULL,
    --bcrypt
    password_hash_salt  VARCHAR(60),
    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);