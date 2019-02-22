const serviceMethods = [
  {
    name: 'Method#1',
    url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2',
    input_interface: {
      emailTitle: {
        type: "string",
        formData: {
          elementType: "input",
          elementId: "title#1"
        }
      },
      emailBody: {
        type: "string",
        formData: {
          elementType: "textarea",
          elementId: "message#233"
        }
      },
      receiver: {
        type: "string",
        formData: {
          elementType: "input",
          elementId: "receiver#1123"
        }
      }
    },
    output_interface: {
      emailObject: {
        type: "json"
      }
    }
  },
  {
    name: 'Method#2',
    url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2',
    input_interface: {
      emailTitle: {
        type: "string",
        formData: {
          elementType: "input",
          elementId: "title#1"
        }
      },
      emailBody: {
        type: "string",
        formData: {
          elementType: "textarea",
          elementId: "message#233"
        }
      },
      receiver: {
        type: "string",
        formData: {
          elementType: "input",
          elementId: "receiver#1123"
        }
      }
    },
    output_interface: {
      emailObject: {
        type: "json"
      }
    }
  },

]

const services = [
  { name: 'Email Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Payment Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Email Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Payment Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Email Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Payment Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Email Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Payment Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Email Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Payment Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Email Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Payment Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Email Service', info: 'This is info of the service', methods: serviceMethods },
  { name: 'Payment Service', info: 'This is info of the service', methods: serviceMethods },
]


export { services };