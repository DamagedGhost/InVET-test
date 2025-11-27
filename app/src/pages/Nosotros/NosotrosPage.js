import React from 'react';
import MainTemplate from '../../templates/MainTemplate';

const NosotrosPage = () => {
    return (
        <MainTemplate>
            <main>
              <section className="hero text-center p-5">
                <h2 className="mb-4 text-primary fw-bold">Sobre InVET</h2>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-12">
                      <div className="card p-5 shadow-lg border-0">
                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <img 
                                src="https://img.freepik.com/vector-gratis/ilustracion-concepto-veterinario_114360-3007.jpg" 
                                alt="Equipo InVET" 
                                className="img-fluid rounded mb-3 mb-md-0" 
                            />
                          </div>
                          <div className="col-md-8 text-start">
                              <h4 className="mb-3 text-secondary">Nuestra Misión</h4>
                              <p>
                                En <strong>InVET</strong>, nos dedicamos a mejorar la calidad de vida de las mascotas 
                                a través de una atención integral y productos de la más alta calidad. Creemos que cada animal 
                                merece cuidados excepcionales y amor incondicional.
                              </p>
                              
                              <h4 className="mb-3 text-secondary mt-4">Nuestra Visión</h4>
                              <p>
                                Aspiramos a ser la clínica y tienda veterinaria líder, reconocida por nuestra excelencia médica, 
                                innovación tecnológica y compromiso con el bienestar animal y la satisfacción de sus dueños.
                              </p>

                              <p className="mt-4 fst-italic text-muted">
                                "Porque ellos no son solo mascotas, son familia."
                              </p>
                          </div>
                        </div> 
                      </div> 
                    </div>
                  </div>
                </div>
              </section>
            </main>
        </MainTemplate>
    );
};

export default NosotrosPage;