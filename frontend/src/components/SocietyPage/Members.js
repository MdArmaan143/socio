// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Members = () => {
//   const { collegeName, societyName } = useParams();
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (societyName) {
//       axios.get(`/societies/${encodeURIComponent(collegeName)}/${encodeURIComponent(societyName)}/members`)
//         .then(response => {
//           setMembers(response.data.members);
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Error fetching members:', error);
//           setError('Failed to load members.');
//           setLoading(false);
//         });
//     } else {
//       console.error('societyName is undefined. Check the URL and route configuration.');
//       setError('Invalid society name.');
//       setLoading(false);
//     }
//   }, [collegeName, societyName]);

//   if (loading) {
//     return <p className="text-center text-blue-500">Loading members...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-8 p-4">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Members of {societyName}</h2>
//       {members.length > 0 ? (
//         <ul className="divide-y divide-gray-200">
//           {members.map(member => (
//             <li key={member._id} className="py-4 flex items-center">
//               <div className="flex-1">
//                 <p className="text-lg font-semibold text-gray-700">{member.name}</p>
//                 <p className="text-gray-600">{member.stream}</p>
//                 <p className="text-gray-500">{member.batch}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-gray-500">No members found for this society.</p>
//       )}
//     </div>
//   );
// };

// export default Members;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Members = () => {
  const { collegeName, societyName } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (societyName) {
      axios.get(`/societies/${encodeURIComponent(collegeName)}/${encodeURIComponent(societyName)}/members`)
        .then(response => {
          setMembers(response.data.members);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching members:', error);
          setError('Failed to load members.');
          setLoading(false);
        });
    } else {
      console.error('societyName is undefined. Check the URL and route configuration.');
      setError('Invalid society name.');
      setLoading(false);
    }
  }, [collegeName, societyName]);

  if (loading) {
    return <p className="text-center text-blue-500">Loading members...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Members of <span className="text-indigo-700">{societyName}</span></h2>
      {members.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
          <tr>
              <th className="py-2 px-4 border border-gray-300 text-center text-gray-600 w-1/3">Member Name</th>
              <th className="py-2 px-4 border border-gray-300 text-center text-gray-600 w-1/3">Stream</th>
              <th className="py-2 px-4 border border-gray-300 text-center text-gray-600 w-1/3">Batch</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border border-gray-300 text-gray-700">{member.name}</td>
              <td className="py-2 px-4 border border-gray-300 text-gray-700">{member.stream}</td>
              <td className="py-2 px-4 border border-gray-300 text-gray-700">{member.batch}</td>
            </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No members found for this society.</p>
      )}
    </div>
  );
};

export default Members;
