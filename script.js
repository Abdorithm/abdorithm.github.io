// Add any interactive features here
document.addEventListener('DOMContentLoaded', () => {
    // Example: Add typing animation to commands
    const commands = document.querySelectorAll('.command');
    commands.forEach((cmd, index) => {
        const text = cmd.textContent;
        cmd.textContent = '';
        setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                cmd.textContent += text[i];
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 50);
        }, index * 1000);
    });
});