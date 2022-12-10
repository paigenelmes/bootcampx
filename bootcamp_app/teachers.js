const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2] || 'JUL02';
const values = [cohortName];
const queryString = `
SELECT teachers.name AS teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN students ON students.id = assistance_requests.student_id
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
GROUP BY cohorts.name, teachers.name
ORDER BY teacher;
`;

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  }).catch(err => console.error('Query error', err.stack));