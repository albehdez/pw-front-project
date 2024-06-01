export class ReportService {
  static async get_report_car(token: string) {
    const url = 'http://localhost:2000/car/pdf/generate'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    window.open(blobUrl, '_blank')
  }

  static async get_report_group(token: string) {
    const url = 'http://localhost:2000/turistic_group/pdf/generate'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    window.open(blobUrl, '_blank')
  }

  static async get_report_driver(token: string) {
    const url = 'http://localhost:2000/driver/pdf/generate'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    window.open(blobUrl, '_blank')
  }

  static async get_report_programing(token: string) {
    const url = 'http://localhost:2000/programing/pdf/generate'
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    window.open(blobUrl, '_blank')
  }
}
