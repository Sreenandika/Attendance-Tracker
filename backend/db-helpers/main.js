
function getAdminUsers (client) {
    const query = `SELECT user_id,username,password FROM user_accounts WHERE user_role = 'admin';`;
    return client.query(query);
}
function getStudentUsers (client) {
    const query = `SELECT username,password FROM user_accounts WHERE user_role = 'student';`;
    return client.query(query);
}
function addClasses(client,class_name,class_id){
    const query = `INSERT INTO classes(class_id,class_name) VALUES(${class_id},'${class_name}');`;
    console.log(query);
    return client.query(query);

}
module.exports = {
    getAdminUsers,
    getStudentUsers,
    addClasses
}