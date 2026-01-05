// // import { Machine } from "@/types/machine";
// import Link from "next/link";


// async function getMachines(): Promise<Machine[]> {
//   const res = await fetch("http://localhost:3000/api/brick-machines", {
//     cache: "no-store",
//   });

//   return res.json();
// }

// export default async function MachineList() {
//   const machines = await getMachines();

//   return (
//     <div className="container">
//       <h2>Brick Making Machines</h2>

//       <div className="grid">
//         {machines.map((m) => (
//           <Link key={m.id} href={`/machine/${m.id}`} className="card">
//             <img src={m.image} alt={m.name} />
//             <div className="card-body">
//               <h4>{m.name}</h4>
//               <p className="price">₹ {m.price}</p>
//               <p>{m.city}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
export default function Page() {
  return null;
}
