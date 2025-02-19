/*
	This file contains all the functions that will be performed by the database. 
	I need to make classes for this, but that will come later.
 */

function getStudentsUsers(client) {
	const query = `SELECT user_id,username,password FROM user_accounts WHERE user_role = 'student';`;
	return client.query(query);
}

function getAdminUsers(client) {
	const query = `SELECT user_id,username,password FROM user_accounts WHERE user_role = 'admin';`;
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

function addTeachers(
	client,
	department_id,
	teacher_name,
	teacher_id,
	teacher_email
) {
	const query = `INSERT INTO teachers (teacher_id,teacher_name,department_id,teacher_email) 
	VALUES(${teacher_id},'${teacher_name}','${department_id},${teacher_email}');`;
	return client.query(query);
}

function addUser(client, id, user_name, passwords, user_role) {
	const query = `INSERT INTO user_accounts (user_id, username, password, user_role) 
	VALUES(${id},'${user_name}','${passwords}','${user_role}');`;
	console.log(query);
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
function addStudents(
	client,
	department_id,
	student_name,
	student_id,
	student_email
) {
	const query = `INSERT INTO students (student_id,student_name,department_id,student_email) 
	VALUES(${student_id},'${student_name}','${department_id}','${student_email}');`;
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
function deleteClass(client, class_id) {
	const query = `DELETE FROM classes WHERE class_id=${class_id};`;
	console.log(query);
	return client.query(query);
}
function deleteTeacher(client, teacher_id) {
	const query = `DELETE FROM teachers WHERE teacher_id=${teacher_id};`;
	return client.query(query);
}
function deleteStudent(client, student_id) {
	const query = `DELETE FROM students WHERE student_id=${student_id};`;
	return client.query(query);
}
function deleteDepartment(client, department_name) {
	const query = `DELETE FROM departments WHERE department_name='${department_name}';`;
	return client.query(query);
}
function editTeacher(client, updateFields, teacher_id) {
	const query = ` UPDATE teachers SET ${updateFields} WHERE teacher_id = ${teacher_id}`;
	return client.query(query);
}
function editStudent(client, updateFields, student_id) {
	const query = `UPDATE students SET ${updateFields} WHERE student_id = ${student_id};`;
	return client.query(query);
}
function changeClass(client, student_id, newClassId) {
	const query = `UPDATE student_enrollments SET class_id = ${newClassId} WHERE student_id = ${student_id};`;
	console.log(query);
	return client.query(query);
}
module.exports = {
	getStudentsUsers,
	addUser,
	changeClass,
	editStudent,
	editTeacher,
	deleteDepartment,
	deleteStudent,
	deleteTeacher,
	deleteClass,
	getClass,
	editClass,
	getAdminUsers,
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
