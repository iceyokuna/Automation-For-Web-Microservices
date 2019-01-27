const serviceMethods = [
  {
    name: 'Send email to a receiver',
    "input_interface": {
      "emailTitle": {
        "type": "string",
        "formData": {
          "elementType": "TextInput",
          "elementId": "title#1"
        }
      },
      "emailBody": {
        "type": "string",
        "formData": {
          "elementType": "TextArea",
          "elementId": "message#233"
        }
      },
      "receiver": {
        "type": "string",
        "formData": {
          "elementType": "TextInput",
          "elementId": "receiver#1123"
        }
      }
    },
    "output_interface": {
      "emailObject": {
        "type": "json"
      }
    }

  },
  {
    name: 'Send email to multiple users',
    "input_interface": {
      "emailTitle": {
        "type": "string",
        "formData": {
          "elementType": "TextInput",
          "elementId": "title#1"
        }
      },
      "emailBody": {
        "type": "string",
        "formData": {
          "elementType": "TextArea",
          "elementId": "message#233"
        }
      },
      "receiver": {
        "type": "string",
        "formData": {
          "elementType": "TextInput",
          "elementId": "receiver#1123"
        }
      }
    },
    "output_interface": {
      "emailObject": {
        "type": "json"
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