import React from 'react';
import download from '../asset/download.png';
import { downloadImage } from '../utils';

interface CardPropsType {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}
const Card: React.FC<CardPropsType> = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img src={photo} alt={prompt} className="w-full h-auto object-cover rounded-xl" /> 

      {/* // Details  */}
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 backdrop-blur-sm m-2 p-4 rounded-xl border border-white">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full object-cover bg-yellow-400 flex justify-center items-center text-gray-800 text-xs text-bold">
              {name[0]}
            </div>
            <p className="text-gray-400 text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;