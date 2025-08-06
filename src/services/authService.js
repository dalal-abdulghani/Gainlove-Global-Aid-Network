import data from '@/assets/data.json'

class AuthService {
      constructor() {
            this.users = data.users
            this.currentUser = this.getCurrentUser()
      }

      validateLogin(username, password) {
            const errors = {}

            if (!username || username.trim() === '') {
                  errors.username = 'user name is required'
            }

            if (!password || password.trim() === '') {
                  errors.password = 'password is required'
            }

            return {
                  isValid: Object.keys(errors).length === 0,
                  errors
            }
      }

      login(username, password) {
            const validation = this.validateLogin(username, password)

            if (!validation.isValid) {
                  return {
                        success: false,
                        errors: validation.errors
                  }
            }

            const user = this.users.find(u =>
                  (u.username === username || u.email === username) && u.password === password
            )

            if (user) {
                  const userData = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        name: user.name,
                        role: user.role
                  }

                  localStorage.setItem('currentUser', JSON.stringify(userData))
                  this.currentUser = userData

                  return {
                        success: true,
                        user: userData
                  }
            } else {
                  return {
                        success: false,
                        errors: {
                              general: 'username or password is incorrect'
                        }
                  }
            }
      }

      logout() {
            localStorage.removeItem('currentUser')
            this.currentUser = null
      }

      getCurrentUser() {
            const userData = localStorage.getItem('currentUser')
            return userData ? JSON.parse(userData) : null
      }

      isAuthenticated() {
            return this.currentUser !== null
      }

      isAdmin() {
            return this.currentUser && this.currentUser.role === 'admin'
      }

      isUser() {
            return this.currentUser && this.currentUser.role === 'user'
      }
}

export default new AuthService() 