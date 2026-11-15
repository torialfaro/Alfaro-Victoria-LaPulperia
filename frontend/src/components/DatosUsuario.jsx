import { nombreCompleto, etiquetaRol } from '../utils/formatters.js';
import './DatosUsuario.css';

export default function DatosUsuario({ usuario }) {
  const filas = [
    ['Nombre', nombreCompleto(usuario)],
    ['Usuario', usuario.nombreUsuario],
    ['Correo electrónico', usuario.correo],
    ['Teléfono', usuario.telefono],
    ['Dirección', usuario.direccion],
    ['Tipo de cuenta', etiquetaRol(usuario.rol)],
  ];

  return (
    <dl className="datos-usuario">
      {filas.map(([termino, valor]) => (
        <div key={termino} className="datos-usuario__fila">
          <dt>{termino}</dt>
          <dd>{valor}</dd>
        </div>
      ))}
    </dl>
  );
}
