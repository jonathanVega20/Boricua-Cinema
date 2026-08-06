-- SQL para crear las tabla para Boricua Cinema

DROP DATABASE IF EXISTS boricuaCinema;
CREATE DATABASE boricuaCinema CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE boricuaCinema;

-- Tabla para los usuarios
CREATE TABLE users (
    id          INT             NOT NULL    UNIQUE AUTO_INCREMENT,
    firstName   VARCHAR(15)     NOT NULL,
    lastName    VARCHAR(25)     NOT NULL,
    email       VARCHAR(50)     NOT NULL,
    `password`  VARCHAR(255)    NOT NULL,
    `role`      ENUM("Customer", "Administrator") DEFAULT "Customer",
    `status`    TINYINT         NOT NULL DEFAULT 1,

    PRIMARY KEY(id),
    UNIQUE INDEX email(email)
);

-- Tabla para el metodo de pago de los usuarios
CREATE TABLE payment_method(
    id              INT             NOT NULL    UNIQUE  AUTO_INCREMENT,
    userId          INT             NOT NULL    UNIQUE,
    numberCard      VARCHAR(20)     NULL,
    expirationDate  DATE            NULL,
    cardCode        VARCHAR(3)      NULL,

    PRIMARY KEY(id),
    CONSTRAINT paymentFkUsers
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla para las peliculas
CREATE TABLE movies(
    id              INT             NOT NULL    UNIQUE AUTO_INCREMENT,
    title           VARCHAR(30)     NOT NULL,
    poster          VARCHAR(50)     NOT NULL,
    duration        VARCHAR(10)     NOT NULL,
    producer        VARCHAR(50)     NOT NULL,
    director        VARCHAR(50)     NOT NULL,
    genre           VARCHAR(20)     NOT NULL,
    casting         TEXT            NOT NULL,
    `description`   TEXT            NOT NULL,
    releaseDate     DATE            NOT NULL,
    `status`        TINYINT         NOT NULL    DEFAULT 1,

    PRIMARY KEY(id)
);

-- Tabla para las interacciones del usuario con las peliculas
CREATE TABLE user_movies_interaction(
    userId      INT      NOT NULL   UNIQUE,
    movieId     INT      NOT NULL   UNIQUE,
    rate        INT      NOT NULL   DEFAULT 0,
    favorite    TINYINT  NOT NULL   DEFAULT 0,

    CONSTRAINT interactionFkUsers
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT interactionFkMovies
        FOREIGN KEY (movieId) REFERENCES movies (id) ON DELETE CASCADE
);

-- Tabla para las comidas
CREATE TABLE foods (
    id          INT         NOT NULL    UNIQUE AUTO_INCREMENT,
    `name`      VARCHAR(15) NOT NULL,
    `image`     VARCHAR(50) NOT NULL,
    quantity    INT         NOT NULL    DEFAULT 0,
    `type`      ENUM("Food", "Drink")   DEFAULT "Food",
    `status`    TINYINT     NOT NULL    DEFAULT 1, 

    PRIMARY KEY (id)
);

-- Tabla de los precios de las comidas
CREATE TABLE food_prices (
    id          INT             NOT NULL    UNIQUE AUTO_INCREMENT,
    foodId      INT             NOT NULL    UNIQUE,
    `size`      VARCHAR(15)     NOT NULL,
    price       DECIMAL(5,2)    NOT NULL DEFAULT 0.00,

    PRIMARY KEY (id),
    CONSTRAINT pricesFkFoods
        FOREIGN KEY (foodId) REFERENCES  foods (id) ON DELETE CASCADE
);

-- Tabla para los diferentes tipos de sala con sus precios
CREATE TABLE room_types (
    id              INT             NOT NULL    UNIQUE,
    typeName        VARCHAR(10)     NOT NULL,
    childrenTicket  DECIMAL(5,2)    NOT NULL DEFAULT 0.00,
    adultTicket     DECIMAL(5,2)    NOT NULL DEFAULT 0.00,
    seniorTicket    DECIMAL(5,2)    NOT NULL DEFAULT 0.00,

    PRIMARY KEY (id)
);

-- Tabla para las diferentes salas
CREATE TABLE rooms (
    id          INT             NOT NULL    UNIQUE  AUTO_INCREMENT,
    typeId      INT             NOT NULL    UNIQUE,
    room        VARCHAR(10)     NOT NULL,
    capacity    INT             NOT NULL    DEFAULT 0,
    `status`    TINYINT         NOT NULL    DEFAULT 0,

    PRIMARY KEY (id),
    CONSTRAINT roomsFKTypes
        FOREIGN KEY (typeId) REFERENCES room_types (id) ON DELETE CASCADE
);

-- Tabla para los showtimes
CREATE TABLE showtimes (
    id              INT         NOT NULL    UNIQUE  AUTO_INCREMENT,
    movieId         INT         NOT NULL    UNIQUE,
    roomId          INT         NOT NULL    UNIQUE,
    `hour`          VARCHAR(5)  NOT NULL,
    `date`          DATE        NOT NULL,
    seatsOccupied   JSON        NULL,

    PRIMARY KEY (id),
    CONSTRAINT showtimesFkMovies
        FOREIGN KEY (movieId) REFERENCES movies (id) ON DELETE CASCADE,
    CONSTRAINT showtimesFkRoom
        FOREIGN KEY (roomId) REFERENCES rooms (id) ON DELETE CASCADE
);

-- Tabla para las ordenes 
CREATE TABLE orders (
    id                  INT         NOT NULL    UNIQUE AUTO_INCREMENT,
    userId              INT         NOT NULL    UNIQUE,
    paymentMethod       VARCHAR(10) NOT NULL,
    transactionNumber   VARCHAR(50) NOT NULL,
    creatAt             TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT ordersFkUsers
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

-- Tabla para las taquillas de las ordernes
CREATE TABLE order_tickets (
    orderId         INT             NOT NULL    UNIQUE,
    showtimeId      INT             NOT NULL    UNIQUE,
    seatsSelected   JSON            NOT NULL,
    childrenTickets INT             NOT NULL DEFAULT 0,
    childrenPrice   DECIMAL(5,2)    NOT NULL DEFAULT 0.00,
    adultTickets    INT             NOT NULL DEFAULT 0,
    adultPrice      DECIMAL(5,2)    NOT NULL DEFAULT 0.00,
    seniorTickets   INT             NOT NULL DEFAULT 0,
    seniorPrice     DECIMAL(5,2)    NOT NULL DEFAULT 0.00,

    PRIMARY KEY (orderId, showtimeId),
    CONSTRAINT ticketsFkOrders
        FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT ticketsFkShowtimes
        FOREIGN KEY (showtimeId) REFERENCES showtimes (id) ON DELETE CASCADE
);

-- Tabla para las comida de las ordenes
CREATE TABLE order_foods (
    orderId     INT             NOT NULL    UNIQUE,
    foodId      INT             NOT NULL    UNIQUE,
    quantity    INT             NOT NULL    DEFAULT 0,
    `size`      VARCHAR(15)     NOT NULL,
    price       DECIMAL(5,2)    NOT NULL    DEFAULT 0.00,

    PRIMARY KEY (orderId, foodId),
    CONSTRAINT foodFkOrders
        FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT foodFkFoods
        FOREIGN KEY (foodId) REFERENCES foods (id) ON DELETE CASCADE
);