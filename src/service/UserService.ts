export class UserService {
  static get_user = async (token: string) => {
    const url = 'http://localhost:2000/user'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText)
    }
    const data = await response.json()
    return data
  }

  static async insert_user(
    name: string,
    email: string,
    password: string,
    role: string,
    token: string
  ) {
    try {
      const response = await fetch('http://localhost:2000/auth/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role
        })
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error()
    }
  }

  static async delete_user(email: string, token: string) {
    try {
      const url = `http://localhost:2000/user/${email}`
      const response = await fetch(url, {
        method: 'DEL',
        headers: {
          Authorization: `Bearer ${token}`
          // 'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error()
    }
  }
}
