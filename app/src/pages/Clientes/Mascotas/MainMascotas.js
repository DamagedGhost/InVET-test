import React from "react";
import AdminTemplate from "../../../templates/AdminTemplate";
import Button from "../../../components/atoms/Button";
import useUserViewModel from "../../../viewmodels/useUserViewModel";
import LoadingSpinner from "../../../components/atoms/LoadingSpinner";

const MainMascotas = () => {
  // Usamos el ViewModel de Usuarios porque las mascotas están anidadas en ellos
  const { users, loading } = useUserViewModel();

  // --- LÓGICA DE NEGOCIO (Estadísticas Globales) ---
  
  // 1. Aplanar todas las mascotas en un solo array
  const allMascotas = users.reduce((acc, user) => {
      if (user.mascotas && Array.isArray(user.mascotas)) {
          return [...acc, ...user.mascotas];
      }
      return acc;
  }, []);

  const totalPacientes = allMascotas.length;

  // 2. Conteo por Especie
  const perros = allMascotas.filter(m => m.especie?.toLowerCase().includes('perro') || m.especie?.toLowerCase().includes('canino')).length;
  const gatos = allMascotas.filter(m => m.especie?.toLowerCase().includes('gato') || m.especie?.toLowerCase().includes('felino')).length;
  const otros = totalPacientes - (perros + gatos);

  // 3. Peso Promedio (Métrica de salud)
  const pesoTotal = allMascotas.reduce((acc, m) => acc + (Number(m.peso) || 0), 0);
  const pesoPromedio = totalPacientes > 0 ? (pesoTotal / totalPacientes).toFixed(1) : 0;

  if (loading) {
    return (
        <AdminTemplate>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <LoadingSpinner text="Consultando fichas clínicas..." />
            </div>
        </AdminTemplate>
    );
  }

  return (
    <AdminTemplate>
      <main className="flex-grow-1" id="main-content" role="main">
        <div className="container-fluid py-4">
          
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/Admin" className="text-decoration-none">Administración</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Mascotas
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-3">
            <div>
              <h1 className="h3 fw-bold text-dark mb-1">
                <i className="bi bi-journal-medical me-2 text-primary"></i>
                Gestión de Pacientes
              </h1>
              <p className="text-muted mb-0">
                Visualiza, registra y administra las fichas clínicas de las mascotas.
              </p>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Button 
                label="Nueva Mascota" 
                href="/admin/clientes/mascotas/nueva" 
                variant="primary" 
                icon={<i className="bi bi-plus-circle me-2"></i>}
              />
              <Button 
                label="Buscar Paciente" 
                href="/admin/clientes/mascotas/listar" 
                variant="outline-primary" 
              />
            </div>
          </header>

          {/* Tarjetas de Resumen (KPIs) */}
          <section aria-labelledby="mascotas-overview" className="mb-5">
             <div className="row g-4">
                
                {/* Total Pacientes */}
                <div className="col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 border-start border-4 border-primary h-100">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <span className="text-uppercase text-muted small fw-bold">Pacientes Totales</span>
                                <h2 className="mb-0 fw-bold text-dark">{totalPacientes}</h2>
                            </div>
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                <i className="bi bi-heart-pulse-fill fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Perros */}
                <div className="col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 border-start border-4 border-warning h-100">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <span className="text-uppercase text-muted small fw-bold">Perros</span>
                                <h2 className="mb-0 fw-bold text-dark">{perros}</h2>
                            </div>
                            <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning">
                                <i className="bi bi-emoji-sunglasses-fill fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gatos */}
                <div className="col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 border-start border-4 border-info h-100">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <span className="text-uppercase text-muted small fw-bold">Gatos</span>
                                <h2 className="mb-0 fw-bold text-dark">{gatos}</h2>
                            </div>
                            <div className="bg-info bg-opacity-10 p-3 rounded-circle text-info">
                                <i className="bi bi-emoji-smile-fill fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Peso Promedio */}
                <div className="col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 border-start border-4 border-success h-100">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <span className="text-uppercase text-muted small fw-bold">Peso Promedio</span>
                                <h2 className="mb-0 fw-bold text-dark">{pesoPromedio} <small className="fs-6 text-muted">kg</small></h2>
                            </div>
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                                <i className="bi bi-Speedometer2 fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
          </section>

          {/* Accesos Rápidos Inferiores */}
          <section>
              <h5 className="text-muted mb-3">Acciones Frecuentes</h5>
              <div className="row g-3">
                  <div className="col-md-6">
                      <a href="/admin/clientes/mascotas/nueva" className="card p-4 border-0 shadow-sm text-decoration-none hover-card h-100">
                          <div className="d-flex align-items-center">
                              <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                                  <i className="bi bi-file-earmark-plus-fill text-primary fs-3"></i>
                              </div>
                              <div>
                                  <h6 className="mb-1 text-dark fw-bold">Ingresar Nueva Ficha</h6>
                                  <small className="text-muted">Registrar una mascota asociada a un cliente existente.</small>
                              </div>
                          </div>
                      </a>
                  </div>
                  <div className="col-md-6">
                      <a href="/admin/clientes/mascotas/listar" className="card p-4 border-0 shadow-sm text-decoration-none hover-card h-100">
                          <div className="d-flex align-items-center">
                              <div className="bg-secondary bg-opacity-10 p-3 rounded me-3">
                                  <i className="bi bi-search text-secondary fs-3"></i>
                              </div>
                              <div>
                                  <h6 className="mb-1 text-dark fw-bold">Buscar Historial</h6>
                                  <small className="text-muted">Encuentra mascotas por RUT del dueño para ver detalles.</small>
                              </div>
                          </div>
                      </a>
                  </div>
              </div>
          </section>

        </div>
      </main>
    </AdminTemplate>
  );
};

export default MainMascotas;