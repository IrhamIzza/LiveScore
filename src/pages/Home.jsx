import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [league, setLeague] = useState([]);
  const [logo, setLogo] = useState([]);

  async function getData() {
    let response = await fetch(
      "https://www.thesportsdb.com/api/v1/json/123/all_leagues.php"
    );
    let data = await response.json();
    let final = data.leagues;
    setLeague(final);

    //  Ambil logo untuk setiap liga
    let logosData = {};
    for (let item of final) {
      let res = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/lookupleague.php?id=${item.idLeague}`
      );
      let detail = await res.json();
      logosData[item.idLeague] = detail.leagues[0].strBadge;
    }
    console.log(logosData)
    setLogo(logosData);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between m-2 gap-2">
        <div className="hidden md:flex lg:basis-2/12 bg-gray-700 text-white rounded-2xl">
          <div className="p-3">
            <p>League</p>
            <ul className="pt-4 ps-1 gap-4 flex flex-col text-sm">
              {league.map((item) => {
                return (
                  <li
                    className="cursor-pointer flex gap-2 items-center"
                    key={item.idLeague}
                  >
                    <img src={logo[item.idLeague]} className="w-6 h-6" alt="" />
                    <span>{item.strLeague}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="lg:basis-7/12 bg-gray-700 text-white">b</div>
        <div className="hidden md:flex lg:basis-3/12 bg-gray-700 text-white">c</div>
      </div>
    </>
  );
}
