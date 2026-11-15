import FormFields from './FormFields.jsx';
import Button from './Button.jsx';
import { USUARIO_CAMPOS, USUARIO_VACIO } from '../utils/constants.js';
import { validarCampo, validarCampos } from '../utils/validators.js';
import { useFormulario } from '../utils/useFormulario.js';

const CAMPOS_PERFIL = USUARIO_CAMPOS.filter(({ name }) => name !== 'contrasena');

export default function UsuarioFormBody({
  usuario = null,
  conContrasena = true,
  textoEnviar,
  onSubmit,
  onExito,
  onCancel,
}) {
  const edicion = usuario !== null;
  const campos = conContrasena ? USUARIO_CAMPOS : CAMPOS_PERFIL;
  const opcionales = edicion ? ['contrasena'] : [];

  const { formRef, valores, errores, enviando, cambiar, salirDeCampo, enviar } = useFormulario({
    valoresIniciales: Object.fromEntries(campos.map(({ name }) => [name, usuario?.[name] ?? USUARIO_VACIO[name]])),
    validar: (datos) => validarCampos(campos, datos, { opcionales }),
    validarCampo: (name, valor) => (opcionales.includes(name) && valor.trim() === '' ? '' : validarCampo(name, valor)),
    preparar: (datos) =>
      edicion && datos.contrasena === ''
        ? Object.fromEntries(Object.entries(datos).filter(([clave]) => clave !== 'contrasena'))
        : datos,
    onSubmit,
    onExito,
  });

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className="form">
      <p className="form__note">Los campos marcados con * son obligatorios.</p>
      <FormFields
        campos={campos}
        columnas={2}
        valores={valores}
        errores={errores}
        onChange={cambiar}
        onBlur={salirDeCampo}
        disabled={enviando}
        opcionales={opcionales}
        pistas={edicion ? { contrasena: 'Déjala vacía para conservar la actual.' } : {}}
      />
      <div className="form-actions">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={enviando}>
            Cancelar
          </Button>
        )}
        <Button type="submit" loading={enviando}>
          {textoEnviar}
        </Button>
      </div>
    </form>
  );
}
