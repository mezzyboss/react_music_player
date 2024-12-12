import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();


  const artistId = track?.relationships?.artists?.data[0]?.id || track?.artists[0]?.adamid;
  const coverArtUrl = track?.attributes?.artwork?.url || track?.images?.coverart;
  const artistName = track?.attributes?.artistName || track?.subtitle;

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${artistId}`)}
    >
      <img alt="artist_img" src={coverArtUrl} className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {artistName}
      </p>
    </div>
  );
};

export default ArtistCard;
