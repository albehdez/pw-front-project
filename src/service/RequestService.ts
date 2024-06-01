export class RequestService {
  static get_requests = async (token: string) => {
    const url = 'http://localhost:2000/request'
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

  static async insert_request(
    brand: string,
    number_seats: number,
    km_available: number,
    license_plate: string,
    type_situation: string,
    token: string
  ) {
    try {
      const response = await fetch('http://localhost:2000/request', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brand: brand,
          number_seats: number_seats,
          km_available: km_available,
          license_plate: license_plate,
          situation: {
            type_situation: type_situation
          },
          return_date: '2024-05-15'
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
}
