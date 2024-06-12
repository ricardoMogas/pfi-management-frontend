import React from 'react';
import RegisteredVisitsForm from '../components/RegisteredVisitsForm';
import NonRegisteredVisitsForm from '../components/NonRegisteredVisitsForm';

export default function VisitRegisterPage() {
    return (
        <>
            <h1 style={{ color: "var(--blue)" }}>Reportes</h1>
            <hr />
            <div className='card'>
                <div className='card-header'>
                    <ul className="nav nav-pills card-header-pills">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#Registrados"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                Inscritos
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#NoRegistrados"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                No inscritos
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div
                        className="tab-pane fade show active"
                        id="Registrados"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        <RegisteredVisitsForm />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="NoRegistrados"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <NonRegisteredVisitsForm />
                    </div>
                </div>
            </div>
        </>
    );
}
