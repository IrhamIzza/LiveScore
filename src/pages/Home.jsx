import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [league, setLeague] = useState([]);
  const [nextLeague, setNextLeague] = useState([]);
  const [nextLeague2, setNextLeague2] = useState([]);

  async function getData() {
    let response = await fetch("/api/all_leagues.php");
    let data = await response.json();
    let final = data.leagues;
    setLeague(final);

    let res = await fetch("/api/eventsnextleague.php?id=4328");
    let nextLeagueData = await res.json();
    setNextLeague(nextLeagueData.events[0]);

    let res2 = await fetch("/api/eventsnextleague.php?id=4335");
    let nextLeagueData2 = await res2.json();
    setNextLeague2(nextLeagueData2.events[0]);
  }

  function formatTanggal(input) {
    // daftar bulan
    const bulan = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agust",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    // pecah string
    const [tahun, bulanStr, hari] = input.split("-");

    // ambil bulan (index - 1 karena array mulai dari 0)
    const namaBulan = bulan[parseInt(bulanStr) - 1];

    // return format
    return `${namaBulan}, ${parseInt(hari)} ${tahun}`;
  }

  function formatJam(input) {
    let time = input;
    let result = time.slice(0, 5);
    return result;
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between m-5 gap-5">
        {/* Bagian Kiri  */}
        <div className="hidden md:flex lg:basis-2/12 bg-gray-700  rounded-2xl">
          <div className="p-3 flex flex-col gap-4">
            <p className="text-white">League</p>
            <ul className=" ps-1 gap-4 flex flex-col text-sm text-gray-300">
              {league.map((item) => {
                return (
                  <li
                    className="cursor-pointer flex gap-2 items-center"
                    key={item.idLeague}
                  >
                    <img
                      src={`/logos/${item.idLeague}.png`}
                      className="w-6 h-6"
                      alt=""
                    />
                    <span>{item.strLeague}</span>
                  </li>
                );
              })}
            </ul>
            <p className="text-white">Teams</p>
            <p className="text-white">Player</p>
          </div>
        </div>
        {/* Bagian Tengah */}
        <div className="lg:basis-7/12 text-white flex flex-col gap-5 ">
          <div className="bg-gray-700 rounded-2xl flex-1">
            <img
              className="rounded-2xl object-fit h-full"
              src={nextLeague.strBanner}
              alt=""
            />
          </div>

          <div className="bg-gray-700 rounded-2xl flex flex-col flex-2 gap-4 p-4 text-sm">
            <p className="ps-2 font-medium text-xl">Upcoming Match !!!</p>
            {/* Logo Liga Inggris */}
            <div className="flex gap-2 items-center">
              <img
                src={`/logos/${nextLeague.idLeague}.png`}
                className="w-8 h-8"
                alt=""
              />
              <div className="flex flex-col ">
                <span>{nextLeague.strLeague}</span>
                <span className="text-gray-300">{nextLeague.strCountry}</span>
              </div>
            </div>
            {/* kotak Pertama */}
            <div className="flex p-2 md:px-26 py-1 border border-gray-500 rounded-sm items-center gap-1 md:gap-10">
              <div className="flex flex-3 ">
                <div className="flex flex-3 items-center md:gap-2">
                  <img
                    className="w-10 h-10"
                    src={nextLeague.strHomeTeamBadge}
                    alt=""
                  />
                  {nextLeague.strHomeTeam}
                </div>
                {nextLeague.strTime && (
                  <div className="flex-1 my-auto text-center bg-gray-500 rounded-md">
                    {formatJam(nextLeague.strTime)}
                  </div>
                )}
                <div className="flex flex-3 items-center gap-2 justify-end">
                  {nextLeague.strAwayTeam}
                  <img
                    className="w-10 h-10"
                    src={nextLeague.strAwayTeamBadge}
                    alt=""
                  />
                </div>
              </div>
              {nextLeague.dateEvent && (
                <div className="hidden md:flex flex-1 text-center bg-gray-500 rounded-md">
                  <p className="flex mx-auto">
                    {formatTanggal(nextLeague.dateEvent)}
                  </p>
                </div>
              )}
            </div>
            {/* Logo Liga Spanyol*/}
            <div className="flex gap-2 items-center">
              <img
                src={`/logos/${nextLeague2.idLeague}.png`}
                className="w-8 h-8"
                alt=""
              />
              <div className="flex flex-col ">
                <span>{nextLeague2.strLeague}</span>
                <span className="text-gray-300">{nextLeague2.strCountry}</span>
              </div>
            </div>
            {/* Kotak Kdua */}
            <div className="flex p-2 md:px-26 py-1 border border-gray-500 rounded-sm items-center gap-1 md:gap-10">
              <div className="flex flex-3 ">
                <div className="flex flex-3 items-center md:gap-2">
                  <img
                    className="w-10 h-10"
                    src={nextLeague2.strHomeTeamBadge}
                    alt=""
                  />
                  {nextLeague2.strHomeTeam}
                </div>
                {nextLeague2.strTime && (
                  <div className="flex-1 my-auto text-center bg-gray-500 rounded-md">
                    {formatJam(nextLeague2.strTime)}
                  </div>
                )}
                <div className="flex flex-3 items-center gap-2 justify-end">
                  {nextLeague2.strAwayTeam}
                  <img
                    className="w-10 h-10"
                    src={nextLeague2.strAwayTeamBadge}
                    alt=""
                  />
                </div>
              </div>
              {nextLeague2.dateEvent && (
                <div className="hidden md:flex flex-1 text-center bg-gray-500 rounded-md">
                  <p className="flex mx-auto ">
                    {formatTanggal(nextLeague2.dateEvent)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Bgaian kanan */}
        <div className="hidden md:flex lg:basis-3/12 bg-gray-700 text-white">
          c
        </div>
      </div>
    </>
  );
}
