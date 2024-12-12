import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArtistCard, Error, Loader } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const [countryCode, setCountryCode] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`)
      .then((res) => {
        setCountryCode(res?.data?.location.country);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const { data, isFetching, error } = useGetTopChartsQuery(countryCode, {
    skip: !countryCode, // Skip the query if countryCode is not set
  });

  if (loading || isFetching) return <Loader title="Loading artists..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top artists</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => <ArtistCard key={track.id} track={track} />)}
      </div>
    </div>
  );
};

export default TopArtists;
