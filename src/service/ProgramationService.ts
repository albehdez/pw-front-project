export class ProgramationService {
  static get_programing = async (token: string) => {
    const url = 'http://localhost:2000/programing'
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

  static async insert_programing(
    type: string,
    start: any,
    end: any,
    description: string,
    km: number,
    delay: any,
    token: string
  ) {
    try {
      const response = await fetch('http://localhost:2000/programing', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_time: start,
          end_time: end,
          description: description,
          km_to_travel: km,
          delay: delay,
          type: {
            programing_type: type
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

  static async delete_prog(id: number, token: string) {
    try {
      const url = `http://localhost:2000/programing/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
          // 'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error()
    }
  }

  static get_programing_type = async (token: string) => {
    const url = 'http://localhost:2000/programing-type'
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
    const programs = data.map((item: any) => item.programing_type)
    return programs
  }
}
