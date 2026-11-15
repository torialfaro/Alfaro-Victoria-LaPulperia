import FormField from './FormField.jsx';
import './FormFields.css';

export default function FormFields({
  campos,
  valores,
  errores,
  onChange,
  onBlur,
  disabled,
  opcionales = [],
  pistas = {},
  columnas = 1,
}) {
  return (
    <div className={`form-fields form-fields--${columnas}`}>
      {campos.map(({ name, label, type, autoComplete }) => (
        <FormField
          key={name}
          name={name}
          label={label}
          type={type}
          autoComplete={autoComplete}
          value={valores[name]}
          error={errores[name]}
          required={!opcionales.includes(name)}
          hint={pistas[name]}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={120}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
