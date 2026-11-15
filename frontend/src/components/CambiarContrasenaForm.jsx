import FormFields from './FormFields.jsx';
import Button from './Button.jsx';
import { CONTRASENA_CAMPOS } from '../utils/constants.js';
import { validarCampo, validarCambioContrasena } from '../utils/validators.js';
import { useFormulario } from '../utils/useFormulario.js';
import { useAuth } from '../utils/useAuth.js';

const VACIO = { contrasenaActual: '', contrasenaNueva: '', confirmacion: '' };

export default function CambiarContrasenaForm() {
  const { cambiarContrasena } = useAuth();
  const { formRef, valores, errores, enviando, cambiar, salirDeCampo, enviar } = useFormulario({
    valoresIniciales: VACIO,
    validar: validarCambioContrasena,
    validarCampo,
    preparar: ({ contrasenaActual, contrasenaNueva }) => ({ contrasenaActual, contrasenaNueva }),
    onSubmit: cambiarContrasena,
    reiniciarAlExito: true,
  });

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className="form">
      <FormFields
        campos={CONTRASENA_CAMPOS}
        valores={valores}
        errores={errores}
        onChange={cambiar}
        onBlur={salirDeCampo}
        disabled={enviando}
      />
      <div className="form-actions">
        <Button type="submit" loading={enviando}>
          Cambiar contraseña
        </Button>
      </div>
    </form>
  );
}
