// Regional data with names and locations
const regions = {
    northAmerica: {
        weight: 30,
        locations: {
            'Alberta': ['Connor', 'Emma', 'Liam'],
            'Quebec': ['Jean-François', 'Isabelle', 'Marc-André'],
            'Ontario': ['Aiden', 'Olivia', 'Mohammed'],
            'California': ['Jason', 'Sofia', 'Aiden'],
            'Texas': ['James', 'Maria', 'David'],
            'New York': ['Sarah', 'Michael', 'Rachel']
        }
    },
    europe: {
        weight: 25,
        locations: {
            'Paris': ['Thomas', 'Léa', 'Antoine'],
            'Berlin': ['Lukas', 'Hannah', 'Felix'],
            'Milan': ['Marco', 'Chiara', 'Lorenzo'],
            'Barcelona': ['Javier', 'Carmen', 'Diego'],
            'Amsterdam': ['Lars', 'Emma', 'Daan']
        }
    },
    asia: {
        weight: 20,
        locations: {
            'Singapore': ['Wei Ming', 'Hui Ling', 'Jun Wei'],
            'Hong Kong': ['Siu Ming', 'Mei Ling', 'Ka Ming'],
            'Tokyo': ['Yuki', 'Hiroshi', 'Akiko'],
            'Seoul': ['Min-ji', 'Ji-hun', 'Seo-yeon'],
            'Mumbai': ['Arjun', 'Priya', 'Aditya']
        }
    },
    latinAmerica: {
        weight: 12,
        locations: {
            'Mexico City': ['Alejandro', 'Isabella', 'Santiago'],
            'Medellín': ['Andrés', 'Valentina', 'Carlos'],
            'São Paulo': ['João', 'Maria', 'Pedro'],
            'Buenos Aires': ['Mateo', 'Sofía', 'Lucas']
        }
    },
    middleEast: {
        weight: 8,
        locations: {
            'Dubai': ['Fatima', 'Omar', 'Noura'],
            'Riyadh': ['Abdullah', 'Sara', 'Mohammed'],
            'Doha': ['Hassan', 'Maryam', 'Ali'],
            'Muscat': ['Ahmed', 'Layla', 'Khalid']
        }
    },
    oceania: {
        weight: 5,
        locations: {
            'Sydney': ['Jack', 'Emma', 'Oliver'],
            'Auckland': ['William', 'Charlotte', 'James']
        }
    }
};

// Store recent notifications to prevent repeats
const recentNotifications = new Set();
const MAX_RECENT = 15;

// Products that can be purchased
const products = [
    'Don\'t Do Anything Blueprint',
    'Lazy Genius Bundle',
    'Starter Package',
    'Best Value Package',
    'Ultimate Freedom Package'
];

// Short action verbs for variety
const actions = [
    'got',
    'chose',
    'picked',
    'joined',
    'started',
    'added',
    'loved'
];

// SVG icon for location and party emoji
const icons = {
    location: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="notification-icon">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
    </svg>`,
    party: "🎉" // Using party popper emoji instead of SVG
};

// Helper function to get weighted random region
function getWeightedRandomRegion() {
    const weights = Object.values(regions).map(r => r.weight);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (const [region, data] of Object.entries(regions)) {
        if (random < data.weight) {
            return region;
        }
        random -= data.weight;
    }
    return Object.keys(regions)[0];
}

// Helper function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generate a unique notification
function generateNotification() {
    // Get random region based on weights
    const region = getWeightedRandomRegion();
    const regionData = regions[region];
    
    // Get random location and name from that region
    const locations = Object.keys(regionData.locations);
    const location = getRandomItem(locations);
    const names = regionData.locations[location];
    const name = getRandomItem(names);
    
    // Get random product
    const product = getRandomItem(products);
    
    // Create notification key to check for duplicates
    const notificationKey = `${name}-${location}`;
    
    // If this combination was recently shown, try again
    if (recentNotifications.has(notificationKey)) {
        return generateNotification();
    }
    
    // Add to recent notifications and remove oldest if needed
    recentNotifications.add(notificationKey);
    if (recentNotifications.size > MAX_RECENT) {
        const firstItem = recentNotifications.values().next().value;
        recentNotifications.delete(firstItem);
    }
    
    return { name, location, product };
}

// Show notification
function showNotification() {
    const notification = document.getElementById('social-proof-notification');
    const notificationText = notification.querySelector('.notification-text');
    
    const { name, location } = generateNotification();
    const product = getRandomItem(products);
    const action = getRandomItem(actions);
    
    // Make the notification clickable
    notification.style.cursor = 'pointer';
    notification.onclick = () => {
        window.location.href = 'index.html#pricing';
    };
    
    notificationText.innerHTML = `<strong>${name}</strong> (${location}) ${action} ${product}`;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Schedule next notification with random delay between 15-30 seconds
        const nextDelay = Math.floor(Math.random() * (30000 - 15000) + 15000);
        setTimeout(showNotification, nextDelay);
    }, 5000);
}

// Add CSS for clickable notification
const style = document.createElement('style');
style.textContent = `
    .notification-text {
        color: #000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .social-proof-notification {
        max-width: 280px;
        transition: transform 0.2s ease;
    }
    .social-proof-notification:hover {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Start the notification cycle after a random delay (5-15 seconds)
document.addEventListener('DOMContentLoaded', () => {
    const initialDelay = Math.floor(Math.random() * (15000 - 5000) + 5000);
    setTimeout(showNotification, initialDelay);
}); 