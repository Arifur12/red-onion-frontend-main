// import React, { createContext, useEffect, useState } from "react";
// import * as firebase from "firebase/app";
// // import { firebaseConfig } from "../../firebaseConfig";
// // firebase.initializeApp(firebaseConfig);

// export const UserContext = createContext();
// export const Sign_In_Context = (props) => {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(function (usr) {
//       if (usr) {
//         const { email, displayName } = usr;
//         const updateUser = {
//           isSignIn: true,
//           email: email,
//         };
//         setUser(updateUser);
//       } else {
//         setUser(null);
//       }
//     });
//   }, []);
//   console.log(user);
//   return (
//     <UserContext.Provider value={[user, setUser]}>
//       {props.children}
//     </UserContext.Provider>
//   );
// };
