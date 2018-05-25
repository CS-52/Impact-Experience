// import * as firebase from 'firebase';
//
//
// class FirebaseDataManager {
//     constructor() {
//         this.connectedToFirebase = false;
//         this.userTaskRef = null;
//     }
//
//     // initializes listener for updates
//     initialize() {
//       //Initialize the required stuff
//
//     }
//
//     async getAllCohorts(callback) {
//         this.tasksRef = firebase.database().ref('cohort');
//         await this.tasksRef.ref.on("value", snapshot =>  {
//             if(snapshot.val()){
//                 let cohorts = [];
//                 console.log('hi');
//                 let returnedData = snapshot.val();
//                 for (let key in returnedData) {
//                       cohorts.push(returnedData[key].name);
//                   }
//                 callback(cohorts)
//               }
//             });
//     }
// }
//
// export default FirebaseDataManager;
