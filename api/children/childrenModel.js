const db = require('../../data/db-config');

const getChildren = async () => {
  return await db('children');
};

const findByChildId = async (id) => {
  return db('children')
    .leftJoin('profiles', 'children.user_id', 'profiles.key')
    .where('children.id', id);
};

const findByUserId = async (id) => {
  return db('children')
    .leftJoin('profiles', 'children.user_id', 'profiles.key')
    .where('children.user_id', id);
};

const checkEnrolled = async (child_id, schedule_id) => {
  return await db('enrollments')
    .where('child_id', child_id)
    .where('schedule_id', schedule_id);
};

const checkEnrolledExists = async (id) => {
  return await db('enrollments').where({ id });
};

const getEnrolledCourses = async (id) => {
  return await db('children')
    .leftJoin('enrollments', 'children.id', 'enrollments.child_id')
    .leftJoin('schedules', 'enrollments.schedule_id', 'schedules.id')
    .where('children.id', id);
};

const addEnrolledCourse = async (course) => {
  return await db('enrollments').insert(course).returning('*');
};

const addChild = async (child) => {
  return db('children').insert(child).returning('*');
};

const updateChild = async (id, child) => {
  return await db('children').where({ id }).update(child).returning('*');
};

const removeChild = async (id) => {
  return await db('children').where({ id }).del();
};

const removeCourse = async (id) => {
  return await db('enrollments').where({ id }).del();
};

module.exports = {
  getChildren,
  getEnrolledCourses,
  addEnrolledCourse,
  checkEnrolledExists,
  checkEnrolled,
  findByChildId,
  findByUserId,
  addChild,
  removeCourse,
  updateChild,
  removeChild,
};
