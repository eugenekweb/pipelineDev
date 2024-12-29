from datetime import datetime
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
	return "<h1>Hello from K8s!</h1><h3>Now: " + str(datetime.now()) + "</h3>"

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=6088)