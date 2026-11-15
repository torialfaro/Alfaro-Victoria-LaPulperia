import Button from './Button.jsx';
import { nombreCompleto, etiquetaRol } from '../utils/formatters.js';
import { ROL_ADMIN } from '../utils/constants.js';
import './UsuariosTable.css';

export default function UsuariosTable({ usuarios, onEdit, onDelete }) {
  return (
    <div className="usuarios-table__wrapper" role="region" aria-label="Listado de usuarios" tabIndex={0}>
      <table className="usuarios-table">
        <caption className="visually-hidden">Usuarios registrados</caption>
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Usuario</th>
            <th scope="col">Correo</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Dirección</th>
            <th scope="col">Tipo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <th scope="row">{nombreCompleto(usuario)}</th>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.direccion}</td>
              <td>{etiquetaRol(usuario.rol)}</td>
              <td>
                <div className="usuarios-table__actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(usuario)}
                    aria-label={`Editar a ${nombreCompleto(usuario)}`}
                  >
                    Editar
                  </Button>
                  {usuario.rol !== ROL_ADMIN && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(usuario)}
                      aria-label={`Eliminar a ${nombreCompleto(usuario)}`}
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
