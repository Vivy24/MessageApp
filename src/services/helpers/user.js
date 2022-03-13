import {
  query,
  ref,
  orderByChild,
  onValue,
  getDatabase,
  startAt,
  endAt,
} from "firebase/database";

const db = getDatabase();

export const filerDataByKey = (key, value) => {
  const userLists = [];
  const filterUser = query(
    ref(db, "users"),
    orderByChild(key),
    startAt(value),
    endAt(value + "\uf8ff")
  );

  onValue(filterUser, (snapshot) => {
    snapshot.forEach((value) => {
      const childKey = value.key;
      const childData = value.val();

      const user = {
        id: childKey,
        info: childData,
      };

      userLists.push(user);
    });
  });
  return userLists;


 
};


