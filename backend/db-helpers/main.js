/*
	This file contains all the functions that will be performed by the database. 
	I need to make classes for this, but that will come later.
 */

function getAdminUsers(client) {
	const query = `SELECT user_id,username,password FROM user_accounts WHERE user_role = 'admin';`;
	return client.query(query);
}
function getStudentUsers(client) {
	const query = `SELECT username,password FROM user_accounts WHERE user_role = 'student';`;
	return client.query(query);
}
function addClasses(client, class_name, class_id) {
	const query = `INSERT INTO classes(class_id,class_name) VALUES(${class_id},'${class_name}');`;
	return client.query(query);
}
function editClass(client, class_name, new_class_name, class_id, new_class_id) {
	const query = `UPDATE classes SET class_id = ${new_class_id}, class_name = '${new_class_name}' WHERE class_id = ${class_id} AND class_name = '${class_name}';`;
	return client.query(query);
}
function getClass(client) {
	const query = `SELECT * from classes;`;
	return client.query(query);
}
function addDepartments(client, department_id, department_name) {
	const query = `INSERT INTO departments (department_id,department_name) VALUES(${department_id},'${department_name}');`;
	return client.query(query);
}
function getDepartments(client) {
	const query = `SELECT * from departments;`;
	return client.query(query);
}
function addSubjects(
	client,
	department_id,
	subject_name,
	subject_id,
	subject_type
) {
	const query = `INSERT INTO subjects (subject_id,subject_name,department_id,subject_type) 
	VALUES(${subject_id},'${subject_name}',${department_id},'${subject_type}');`;
	return client.query(query);
}
function getSubjects(client) {
	const query = `SELECT * FROM subjects`;
	return client.query(query);
}
function addTeachers(client, department_id, teacher_name, teacher_id) {
	const query = `INSERT INTO teachers (teacher_id,teacher_name,department_id) 
	VALUES(${teacher_id},'${teacher_name}','${department_id}');`;
	return client.query(query);
}
function getTeachers(client) {
	const query = `SELECT * FROM teachers`;
	return client.query(query);
}
function addAssignment(client, class_id, teacher_id, subject_id) {
	const query = `INSERT INTO teacher_assignments (teacher_id,class_id,subject_id) 
	VALUES(${teacher_id},'${class_id}','${subject_id}');`;
	return client.query(query);
}
function addStudents(client, department_id, student_name, student_id) {
	const query = `INSERT INTO students (student_id,student_name,department_id) 
	VALUES(${student_id},'${student_name}','${department_id}');`;
	return client.query(query);
}
function getStudents(client) {
	const query = `SELECT * FROM students`;
	return client.query(query);
}
function addEnrollment(client, class_id, student_id) {
	const query = `INSERT INTO student_enrollments (student_id,class_id) 
	VALUES(${student_id},${class_id});`;
	return client.query(query);
}
module.exports = {
	getClass,
	editClass,
	getAdminUsers,
	getStudentUsers,
	addClasses,
	addDepartments,
	getDepartments,
	addSubjects,
	addTeachers,
	getTeachers,
	getSubjects,
	addAssignment,
	addStudents,
	getStudents,
	addEnrollment,
};
