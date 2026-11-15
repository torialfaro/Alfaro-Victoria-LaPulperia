import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as authService from '../services/authService.js';
import * as usuarioService from '../services/usuarioService.js';
import { configurarAlNoAutorizado } from '../services/api.js';
import { tokenStorage } from '../services/tokenStorage.js';
import { AuthContext } from '../utils/useAuth.js';
import { useToast } from '../utils/useToast.js';
import { MENSAJES, ROL_ADMIN } from '../utils/constants.js';

export default function AuthProvider({ children }) {
  const toast = useToast();
  const { pathname } = useLocation();
  const [usuario, setUsuario] = useState(null);
  const [sesionCerrada, setSesionCerrada] = useState(false);
  const [cargando, setCargando] = useState(() => tokenStorage.obtener() !== null);

  const [rutaVista, setRutaVista] = useState(pathname);
  if (rutaVista !== pathname) {
    setRutaVista(pathname);
    setSesionCerrada(false);
  }

  const limpiarSesion = useCallback(() => {
    tokenStorage.borrar();
    setUsuario(null);
  }, []);

  useEffect(() => {
    configurarAlNoAutorizado(() => {
      limpiarSesion();
      toast.error(MENSAJES.sesionExpirada);
    });
    return () => configurarAlNoAutorizado(null);
  }, [limpiarSesion, toast]);

  useEffect(() => {
    if (!tokenStorage.obtener()) return undefined;
    let activo = true;
    authService
      .obtenerPerfil()
      .then((perfil) => activo && setUsuario(perfil))
      .catch(() => {})
      .finally(() => activo && setCargando(false));
    return () => {
      activo = false;
    };
  }, []);

  const iniciarSesion = useCallback(
    async (credenciales) => {
      const { token, usuario: sesion } = await authService.login(credenciales);
      tokenStorage.guardar(token);
      setUsuario(sesion);
      toast.success(MENSAJES.bienvenida(sesion.nombre));
    },
    [toast],
  );

  const registrar = useCallback(
    async (datos) => {
      await usuarioService.crear(datos);
      await iniciarSesion({ nombreUsuario: datos.nombreUsuario, contrasena: datos.contrasena });
    },
    [iniciarSesion],
  );

  const cerrarSesion = useCallback(
    ({ silencioso = false } = {}) => {
      limpiarSesion();
      setSesionCerrada(true);
      if (!silencioso) toast.info(MENSAJES.sesionCerrada);
    },
    [limpiarSesion, toast],
  );

  const actualizarPerfil = useCallback(
    async (datos) => {
      const actualizado = await usuarioService.modificar(usuario.id, datos);
      setUsuario(actualizado);
      toast.success(MENSAJES.datosActualizados);
    },
    [usuario, toast],
  );

  const recargarPerfil = useCallback(async () => {
    setUsuario(await authService.obtenerPerfil());
  }, []);

  const cambiarContrasena = useCallback(
    async (datos) => {
      await authService.cambiarContrasena(datos);
      toast.success(MENSAJES.contrasenaActualizada);
    },
    [toast],
  );

  const eliminarCuenta = useCallback(async () => {
    await usuarioService.eliminar(usuario.id);
    toast.success(MENSAJES.cuentaEliminada);
  }, [usuario, toast]);

  const valor = useMemo(
    () => ({
      usuario,
      cargando,
      sesionCerrada,
      esAdmin: usuario?.rol === ROL_ADMIN,
      iniciarSesion,
      registrar,
      cerrarSesion,
      actualizarPerfil,
      recargarPerfil,
      cambiarContrasena,
      eliminarCuenta,
    }),
    [
      usuario,
      cargando,
      sesionCerrada,
      iniciarSesion,
      registrar,
      cerrarSesion,
      actualizarPerfil,
      recargarPerfil,
      cambiarContrasena,
      eliminarCuenta,
    ],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
