CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,
    teacher_name VARCHAR(100) NOT NULL,
    teacher_type VARCHAR(20) NOT NULL,  -- 'guest' or 'in-house'
    department_id INT NOT NULL REFERENCES departments(department_id)
);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    register_number VARCHAR(50) UNIQUE NOT NULL,
    department_id INT NOT NULL REFERENCES departments(department_id)
);

CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL
);

CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL REFERENCES departments(department_id),
    is_honor_course BOOLEAN NOT NULL DEFAULT FALSE,
    is_minor_course BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE teacher_assignments (
    assignment_id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL REFERENCES teachers(teacher_id),
    class_id INT NOT NULL REFERENCES classes(class_id),
    subject_id INT NOT NULL REFERENCES subjects(subject_id)
);

CREATE TABLE student_enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(student_id),
    class_id INT NOT NULL REFERENCES classes(class_id)
);

CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    assignment_id INT NOT NULL REFERENCES teacher_assignments(assignment_id),
    student_id INT NOT NULL REFERENCES students(student_id),
    attendance_date DATE NOT NULL,
    present BOOLEAN NOT NULL
);
