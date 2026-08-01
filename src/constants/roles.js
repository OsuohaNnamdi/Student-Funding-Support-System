// The backend only recognizes two roles — everyone registers as USER, and
// an admin promotes an account to ADMIN via PATCH /admin/users/{id}. There
// is no self-service sponsor role on the backend.
export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const SERVICES = {
  SCHOLARSHIP: 'SCHOLARSHIP',
};

export const FACULTIES = [
  { name: 'Faculty of Arts', departments: ['Department of English', 'Department of History', 'Department of Philosophy', 'Department of Music', 'Department of Theatre Arts'] },
  { name: 'Faculty of Science', departments: ['Department of Computer Science', 'Department of Physics', 'Department of Chemistry', 'Department of Mathematics', 'Department of Biology'] },
  { name: 'Faculty of Social Sciences', departments: ['Department of Economics', 'Department of Political Science', 'Department of Sociology', 'Department of Psychology', 'Department of Anthropology'] },
  { name: 'Faculty of Engineering', departments: ['Department of Civil Engineering', 'Department of Mechanical Engineering', 'Department of Electrical Engineering', 'Department of Chemical Engineering', 'Department of Computer Engineering'] },
  { name: 'Faculty of Medicine', departments: ['Department of Anatomy', 'Department of Physiology', 'Department of Biochemistry', 'Department of Pathology', 'Department of Pharmacology'] },
  { name: 'Faculty of Law', departments: ['Department of Private Law', 'Department of Public Law', 'Department of International Law', 'Department of Criminal Law', 'Department of Legal Studies'] },
  { name: 'Faculty of Education', departments: ['Department of Curriculum Studies', 'Department of Educational Psychology', 'Department of Guidance and Counseling', 'Department of Educational Administration', 'Department of Special Education'] },
  { name: 'Faculty of Business Administration', departments: ['Department of Accounting', 'Department of Finance', 'Department of Marketing', 'Department of Management', 'Department of Business Law'] },
];
