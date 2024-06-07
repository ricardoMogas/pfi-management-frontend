const Welcome = () => {
    return (
        <>
            <title>Pagina de bienvenida PFI</title>
            <div className="container-fluid h-100 d-flex flex-column my-3">
                <div className="row align-items-cen mt-3 flex-grow-1"> {/* Añadido 'flex-grow-1' para hacer que esta fila ocupe todo el espacio restante */}

                    <div className="col d-flex justify-content-center"> {/* Añadido 'd-flex justify-conten    t-center' para centrar la imagen */}
                        <img src="Logo_PFI.png" alt="Foto" className="img-fluid" style={{ backgroundColor: 'white', borderRadius: "16px", boxShadow: '0px 0px 10px white' }}/>
                    </div>

                    <div className="col "> {/* Añadido 'd-flex' para hacer que el contenido de esta columna se estire para llenar el espacio vertical */}
                        <div className="card w-100"> {/* Añadido 'flex-grow-1' para hacer que la tarjeta ocupe todo el espacio vertical y 'w-100' para llenar el espacio horizontal */}
                            <div className="card-body" style={{ height: '400px', overflow: 'auto' }}>
                                <h3 className="card-title"><strong>¿QUÉ ES LA INTERCULTURALIDAD?</strong></h3>
                                <p className="card-text">
                                    "Es una perspectiva que parte del reconocimiento de las diversas identidades culturales y múltiples formas de construcción del conocimiento que existen en el mundo".
                                    El propósito del programa es hacer visible la realidad multicultural de nuestra comunidad universitaria, para impulsar las habilidades y actitudes que mejoren las interacciones sociales entre los grupos y favorezcan el desarrollo de competencias que formen dinámicas de convivencia con un enfoque intercultural sin prejuicios ni exclusiones dentro del entorno educativo.
                                </p>
                                <h3><strong>OBJETIVO</strong></h3>
                                <p>
                                Fortalecer el conocimiento pleno de todos las identidades culturales mediante la generación de acciones, actividades e interacciones que fomenten en la Universidad un ambiente de respeto e igualdad a la diversidad cultural; coadyuvando al alcance de una educación de calidad pertinente y oportuna, los métodos de enseñanza, la formación de docentes, la vida escolar y la administración universitaria, siendo una propuesta tangible de transformación social.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Welcome;
