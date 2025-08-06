// Global variables
let currentUser = null;
let isAuthenticated = false;
let openDesktopSubmenu = null;
let openMobileSubmenu = null;
let siteData = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
      loadData();
      initializeNavigation();
      initializeContactForm();
      initializeDashboard();
      checkAuthentication();
});

// Load data from JSON file
async function loadData() {
      try {
            const response = await fetch('src/assets/data.json');
            siteData = await response.json();
            console.log('Data loaded successfully');
      } catch (error) {
            console.error('Error loading data:', error);
      }
}

// Authentication functions
function validateLogin(username, password) {
      if (!siteData || !siteData.users) return null;

      const user = siteData.users.find(u =>
            (u.username === username || u.email === username) && u.password === password
      );

      return user || null;
}

function login(username, password) {
      const user = validateLogin(username, password);
      if (user) {
            currentUser = user;
            isAuthenticated = true;
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, user };
      }
      return { success: false, error: 'Invalid credentials' };
}

function logout() {
      currentUser = null;
      isAuthenticated = false;
      localStorage.removeItem('currentUser');
      updateUIAfterAuth();
}

function checkAuthentication() {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
            currentUser = JSON.parse(savedUser);
            isAuthenticated = true;
            updateUIAfterAuth();
      }
}

function updateUIAfterAuth() {
      const loginDropdown = document.querySelector('.login-dropdown');
      const userMenu = document.querySelector('.user-menu');

      if (loginDropdown) loginDropdown.style.display = isAuthenticated ? 'none' : 'block';
      if (userMenu) userMenu.style.display = isAuthenticated ? 'block' : 'none';

      if (isAuthenticated && currentUser) {
            const userNameElement = document.querySelector('.user-name');
            if (userNameElement) {
                  userNameElement.textContent = currentUser.name;
            }
      }
}

// Navigation functions
function initializeNavigation() {
      // Desktop submenu functionality
      const desktopMenuItems = document.querySelectorAll('.desktop-menu li');
      desktopMenuItems.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('ul');

            if (submenu) {
                  link.addEventListener('click', function (e) {
                        e.preventDefault();
                        toggleDesktopSubmenu(item);
                  });
            }
      });

      // Mobile menu functionality
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.querySelector('.mobile-menu');
      const menuOverlay = document.querySelector('.menu-overlay');

      if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function () {
                  mobileMenu.classList.toggle('open');
                  if (menuOverlay) {
                        menuOverlay.classList.toggle('open');
                  }
            });
      }

      // Close mobile menu when clicking overlay
      if (menuOverlay) {
            menuOverlay.addEventListener('click', function () {
                  mobileMenu.classList.remove('open');
                  menuOverlay.classList.remove('open');
            });
      }

      // Mobile submenu functionality
      const mobileMenuItems = document.querySelectorAll('.mobile-menu li');
      mobileMenuItems.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('ul');

            if (submenu) {
                  link.addEventListener('click', function (e) {
                        e.preventDefault();
                        toggleMobileSubmenu(item);
                  });
            }
      });
}

function toggleDesktopSubmenu(menuItem) {
      const submenu = menuItem.querySelector('ul');
      const allSubmenus = document.querySelectorAll('.desktop-menu ul');

      // Close all other submenus
      allSubmenus.forEach(sub => {
            if (sub !== submenu) {
                  sub.style.display = 'none';
            }
      });

      // Toggle current submenu
      if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
            openDesktopSubmenu = null;
      } else {
            submenu.style.display = 'block';
            openDesktopSubmenu = menuItem;
      }
}

function toggleMobileSubmenu(menuItem) {
      const submenu = menuItem.querySelector('ul');
      const allSubmenus = document.querySelectorAll('.mobile-menu ul');

      // Close all other submenus
      allSubmenus.forEach(sub => {
            if (sub !== submenu) {
                  sub.style.display = 'none';
            }
      });

      // Toggle current submenu
      if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
            openMobileSubmenu = null;
      } else {
            submenu.style.display = 'block';
            openMobileSubmenu = menuItem;
      }
}

// Contact form functionality
function initializeContactForm() {
      const contactForm = document.querySelector('#contact-form');
      if (!contactForm) return;

      contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleContactFormSubmit();
      });
}

function handleContactFormSubmit() {
      const form = document.querySelector('#contact-form');
      const name = form.querySelector('input[placeholder="Name"]').value.trim();
      const phone = form.querySelector('input[placeholder="Phone"]').value.trim();
      const email = form.querySelector('input[placeholder="Email"]').value.trim();
      const question = form.querySelector('textarea').value.trim();

      // Validation
      const errors = [];
      if (!name) errors.push('Name is required');
      if (!phone) errors.push('Phone is required');
      if (!email) errors.push('Email is required');
      if (!question) errors.push('Question is required');

      if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
      }

      if (errors.length > 0) {
            showFormMessage(errors.join(', '), 'error');
            return;
      }

      // Save to localStorage
      const contactData = {
            id: Date.now(),
            name,
            phone,
            email,
            question,
            date: new Date().toISOString(),
            status: 'pending'
      };

      const existingContacts = JSON.parse(localStorage.getItem('contactQuestions') || '[]');
      existingContacts.push(contactData);
      localStorage.setItem('contactQuestions', JSON.stringify(existingContacts));

      // Clear form
      form.reset();
      showFormMessage('Your question has been submitted successfully!', 'success');
}

function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
}

function showFormMessage(message, type) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `form-message ${type}`;
      messageDiv.textContent = message;

      const form = document.querySelector('#contact-form');
      form.appendChild(messageDiv);

      setTimeout(() => {
            messageDiv.remove();
      }, 5000);
}

// Login form functionality
function initializeLoginForm() {
      const loginForm = document.querySelector('#login-form');
      if (!loginForm) return;

      loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleLogin();
      });
}

function handleLogin() {
      const form = document.querySelector('#login-form');
      const username = form.querySelector('input[name="username"]').value.trim();
      const password = form.querySelector('input[name="password"]').value.trim();

      if (!username || !password) {
            showLoginMessage('Please fill in all fields', 'error');
            return;
      }

      const result = login(username, password);
      if (result.success) {
            showLoginMessage('Login successful!', 'success');
            updateUIAfterAuth();
            setTimeout(() => {
                  if (currentUser.role === 'admin') {
                        window.location.href = 'dashboard.html';
                  }
            }, 1000);
      } else {
            showLoginMessage(result.error, 'error');
      }
}

function showLoginMessage(message, type) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `login-message ${type}`;
      messageDiv.textContent = message;

      const loginForm = document.querySelector('#login-form');
      if (loginForm) {
            loginForm.appendChild(messageDiv);
            setTimeout(() => {
                  messageDiv.remove();
            }, 3000);
      }
}

// Dashboard functionality
function initializeDashboard() {
      if (!window.location.pathname.includes('dashboard.html')) return;

      if (!isAuthenticated || currentUser.role !== 'admin') {
            window.location.href = 'indx.html';
            return;
      }

      loadDashboardData();
      loadContactQuestions();
}

function loadDashboardData() {
      if (!siteData) return;

      const stats = siteData.dashboardData.stats;
      const recentDonations = siteData.dashboardData.recentDonations;
      const recentCampaigns = siteData.dashboardData.recentCampaigns;

      // Update stats
      updateDashboardStats(stats);
      updateRecentDonations(recentDonations);
      updateRecentCampaigns(recentCampaigns);
}

function updateDashboardStats(stats) {
      const statsContainer = document.querySelector('.dashboard-stats');
      if (!statsContainer) return;

      statsContainer.innerHTML = `
        <div class="stat-card">
            <h3>Total Donations</h3>
            <p>$${stats.totalDonations.toLocaleString()}</p>
        </div>
        <div class="stat-card">
            <h3>Total Donors</h3>
            <p>${stats.totalDonors.toLocaleString()}</p>
        </div>
        <div class="stat-card">
            <h3>Active Campaigns</h3>
            <p>${stats.activeCampaigns}</p>
        </div>
        <div class="stat-card">
            <h3>Volunteers</h3>
            <p>${stats.volunteers}</p>
        </div>
    `;
}

function updateRecentDonations(donations) {
      const container = document.querySelector('.recent-donations');
      if (!container) return;

      container.innerHTML = donations.map(donation => `
        <div class="donation-item">
            <div class="donor-info">
                <strong>${donation.donor}</strong>
                <span>$${donation.amount}</span>
            </div>
            <div class="campaign-info">
                <span>${donation.campaign}</span>
                <small>${donation.date}</small>
            </div>
        </div>
    `).join('');
}

function updateRecentCampaigns(campaigns) {
      const container = document.querySelector('.recent-campaigns');
      if (!container) return;

      container.innerHTML = campaigns.map(campaign => `
        <div class="campaign-item">
            <div class="campaign-info">
                <h4>${campaign.name}</h4>
                <div class="progress-bar">
                    <div class="progress" style="width: ${campaign.progress}%"></div>
                </div>
                <div class="campaign-stats">
                    <span>$${campaign.raised.toLocaleString()} raised</span>
                    <span>$${campaign.goal.toLocaleString()} goal</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadContactQuestions() {
      const questions = JSON.parse(localStorage.getItem('contactQuestions') || '[]');
      const container = document.querySelector('.contact-questions');
      if (!container) return;

      if (questions.length === 0) {
            container.innerHTML = '<p>No questions submitted yet.</p>';
            return;
      }

      container.innerHTML = questions.map(question => `
        <div class="question-item ${question.status}">
            <div class="question-header">
                <h4>${question.name}</h4>
                <span class="date">${new Date(question.date).toLocaleDateString()}</span>
                <span class="status">${question.status}</span>
            </div>
            <div class="question-content">
                <p><strong>Email:</strong> ${question.email}</p>
                <p><strong>Phone:</strong> ${question.phone}</p>
                <p><strong>Question:</strong> ${question.question}</p>
            </div>
            <div class="question-actions">
                <button onclick="markAsAnswered(${question.id})" class="btn-answered">Mark as Answered</button>
                <button onclick="deleteQuestion(${question.id})" class="btn-delete">Delete</button>
            </div>
        </div>
    `).join('');
}

function markAsAnswered(questionId) {
      const questions = JSON.parse(localStorage.getItem('contactQuestions') || '[]');
      const updatedQuestions = questions.map(q =>
            q.id === questionId ? { ...q, status: 'answered' } : q
      );
      localStorage.setItem('contactQuestions', JSON.stringify(updatedQuestions));
      loadContactQuestions();
}

function deleteQuestion(questionId) {
      const questions = JSON.parse(localStorage.getItem('contactQuestions') || '[]');
      const updatedQuestions = questions.filter(q => q.id !== questionId);
      localStorage.setItem('contactQuestions', JSON.stringify(updatedQuestions));
      loadContactQuestions();
}

// Utility functions
function formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
      }).format(amount);
}

function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
      });
}

// Export functions for global access
window.app = {
      login,
      logout,
      isAuthenticated: () => isAuthenticated,
      currentUser: () => currentUser,
      handleContactFormSubmit,
      markAsAnswered,
      deleteQuestion
};

// Make functions globally available for onclick handlers
window.markAsAnswered = markAsAnswered;
window.deleteQuestion = deleteQuestion; 