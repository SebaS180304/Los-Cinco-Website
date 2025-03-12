export const loginUser = async (credentials) => {
    console.log('%c🔐 Intento de login', 'color: blue; font-weight: bold');
    console.log('Credenciales:', credentials);

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.usuario === 'admin' && credentials.contraseña === 'admin123') {
        console.log('%c✅ Login exitoso como admin', 'color: green; font-weight: bold');
        return {
            success: true,
            role: 0  // número para admin
        };
    } 
    
    if (credentials.usuario === 'tecnico' && credentials.contraseña === 'tecnico123') {
        console.log('%c✅ Login exitoso como técnico', 'color: green; font-weight: bold');
        return {
            success: true,
            role: 1  // número para técnico
        };
    }

    console.log('%c❌ Credenciales inválidas', 'color: red; font-weight: bold');
    return {
        success: false,
        role: 2  // número para credenciales inválidas
    };
};