from flask import Flask
app = Flask(__name__)

#firebase header

@app.route('/')
def hello():
    return "Hello World!"

#Recieve time event (binding)
@app.route('/timeEvent', methods=['POST'])
def timeEvent():
    return "Time Event!"

#Recieve meesage event (binding)
@app.route('/messageEvent', methods=['POST'])
def messageEvent():
    return "Message Event!"

if __name__ == '__main__':
    app.run()