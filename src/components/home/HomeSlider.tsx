import React from 'react';

interface IProps {
    img: string;
    imgClassName: string;
    titleClassName: string;
    title: string;
}

const HomeSlider: React.FC<IProps> = ({ img, imgClassName, titleClassName, title }) => {
    return (
        <>
            <img src={img} className={imgClassName} />
            {/*<span className={titleClassName}>{title.length <= 18 ? title : `${title.slice(0, 18)}...`}</span>*/}
            <span className={titleClassName}>{title}</span>
        </>
    );
};

export default HomeSlider;