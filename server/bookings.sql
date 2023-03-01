CREATE TABLE bookings (
    id serial primary key,
    name VARCHAR (250) NOT NULL,
    email VARCHAR (250) NOT NULL,
    date DATE NOT NULL,
    event_id INTEGER REFERENCES events(id),
    user_id INTEGER REFERENCES users(id)
);
