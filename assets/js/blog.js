// Blog-specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Article collapse functionality
    const articles = document.querySelectorAll('.article-collapse');
    articles.forEach(article => {
        article.addEventListener('show.bs.collapse', function() {
            articles.forEach(otherArticle => {
                if (otherArticle !== article && bootstrap.Collapse.getInstance(otherArticle)) {
                    bootstrap.Collapse.getInstance(otherArticle).hide();
                }
            });
        });
    });

    // Handle image clicks to expand articles
    document.querySelectorAll('.article-image-container').forEach(container => {
        container.addEventListener('click', function() {
            const article = this.closest('article');
            const content = article.querySelector('.article-collapse');
            const collapse = bootstrap.Collapse.getInstance(content) || new bootstrap.Collapse(content, {
                toggle: false
            });
            collapse.toggle();
        });
    });

    // Handle "Read More" clicks
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const article = this.closest('article');
            const content = article.querySelector('.article-collapse');
            const collapse = bootstrap.Collapse.getInstance(content) || new bootstrap.Collapse(content, {
                toggle: false
            });
            collapse.toggle();
        });
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger image load
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Reading progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Article navigation
    const prevBtn = document.querySelector('.prev-article-btn');
    const nextBtn = document.querySelector('.next-article-btn');
    let currentArticleIndex = -1;

    function updateNavigationButtons() {
        if (currentArticleIndex > 0) {
            prevBtn.classList.add('visible');
        } else {
            prevBtn.classList.remove('visible');
        }

        if (currentArticleIndex < articles.length - 1) {
            nextBtn.classList.add('visible');
        } else {
            nextBtn.classList.remove('visible');
        }
    }

    function navigateArticle(direction) {
        const nextIndex = currentArticleIndex + direction;
        if (nextIndex >= 0 && nextIndex < articles.length) {
            // Close current article
            const currentArticle = articles[currentArticleIndex];
            const currentCollapse = bootstrap.Collapse.getInstance(currentArticle);
            if (currentCollapse) {
                currentCollapse.hide();
            }

            // Open next article after transition
            setTimeout(() => {
                const nextArticle = articles[nextIndex];
                const nextCollapse = new bootstrap.Collapse(nextArticle);
                nextCollapse.show();
                currentArticleIndex = nextIndex;
                updateNavigationButtons();
                nextArticle.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') navigateArticle(1);
        if (e.key === 'ArrowLeft') navigateArticle(-1);
    });

    // Add button navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateArticle(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateArticle(1));
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${type === 'success' ? '<path d="M20 6L9 17l-5-5"></path>' : 
                      type === 'error' ? '<path d="M18 6L6 18M6 6l12 12"></path>' : 
                      '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'}
                </svg>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}); 