import React from 'react';
import CopiasCard from "../components/CopiasCard";
import PrestamosCard from '../components/PrestamosCard';
const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };

export default function ServicePage() {
    return (
        <div className="container text-center">
            <div className="card-group d-flex justify-content-center">
                <CopiasCard color={ColorPrimary} />
                <PrestamosCard color={ColorPrimary} />
            </div>
        </div>
    );
}
