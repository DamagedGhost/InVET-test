import React from 'react';
import AdminTemplate from '../../src/templates/AdminTemplate';

const AdminHomePage = () => {


    return (
      <AdminTemplate>
        <main className="flex-grow-1" id="main-content" role="main">
          <div className="container-fluid py-4">
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item active" aria-current="page">Administración</li>
              </ol>
            </nav>
            <h1 className="h4 mb-4">Dashboard Principal</h1>
            

          </div>
        </main>
      </AdminTemplate>

    );
};

export default AdminHomePage;