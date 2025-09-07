import React from 'react';

const Introduction: React.FC = () => {
  return (
    <div className="introduction flex flex-row items-center justify-between gap-8 p-8 lg:p-16 bg-gray-900">
      <img 
        src="/attached_assets/IMG_0299.png"
        alt="Introduction Image"
        className="w-1/2 max-w-[700px] rounded-lg shadow-xl object-cover" 
      />
      
      <div className="w-1/2">
        <p className="text-gray-200 text-lg leading-relaxed" style={{ fontFamily: '"Nunito Sans", sans-serif' }}>
          L'ère des humains n'est plus qu'un souvenir effacé par le vent et la poussière. Leur monde, jadis grandiose et indomptable, s'est effondré sous le poids de ses propres excès, ne laissant derrière lui que des ruines hantées par l'écho de leur disparition.
          <br /><br />
          Désormais, une nouvelle espèce règne sur les vestiges de cette civilisation éteinte : les chats.
          <br /><br />
          Nés dans l'ombre de l'apocalypse, ils ont appris à dompter le chaos. Là où l'humanité voyait sa fin, eux ont trouvé un nouveau départ. Certains ont exploité les restes de l'ancienne technologie, d'autres ont embrassé les mutations et les forces mystérieuses qui ont émergé du cataclysme.
          <br /><br />
          Des cités se sont reformées, des tribus se sont levées, des pouvoirs se sont consolidés. Mais si le monde a changé de maîtres, il n'a pas pour autant...
        </p>
      </div>
    </div>
  );
};

export default Introduction;