export default {
  deleteIfExist(arr, str) {
    const index = arr.indexOf(str);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  },
  unshiftIfNotExist(arr, str) {
    const index = arr.indexOf(str);
    if (index === -1) { arr.unshift(str); }
  },
  unshiftOrDelete(arr, str) {
    const index = arr.indexOf(str);
    if (index === -1) { arr.unshift(str); } else { arr.splice(index, 1); }
  },
  pushOrDelete(arr, str) {
    const index = arr.indexOf(str);
    if (index === -1) {
      arr.push(str);
    } else {
      arr.splice(index, 1);
    }
  },
};
