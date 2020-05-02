create table datatable(
    id serial,
    uid integer not null,
    vehicle_no varchar(200),
    vehicle_type varchar(50),
    driver_no varchar(50),
    no_kd_passenger integer,
    no_male integer,
    no_female integer,
    temp integer,
    time varchar (50),
    date timestamp,
    gps varchar(100),
    euid integer 
);
create table outgoingtable(
    id serial,
    uid integer not null,
    vehicle_no varchar(200),
    vehicle_type varchar(50),
    driver_no varchar(50),
    time varchar (50),
    date timestamp    
);

create table users(
    id serial,
    border_name varchar(50) not null,
    uname varchar(50) unique,
    phone varchar(20) not null,
    email varchar(50) not null
    );