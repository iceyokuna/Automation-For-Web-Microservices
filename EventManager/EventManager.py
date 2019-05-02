from flask import Flask
app = Flask(__name__)

#firebase header

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/timeEvent')
def timeEvent():
    return "Time Event!"

@app.route('/messageEvent')
def messageEvent():
    return "Message Event!"

if __name__ == '__main__':
    app.run()