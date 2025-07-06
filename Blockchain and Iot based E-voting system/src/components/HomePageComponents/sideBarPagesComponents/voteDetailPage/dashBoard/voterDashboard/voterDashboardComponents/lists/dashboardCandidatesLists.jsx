// import React from "react";
// import Image from "next/image";
// import styles from "./DashboardCandidatesLists.module.css";
// import avatar from "../../../../../../../../assets/images/avatar.jpg";

// const CandidatesLists = () => {
//   const candidates = [
//     {
//       seat: "MNA",
//       profileImage: avatar,
//       name: "Sardar Mehtab",
//       party: "PML-N",
//       votes: 5000,

//       constituency: "NA-40",
//     },
//     {
//       seat: "MNA",
//       profileImage: avatar,
//       name: "Ahmed Ali",
//       party: "PPP",
//       votes: 3000,

//       constituency: "NA-40",
//     },
//     {
//       seat: "MNA",
//       profileImage: avatar,
//       name: "Imran Khan",
//       party: "PTI",
//       votes: 2000,

//       constituency: "NA-40",
//     },
//   ];

//   const partyClasses = {
//     "PML-N": "pml-n",
//     PPP: "ppp",
//     PTI: "pti",
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Candidate Vote Stats</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>SEAT</th>
//             <th>Profile</th>
//             <th>Candidate Details</th>
//             <th>Votes</th>

//             <th>Constituency</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidates.map((candidate, index) => (
//             <tr key={index} className={styles.row}>
//               <td className={styles.id}>{candidate.seat}</td>
//               <td>
//                 <div className={styles.profileImageWrapper}>
//                   <Image
//                     src={candidate.profileImage}
//                     alt={candidate.name}
//                     width={50} // Adjust size as needed
//                     height={50} // Adjust size as needed
//                     className={styles.profileImage}
//                   />
//                 </div>
//               </td>
//               <td>
//                 <div className={styles.name}>{candidate.name}</div>
//                 <span
//                   className={`${styles.partyBadge} ${
//                     styles[partyClasses[candidate.party]]
//                   }`}
//                 >
//                   {candidate.party}
//                 </span>
//               </td>
//               <td>
//                 <div className={styles.votes}>
//                   {candidate.votes.toLocaleString()}
//                 </div>
//                 <div className={styles.progressBar}>
//                   <div
//                     className={styles.progress}
//                     style={{
//                       width: `${
//                         (candidate.votes / candidate.totalVotes) * 100
//                       }%`,
//                     }}
//                   ></div>
//                 </div>
//               </td>

//               <td>
//                 <span className={styles.constituencyBadge}>
//                   {candidate.constituency}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CandidatesLists;
import React from "react";
import Image from "next/image";
import styles from "./DashboardCandidatesLists.module.css";
import avatar from "../../../../../../../../assets/images/avatar.jpg";

const CandidatesLists = ({ candidates = [] }) => {
  const getMaxVotes = (seatType) => {
    return Math.max(
      ...candidates
        .filter((c) => c.seatType === seatType)
        .map((c) => Number(c.voteCount)),
      1 // fallback to prevent divide by zero
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Candidate Vote Stats</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>SEAT</th>
            <th>Profile</th>
            <th>Candidate Details</th>
            <th>Votes</th>
            <th>Constituency</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => {
            const maxVotes = getMaxVotes(candidate.seatType);
            const progress = (Number(candidate.voteCount) / maxVotes) * 100;

            return (
              <tr key={index} className={styles.row}>
                <td>{candidate.seatType}</td>
                <td>
                  <Image
                    src={avatar}
                    alt="Demo Avatar"
                    width={50}
                    height={50}
                    className={styles.profileImage}
                  />
                </td>
                <td>
                  <div className={styles.name}>{candidate.name}</div>
                  <span className={styles.partyBadge}>
                    {candidate.partyName || "Independent"}
                  </span>
                </td>
                <td>
                  <div className={styles.votes}>
                    {Number(candidate.voteCount).toLocaleString()}
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progress}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </td>
                <td>
                  <span className={styles.constituencyBadge}>
                    {candidate.constituency}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesLists;
