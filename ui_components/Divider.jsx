import React from 'react';
const Divider = () => {
    return (
        <svg
            className={style.editorial}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28 "
            preserveAspectRatio="none"
        >
            <defs>
                <path
                    id="gentle-wave"
                    d="M-160 44c30 0 
                        58-18 88-18s
                        58 18 88 18 
                        58-18 88-18 
                        58 18 88 18
                        v44h-352z"
                />
            </defs>
            <g className={style.parallax1}>
                <use xlinkHref="#gentle-wave" x={50} y={3} fill="#f461c1" />
            </g>
            <g className={style.parallax2}>
                <use xlinkHref="#gentle-wave" x={50} y={0} fill="#4579e2" />
            </g>
            <g className={style.parallax3}>
                <use xlinkHref="#gentle-wave" x={50} y={9} fill="#3461c1" />
            </g>
            <g className={style.parallax4}>
                <use xlinkHref="#gentle-wave" x={50} y={6} fill="#fff" />
            </g>
        </svg>

    );
};

export default Divider;