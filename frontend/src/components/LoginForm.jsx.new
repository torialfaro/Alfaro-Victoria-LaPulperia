import FormFields from './FormFields.jsx';
import Button from './Button.jsx';
import { LOGIN_CAMPOS } from '../utils/constants.js';
import { validarCampo, validarCampos } from '../utils/validators.js';
import { useFormulario } from '../utils/useFormulario.js';
import { useAuth } from '../utils/useAuth.js';

export default function LoginForm() {
  const { iniciarSesion } = useAuth();
  const { formRef, valores, errores, enviando, cambiar, salirDeCampo, enviar } = useFormulario({
    valoresIniciales: { nombreUsuario: '', contrasena: '' },
    validar: (datos) => validarCampos(LOGIN_CAMPOS, datos),
    validarCampo,
    onSubmit: iniciarSesion,
  });

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className="form">
      <FormFields
        campos={LOGIN_CAMPOS}
        valores={valores}
        errores={errores}
        onChange={cambiar}
        onBlur={salirDeCampo}
        disabled={enviando}
      />
      <Button type="submit" loading={enviando} className="btn--block">
        Iniciar sesión
      </Button>
    </form>
  );
}
