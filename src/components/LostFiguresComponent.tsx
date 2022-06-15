import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFiguresComponentProps {
  title: string;
  figures: Figure[];
}

const LostFiguresComponent: FC<LostFiguresComponentProps> = ({ title, figures }) => {
  return (
    <div className='lost'>
      <h3>{title}</h3>
      {figures.map(figure =>
        <div key={figure.id}>
          {figure.logo && <img src={figure.logo} alt=""/>}
        </div>
      )}
    </div>
  );
};

export default LostFiguresComponent;
