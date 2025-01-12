
function getAdminUsers (client) {
    const query = `SELECT user_id,username,password FROM user_accounts WHERE user_role = 'admin';`;
    return client.query(query);
}
function getStudentUsers (client) {
    const query = `SELECT username,password FROM user_accounts WHERE user_role = 'student';`;
    return client.query(query);
}
module.exports = {
    getAdminUsers,
    getStudentUsers
}