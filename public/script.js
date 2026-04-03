document.addEventListener('DOMContentLoaded', () => {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const dateEl = document.getElementById('current-date');
    const timezoneNameEl = document.getElementById('timezone-name');
    const timezoneOffsetEl = document.getElementById('timezone-offset');

    // Get Timezone Info
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneNameEl.textContent = timeZone.replace(/_/g, ' ');

    function updateTime() {
        const now = new Date();

        // Calculate Offset String
        const offsetMinutes = -now.getTimezoneOffset();
        const sign = offsetMinutes >= 0 ? '+' : '-';
        const absOffset = Math.abs(offsetMinutes);
        const offsetH = Math.floor(absOffset / 60).toString().padStart(2, '0');
        const offsetM = (absOffset % 60).toString().padStart(2, '0');
        timezoneOffsetEl.textContent = `UTC ${sign}${offsetH}:${offsetM}`;

        // Format Date
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timeZone };
        dateEl.textContent = now.toLocaleDateString('en-US', dateOptions);

        // Format Time
        const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timeZone };
        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        
        // Handle potentially missing parts depending on browser formatting
        const parts = timeString.split(':');
        if (parts.length === 3) {
            hoursEl.textContent = parts[0];
            minutesEl.textContent = parts[1];
            
            // Handle AM/PM suffix if somehow forced by the browser despite hour12: false 
            const secParts = parts[2].split(' ');
            secondsEl.textContent = secParts[0];
        }
    }

    // Initialize and align with animation frames for smooth updates
    function tick() {
        updateTime();
        requestAnimationFrame(tick);
    }
    
    tick();
});
