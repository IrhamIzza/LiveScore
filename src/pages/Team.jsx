import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Team() {
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState([]);
    const { id } = useParams();

    async function getData() {
        try {
            loading(true);
            const res = await fetch(`https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=${id}`);
            const data = await res.json();
            setTeam(data.teams[0]);

        } catch (error) {
            
        }
    }

  return(
    <>
    
    </>
  )
}
