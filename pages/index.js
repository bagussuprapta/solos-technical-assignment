import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/players");
        const result = await response.json();
        setPlayers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={`${inter.className} px-8 py-2`}>
      <h1 className="mb-3">Footbal Player List</h1>
      <div className="grid grid-cols-3 gap-2">
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
