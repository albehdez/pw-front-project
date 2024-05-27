export class LoginService {
  static async login(mail: string, paassword: string) {
    const url = 'http://localhost:2000/auth/login'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: mail,
        password: paassword
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error ${response.status}: ${errorData.message}`)
    }
    const data = await response.json()
    return data
  }
}
