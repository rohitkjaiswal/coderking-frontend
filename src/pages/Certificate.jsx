import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export default function Certificate(){
  const { id } = useParams();
  const [url, setUrl] = useState(null);

  useEffect(()=>{
    async function load(){
      try {
        // Expect backend: GET /certificates/:id -> { url: 'http://...' }
        const resp = await api.get(`/certificates/${id}`).catch(()=>({data:{url:null}}));
        setUrl(resp.data.url);
      } catch(e){ console.error(e); }
    }
    load();
  },[id]);

  return (
    <div>
      <h2>Certificate</h2>
      {url ? (
        <div>
          <p>Download your certificate:</p>
          <a className="btn btn-primary" href={url} target="_blank" rel="noreferrer">Download PDF</a>
        </div>
      ) : (
        <p>No certificate available yet. If you participated, contact support.</p>
      )}
    </div>
  );
}
