const axios = require('axios')

test('GET Video List', async () => {
    const response = await axios.get('')
    expect(response.status).toBe(200)
})
