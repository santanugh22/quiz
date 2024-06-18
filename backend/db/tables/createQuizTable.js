const createQuizTable = `CREATE TABLE IF NOT EXISTS quiz_table(
    quiz_id uuid default uuid_generate_v4() primary key,
    quiz_name char(200) not null,
    created_by uuid references auth_table(user_id) on delete cascade on update cascade,

    quiz_duration int not null,

    quiz_questions jsonb[] not null,
    quiz_college char(300) not null,
    quiz_department char(100) not null
)`;

export { createQuizTable };
