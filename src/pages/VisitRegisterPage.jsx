import React, { useState } from 'react';
import { Card, Tab, Nav } from 'react-bootstrap';
export default function VisitRegisterPage() {
    const [activeTab, setActiveTab] = useState('visitas');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container text-center">
            <div className='card'>
                <div className='card-header' id="myTab" role="tablist">
                    <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                Registrados
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                No Registrados
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, officia earum? Aliquid, porro. Vero exercitationem reprehenderit repellendus repellat. Nulla soluta quia praesentium modi expedita ad distinctio voluptatum maiores cumque iste.
                    </div>
                    <div
                        className="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit eaque praesentium aliquid quasi mollitia tenetur officiis! Eaque quo dolor beatae repellendus provident doloribus delectus aspernatur. Officiis reiciendis possimus a totam.
                    </div>
                </div>
            </div>
        </div>
    );
};

