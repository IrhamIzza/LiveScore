import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function League() {
  const { id } = useParams();
  const [league, setLeague] = useState([]);
  const [nextLeague, setNextLeague] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      const [res1, res2] = await Promise.all([
        fetch("/api/all_leagues.php"),
        fetch(`/api/eventsnextleague.php?id=${id}`),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      setLeague(data1.leagues);
      setNextLeague(data2.events[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      {loading && (
        <div className="bg-black h-full w-full fixed z-10 flex items-center justify-center opacity-85">
          <i className="ph ph-circle-notch animate-spin text-9xl text-white fixed z-20"></i>
        </div>
      )}
      <div className="flex p-2 sm:m-5 gap-5 text-white">
        {/* Kiri */}
        <div className="hidden md:flex max-w-56 bg-gray-700  rounded-2xl">
          <div className="p-3 flex flex-col gap-4">
            <p className="text-white">League</p>
            <ul className=" ps-1 gap-4 flex flex-col text-sm text-gray-300">
              {league.map((item) => (
                <li
                  className="cursor-pointer flex gap-2 items-center"
                  key={item.idLeague}
                >
                  <Link
                    to={`/league/${item.idLeague}`}
                    className="flex gap-2 items-center"
                  >
                    <img
                      src={`/logos/${item.idLeague}.png`}
                      className="w-6 h-6"
                      alt=""
                    />
                    <span>{item.strLeague}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-white">Teams</p>
            <p className="text-white">Player</p>
          </div>
        </div>
        {/* tengagh */}
        <div className="w-full">
          <p className="text-4xl font-medium text-center ">
            {nextLeague.strLeague}
          </p>
          <div className="bg-gray-700 flex">
            <div className="bg-gray-700 rounded-2xl flex-1">
              <img
                className="rounded-2xl object-fit h-full"
                src={nextLeague.strBanner}
                alt=""
              />
            </div>
            <div>klasemen</div>
          </div>
        </div>
        {/* Kanan */}
        <div></div>
      </div>
    </>
  );
}
