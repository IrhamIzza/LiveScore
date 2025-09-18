import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Team() {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);
  const { id } = useParams();
  const [league, setLeague] = useState([]);

  async function getData() {
    try {
      setLoading(true);
      const [res1, res2] = await Promise.all([
        fetch("https://www.thesportsdb.com/api/v1/json/123/all_leagues.php"),
        fetch(
          `https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=${id}`
        ),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      setLeague(data1.leagues);
      setTeam(data2.teams[0]);
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
      <div>
        {loading && (
          <div className="bg-black h-full w-full fixed z-10 flex items-center justify-center opacity-85">
            <i className="ph ph-circle-notch animate-spin text-9xl text-white fixed z-20"></i>
          </div>
        )}
        <div className="flex p-2 sm:m-5 gap-5 text-white">
          {/* Kiri */}
          <div className="hidden md:flex max-w-56  bg-gray-700  rounded-2xl">
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
          {/* tengah */}
          <div className="w-full flex flex-col gap-4">
            <p className="text-4xl md:text-5xl font-medium text-center ">{team.strTeam}</p>
            <div className="flex flex-col sm:flex-row gap-5 ">
              <div className="flex mx-auto">
                <div className="w-52">
                  <img src={team.strBadge} alt="" className="max-w-full" />
                </div>
              </div>
              <div className="bg-gray-700 rounded-2xl w-full">
                <div className="flex flex-col gap-3 p-4 md:text-2xl">
                  <p className="">Nama : {team.strTeam}</p>
                  <p className="">League : {team.strLeague}</p>
                  <p className="">Stadium : {team.strStadium}</p> 
                  <p className="">Country : {team.strCountry}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-700 rounded-2xl">
                <p className="p-2 max-h-60 overflow-scroll overflow-x-hidden">
                  {team.strDescriptionEN}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
