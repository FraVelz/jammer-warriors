export function mapFirebaseClientAuthError(error: unknown): string {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : "";

  if (code === "auth/network-request-failed") {
    return "No hay conexión con Firebase Auth. Comprueba la red o vuelve a intentarlo en unos minutos.";
  }

  if (code === "auth/unauthorized-domain") {
    return "Este dominio no está autorizado en Firebase. Añade jammer-warriors.vercel.app en Authentication → Settings → Authorized domains.";
  }

  if (
    code === "auth/popup-blocked" ||
    code === "auth/cancelled-popup-request"
  ) {
    return "El navegador bloqueó la ventana de Google. Prueba de nuevo o usa email/contraseña.";
  }

  if (code === "auth/popup-closed-by-user") {
    return "Se cerró la ventana de Google antes de completar el inicio de sesión.";
  }

  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return "Credenciales incorrectas";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "No se pudo autenticar";
}
