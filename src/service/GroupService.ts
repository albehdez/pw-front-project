export class GroupService {
  static get_groups = async (token: string) => {
    const url = 'http://localhost:2000/turistic_group'
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

  static get_country_groups = async (token: string) => {
    const url = 'http://localhost:2000/country'
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
    const names = data.map((item: any) => item.name)
    return names
  }

  static async insert_group(number_people: number, country: string, token: string) {
    try {
      const response = await fetch('http://localhost:2000/turistic_group', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number_turist: number_people,
          country: {
            name: country
          }
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

  static async update_group(id: number, number_people: number, country: string, token: string) {
    try {
      const response = await fetch(`http://localhost:2000/turistic_group/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number_turist: number_people,
          country: {
            name: country
          }
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

  static async delete_group(id: number, token: string) {
    try {
      const url = `http://localhost:2000/turistic_group/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error()
    }
  }
}
