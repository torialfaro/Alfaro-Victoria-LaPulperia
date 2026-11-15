import { useEffect, useRef, useState } from 'react';
import { CAMPOS_SIN_RECORTAR } from './constants.js';
import { erroresDeApi } from './validators.js';
import { useToast } from './useToast.js';

export function useFormulario({
  valoresIniciales,
  validar,
  validarCampo,
  preparar = (datos) => datos,
  onSubmit,
  onExito,
  reiniciarAlExito = false,
}) {
  const toast = useToast();
  const formRef = useRef(null);
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    if (intentos > 0) formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
  }, [intentos]);

  const cambiar = (evento) => {
    const { name, value } = evento.target;
    setValores((actuales) => ({ ...actuales, [name]: value }));
    if (errores[name]) setErrores((actuales) => ({ ...actuales, [name]: '' }));
  };

  const salirDeCampo = (evento) => {
    const { name, value } = evento.target;
    setErrores((actuales) => ({ ...actuales, [name]: validarCampo(name, value) }));
  };

  const reiniciar = () => {
    setValores(valoresIniciales);
    setErrores({});
  };

  const enviar = async (evento) => {
    evento.preventDefault();
    const encontrados = validar(valores);
    if (Object.keys(encontrados).length > 0) {
      setErrores(encontrados);
      setIntentos((n) => n + 1);
      toast.error('Revisa los campos marcados antes de continuar.');
      return;
    }

    const datos = Object.fromEntries(
      Object.entries(valores).map(([clave, valor]) => [
        clave,
        CAMPOS_SIN_RECORTAR.includes(clave) ? valor : String(valor).trim(),
      ]),
    );

    setEnviando(true);
    try {
      await onSubmit(preparar(datos));
      if (reiniciarAlExito) reiniciar();
      onExito?.();
    } catch (error) {
      setErrores(erroresDeApi(error));
      setIntentos((n) => n + 1);
      toast.error(error.message);
    } finally {
      setEnviando(false);
    }
  };

  return { formRef, valores, errores, enviando, cambiar, salirDeCampo, enviar, reiniciar };
}
