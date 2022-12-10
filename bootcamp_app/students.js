const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT students.id, students.name AS student_name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohorts.id = students.cohort_ID
WHERE cohorts.name LIKE $1
GROUP BY students.id, cohorts.name
LIMIT $2;
`;
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student_name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
    });
  }).catch(err => console.error('Query error', err.stack));