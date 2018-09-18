function tryParse(json) {
  try {
    return json ? JSON.parse(json) : undefined;
  } catch (e) {
    return undefined;
  }
}

export default {
  studentInfo: {
    information: tryParse(localStorage.information),
    subjects: tryParse(localStorage.subjects),
    attendances: tryParse(localStorage.attendances),
    additional: tryParse(localStorage.additional),
  },
};
