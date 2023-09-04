import swaggerAutogen from 'swagger-autogen'


const doc = {
    info: {
        title: 'Sunrise Trips API',
        description: 'Description',
    },
    host: 'localhost:2001',
    schemes: ['http'],
}

const outputFile = './build/swagger-output.json'
const endpointsFiles = ['.', '']

swaggerAutogen(outputFile, endpointsFiles, doc)
  
