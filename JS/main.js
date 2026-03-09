// Main JavaScript for Nature Blog

// Forum Posts Storage
const FORUM_KEY = 'nature_forum_posts';
const COMMENTS_KEY = 'nature_forum_comments';

// Static sample posts
const samplePosts = [
    {
        id: 1,
        author: 'Carlos Mendoza',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
        location: 'Parque Nacional Yellowstone, USA',
        content: '¡El Grand Prismatic Spring es absolutamente impresionante! Los colores naturales que produce el agua hirviendo con las bacterias termófilas son únicos en el mundo. Un verdadero milagro de la naturaleza.',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        date: '2026-03-05',
        likes: 24,
        comments: 8
    },
    {
        id: 2,
        author: 'Ana García',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
        location: 'Torres del Paine, Chile',
        content: 'Pude presenciar el amanecer en las Torres del Paine. Las montañas brillan con un color naranja intenso cuando el sol sale. Este lugar te hace sentir realmente pequeño frente a la grandeza de la naturaleza.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        date: '2026-03-04',
        likes: 42,
        comments: 12
    },
    {
        id: 3,
        author: 'Roberto Sánchez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
        location: 'Cataratas del Iguazú, Argentina/Brasil',
        content: 'Las Cataratas del Iguazú son algo que todo ser humano debería ver en su vida. El rugido del agua, la niebla que se forma, los arcoíris constantes... es una experiencia que no se puede describir con palabras.',
        image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
        date: '2026-03-03',
        likes: 67,
        comments: 23
    },
    {
        id: 4,
        author: 'María López',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        location: 'Amazonas, Brasil',
        content: 'El río Amazonas y la selva tropical son el corazón verde del planeta. Visitar la selva me enseñó la importancia de cada criatura, por pequeña que sea. Tenemos que proteger estos ecosistemas.',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
        date: '2026-03-02',
        likes: 35,
        comments: 15
    },
    {
        id: 5,
        author: 'Javier Ruiz',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Javier',
        location: 'Islas Galápagos, Ecuador',
        content: 'Las Galápagos son un laboratorio vivo de la evolución. Ver las tortugas gigantes que pueden vivir más de 100 años, los leones marinos.playando en las playas, y las iguanas nadando... es increíble.',
        image: 'https://images.unsplash.com/photo-1544979590-37e9b47eb705?w=800',
        date: '2026-03-01',
        likes: 89,
        comments: 31
    }
];

// Initialize forum posts
function initializeForumPosts() {
    const stored = localStorage.getItem(FORUM_KEY);
    if (!stored) {
        localStorage.setItem(FORUM_KEY, JSON.stringify(samplePosts));
    }
    // Initialize comments storage if not exists
    const commentsStored = localStorage.getItem(COMMENTS_KEY);
    if (!commentsStored) {
        localStorage.setItem(COMMENTS_KEY, JSON.stringify({}));
    }
}

// Get all posts
function getPosts() {
    const posts = localStorage.getItem(FORUM_KEY);
    return posts ? JSON.parse(posts) : samplePosts;
}

// Get comments for a post
function getComments(postId) {
    const allComments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
    return allComments[postId] || [];
}

// Save a new comment
function saveComment(postId, comment) {
    const allComments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
    if (!allComments[postId]) {
        allComments[postId] = [];
    }
    allComments[postId].unshift(comment);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
    
    // Update post comment count
    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments = (post.comments || 0) + 1;
        localStorage.setItem(FORUM_KEY, JSON.stringify(posts));
    }
}

// Save a new post
function savePost(post) {
    const posts = getPosts();
    post.comments = 0;
    posts.unshift(post);
    localStorage.setItem(FORUM_KEY, JSON.stringify(posts));
}

// Handle image upload and convert to base64
function handleImageUpload(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Create post element
function createPostElement(post) {
    const comments = getComments(post.id);
    const commentsHtml = comments.map(comment => `
        <div class="bg-gray-50 rounded-lg p-3 mb-2">
            <div class="flex items-center mb-1">
                <span class="font-semibold text-sm text-gray-800">${comment.author}</span>
                <span class="text-xs text-gray-500 ml-2">${comment.date}</span>
            </div>
            <p class="text-sm text-gray-600">${comment.content}</p>
        </div>
    `).join('');
    
    const postDiv = document.createElement('div');
    postDiv.className = 'forum-post card-hover mb-6 rounded-lg';
    postDiv.innerHTML = `
        <div class="p-6">
            <div class="flex items-center mb-4">
                <img src="${post.avatar}" alt="${post.author}" class="w-12 h-12 rounded-full mr-4 border-2 border-green-500">
                <div>
                    <h4 class="font-bold text-gray-800">${post.author}</h4>
                    <p class="text-sm text-green-600 flex items-center">
                        <i class="bi bi-geo-alt mr-1"></i>
                        ${post.location}
                    </p>
                </div>
                <span class="ml-auto text-sm text-gray-500">${post.date}</span>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">${post.content}</p>
            ${post.image ? `
                <div class="rounded-xl overflow-hidden mb-4">
                    <img src="${post.image}" alt="Imagen del lugar" class="w-full h-64 object-cover">
                </div>
            ` : ''}
            <div class="flex items-center justify-between border-t pt-4">
                <div class="flex gap-4">
                    <button class="flex items-center text-gray-500 hover:text-green-600 transition-colors like-btn" data-id="${post.id}">
                        <i class="bi bi-heart mr-1"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button class="flex items-center text-gray-500 hover:text-blue-600 transition-colors comment-count-btn" data-id="${post.id}">
                        <i class="bi bi-chat mr-1"></i>
                        <span>${post.comments}</span>
                    </button>
                </div>
                <button class="text-green-600 hover:text-green-800 font-medium text-sm toggle-comment-form" data-id="${post.id}">
                    Comentar
                </button>
            </div>
            
            <!-- Comments Section -->
            <div class="comments-section mt-4 ${comments.length > 0 ? '' : 'hidden'}" id="comments-${post.id}">
                ${commentsHtml}
            </div>
            
            <!-- Comment Form -->
            <div class="comment-form mt-4 hidden" id="comment-form-${post.id}">
                <div class="bg-gray-50 rounded-lg p-4">
                    <input type="text" id="comment-author-${post.id}" 
                        class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-sm mb-2" 
                        placeholder="Tu nombre">
                    <div class="flex gap-2">
                        <input type="text" id="comment-content-${post.id}" 
                            class="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-sm" 
                            placeholder="Escribe un comentario...">
                        <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors submit-comment" data-id="${post.id}">
                            <i class="bi bi-send"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return postDiv;
}

// Render posts in container
function renderPosts() {
    const container = document.getElementById('posts-container');
    if (!container) return;
    
    const posts = getPosts();
    container.innerHTML = '';
    
    posts.forEach((post, index) => {
        const postElement = createPostElement(post);
        postElement.style.animationDelay = `${index * 100}ms`;
        postElement.classList.add('animate-fadeIn');
        container.appendChild(postElement);
    });
    
    // Add like functionality
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = parseInt(this.dataset.id);
            const posts = getPosts();
            const post = posts.find(p => p.id === postId);
            if (post) {
                post.likes++;
                localStorage.setItem(FORUM_KEY, JSON.stringify(posts));
                this.querySelector('span').textContent = post.likes;
                this.classList.add('text-red-500');
                this.querySelector('i').classList.remove('bi-heart');
                this.querySelector('i').classList.add('bi-heart-fill');
            }
        });
    });
    
    // Add toggle comment form functionality
    document.querySelectorAll('.toggle-comment-form').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.dataset.id;
            const form = document.getElementById(`comment-form-${postId}`);
            const commentsSection = document.getElementById(`comments-${postId}`);
            form.classList.toggle('hidden');
            commentsSection.classList.remove('hidden');
        });
    });
    
    // Add submit comment functionality
    document.querySelectorAll('.submit-comment').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = parseInt(this.dataset.id);
            const authorInput = document.getElementById(`comment-author-${postId}`);
            const contentInput = document.getElementById(`comment-content-${postId}`);
            
            const author = authorInput.value.trim();
            const content = contentInput.value.trim();
            
            if (!author || !content) {
                alert('Por favor completa tu nombre y el comentario');
                return;
            }
            
            const comment = {
                author: author,
                content: content,
                date: new Date().toISOString().split('T')[0]
            };
            
            saveComment(postId, comment);
            
            // Clear inputs
            authorInput.value = '';
            contentInput.value = '';
            
            // Re-render posts to show new comment
            renderPosts();
        });
    });
    
    // Add enter key support for comment input
    document.querySelectorAll('[id^="comment-content-"]').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const postId = parseInt(this.id.replace('comment-content-', ''));
                document.querySelector(`.submit-comment[data-id="${postId}"]`).click();
            }
        });
    });
}

// Handle new post form submission
async function handleNewPost(event) {
    event.preventDefault();
    
    const form = event.target;
    const author = document.getElementById('post-author').value;
    const location = document.getElementById('post-location').value;
    const content = document.getElementById('post-content').value;
    const imageInput = document.getElementById('post-image');
    
    if (!author || !location || !content) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    let imageBase64 = null;
    if (imageInput.files[0]) {
        try {
            imageBase64 = await handleImageUpload(imageInput.files[0]);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    
    const newPost = {
        id: Date.now(),
        author: author,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.replace(' ', '')}`,
        location: location,
        content: content,
        image: imageBase64,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0
    };
    
    savePost(newPost);
    renderPosts();
    
    // Reset form
    form.reset();
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 3000);
    }
    
    // Scroll to top to see new post
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        // Check initial state
        if (window.scrollY > 50) {
            navbar.classList.add('bg-green-900/95');
            navbar.classList.remove('bg-transparent');
        }
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-green-900/95');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('bg-green-900/95');
                navbar.classList.add('bg-transparent');
            }
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeForumPosts();
    renderPosts();
    initScrollAnimations();
    initNavbarScroll();
    
    // Form submission
    const postForm = document.getElementById('new-post-form');
    if (postForm) {
        postForm.addEventListener('submit', handleNewPost);
    }
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
});

// Export functions for use in other scripts
window.natureBlog = {
    getPosts,
    savePost,
    renderPosts,
    handleNewPost
};
