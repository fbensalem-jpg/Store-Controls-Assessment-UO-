// Store Controls Assessment Web App
// Main JavaScript file for interactive functionality

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    console.log('Store Controls Assessment App initialized');
    attachEventListeners();
}

// Attach event listeners to buttons
function attachEventListeners() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            handleAssessmentStart(e, index);
        });
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.opacity = '0.9';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

// Handle assessment button clicks
function handleAssessmentStart(event, buttonIndex) {
    const button = event.target;
    const card = button.closest('.control-card');
    const title = card.querySelector('h3').textContent;
    
    showNotification(`Starting ${title}...`);
    
    // Simulate assessment loading
    button.disabled = true;
    button.textContent = 'Loading...';
    
    setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Start Assessment';
        showNotification(`${title} assessment completed!`);
    }, 2000);
}

// Show notification to user
function showNotification(message) {
    console.log('Notification:', message);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Log app statistics
function logStatistics() {
    const stats = {
        totalAssessments: 24,
        completed: 18,
        pending: 6,
        passRate: 95
    };
    
    console.table(stats);
    return stats;
}

// Export functions for external use
window.StoreControlsApp = {
    scrollToSection,
    logStatistics,
    showNotification
};
