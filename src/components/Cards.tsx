import React, { ReactNode } from 'react';

type CardProps = {
    // children?: ReactNode;
    classes?: string;
    title?: string;
    description?: string;
    image_url?: string;
    ClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };

const Card: React.FC<CardProps> = ({
    // children,
    // classes,
    title,
    description,
    ClickHandler,
  })  => (
    <div className="center">
    <div className="property-card">
      <a href="#">
        <div className="property-image">
          <div className="property-image-title">
            {/* <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. --> */}
          </div>
        </div></a>
      <div className="property-description">
        <h5> {title} </h5>
        <p>{description}</p>
      </div>
      <a href="#">
        <div className="property-social-icons">
          {/* <!-- I would usually put multipe divs inside here set to flex. Some people might use Ul li. Multiple Solutions --> */}
        </div>
      </a>
    </div>
  </div>
);

export default Card;
