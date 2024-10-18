
const HeaderRecepcionista = () => {
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
             <div className="container-fluid">
                <span className="navbar-brand text-black">Logo</span>
                <div className="d-flex align-items-center">

                
                    <button className="btn btn-outline-light me-2">Gestión de usuarios</button> 
                    <button className="btn btn-outline-light me-2">Gestión asignaciones</button>
                    <button className="btn btn-outline-light me-2">Gestión de habitaciones</button>
                    <button className="btn btn-outline-light">Gestión de huéspedes</button>
                    <div className="ms-3">

                        <img
                            src="https://via.placeholder.com/40"
                            alt="Foto de perfil"
                            className="rounded-circle"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderRecepcionista;