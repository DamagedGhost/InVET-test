import React from 'react';
import MainTemplate from '../../templates/MainTemplate';

const NosotrosPage = () => {
    return (
        <MainTemplate>
            <main>
  <section className="hero text-center p-5">
    <h2>Sobre Nosotros</h2>
    <p>Conoce más sobre nuestra misión, visión y valores en On The Go Music.</p>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card p-4 shadow-sm">
            <div className="row">
              {/* Imagen */}
              <div className="col-md-3 d-flex align-items-start">
                <img src="https://i.gyazo.com/bf5ddbb13126156cdb262a2017c1ca3b.png" alt="Logo OTGM" className="img-fluid rounded border me-3 mt-2" />
              </div>
              {/* Texto */}
              <div className="col-md-9 d-flex align-items-center">
                <div className="text-start fs-5">
                  <h4 className="mb-4">Nuestra Historia</h4>
                  <p>
                    Somos <strong>On The Go Music</strong>, una comunidad apasionada por la música y la innovación. 
                    Nacimos con el propósito de acercar la música a cada persona, creando un espacio donde artistas, 
                    aficionados y profesionales puedan inspirarse y crecer juntos.
                  </p>
                  <p>
                    Nuestra misión es conectar a los amantes de la música con experiencias únicas, ofreciendo 
                    productos de calidad, servicios especializados y un entorno que promueva la creatividad y la diversidad.
                  </p>
                  <p>
                    Nuestra visión es ser un referente en el mundo musical, impulsando la inclusión, la excelencia y la innovación, 
                    para que cada nota y cada instrumento encuentren su lugar en la vida de quienes sueñan con la música.    
                  </p>
                  <p>
                    En <strong>On The Go Music</strong>, creemos que la música es un lenguaje universal que une corazones 
                    y transforma vidas. Te invitamos a ser parte de esta aventura sonora, donde cada acorde cuenta una historia 
                    y cada melodía es una oportunidad para descubrir el poder de la música.
                  </p>
                </div>
              </div>
            </div> {/* row */}
          </div> {/* card */}
        </div>
      </div>
    </div>
  </section>
</main>

        </MainTemplate>
    );
};

export default NosotrosPage;