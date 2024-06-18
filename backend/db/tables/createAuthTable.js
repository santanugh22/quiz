const createAuthTable = `CREATE TABLE IF NOT EXISTS auth_table(
user_id uuid default uuid_generate_v4() primary key,
email varchar(400) not null unique,
password varchar(400) not null,
name char(200) not null ,
college char(300) not null,
department char(100) not null,
user_type int not null check(user_type in (0,1))

)`;

export { createAuthTable };
