// Variable global para guardar la IP pública
let publicIP = '';

// Función para obtener la IP pública
async function fetchPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error('Error al obtener la IP pública');
        }
        const data = await response.json();
        publicIP = data.ip;  // Guardamos la IP en la variable global
        console.log('IP Pública obtenida:', publicIP);
    } catch (error) {
        console.error('Error al obtener la IP pública:', error);
    }
}

// Cuando la página esté lista...
document.addEventListener('DOMContentLoaded', async () => {
    // Primero obtenemos la IP pública
    await fetchPublicIP();

    // Luego asignamos eventos a los botones
    const buttons = document.querySelectorAll('button[data-command]');
    const movementStatus = document.getElementById('movementStatus');

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const command = button.getAttribute('data-command');

            // Actualiza el movimiento en pantalla
            movementStatus.textContent = command;

            // Prepara los datos para enviar a la API
            const payload = {
                name: "Mazapan",
                ip: publicIP, // Ahora sí está disponible y correcta
                status: command
            };

            try {
                const response = await fetch('http://44.202.189.236:5000/api/devices', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.status);
                }

                console.log('Comando enviado exitosamente:', command);
            } catch (error) {
                console.error('Error al enviar el comando:', error);
            }
        });
    });
});
