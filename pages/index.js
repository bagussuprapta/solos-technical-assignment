import { Inter } from "next/font/google";
import { useEffect, useState, Fragment } from "react";
import { Listbox } from "@headlessui/react";

const inter = Inter({ subsets: ["latin"] });

const positions = ["GoalKeeper", "Defender", "Midfielder", "Forward"];

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(positions[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/players?position=${selectedPosition}`);
        const result = await response.json();
        setPlayers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedPosition]);

  return (
    <main className={`${inter.className} px-8 py-2`}>
      <h1 className="mb-3">Footbal Player List</h1>
      <Listbox value={selectedPosition} onChange={setSelectedPosition}>
        <Listbox.Button className={"bg-slate-500 text-white px-2 py-1 rounded"}>{selectedPosition}</Listbox.Button>
        <Listbox.Options className={"mt-2"}>
          {positions.map((position, index) => (
            <Listbox.Option key={index} value={position} as={Fragment}>
              {({ active, selected }) => (
                <li className={`${active ? "bg-blue-500 text-white py-1 px-2 rounded cursor-pointer" : "bg-white text-black py-1 px-2"}`}>
                  {selected}
                  {position}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {players.length > 0 ? (
          players.map((player, index) => {
            return (
              <div className="relative flex flex-row space-x-5 space-y-3 rounded-xl p-3 mx-auto border">
                <div className="w-1/3 bg-white grid place-items-center">
                  <img src={player.avatar} alt="Player Image" className="rounded-xl" />
                </div>
                <div className="w-full md:w-2/3 flex flex-col">
                  <h3 className="font-black text-gray-800 text-xl">
                    {player.firstName} {player.lastName}
                  </h3>
                  <p className="text-xl font-black text-gray-800">
                    <span className="font-normal text-gray-600 text-lg">{player.position}</span>
                  </p>
                  <div className="text-base">
                    <p>City: {player.city}</p>
                    <p>Country: {player.country}</p>
                    <p>Phone: {player.phoneNumber}</p>
                    <p>Email: {player.email}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>Player Not Found!</p>
          </div>
        )}
      </div>
    </main>
  );
}
