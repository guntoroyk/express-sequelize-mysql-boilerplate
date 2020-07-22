import bcrypt from 'bcrypt';

const saltRounds = 12;

function hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function comparePassword(password, hashedPw) {
    return bcrypt.compareSync(password, hashedPw);
}

export default { hashPassword, comparePassword };
