export class CarService {
  static get_cars = async (token: string) => {
    const url = 'http://localhost:2000/car'
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

  static async insert_car(
    brand: string,
    number_seats: number,
    km_available: number,
    license_plate: string,
    type_situation: string,
    token: string
  ) {
    try {
      const response = await fetch('http://localhost:2000/car', {
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
          }
          // return_date: '2024-05-15'
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

  static async update_car(
    id: number,
    brand: string,
    number_seats: number,
    km_available: number,
    license_plate: string,
    type_situation: string,
    token: string
  ) {
    try {
      const response = await fetch(`http://localhost:2000/car/${id}`, {
        method: 'PUT',
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

  static async delete_car(id: number, token: string) {
    try {
      const url = `http://localhost:2000/car/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  static get_roadMap = async (token: string, id: number) => {
    const url = `http://localhost:2000/roadmap/${id}`
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
}
