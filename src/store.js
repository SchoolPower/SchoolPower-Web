function tryParse(json, defaultValue = undefined) {
  try {
    return json ? JSON.parse(json) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export default {
  studentInfo: {
    information: tryParse(localStorage.information),
    subjects: tryParse(localStorage.subjects),
    attendances: tryParse(localStorage.attendances),
    additional: tryParse(localStorage.additional),
  },
  settings: {
    gpaSubjects: tryParse(localStorage.gpaSubjects, []),
    additionalGPAGrades: tryParse(localStorage.additionalGPAGrades, []),
  },
};
