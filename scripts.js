document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para el fondo animado con Canvas (Cuadrícula Neon Digital) ---
    const canvas = document.getElementById('animatedBackground');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let gridPoints = [];
    const gridSize = 40; // Espacio entre los puntos de la cuadrícula (en píxeles)
    const colorNeon = 'rgba(58, 134, 255, 0.4)'; // Azul neon con transparencia
    const maxZ = 10; // Para el efecto de profundidad

    // Ajusta el tamaño del canvas al de la ventana
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initGrid();
    }

    // Inicializa los puntos de la cuadrícula
    function initGrid() {
        gridPoints = [];
        const cols = Math.ceil(width / gridSize);
        const rows = Math.ceil(height / gridSize);
        
        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                gridPoints.push({
                    x: i * gridSize,
                    y: j * gridSize,
                    z: Math.random() * maxZ, // Profundidad inicial aleatoria
                    originalX: i * gridSize,
                    originalY: j * gridSize,
                    speed: Math.random() * 0.005 + 0.005 // Velocidad de pulsación
                });
            }
        }
    }

    // Dibuja las líneas de la cuadrícula
    function drawGrid() {
        ctx.strokeStyle = colorNeon;
        ctx.lineWidth = 0.5;
        
        const cols = Math.ceil(width / gridSize);
        const rows = Math.ceil(height / gridSize);

        // Dibujar líneas horizontales y verticales
        for (let i = 0; i < gridPoints.length; i++) {
            const p = gridPoints[i];
            
            // Simular movimiento y pulsación usando el tiempo
            const time = Date.now() * p.speed;
            
            // Desplazamiento sutil usando funciones seno/coseno
            p.x = p.originalX + Math.sin(time) * 5; 
            p.y = p.originalY + Math.cos(time / 2) * 5;

            // Encontrar vecinos para dibujar la cuadrícula
            
            // 1. Dibujar línea hacia el punto de la derecha (siguiente columna)
            if ((i + 1) % (rows + 1) !== 0) {
                const rightIndex = i + (rows + 1); // El punto de la derecha
                if (rightIndex < gridPoints.length) {
                    const pRight = gridPoints[rightIndex];
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(pRight.x, pRight.y);
                    ctx.stroke();
                }
            }
            
            // 2. Dibujar línea hacia el punto de abajo (siguiente fila)
            if (i < gridPoints.length - (rows + 1)) {
                 const downIndex = i + 1; // El punto de abajo
                 if ((i + 1) % (rows + 1) !== 0) {
                    const pDown = gridPoints[downIndex];
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(pDown.x, pDown.y);
                    ctx.stroke();
                }
            }

            // Dibuja el punto (pulso)
            const pulse = Math.sin(time * 2) * 0.5 + 1.5; // Tamaño que varía
            ctx.fillStyle = colorNeon.replace('0.4', (pulse * 0.4).toFixed(2)); // Variar opacidad para el pulso
            ctx.beginPath();
            ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Bucle de animación
    function animate() {
        requestAnimationFrame(animate);
        // Usar un fondo oscuro con ligera transparencia para un efecto de "rastro" o "glow"
        ctx.fillStyle = 'rgba(26, 26, 46, 0.1)'; 
        ctx.fillRect(0, 0, width, height); 
        
        drawGrid();
    }

    // Event listeners
    window.addEventListener('resize', resizeCanvas);

    // Iniciar
    resizeCanvas();
    animate();
});