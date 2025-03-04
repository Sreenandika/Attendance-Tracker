-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps;

CREATE TABLE IF NOT EXISTS public.attendance
(
    attendance_id serial NOT NULL,
    assignment_id integer NOT NULL,
    student_id integer NOT NULL,
    attendance_date date NOT NULL,
    present boolean NOT NULL,
    CONSTRAINT attendance_pkey PRIMARY KEY (attendance_id)
);

CREATE TABLE IF NOT EXISTS public.classes
(
    class_id serial NOT NULL,
    class_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT classes_pkey PRIMARY KEY (class_id)
);

CREATE TABLE IF NOT EXISTS public.departments
(
    department_id serial NOT NULL,
    department_name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT departments_pkey PRIMARY KEY (department_id)
);

CREATE TABLE IF NOT EXISTS public.session
(
    sid character varying COLLATE pg_catalog."default" NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (sid)
);

CREATE TABLE IF NOT EXISTS public.student_enrollments
(
    enrollment_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    student_id integer NOT NULL,
    class_id integer NOT NULL,
    CONSTRAINT student_enrollments_pkey PRIMARY KEY (enrollment_id)
);

CREATE TABLE IF NOT EXISTS public.students
(
    student_id serial NOT NULL,
    student_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    department_id integer NOT NULL,
    student_email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT students_pkey PRIMARY KEY (student_id)
);

CREATE TABLE IF NOT EXISTS public.subjects
(
    subject_id serial NOT NULL,
    subject_name text COLLATE pg_catalog."default" NOT NULL,
    department_id integer NOT NULL,
    subject_type character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT subjects_pkey PRIMARY KEY (subject_id)
);

CREATE TABLE IF NOT EXISTS public.teacher_assignments
(
    assignment_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    teacher_id integer NOT NULL,
    class_id integer NOT NULL,
    subject_id integer NOT NULL,
    CONSTRAINT teacher_assignments_pkey PRIMARY KEY (assignment_id)
);

CREATE TABLE IF NOT EXISTS public.teachers
(
    teacher_id serial NOT NULL,
    teacher_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    department_id integer NOT NULL,
    teacher_email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT teachers_pkey PRIMARY KEY (teacher_id)
);
CREATE TABLE IF NOT EXISTS public.special_keys 
(
    key_value serial NOT NULL
);
CREATE TABLE IF NOT EXISTS public.user_accounts
(
    user_id serial NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(128) COLLATE pg_catalog."default" NOT NULL,
    user_role character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_accounts_pkey PRIMARY KEY (user_id),
    CONSTRAINT user_accounts_username_key UNIQUE (username)
);

ALTER TABLE IF EXISTS public.attendance
    ADD CONSTRAINT attendance_assignment_id_fkey FOREIGN KEY (assignment_id)
    REFERENCES public.teacher_assignments (assignment_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.attendance
    ADD CONSTRAINT attendance_student_id_fkey FOREIGN KEY (student_id)
    REFERENCES public.students (student_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.student_enrollments
    ADD CONSTRAINT student_enrollments_class_id_fkey FOREIGN KEY (class_id)
    REFERENCES public.classes (class_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.student_enrollments
    ADD CONSTRAINT student_enrollments_student_id_fkey FOREIGN KEY (student_id)
    REFERENCES public.students (student_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.students
    ADD CONSTRAINT students_department_id_fkey FOREIGN KEY (department_id)
    REFERENCES public.departments (department_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.subjects
    ADD CONSTRAINT subjects_department_id_fkey FOREIGN KEY (department_id)
    REFERENCES public.departments (department_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.teacher_assignments
    ADD CONSTRAINT teacher_assignments_class_id_fkey FOREIGN KEY (class_id)
    REFERENCES public.classes (class_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.teacher_assignments
    ADD CONSTRAINT teacher_assignments_subject_id_fkey FOREIGN KEY (subject_id)
    REFERENCES public.subjects (subject_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.teacher_assignments
    ADD CONSTRAINT teacher_assignments_teacher_id_fkey FOREIGN KEY (teacher_id)
    REFERENCES public.teachers (teacher_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.teachers
    ADD CONSTRAINT teachers_department_id_fkey FOREIGN KEY (department_id)
    REFERENCES public.departments (department_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

INSERT INTO special_keys (key_value) VALUES ('1234');
